// src/services/copilotClient.js
// Client-side orchestrator for Portfolio Copilot natural language queries with streaming support.

import { classifyIntent } from './intentClassifier'
import { fetchRepoReadme } from './githubClient'
import { portfolioData } from '../data/portfolioData'
import { AI_CONFIG } from './aiConfig'

const SYSTEM_PROMPT_BASE = `You are Portfolio Copilot, an AI assistant built into Vaibhav's developer portfolio.

Your role is to act as an intelligent representative of Vaibhav's engineering work.

Your personality:
- Precise and technical
- Confident but not arrogant
- Helpful and clear
- Speaks as if Vaibhav himself is explaining his work (e.g. use "I" instead of "Vaibhav" when explaining his decisions or background)
- Never robotic or corporate

Rules:
1. For general tech questions: answer from your knowledge directly.
2. For portfolio questions: answer ONLY from the portfolio context provided. Do not hallucinate projects, skills, or experience not in the context.
3. For repository questions: answer ONLY from the GitHub repository context provided. Always mention which repository your answer comes from.
4. Keep responses concise — this is a terminal window, not a document editor. Keep answers under 150-200 words.
5. Use plain text — do not output markdown headers (no #), no markdown bold (no **), no underline, and no bullet symbols that render poorly in a text console. Use simple dashes (-) for lists.
6. Never say you are ChatGPT, Claude, or any other AI. You are Portfolio Copilot.
7. If you genuinely cannot answer from the context, say:
   "I don't have enough context for that. Try asking something about Vaibhav's projects, skills, or a general tech concept."

`

// Clean markdown characters from responses to preserve terminal text look
function cleanTerminalOutput(text) {
  if (!text) return ''
  return text
    .replace(/[#*`]/g, '')            // Strip #, *, and ` symbols
    .replace(/__+/g, '')             // Strip underscores used for formatting
}

export async function queryCopilot(query, chatHistory = [], cachedRepos = [], onChunk) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Vaibhav20k'

  if (!apiKey) {
    const errMsg = 'Error: API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.'
    onChunk(errMsg)
    return { intent: 'ERROR', text: errMsg }
  }

  // 1. Classify User Intent
  const intent = await classifyIntent(query, apiKey)
  console.log(`Query: "${query}" | Classified Intent: ${intent} | Model: ${AI_CONFIG.model}`)

  let domainContext = ''
  let sources = ''

  // 2. Fetch/Build Grounding Context
  if (intent === 'PORTFOLIO') {
    domainContext = `PORTFOLIO CONTEXT:
Name: ${portfolioData.name}
Title: ${portfolioData.title}
Institute: ${portfolioData.institute}
Batch: ${portfolioData.batch}
Tagline: ${portfolioData.tagline}
About: ${portfolioData.about.heading} ${portfolioData.about.paragraph}
Achievements:
${portfolioData.achievements.map(a => `- ${a}`).join('\n')}
Skills:
- Languages: ${portfolioData.skills.languages.join(', ')}
- Frameworks: ${portfolioData.skills.frameworks.join(', ')}
- AI/ML: ${portfolioData.skills.ai.join(', ')}
- Databases: ${portfolioData.skills.databases.join(', ')}
- DevOps/Tools: ${portfolioData.skills.devops.join(', ')}
Projects Summarized:
${portfolioData.projects.map(p => `- Name: ${p.name}\n  Type: ${p.type}\n  Ownership: ${p.ownership}\n  Tech: ${p.tech.join(', ')}\n  Description: ${p.description}`).join('\n\n')}
`
  } else if (intent === 'REPOSITORY') {
    // Determine which repository matches the query
    let matchedRepo = 'repolens-portfolio' // Default fallback
    const queryLower = query.toLowerCase()

    if (queryLower.includes('orbitair')) {
      matchedRepo = 'OrbitAir'
    } else if (queryLower.includes('orbit-ops') || queryLower.includes('orbit ops')) {
      matchedRepo = 'ORBIT-OPS'
    }

    console.log(`Detected repository match: ${matchedRepo}`)
    const readme = await fetchRepoReadme(matchedRepo, username)

    // Build context with GitHub repo summary if available in local cache
    const repoInfo = cachedRepos.find(r => r.name.toLowerCase() === matchedRepo.toLowerCase())
    const metadataContext = repoInfo 
      ? `Metadata: Language: ${repoInfo.language}, Stars: ${repoInfo.stars}, Topics: ${repoInfo.topics.join(', ')}`
      : `Name: ${matchedRepo}`

    domainContext = `REPOSITORY CONTEXT:
Repo Info: ${metadataContext}
README Content:
${readme}
`
    sources = `Source: ${matchedRepo} repository — github.com/${username}/${matchedRepo}`
  }

  // 3. Assemble Messages Payload
  const formattedMessages = [
    {
      role: 'system',
      content: SYSTEM_PROMPT_BASE + (domainContext ? `\n${domainContext}` : '')
    },
    ...chatHistory.map(h => ({
      role: h.role,
      content: h.content
    })),
    {
      role: 'user',
      content: query
    }
  ]

  // 4. Request OpenRouter (with stream: true)
  try {
    const response = await fetch(AI_CONFIG.baseUrl, {
      method: 'POST',
      headers: AI_CONFIG.getHeaders(apiKey),
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: formattedMessages,
        temperature: 0.5,
        max_tokens: 350,
        stream: true
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Check if VITE_OPENROUTER_API_KEY is valid.')
      }
      throw new Error(`OpenRouter returned HTTP status ${response.status}`)
    }

    // Read the streaming response body
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let accumulatedText = ''
    let buffer = ''
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      
      if (value) {
        buffer += decoder.decode(value, { stream: !done })
        const lines = buffer.split('\n')
        
        // Hold the last incomplete line
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed) continue
          if (trimmed === 'data: [DONE]') continue

          if (trimmed.startsWith('data: ')) {
            try {
              const jsonStr = trimmed.slice(6)
              const parsed = JSON.parse(jsonStr)
              const content = parsed.choices[0]?.delta?.content || ''
              if (content) {
                accumulatedText += content
                // Clean the output on the fly and trigger callback
                onChunk(cleanTerminalOutput(accumulatedText))
              }
            } catch (e) {
              // Ignore partial JSON parsing issues from split chunks
            }
          }
        }
      }
    }

    // Process any trailing lines left in the buffer
    if (buffer && buffer.trim().startsWith('data: ') && buffer.trim() !== 'data: [DONE]') {
      try {
        const jsonStr = buffer.trim().slice(6)
        const parsed = JSON.parse(jsonStr)
        const content = parsed.choices[0]?.delta?.content || ''
        if (content) {
          accumulatedText += content
        }
      } catch (e) {}
    }

    // Final clean
    let cleanedOutput = cleanTerminalOutput(accumulatedText).trim()

    if (sources && !cleanedOutput.toLowerCase().includes('source:')) {
      cleanedOutput += `\n\n${sources}`
    }

    // Final callback call to display sources
    onChunk(cleanedOutput)

    return {
      intent,
      text: cleanedOutput
    }
  } catch (err) {
    console.error('API execution failed in copilotClient:', err)
    const errText = `Portfolio Copilot is temporarily offline. (${err.message}). Try again in a moment.`
    onChunk(errText)
    return {
      intent: 'ERROR',
      text: errText
    }
  }
}

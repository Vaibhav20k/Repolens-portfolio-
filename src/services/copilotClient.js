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
- Speaks as if Vaibhav himself is explaining his work (use "I" instead of "Vaibhav" when referring to yourself)
- Never robotic or corporate

Rules:
1. For general tech questions, answer from your own technical knowledge.

2. For portfolio questions, answer ONLY from the portfolio context provided. Never invent projects, skills, achievements, or experience.

3. If the portfolio context contains contact information and the user asks how to contact, connect, hire, email, message, reach, or collaborate with me, provide the available contact details directly.

4. For repository questions, answer ONLY from the repository context provided. Always mention which repository your answer comes from.

5. Keep responses concise. This is a terminal window, not a document editor. Aim for under 150–200 words.

6. Use plain text only.
- No markdown headers
- No bold
- No tables
- Use simple "-" for bullet points.

7. Never say you are ChatGPT, Claude, Gemini, or another AI assistant. You are Portfolio Copilot.

8. If the answer genuinely cannot be determined from the supplied context, reply:

"I don't have enough context for that. Try asking something about my projects, skills, repositories, or a general technical concept."
`

// Clean markdown characters from responses to preserve terminal appearance
function cleanTerminalOutput(text) {
  if (!text) return ''

  return text
    .replace(/[#*`]/g, '')
    .replace(/__+/g, '')
}

export async function queryCopilot(
  query,
  chatHistory = [],
  cachedRepos = [],
  onChunk
) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Vaibhav20k'

  if (!apiKey) {
    const errMsg =
      'Error: API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.'

    onChunk(errMsg)

    return {
      intent: 'ERROR',
      text: errMsg
    }
  }

  // 1. Classify user intent
  const intent = await classifyIntent(query, apiKey)

  console.log(
    `Query: "${query}" | Classified Intent: ${intent} | Model: ${AI_CONFIG.model}`
  )

  let domainContext = ''
  let sources = ''

  // ---------------------------------------------------------------------------
  // PORTFOLIO DOMAIN
  // ---------------------------------------------------------------------------

  if (intent === 'PORTFOLIO') {
    domainContext = `PORTFOLIO CONTEXT

Basic Information
Name: ${portfolioData.name}
Title: ${portfolioData.title}
Institute: ${portfolioData.institute}
Batch: ${portfolioData.batch}
Tagline: ${portfolioData.tagline}

About
${portfolioData.about.heading}

${portfolioData.about.paragraph}

Skills

Languages:
${portfolioData.skills.languages.join(', ')}

Frameworks:
${portfolioData.skills.frameworks.join(', ')}

AI / ML:
${portfolioData.skills.ai.join(', ')}

Data Science:
${portfolioData.skills.data.join(', ')}

Databases:
${portfolioData.skills.databases.join(', ')}

DevOps:
${portfolioData.skills.devops.join(', ')}

Achievements
${portfolioData.achievements
  .map((achievement) => `- ${achievement}`)
  .join('\n')}

Professional Experience

${portfolioData.experience
  .map(
    (exp) => `- Role: ${exp.role}
  Organization: ${exp.org}
  Duration: ${exp.duration}
  Description: ${exp.description}`
  )
  .join('\n\n')}

Projects

${portfolioData.projects
  .map(
    (project) => `Project: ${project.name}

Type: ${project.type}

Ownership:
${project.ownership}

Description:
${project.description}

Technology Stack:
${project.tech.join(', ')}

Highlights:
${project.highlights.map((h) => `- ${h}`).join('\n')}

GitHub:
${project.github}

Live:
${project.live || 'Not deployed'}
`
  )
  .join('\n----------------------------------------\n')}

Contact Information

Email:
${portfolioData.contact.email}

Phone:
${portfolioData.contact.phone}

LinkedIn:
${portfolioData.contact.linkedin}

GitHub:
${portfolioData.contact.github}

Instagram:
${portfolioData.contact.instagram}

Location:
${portfolioData.contact.location}
`
  }

  // REPOSITORY BLOCK CONTINUES BELOW...
    // ---------------------------------------------------------------------------
  // REPOSITORY DOMAIN
  // ---------------------------------------------------------------------------

  else if (intent === 'REPOSITORY') {
    let matchedRepo = 'repolens-portfolio'
    const queryLower = query.toLowerCase()

    if (queryLower.includes('orbitair')) {
      matchedRepo = 'OrbitAir'
    } else if (
      queryLower.includes('orbit-ops') ||
      queryLower.includes('orbit ops')
    ) {
      matchedRepo = 'ORBIT-OPS'
    }

    console.log(`Detected repository match: ${matchedRepo}`)

    // Fetch README from GitHub
    const readme = await fetchRepoReadme(matchedRepo, username)

    // Cached GitHub metadata
    const repoInfo = cachedRepos.find(
      (repo) => repo.name.toLowerCase() === matchedRepo.toLowerCase()
    )

    // Local portfolio metadata
    const projectInfo = portfolioData.projects.find(
      (project) =>
        project.github &&
        project.github.toLowerCase().includes(matchedRepo.toLowerCase())
    )

    const metadataContext = repoInfo
      ? `
Repository Metadata
- Name: ${repoInfo.name}
- Language: ${repoInfo.language}
- Stars: ${repoInfo.stars}
- Topics: ${
          repoInfo.topics?.length
            ? repoInfo.topics.join(', ')
            : 'None'
        }
`
      : `
Repository Metadata
- Name: ${matchedRepo}
`

    const localProjectContext = projectInfo
      ? `
Portfolio Project Information

Project:
${projectInfo.name}

Type:
${projectInfo.type}

Ownership:
${projectInfo.ownership}

Description:
${projectInfo.description}

Technology Stack:
${projectInfo.tech.join(', ')}

Highlights:
${projectInfo.highlights
          .map((highlight) => `- ${highlight}`)
          .join('\n')}

Live Demo:
${projectInfo.live || 'Not deployed'}

GitHub:
${projectInfo.github}
`
      : `
No additional portfolio metadata available for this repository.
`

    domainContext = `REPOSITORY CONTEXT

${metadataContext}

${localProjectContext}

README

${readme || 'README not available.'}
`

    sources = `Source: ${matchedRepo} repository — github.com/${username}/${matchedRepo}`
  }

  // ---------------------------------------------------------------------------
  // GENERAL DOMAIN
  // ---------------------------------------------------------------------------

  const formattedMessages = [
    {
      role: 'system',
      content:
        SYSTEM_PROMPT_BASE +
        (domainContext ? `\n\n${domainContext}` : '')
    },

    ...chatHistory
      .filter(Boolean)
      .map((message) => ({
        role: message.role,
        content: message.content
      })),

    {
      role: 'user',
      content: query
    }
  ]

  console.log('[Copilot diagnostics] Outbound request:', {
    endpoint: AI_CONFIG.baseUrl,
    model: AI_CONFIG.model,
    intent,
    payloadSize: formattedMessages.length
  })

  try {
    const response = await fetch(AI_CONFIG.baseUrl, {
      method: 'POST',
      headers: AI_CONFIG.getHeaders(apiKey),
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: formattedMessages,
        temperature: 0.5,
        max_tokens: 1200,
        stream: true
      })
    })

    console.log(
      `[Copilot diagnostics] OpenRouter Response: ${response.status}`
    )

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Unauthorized. Check your OpenRouter API key.'
        )
      }

      throw new Error(
        `OpenRouter returned HTTP ${response.status}`
      )
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')

    let accumulatedText = ''
    let buffer = ''
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading

      if (value) {
        buffer += decoder.decode(value, {
          stream: !done
        })

        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()

          if (!trimmed) continue
          if (trimmed === 'data: [DONE]') continue

          if (trimmed.startsWith('data: ')) {
            try {
              const parsed = JSON.parse(trimmed.slice(6))
              const content =
                parsed.choices?.[0]?.delta?.content || ''

              if (content) {
                accumulatedText += content
                onChunk(cleanTerminalOutput(accumulatedText))
              }
            } catch {
              // Ignore partial stream chunks
            }
          }
        }
      }
    }

    if (
      buffer &&
      buffer.trim().startsWith('data: ') &&
      buffer.trim() !== 'data: [DONE]'
    ) {
      try {
        const parsed = JSON.parse(buffer.trim().slice(6))
        const content =
          parsed.choices?.[0]?.delta?.content || ''

        accumulatedText += content
      } catch {}
    }

    let cleanedOutput = cleanTerminalOutput(
      accumulatedText
    ).trim()

    if (
      sources &&
      !cleanedOutput.toLowerCase().includes('source:')
    ) {
      cleanedOutput += `\n\n${sources}`
    }

    onChunk(cleanedOutput)

    return {
      intent,
      text: cleanedOutput
    }
  } catch (err) {
    console.error('API execution failed:', err)

    const errText = `Portfolio Copilot is temporarily offline. (${err.message}). Please try again shortly.`

    onChunk(errText)

    return {
      intent: 'ERROR',
      text: errText
    }
  }
}
// src/services/intentClassifier.js
// Classifies user natural language prompts into GENERAL | PORTFOLIO | REPOSITORY

import { AI_CONFIG } from './aiConfig'

const CLASSIFICATION_PROMPT = `You are an intent classifier for a developer portfolio AI system.

Given a user question, classify it into exactly one of these categories:

GENERAL    — General software engineering or technology concepts (e.g., "What is FastAPI?", "Explain Docker.")
PORTFOLIO  — Questions about Vaibhav, his projects, skills, experience, achievements (e.g., "What projects has he built?", "What is his tech stack?")
REPOSITORY — Questions about specific code, architecture, implementation in his repos (e.g., "How does OrbitAir work?", "Explain the backend of ORBIT-OPS.")

Respond with only the label (GENERAL, PORTFOLIO, or REPOSITORY). No explanation. No punctuation.

Question: `

export async function classifyIntent(query, apiKey) {
  if (!apiKey) {
    console.warn('API Key missing; defaulting classification to PORTFOLIO.')
    return 'PORTFOLIO'
  }

  try {
    const response = await fetch(AI_CONFIG.baseUrl, {
      method: 'POST',
      headers: AI_CONFIG.getHeaders(apiKey),
      body: JSON.stringify({
        model: AI_CONFIG.classifierModel,
        messages: [
          {
            role: 'user',
            content: `${CLASSIFICATION_PROMPT}"${query}"`
          }
        ],
        temperature: 0,
        max_tokens: 10
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter returned status: ${response.status}`)
    }

    const result = await response.json()
    const label = result.choices[0]?.message?.content?.trim() || 'PORTFOLIO'

    // Clean up label in case model returned extra characters
    if (label.includes('GENERAL')) return 'GENERAL'
    if (label.includes('REPOSITORY')) return 'REPOSITORY'
    return 'PORTFOLIO'
  } catch (err) {
    console.error('Failed to classify intent:', err)
    // Safe fallback is PORTFOLIO
    return 'PORTFOLIO'
  }
}

// src/services/aiConfig.js
// Centralized configuration and model abstractions for Portfolio Copilot.

export const AI_CONFIG = {
  // Base URL for OpenRouter completions
  baseUrl: 'https://openrouter.ai/api/v1/chat/completions',

  // Model abstraction - falls back to the requested free Nemotron model
  model: import.meta.env.VITE_OPENROUTER_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b:free',

  // Intent classification model - can use a smaller, faster model if desired
  classifierModel: import.meta.env.VITE_OPENROUTER_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b:free',

  // Generator for standard headers
  getHeaders: (apiKey) => ({
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://vaibhav-portfolio.vercel.app',
    'X-Title': 'RepoLens AI Portfolio'
  })
}

// src/services/aiConfig.js
// Centralized configuration and model abstractions for Portfolio Copilot.

export const AI_CONFIG = {
  // Base URL for OpenRouter completions
  baseUrl: 'https://openrouter.ai/api/v1/chat/completions',

  // Model abstraction - falls back to the requested free Nemotron model
  model: import.meta.env.VITE_OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',

  // Intent classification model - use openrouter/free meta-router for maximum stability and speed
  classifierModel: 'openrouter/free',

  // Generator for standard headers
  getHeaders: (apiKey) => ({
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://vaibhav-portfolio.vercel.app',
    'X-Title': 'RepoLens AI Portfolio'
  })
}

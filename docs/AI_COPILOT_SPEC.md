# AI_COPILOT_SPEC.md
## Portfolio Copilot — Complete Specification
### RepoLens AI Portfolio — Vaibhav

---

## READ THIS FIRST

After reading this file, you must understand one thing clearly:

```
This is NOT a chatbot.
This is NOT a GitHub repo assistant.
This is NOT a FAQ bot.

This IS an intelligent Portfolio Copilot that combines:
  - General AI knowledge
  - Structured portfolio data
  - Live repository intelligence

It acts as an intelligent representative of Vaibhav's engineering work.
It speaks on his behalf. It understands his code. It explains his thinking.
```

---

## 1. Identity

| Property | Value |
|---|---|
| Name | Portfolio Copilot |
| Powered by | OpenRouter API (NVIDIA model) |
| Lives inside | Terminal window on the portfolio site |
| Persona | Vaibhav's engineering voice — precise, technical, confident |
| Prompt style | `vaibhav@repolens:~$` |
| Terminal colors | Black background, green text (`#00FF41`), JetBrains Mono font |

---

## 2. What Portfolio Copilot IS

```
Portfolio Copilot is an AI system that knows three things deeply:

1. General software engineering and technology concepts
2. Everything about Vaibhav — his projects, skills, experience, achievements
3. Vaibhav's actual GitHub repositories — their structure, tech, and purpose

When a visitor asks a question, Portfolio Copilot:
- Figures out which knowledge domain is relevant
- Pulls the right context
- Answers intelligently, naturally, and accurately
- Cites sources when drawing from repository knowledge
```

---

## 3. Three Knowledge Domains

### Domain 1 — General Technical Knowledge

**What it covers:**
Any general software engineering, AI, or technology concept.

**Examples:**
```
"What is FastAPI?"
"Explain Docker."
"What is Retrieval-Augmented Generation?"
"What is CI/CD?"
"What is React?"
"How do embeddings work?"
"Explain the difference between SQL and NoSQL."
```

**How it answers:**
Direct LLM call to OpenRouter. No extra context needed.
The model answers from its own training knowledge.

**Rule:** Never say "I don't know" for general tech questions.

---

### Domain 2 — Portfolio Knowledge

**What it covers:**
Anything about Vaibhav — who he is, what he has built, his skills,
his experience, his achievements, his goals.

**Examples:**
```
"What projects has Vaibhav built?"
"What technologies does he use?"
"What is his strongest project?"
"What AI work has he done?"
"What experience does he have?"
"Has he won any competitions?"
"What is he currently studying?"
"What is his tech stack?"
```

**How it answers:**
Injects `portfolioData.js` as context into the prompt before calling OpenRouter.
Answers are grounded in structured portfolio data, not hallucinated.

**Source:** `src/data/portfolioData.js`

**Rule:** Never answer portfolio questions from general knowledge.
Always use portfolioData.js as the context source.

---

### Domain 3 — Repository Knowledge

**What it covers:**
Questions about specific repositories, code architecture,
implementation details, technology choices inside actual projects.

**Examples:**
```
"How does OrbitAir work?"
"Explain the architecture of ORBIT-OPS."
"What is RepoLens AI?"
"Where is FastAPI used in Vaibhav's projects?"
"How is the database structured in OrbitAir?"
"Which repositories use React?"
"How does the data scraping work?"
"What APIs does ORBIT-OPS use?"
```

**How it answers:**
1. Calls GitHub API to fetch live repository data for `Vaibhav20k`
2. Pulls: repo names, descriptions, languages, topics, README content
3. Injects this as context into the prompt
4. OpenRouter generates answer grounded in actual repository data
5. Response includes source attribution (which repo, which file)

**Source:** GitHub API → `https://api.github.com/users/Vaibhav20k/repos`

**Rule:** Never answer repository questions from general knowledge or
from portfolioData.js alone. Always fetch and inject GitHub context first.

---

## 4. Intent Classification System

Before answering, Portfolio Copilot classifies every question.

### Classification Prompt
```
You are an intent classifier for a developer portfolio AI system.

Given a user question, classify it into exactly one of these categories:

GENERAL    — General software engineering or technology concepts
PORTFOLIO  — Questions about Vaibhav, his projects, skills, experience, achievements
REPOSITORY — Questions about specific code, architecture, implementation in his repos

Respond with only the label. No explanation. No punctuation.

Question: {user_question}
```

### Routing Logic
```
User Question
     ↓
Intent Classifier (OpenRouter call)
     ↓
     ├── GENERAL    → Direct LLM call (no extra context)
     │
     ├── PORTFOLIO  → Inject portfolioData.js → OpenRouter call
     │
     └── REPOSITORY → Fetch GitHub API data → Inject README + metadata → OpenRouter call
          ↓
     Combined Response
          ↓
     Source Attribution (for REPOSITORY only)
          ↓
     Terminal Display
```

---

## 5. System Prompt

This system prompt is injected on every OpenRouter call:

```
You are Portfolio Copilot, an AI assistant built into Vaibhav's developer portfolio.

Your role is to act as an intelligent representative of Vaibhav's engineering work.

Your personality:
- Precise and technical
- Confident but not arrogant
- Helpful and clear
- Speaks as if Vaibhav himself is explaining his work
- Never robotic or corporate

Rules:
1. For general tech questions: answer from your knowledge directly.
2. For portfolio questions: answer ONLY from the portfolio context provided.
   Do not hallucinate projects, skills, or experience not in the context.
3. For repository questions: answer ONLY from the GitHub repository context provided.
   Always mention which repository your answer comes from.
4. Keep responses concise — this is a terminal, not a document editor.
5. Use plain text — no markdown, no bullet symbols that look bad in terminal.
   Use simple dashes for lists if needed.
6. Never say you are ChatGPT, Claude, or any other AI.
   You are Portfolio Copilot.
7. If you genuinely cannot answer, say:
   "I don't have enough context for that. Try asking something about
    Vaibhav's projects, skills, or a general tech concept."

{domain_context}
```

---

## 6. Terminal Commands

All commands Portfolio Copilot must handle:

| Command | Domain | Behavior |
|---|---|---|
| `help` | — | Lists all commands with descriptions |
| `about` | Portfolio | Who is Vaibhav, his background |
| `projects` | Portfolio | Lists all projects with brief descriptions |
| `skills` | Portfolio | Full tech stack breakdown by category |
| `experience` | Portfolio | Work history, internships, roles |
| `repos` | Repository | Live GitHub repos fetched from API |
| `tech-stack` | Portfolio | Detailed technology breakdown |
| `ai-projects` | Portfolio | AI-specific projects only |
| `achievements` | Portfolio | Competitions, certifications, highlights |
| `ask [query]` | All 3 | Natural language question → intent classified → answered |
| `clear` | — | Clears terminal output |

### help command output format
```
vaibhav@repolens:~$ help

  Portfolio Copilot — Command Reference

  about          Who is Vaibhav
  projects       View all projects
  skills         Tech stack and skills
  experience     Work and experience history
  achievements   Competitions and certifications
  repos          Live GitHub repositories
  tech-stack     Detailed technology breakdown
  ai-projects    AI and ML specific work
  ask [query]    Ask me anything about Vaibhav or his work
  clear          Clear the terminal

  Example:
  ask How does OrbitAir work?
  ask What is your strongest project?
  ask Explain what RAG means.
```

---

## 7. Response Format Rules

```
1. Plain text only — no markdown headers, no ** bold **, no # symbols
2. Use simple dash ( - ) for list items
3. Keep responses under 200 words unless the question requires depth
4. For repository answers — always end with:
   "Source: [repository name] on GitHub"
5. For errors — always show a helpful message, never a raw error object
6. Loading state — always show typing indicator before response appears
7. Tone — natural, like a knowledgeable engineer explaining to a peer
```

### Example Responses

**General:**
```
vaibhav@repolens:~$ ask What is FastAPI?

FastAPI is a modern Python web framework for building APIs quickly.
It uses Python type hints to validate request and response data automatically,
and generates OpenAPI documentation out of the box.

It is one of the fastest Python frameworks available, built on top of
Starlette and Pydantic. Ideal for building REST APIs and ML model serving endpoints.
```

**Portfolio:**
```
vaibhav@repolens:~$ ask What is Vaibhav's strongest project?

Based on technical complexity and competition performance,
OrbitAir stands out as the strongest project.

It was built for NASA Space Apps Challenge where the team
finished in the Top 5 among hundreds of competing teams globally.

Vaibhav personally owned the data scraping, backend, frontend,
and database work on this project.
```

**Repository:**
```
vaibhav@repolens:~$ ask How does ORBIT-OPS work?

ORBIT-OPS is a [description from README].
The system architecture uses [tech from repo metadata].
The main components are [from README content].

Source: ORBIT-OPS repository — github.com/Vaibhav20k/ORBIT-OPS
```

---

## 8. AI Provider Configuration

```javascript
// services/openrouter.js

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

// Primary model — NVIDIA via OpenRouter (free tier)
const MODEL = 'nvidia/llama-3.1-nemotron-ultra-253b-v1'

// Abstraction layer — swap model here without touching any UI code
// Future options:
// 'meta-llama/llama-3.1-8b-instruct:free'
// 'mistralai/mistral-7b-instruct:free'
// Local: Ollama + Llama 3 (Phase 3)

const headers = {
  'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': 'https://vaibhav-portfolio.vercel.app',
  'X-Title': 'RepoLens AI Portfolio'
}
```

---

## 9. GitHub Integration

```javascript
// services/github.js

const GITHUB_API = 'https://api.github.com'
const USERNAME = import.meta.env.VITE_GITHUB_USERNAME // 'Vaibhav20k'

// Data fetched on terminal first open
// Cached in React state — not re-fetched on every command

// Endpoints used:
// GET /users/Vaibhav20k/repos          → repo list
// GET /repos/Vaibhav20k/{repo}/readme  → README per repo

// Data extracted per repo:
// - name
// - description
// - language
// - topics
// - html_url
// - stargazers_count
// - README content (base64 decoded)
```

---

## 10. portfolioData.js Structure

```javascript
// src/data/portfolioData.js
// Single source of truth for Domain 2 answers
// Owner updates this file — Portfolio Copilot answers update automatically

export const portfolioData = {
  name: "Vaibhav",
  title: "B.Tech CS Undergraduate | AI Engineer | Full Stack Developer",
  institute: "Dr. Akhilesh Das Gupta Institute of Professional Studies, Delhi",
  batch: "2024–2028",
  github: "https://github.com/Vaibhav20k",
  tagline: "Building intelligent systems at the intersection of AI & Full Stack",

  about: "[PLACEHOLDER]",

  skills: {
    languages:  ["[PLACEHOLDER]"],
    frameworks: ["[PLACEHOLDER]"],
    ai:         ["[PLACEHOLDER]"],
    data:       ["[PLACEHOLDER]"],
    devops:     ["[PLACEHOLDER]"],
    databases:  ["[PLACEHOLDER]"]
  },

  projects: [
    {
      name: "OrbitAir",
      type: "Group Project",
      personalOwnership: ["data scraping", "backend", "frontend", "database"],
      description: "[PLACEHOLDER]",
      tech: ["[PLACEHOLDER]"],
      github: "[PLACEHOLDER]",
      live: "[PLACEHOLDER]",
      highlights: ["[PLACEHOLDER]"]
    },
    {
      name: "ORBIT-OPS",
      type: "Group Project",
      personalOwnership: ["data scraping", "backend", "frontend", "database"],
      description: "[PLACEHOLDER]",
      tech: ["[PLACEHOLDER]"],
      github: "[PLACEHOLDER]",
      live: "[PLACEHOLDER]",
      highlights: ["[PLACEHOLDER]"]
    },
    {
      name: "RepoLens AI Portfolio",
      type: "Solo Project",
      description: "AI-powered developer portfolio with Portfolio Copilot — a conversational intelligence layer built over GitHub repositories.",
      tech: ["React", "Framer Motion", "GSAP", "OpenRouter API", "GitHub API"],
      github: "https://github.com/Vaibhav20k",
      highlights: [
        "3-domain intent classification",
        "Live GitHub API integration",
        "RAG pipeline planned for Phase 3",
        "Premium immersive design"
      ]
    }
  ],

  experience: ["[PLACEHOLDER]"],

  achievements: [
    "NASA Space Apps Challenge — Top 5 (among hundreds of teams globally)",
    "Smart India Hackathon — Participant",
    "IIT Roorkee Data Science & AI Programme — In Progress",
    "Deloitte Australia Data Analytics Simulation via Forage — Completed"
  ],

  contact: {
    email: "[PLACEHOLDER]",
    phone: "[PLACEHOLDER]",
    linkedin: "[PLACEHOLDER]",
    github: "https://github.com/Vaibhav20k",
    instagram: "[PLACEHOLDER]",
    location: "Delhi, India"
  }
}
```

---

## 11. Error Handling

| Scenario | Terminal Response |
|---|---|
| OpenRouter API key missing | `Error: API key not configured. Add VITE_OPENROUTER_API_KEY to .env` |
| OpenRouter API down | `Portfolio Copilot is temporarily offline. Try again in a moment.` |
| GitHub API rate limited | `Repository data unavailable right now. Showing cached data.` |
| Unknown command | `Command not found. Type 'help' to see available commands.` |
| Empty ask query | `Usage: ask [your question]. Example: ask How does OrbitAir work?` |

---

## 12. Phase Roadmap for AI System

| Phase | AI Capability |
|---|---|
| Phase 1 (Current) | portfolioData.js + GitHub metadata + OpenRouter (NVIDIA) |
| Phase 2 | README ingestion + deeper repo-aware answers |
| Phase 3 | Full RAG — ChromaDB + nomic-embed-text + code-aware chunking |
| Phase 4 | Multi-turn memory + streaming responses + confidence scoring |

---

## 13. What Antigravity Must Never Do

```
- Never treat Portfolio Copilot as a simple FAQ bot
- Never answer portfolio questions from general knowledge
- Never answer repository questions without fetching GitHub context
- Never expose raw API errors to the user
- Never break the terminal aesthetic with markdown or HTML
- Never call it a chatbot in any UI label or comment
- Never hardcode the OpenRouter API key
- Never re-fetch GitHub data on every command (cache it)
- Never lose terminal history on minimize/restore
```

---

## 14. Summary

```
Portfolio Copilot = General Knowledge + Portfolio Data + Repository Intelligence

It lives in a terminal.
It speaks for Vaibhav.
It knows his code.
It explains his decisions.
It represents his engineering work intelligently.

Every answer must feel like Vaibhav himself explaining —
not a bot, not a search engine, not a README parser.

An intelligent engineering representative.
```

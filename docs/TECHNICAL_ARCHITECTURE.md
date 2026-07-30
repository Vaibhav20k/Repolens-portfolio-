# TECHNICAL ARCHITECTURE
## RepoLens AI Portfolio

---

## 1. Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18+ | UI framework |
| Vite | 5+ | Build tool |
| Framer Motion | 11+ | Animations, transitions, gestures |
| GSAP | 3+ | Scroll-triggered animations, complex sequences |
| Lenis | Latest | Smooth scroll |
| React Three Fiber | 8+ | 3D side elements |
| Three.js | Latest | 3D rendering |

### AI & Data
| Technology | Purpose |
|---|---|
| OpenRouter API | LLM provider (NVIDIA model) |
| GitHub REST API | Live repository data |
| portfolioData.js | Structured portfolio knowledge base |

### Styling
| Technology | Purpose |
|---|---|
| CSS Variables | Design tokens, theming |
| CSS Modules | Component-scoped styles |
| Google Fonts | Space Grotesk, Roboto Flex, JetBrains Mono, Inter |

---

## 2. Folder Structure

```
repolens-portfolio/
├── public/
│   └── assets/
│       ├── mascot/
│       └── 3d/
├── src/
│   ├── components/
│   │   ├── cursor/
│   │   │   └── CustomCursor.jsx
│   │   ├── loader/
│   │   │   └── LoadingScreen.jsx
│   │   ├── mascot/
│   │   │   └── Mascot.jsx
│   │   ├── nav/
│   │   │   └── Navigation.jsx
│   │   ├── hero/
│   │   │   └── Hero.jsx
│   │   ├── about/
│   │   │   └── About.jsx
│   │   ├── work/
│   │   │   ├── Work.jsx
│   │   │   ├── StackCards.jsx
│   │   │   ├── ProjectInfo.jsx
│   │   │   ├── VariableProximity.jsx
│   │   │   ├── VariableProximity.css
│   │   │   ├── TextType.jsx
│   │   │   └── TextType.css
│   │   ├── terminal/
│   │   │   ├── Terminal.jsx
│   │   │   ├── TerminalWindow.jsx
│   │   │   └── TerminalMinimized.jsx
│   │   ├── contact/
│   │   │   └── Contact.jsx
│   │   ├── achievements/
│   │   │   └── AchievementStrip.jsx
│   │   └── three/
│   │       ├── CoffeeCup.jsx
│   │       └── MouseDevice.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── hooks/
│   │   ├── useLenis.js
│   │   ├── useMousePosition.js
│   │   └── useTerminalState.js
│   ├── services/
│   │   ├── openrouter.js
│   │   ├── github.js
│   │   └── intentClassifier.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── fonts.css
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   ├── BRAND_GUIDELINES.md
│   ├── PRODUCT_REQUIREMENTS.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── PORTFOLIO_CONTENT.md
│   ├── FUTURE_ROADMAP.md
│   └── DEVELOPMENT_RULES.md
├── .env
├── .env.example
├── .gitignore
├── vite.config.js
├── package.json
└── README.md
```

---

## 3. Portfolio Copilot Architecture

### Knowledge Domains

```
User Question
     ↓
Intent Classifier (prompt-based via OpenRouter)
     ↓
┌──────────────┬──────────────┬──────────────┐
│              │              │              │
▼              ▼              ▼
General      Portfolio     Repository
Knowledge    Knowledge     Knowledge
│              │              │
▼              ▼              ▼
Direct LLM   portfolioData  GitHub API
call         .js injected   README +
             as context     metadata
                            injected
     ↓              ↓              ↓
          Combined context → OpenRouter
                    ↓
              AI Response
                    ↓
          Source Attribution
                    ↓
          Terminal Display
```

### Intent Classification Prompt
```
You are an intent classifier. Given a user question, classify it as one of:
- GENERAL: General software engineering or tech concepts
- PORTFOLIO: Questions about Vaibhav, his projects, skills, experience
- REPOSITORY: Questions about specific repository code, architecture, implementation

Respond with only the label. No explanation.

Question: {user_question}
```

---

## 4. Services Layer

### openrouter.js
```javascript
// Handles all OpenRouter API calls
// Model: nvidia/llama-3.1-nemotron-ultra-253b-v1 (or current free NVIDIA model)
// Abstraction layer — model can be swapped without changing UI
const OPENROUTER_BASE = 'https://openrouter.ai/api/v1'
const MODEL = 'nvidia/llama-3.1-nemotron-ultra-253b-v1'
```

### github.js
```javascript
// Fetches live data from GitHub API
// Username: Vaibhav20k
// Pulls: repo names, descriptions, languages, README content
// No auth required for public repos
const GITHUB_API = 'https://api.github.com'
const USERNAME = import.meta.env.VITE_GITHUB_USERNAME
```

### intentClassifier.js
```javascript
// Classifies user intent: GENERAL | PORTFOLIO | REPOSITORY
// Routes to appropriate context builder
// Injects context into final prompt before OpenRouter call
```

---

## 5. Environment Variables

```env
# .env
VITE_OPENROUTER_API_KEY=paste_your_key_here
VITE_RESUME_URL=https://drive.google.com/file/d/1JP-Qpp0s8bmijIvsviwjuTcEvivSC6ws/view?usp=sharing
VITE_GITHUB_USERNAME=Vaibhav20k
```

---

## 6. Phase Implementation Map

| Phase | Components Built |
|---|---|
| 1 | Project setup, theme, fonts, folder structure, .env |
| 2 | CustomCursor, LoadingScreen |
| 3 | Mascot, Hero, Navigation, AchievementStrip, Three.js elements |
| 4 | About |
| 5 | Work, StackCards, ProjectInfo, VariableProximity, TextType |
| 6 | Terminal, TerminalWindow, TerminalMinimized, openrouter.js, github.js, intentClassifier.js |
| 7 | Contact, final polish, performance tuning |

---

## 7. Animation Libraries Usage

| Library | Used For |
|---|---|
| Framer Motion | Page transitions, card drag, terminal open/close/minimize, mascot float |
| GSAP | Scroll-triggered text highlights, loading sequence, hero reveal |
| Lenis | Smooth scroll wrapper around entire app |
| React Spring | (Optional) Physics-based mascot idle animations |

---

## 8. Terminal Window Behavior

- Implemented as a draggable, resizable floating div
- State managed via `useTerminalState` hook
- Drag: Framer Motion drag constraints
- Resize: Custom resize handles on all sides
- Minimize: Animates to fixed position right side
- State preserved on minimize (history, scroll position)
- Close: Unmounts with exit animation
- Reopen from minimized: Animates back from minimized position

---

## 9. GitHub Integration (Phase 1)

```javascript
// Data fetched on terminal first open
// Cached in state to avoid repeated API calls
// Data used:
// - repo.name
// - repo.description
// - repo.language
// - repo.html_url
// - repo.topics
// - README content (separate API call per repo)
```

---

## 10. Build & Deploy

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

**Recommended Deploy:** Vercel (zero config with Vite + React)
- Add env variables in Vercel dashboard
- Auto-deploy on push to main

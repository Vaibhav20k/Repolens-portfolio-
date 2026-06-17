# PROJECT_CONTEXT.md
## RepoLens AI Portfolio — Vaibhav
### Primary Entry Point — Read This Before Everything Else

---

## Overview

This repository contains the source code for a premium AI-powered developer portfolio.

The project combines:

* Immersive interactive design (inspired by reference site aesthetic)
* Premium motion design and cinematic transitions
* Portfolio Copilot — an AI assistant with 3-domain intelligence
* Live GitHub repository integration
* Future RepoLens AI — full RAG-powered repository intelligence
* CI/CD automation for continuous knowledge sync

The goal is not to create a traditional portfolio.
The goal is not to create a generic chatbot.

The goal is to create an intelligent engineering portfolio that allows visitors
to explore projects, technical skills, engineering decisions, and repository
knowledge through both visual storytelling and conversational AI interaction.

---

## Source of Truth

Before making any design, product, architecture, or implementation decision,
read all project documentation inside the `/docs` directory.

The following files define this project completely:

| Priority | File | Purpose |
|---|---|---|
| 1 | `docs/BRAND_GUIDELINES.md` | Colors, typography, cursor, mascot, motion rules |
| 2 | `docs/PRODUCT_REQUIREMENTS.md` | Every feature, every section, every behavior |
| 3 | `docs/TECHNICAL_ARCHITECTURE.md` | Folder structure, stack, services, phase map |
| 4 | `docs/AI_COPILOT_SPEC.md` | Portfolio Copilot — full AI specification |
| 5 | `docs/PORTFOLIO_CONTENT.md` | All content, placeholders, data structure |
| 6 | `docs/DEVELOPMENT_RULES.md` | Code rules, git rules, animation rules |
| 7 | `docs/FUTURE_ROADMAP.md` | V1–V4 roadmap, RAG pipeline, CI/CD plans |

Treat these documents as authoritative.
Do not make assumptions that contradict documented requirements.
If conflicts exist between documents, request clarification before implementation.

---

## Decision Hierarchy

When making any decision, follow this order strictly:

```
1. PROJECT_CONTEXT.md         ← you are here
2. BRAND_GUIDELINES.md        ← design decisions
3. PRODUCT_REQUIREMENTS.md    ← feature decisions
4. TECHNICAL_ARCHITECTURE.md  ← code decisions
5. AI_COPILOT_SPEC.md         ← AI decisions
6. DEVELOPMENT_RULES.md       ← implementation decisions
7. FUTURE_ROADMAP.md          ← roadmap decisions
```

If uncertainty remains after reading relevant docs — ask. Never assume.

---

## Project Vision

The website should feel like a premium immersive experience, not a resume.

The portfolio should communicate:

* Engineering depth
* Product thinking
* Software craftsmanship
* AI engineering capability
* Attention to detail

Visitors should leave understanding not only **what** was built,
but **how** it was built and **why** it matters.

---

## Owner

```
Name:       Vaibhav
Degree:     B.Tech Computer Science (2024–2028)
Institute:  Dr. Akhilesh Das Gupta Institute of Professional Studies, Delhi
GitHub:     https://github.com/Vaibhav20k
Focus:      AI Engineering + Full Stack Development + Data Science
```

---

## Design Reference

The visual design is directly inspired by a reference portfolio site
shared during the planning phase. Key elements carried over:

* Dark atmospheric theme (`#0a0a0a` background)
* Orange accent color (`#E8472A`)
* Floating cat mascot — top left, idle animations always running
* Full-screen loading screen with circular progress to 100%
* START button after loading completes
* Vertical nav — top right (ABOUT / WORK / RESUME / CONTACT)
* Oversized bold typography across all sections
* Custom orange orb cursor — expands on text hover
* 3D side elements (coffee cup + mouse device at screen edges)
* Social icons — left side vertical, translucent when 3D elements pass behind
* Smooth scroll via Lenis
* Scroll-triggered text highlight animations
* Same interaction-driven storytelling approach as reference

**Critical:** The reference design is for a designer's portfolio.
This implementation injects engineering DNA into every section
so the aesthetic serves Vaibhav's technical story.

---

## What Makes This Different

```
Traditional portfolio:    Static pages showing project screenshots.
This portfolio:           An immersive experience where visitors can
                          interact with the actual engineering work
                          through Portfolio Copilot.

Traditional chatbot:      A bot that answers FAQs.
Portfolio Copilot:        An intelligent AI that understands general
                          tech concepts, knows Vaibhav's full background,
                          AND can explain his actual GitHub repositories.

Traditional terminal:     A gimmick.
This terminal:            A floating, resizable OS-like window with
                          black background, green text, real commands,
                          and a live AI brain behind it.
```

---

## Core Features

### 1. Loading Experience
Full-screen dark loader. Circular progress to 100%.
System boot messages. Mascot visible from frame one.
START button appears after completion.

### 2. Mascot
Cat creature. Present throughout entire site.
Idle float, random head turns, eye movement.
Click → returns to loading/start page.

### 3. Custom Cursor
Orange orb. Smooth lag follow. Expands on text hover.

### 4. Hero Section
Cinematic name reveal. Engineering-focused tagline.
Achievement strip (NASA Top 5, SIH).
Blinking `>_` terminal hint — opens terminal directly.

### 5. About Section
About Me / What I Do / Experience / History.
Oversized bold typography. Scroll-triggered text highlights.
Same design language as reference site.

### 6. Work Section
Stack cards (right) — draggable deck.
Card hover → pixel/glitch transition → text reveal.
Tech stack badges on each card.
Project info (left) — VariableProximity heading + TextType description.
"Ask RepoLens AI about my work" button.

### 7. Portfolio Copilot Terminal
Floating resizable OS-like window.
Black bg + green text + JetBrains Mono.
Draggable, resizable from all sides.
Minimize → right side button → restore.
3-domain AI: General + Portfolio + Repository.
Powered by OpenRouter (NVIDIA model).
Live GitHub data from Vaibhav20k.

### 8. Contact Section
CONNECT layout. Two column social links.
Email + phone. Same as reference screenshot.

---

## Tech Stack Summary

```
Frontend:     React 18 + Vite
Animation:    Framer Motion + GSAP
Scroll:       Lenis
3D:           React Three Fiber + Three.js
AI:           OpenRouter API (NVIDIA model)
Data:         GitHub REST API + portfolioData.js
Fonts:        Space Grotesk, Roboto Flex, JetBrains Mono, Inter
Deploy:       Vercel
```

---

## Environment Variables

```env
VITE_OPENROUTER_API_KEY=paste_your_key_here
VITE_RESUME_URL=paste_your_resume_pdf_link_here
VITE_GITHUB_USERNAME=Vaibhav20k
```

---

## Phase Map

| Phase | What Gets Built |
|---|---|
| 1 | Foundation — React setup, theme, fonts, folder structure, .env |
| 2 | Cursor + Loading Screen |
| 3 | Mascot + Hero + Nav + Achievement Strip + 3D Elements |
| 4 | About Section |
| 5 | Work Section + Stack Cards + VariableProximity + TextType |
| 6 | Terminal + Portfolio Copilot + OpenRouter + GitHub API |
| 7 | Contact + Final Polish + Performance |

---

## Portfolio Copilot — One Paragraph Summary

```
Portfolio Copilot is NOT a chatbot.
It is an intelligent AI representative of Vaibhav's engineering work.
It answers general tech questions from its own knowledge.
It answers portfolio questions from portfolioData.js.
It answers repository questions from live GitHub API data.
It classifies intent before every response.
It lives inside a terminal. It speaks for Vaibhav.
Full spec: docs/AI_COPILOT_SPEC.md
```

---

## Working Process

Before implementing any feature:

```
1. Read relevant documentation from /docs
2. Summarize your understanding
3. Identify affected systems
4. Explain architectural impact
5. Implement
6. Verify consistency with project requirements
```

For any major change:
* Present a plan first
* Then execute
* Never implement first and ask later

---

## Achievements to Highlight

These must be visible and prominent in the portfolio:

```
1. NASA Space Apps Challenge — Top 5 finish (among hundreds of teams globally)
2. Smart India Hackathon — Participant
3. IIT Roorkee Data Science & AI Programme — In Progress
4. Deloitte Australia Data Analytics Simulation — Completed
```

---

## Content Status

All content placeholders live in `docs/PORTFOLIO_CONTENT.md`.
All `[PLACEHOLDER]` items must be filled before Phase 7 goes live.
The single source of truth for AI answers is `src/data/portfolioData.js`.

---

## Success Criteria

The final portfolio successfully demonstrates:

* Software Engineering
* System Design
* AI Engineering
* Full Stack Development
* Product Thinking
* Developer Experience
* CI/CD Practices (future)

The website feels like a premium engineering product.
Not a static portfolio. Not a chatbot. Not a template.

An intelligent, immersive, technically impressive
representation of Vaibhav's engineering work.

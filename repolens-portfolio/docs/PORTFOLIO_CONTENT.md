# PORTFOLIO CONTENT
## RepoLens AI Portfolio — Vaibhav

> ⚠️ STATUS: This file contains placeholder content.
> Owner must fill in all sections marked with [PLACEHOLDER] before Phase 6 goes live.
> This file is the single source of truth for portfolioData.js

---

## 1. Personal Info

```
Name: Vaibhav
Title: B.Tech Computer Science Undergraduate
Institute: Dr. Akhilesh Das Gupta Institute of Professional Studies, Delhi
Batch: 2024–2028
GitHub: https://github.com/Vaibhav20k
LinkedIn: [PLACEHOLDER — add your LinkedIn URL]
Email: [PLACEHOLDER — add your email]
Phone: [PLACEHOLDER — add your phone number]
Instagram: [PLACEHOLDER — add if desired]
```

---

## 2. Hero Tagline

```
"Building intelligent systems at the intersection of AI & Full Stack"
```

> Alternative options (pick one or suggest your own):
> - "Engineering AI-powered systems, one repo at a time."
> - "Full Stack developer with a deep interest in AI and data intelligence."
> - "I build things that think."

---

## 3. About Me

**Section Label:** ABOUT ME

**Main Text (oversized bold — same style as reference):**
```
[PLACEHOLDER]
Example structure:
"A [adjective] engineer
building [what you build]
with a strong focus on
[your focus area]."
```

**Supporting paragraph (body text):**
```
[PLACEHOLDER]
Example:
"I'm a first-year CS undergrad at ADGIPS, Delhi, passionate about
building AI-powered systems and full stack applications. I competed
at NASA Space Apps Challenge reaching Top 5 among hundreds of teams,
and participated in Smart India Hackathon."
```

---

## 4. What I Do

**Section Label:** WHAT I DO

**Oversized rotating words (stacked, same as reference):**
```
[PLACEHOLDER — suggest your disciplines]
Examples:
AI ENGINEERING
FULL STACK
DATA SCIENCE
RAG SYSTEMS
API DESIGN
```

---

## 5. Experience

**Section Label:** EXPERIENCE

```
[PLACEHOLDER]
List any internships, part-time work, freelance, or notable roles.
If none yet, list significant academic/project leadership roles.

Format:
- Role | Organization | Duration
- Role | Organization | Duration
```

**Note:** If no formal experience yet, this section becomes "What I've Done" covering
competitions, hackathons, and significant projects.

---

## 6. History / Timeline

**Section Label:** HISTORY

```
[PLACEHOLDER]
Key milestones in chronological order.

Example:
2024 — Joined ADGIPS, Delhi for B.Tech CS
2024 — Participated in Smart India Hackathon
2025 — NASA Space Apps Challenge — Top 5 finish
2025 — Started IIT Roorkee Data Science & AI Programme
2025 — Built OrbitAir and ORBIT-OPS
2025 — Started RepoLens AI Portfolio project
```

---

## 7. Projects

### Project 1: OrbitAir

```
Name: OrbitAir
Type: Group Project (personal ownership: data scraping, backend, frontend, database)
Description: [PLACEHOLDER — describe what OrbitAir does]
Tech Stack: [PLACEHOLDER — list technologies used]
GitHub: [PLACEHOLDER — add repo URL]
Live URL: [PLACEHOLDER — if deployed]
Highlights: [PLACEHOLDER — key features or achievements]
```

### Project 2: ORBIT-OPS

```
Name: ORBIT-OPS
Type: Group Project (personal ownership: data scraping, backend, frontend, database)
Description: [PLACEHOLDER — describe what ORBIT-OPS does]
Tech Stack: [PLACEHOLDER — list technologies used]
GitHub: [PLACEHOLDER — add repo URL]
Live URL: [PLACEHOLDER — if deployed]
Highlights: [PLACEHOLDER — key features or achievements]
```

### Project 3: RepoLens AI

```
Name: RepoLens AI Portfolio
Type: Solo Project
Description: AI-powered developer portfolio with Portfolio Copilot — a conversational
             intelligence layer built over GitHub repositories using RAG architecture.
Tech Stack: React, Framer Motion, GSAP, OpenRouter API, GitHub API, ChromaDB (Phase 3)
GitHub: https://github.com/Vaibhav20k
Status: In development
Highlights:
  - Portfolio Copilot with 3-domain intent classification
  - Live GitHub repository integration
  - RAG pipeline planned for Phase 3
  - Premium immersive design experience
```

> Add more projects as needed using the same format above.

---

## 8. Skills

### Languages
```
[PLACEHOLDER]
Example: Python, JavaScript, TypeScript, SQL, HTML, CSS
```

### Frameworks & Libraries
```
[PLACEHOLDER]
Example: React, FastAPI, Node.js, Express, Framer Motion
```

### AI / ML
```
[PLACEHOLDER]
Example: LangChain, ChromaDB, Ollama, OpenRouter, RAG, Embeddings, Llama 3
```

### Data
```
[PLACEHOLDER]
Example: Pandas, NumPy, Matplotlib, Scikit-learn, Jupyter
```

### DevOps & Tools
```
[PLACEHOLDER]
Example: Git, GitHub Actions, Docker, Vercel, VS Code
```

### Databases
```
[PLACEHOLDER]
Example: PostgreSQL, SQLite, ChromaDB, MongoDB
```

---

## 9. Achievements

```
1. NASA Space Apps Challenge 2024/2025 — Top 5 finish (among hundreds of teams)
2. Smart India Hackathon — Participant
3. IIT Roorkee Data Science & AI Programme — In Progress
4. Deloitte Australia Data Analytics Simulation via Forage — Completed
```

---

## 10. Contact Information

```
Email: [PLACEHOLDER]
Phone: [PLACEHOLDER]
LinkedIn: [PLACEHOLDER]
GitHub: https://github.com/Vaibhav20k
Instagram: [PLACEHOLDER]
Location: Delhi, India
```

---

## 11. Social Links (for left side icons + contact section)

```
GitHub: https://github.com/Vaibhav20k
LinkedIn: [PLACEHOLDER]
Instagram: [PLACEHOLDER]
[Add or remove as needed]
```

---

## 12. Resume

```
Resume PDF URL: [PLACEHOLDER — paste your hosted PDF URL in .env as VITE_RESUME_URL]
```

> Recommended hosting: Google Drive (set to "Anyone with link can view")
> or upload directly to your GitHub repo and use the raw URL.

---

## 13. Terminal — portfolioData.js Structure

When you fill in the placeholders above, the data flows into `src/data/portfolioData.js`
which is injected as context into Portfolio Copilot for Domain 2 answers.

```javascript
// src/data/portfolioData.js — structure reference
export const portfolioData = {
  name: "Vaibhav",
  title: "B.Tech CS Undergraduate | AI Engineer | Full Stack Developer",
  institute: "ADGIPS, Delhi (2024–2028)",
  tagline: "Building intelligent systems at the intersection of AI & Full Stack",
  about: "...",
  skills: { languages: [], frameworks: [], ai: [], data: [], devops: [], databases: [] },
  projects: [ { name, description, tech, github, live, highlights } ],
  experience: [ { role, org, duration, description } ],
  achievements: [],
  contact: { email, phone, linkedin, github, instagram }
}
```

# FUTURE ROADMAP
## RepoLens AI Portfolio

---

## Current Phase Map

| Phase | Title | Status |
|---|---|---|
| 1 | Foundation + Setup | Pending |
| 2 | Cursor + Loading Screen | Pending |
| 3 | Mascot + Hero + Nav | Pending |
| 4 | About Section | Pending |
| 5 | Work Section | Pending |
| 6 | Terminal + Portfolio Copilot | Pending |
| 7 | Contact + Final Polish | Pending |

---

## Post-Launch Roadmap

---

### V1.1 — Repository Intelligence Upgrade

**Goal:** Move from GitHub metadata to README-level understanding

- [ ] Fetch and parse full README content per repository
- [ ] Inject README context into Portfolio Copilot Domain 3 answers
- [ ] Repository summary cards in terminal
- [ ] `readme [repo-name]` command in terminal
- [ ] Improved source attribution (file-level)

---

### V1.2 — CI/CD Automation

**Goal:** Portfolio auto-syncs with GitHub activity

- [ ] GitHub Actions workflow setup
- [ ] Trigger: push to any tracked repo
- [ ] Pipeline:
  - Run tests
  - Build portfolio
  - Deploy portfolio
  - Analyze repository changes
  - Detect modified files
  - Regenerate embeddings (Phase 3)
  - Update ChromaDB (Phase 3)
  - Publish updated knowledge base
- [ ] Portfolio Copilot always reflects latest engineering work

---

### V2.0 — Full RepoLens AI Integration

**Goal:** Full code-aware retrieval over actual source code

- [ ] Repository ingestion pipeline
- [ ] Code-aware chunking:
  - Function-level chunks
  - Class-level chunks
  - Module-level chunks
  - Documentation chunks
- [ ] Embedding generation (nomic-embed-text or all-MiniLM-L6-v2)
- [ ] ChromaDB vector store setup
- [ ] Semantic retrieval on user queries
- [ ] Source attribution: repo → file → function
- [ ] `ask` command now powered by full RAG pipeline
- [ ] Switch from OpenRouter to local Ollama + Llama 3 (optional)

**Architecture:**
```
Repository
↓
Code-Aware Chunking
↓
nomic-embed-text Embeddings
↓
ChromaDB
↓
Semantic Retrieval
↓
Prompt Construction
↓
Llama 3 via Ollama (or OpenRouter)
↓
Answer + Source Attribution
```

---

### V2.1 — Evaluation Layer

**Goal:** Make the AI system measurable

- [ ] Track retrieval accuracy
- [ ] Track source attribution accuracy
- [ ] Query latency measurement
- [ ] Chunk count per query logging
- [ ] Embedding generation time tracking
- [ ] Indexing duration metrics
- [ ] Dashboard (internal only) showing AI performance

---

### V2.2 — Advanced Search

**Goal:** Better retrieval quality

- [ ] Hybrid Search: Vector + BM25
- [ ] Reranking model integration
- [ ] Confidence scoring on answers
- [ ] "I don't know" detection (graceful fallback)

---

### V3.0 — Multi-Source Intelligence

**Goal:** Index more than just source code

- [ ] GitHub Issues indexing
- [ ] Pull Request indexing
- [ ] Commit history indexing
- [ ] Multi-repository comparison queries
- [ ] `compare [repo1] [repo2]` terminal command

---

### V3.1 — Terminal Experience Upgrades

**Goal:** Make terminal feel like a real engineering tool

- [ ] Streaming responses (token by token output)
- [ ] Syntax highlighted code snippets in terminal
- [ ] Architecture visualization inside terminal
- [ ] Repository relationship graph (ASCII or canvas)
- [ ] Multi-turn memory (conversation context maintained)
- [ ] `history` command
- [ ] Tab autocomplete for commands

---

### V3.2 — AI Documentation Generator

**Goal:** Auto-generate docs from repositories

- [ ] `generate-docs [repo-name]` terminal command
- [ ] AI reads repo → produces structured documentation
- [ ] Output: README draft, API docs, architecture overview

---

### V4.0 — Private Repository Support

**Goal:** Extend intelligence to private repos

- [ ] GitHub OAuth integration
- [ ] Personal access token support
- [ ] Private repo ingestion pipeline
- [ ] Secure credential handling

---

### V4.1 — Design Evolution

**Goal:** Upgrade visual layer

- [ ] Video background option for hero (currently solid)
- [ ] Mobile responsive layout
- [ ] Dark/light mode toggle (keep dark as default)
- [ ] More 3D elements per section
- [ ] Sound design integration (ambient, interaction sounds)
- [ ] WebGL shader backgrounds

---

### V4.2 — Analytics & Insights

**Goal:** Understand how visitors use the portfolio

- [ ] Track most asked terminal questions
- [ ] Track most viewed projects
- [ ] Track time spent per section
- [ ] Anonymous analytics only (no PII)
- [ ] Use data to improve portfolioData.js

---

## Tech Debt / Known Future Work

| Item | Priority | Phase |
|---|---|---|
| Mobile responsiveness | High | V1.1 |
| Terminal keyboard navigation | Medium | V1.1 |
| Loading screen skip option | Low | V1.1 |
| Accessibility (ARIA labels) | Medium | V1.2 |
| Error boundaries on AI failures | High | V1.1 |
| Rate limiting on OpenRouter calls | High | V1.1 |
| Offline fallback for Portfolio Copilot | Low | V2.0 |

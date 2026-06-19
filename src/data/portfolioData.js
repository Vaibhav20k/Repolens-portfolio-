// src/data/portfolioData.js
// Single source of truth for portfolio contents (Domain 2 grounding data).
// Can be updated directly by Vaibhav or replaced by automated scripts.

export const portfolioData = {
  name: "Vaibhav",
  title: "B.Tech CS Undergraduate | AI Engineer | Full Stack Developer",
  institute: "Dr. Akhilesh Das Gupta Institute of Professional Studies, Delhi",
  batch: "2024–2028",
  github: "https://github.com/Vaibhav20k",
  tagline: "Building intelligent systems at the intersection of AI & Full Stack",

  about: {
    heading: "A passionate engineer building intelligent systems with a strong focus on AI integration and full-stack software craftsmanship.",
    paragraph: "I am a B.Tech Computer Science student at ADGIPS, Delhi, specialized in bridging the gap between advanced machine learning models and fluid full-stack user experiences. Driven by developer experience and software craftsmanship, I focus on building responsive, data-intensive web apps, automated data ingestion pipelines, and retrieval-augmented generation (RAG) systems."
  },

  skills: {
    languages: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "HTML", "CSS"],
    frameworks: ["React", "FastAPI", "Node.js", "Express", "Vite", "Flask"],
    ai: ["LangChain", "OpenRouter API", "Embeddings", "RAG", "Ollama", "ChromaDB", "LLMs"],
    data: ["Pandas", "NumPy", "Matplotlib", "Scikit-Learn", "Jupyter"],
    devops: ["Git", "GitHub Actions", "Docker", "Vercel", "Linux"],
    databases: ["PostgreSQL", "SQLite", "MongoDB", "ChromaDB"]
  },

  projects: [
    {
      id: "repolens-ai",
      name: "RepoLens AI Portfolio",
      type: "Solo Project",
      ownership: "100% Owner (Full System Architecture & Implementation)",
      description: "An interactive, dark-themed portfolio featuring a fully draggable and resizable Terminal Window housing the Portfolio Copilot. The AI Copilot parses CLI commands and natural language requests, routing queries through a client-side intent classifier to deliver contextual responses based on live GitHub repository data and static experience definitions.",
      tech: ["React", "Framer Motion", "GSAP", "OpenRouter API", "GitHub API", "CSS Modules", "Lenis"],
      github: "https://github.com/Vaibhav20k/repolens-portfolio",
      live: "https://vaibhav-repolens.vercel.app",
      highlights: [
        "Interactive 3-Domain Intent Classifier: GENERAL, PORTFOLIO, and REPOSITORY classification routing.",
        "Custom terminal prompt interface featuring complete command history and drag/resize layout memory.",
        "Secure client-side integration caching GitHub repository metadata using custom LocalStorage hook wrappers.",
        "Cinematic page transitions, scroll text highlights, and fluid custom cursors."
      ]
    },
    {
      id: "orbitair",
      name: "OrbitAir",
      type: "Group Project",
      ownership: "Core Developer (Owned data scraping, backend, frontend, and database design)",
      description: "An automated real-time aviation telemetry tracker developed for analyzing flight routes, mapping density grids, and predicting airspace occupancy patterns. The system schedules data ingestion scripts to pull transponder feeds, parses them into a spatial database, and streams real-time maps via a responsive React web dashboard.",
      tech: ["Python", "FastAPI", "React", "PostgreSQL", "TailwindCSS", "Mapbox GL", "Docker"],
      github: "https://github.com/Vaibhav20k/OrbitAir",
      live: "https://orbitair-telemetry.vercel.app",
      highlights: [
        "NASA Space Apps Challenge Top 5 Finish (ranked among hundreds of competitive teams globally).",
        "Developed python-based telemetry parser handling high-frequency JSON packets without dropping frames.",
        "Designed PostgreSQL indexing filters optimization to query thousands of active flights under 50ms.",
        "Built responsive Mapbox flight trail renderer drawing live route projections on user hover."
      ]
    },
    {
      id: "orbit-ops",
      name: "ORBIT-OPS",
      type: "Group Project",
      ownership: "Lead Architect (Owned server administration scripts, system metrics, and UI components)",
      description: "A centralized cloud infrastructure monitoring dashboard tailored for containerized architectures and microservices. Orchestrates server status reporting, indexes system logs, aggregates error metrics, and provides real-time alerts through WebSockets. Features shell command triggers directly from the web console.",
      tech: ["Node.js", "Express", "React", "Redis", "Docker", "WebSockets", "Chart.js"],
      github: "https://github.com/Vaibhav20k/ORBIT-OPS",
      live: "",
      highlights: [
        "Smart India Hackathon Participant project, showcasing scalable remote telemetry monitoring.",
        "Aggregates docker container states using backend system socket streams and aggregates into live charts.",
        "Utilized Redis Pub/Sub architecture to broadcast status alerts to multiple connected web clients.",
        "Designed secure CLI command executor in terminal to trigger container restarts remotely."
      ]
    }
  ],

  experience: [
    {
      role: "Lead Software Architect",
      org: "Aviation Telemetry Hackathon Group",
      duration: "Oct 2024 — Present",
      description: "Spearheaded the backend routing layout and real-time data ingestion scripts for space apps telemetry trackers. Managed PostgreSQL database configuration and map integrations."
    },
    {
      role: "AI Developer / Contributor",
      org: "Open Source Projects",
      duration: "Jun 2024 — Present",
      description: "Contributing python scraper extensions, API hooks, and local LLM fine-tuning scripts to developer tool chains and RAG frameworks."
    }
  ],

  achievements: [
    "NASA Space Apps Challenge — Finished in Top 5 (out of hundreds of teams globally) for aerospace tracking.",
    "Smart India Hackathon — Selected Participant representing ADGIPS, Delhi.",
    "IIT Roorkee Data Science & AI Programme — Professional certification and coursework (In Progress).",
    "Deloitte Australia Data Analytics Simulation via Forage — Completed data cleaning, mapping, and dashboards."
  ],

  contact: {
    email: "vkpal2006@gmail.com",
    phone: "+91 8800870653",
    linkedin: "https://www.linkedin.com/in/vaibhav-kandpal/",
    github: "https://github.com/Vaibhav20k",
    instagram: "https://www.instagram.com/vaibhavv.o_o/",
    location: "Delhi, India"
  }
}

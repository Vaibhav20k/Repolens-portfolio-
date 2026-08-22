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
  languages: ["Python","SQL","C++","JavaScript","TypeScript"],
  machineLearning: ["Scikit-Learn","XGBoost","TensorFlow","PyTorch","CatBoost","LightGBM","Feature Engineering","Model Evaluation","Hyperparameter Tuning"],
  deepLearning: ["Neural Networks","CNNs","RNNs","LSTMs","Transformers","Transfer Learning","Computer Vision","NLP"],
  ai: ["LLMs","LangChain","RAG","Embeddings","Vector Databases","Prompt Engineering","Agentic AI","OpenRouter API","Ollama","ChromaDB","FAISS"],
  dataScience: ["Pandas","NumPy","SciPy","Matplotlib","Plotly","Seaborn","Jupyter Notebook","Statistical Analysis","Data Visualization","Exploratory Data Analysis"],
  dataEngineering: ["Apache Kafka","ETL Pipelines","Data Preprocessing","Data Cleaning","Feature Pipelines","Redis"],
  backend: ["FastAPI","Flask","Node.js","REST APIs"],
  databases: ["PostgreSQL","MongoDB","SQLite","ChromaDB"],
  devops: ["Docker","Git","GitHub Actions","Linux","Vercel"]
},

  projects: [
    {
      id: "DualSentry",
      name: "DualSentry",
      image: "/DualSentry.png",
      type: "Real-Time Financial Anomaly Detection",
      overview: "An enterprise-grade financial transaction anomaly detection platform leveraging event-driven streaming, behavioral feature pipelines, and low-latency ML inference.",
      description: "DualSentry is a production-oriented financial transaction fraud detection system with leakage-free stateful behavioral features, XGBoost inference, model lifecycle management, and real-time decisioning. The system leverages an event-driven architecture using Kafka, Redis caching, and FastAPI to score transaction streams in sub-milliseconds.",
      problemSolves: "Identifies sophisticated financial fraud and payment anomalies in real-time while minimizing false positives using hybrid rule and ML risk scoring.",
      architecture: "Distributed event-driven pipeline: Kafka message broker -> stateful behavioral feature engine -> XGBoost inference -> Redis cache -> PostgreSQL audit log -> FastAPI REST APIs & Prometheus monitoring.",
      techStack: {
        languages: ["Python", "Go", "SQL"],
        frameworks: ["FastAPI", "Uvicorn"],
        mlAi: ["XGBoost", "Scikit-Learn", "Behavioral Feature Engineering", "Statistical Baselines"],
        databases: ["PostgreSQL", "Redis"],
        tools: ["Apache Kafka", "Docker Compose", "Prometheus", "Grafana", "GitHub Actions"]
      },
      tech: ["Python", "Go", "FastAPI", "XGBoost", "PostgreSQL", "Redis", "Apache Kafka", "Docker"],
      github: "https://github.com/Vaibhav20k/DualSentry-model.git",
      highlights: [
        "Architected distributed event-driven backend using Apache Kafka to decouple transaction ingestion, inference, and alerts.",
        "Engineered stateful behavioral feature pipelines using spending deviation, velocity, device fingerprints, and IP intelligence.",
        "Hybrid ML-based fraud detection with configurable risk thresholds and rule-based validation minimizing false positives.",
        "Normalized PostgreSQL database with optimized indexing and Redis caching for sub-millisecond inference."
      ]
    },
    {
      id: "jarvis",
      name: "JARVIS",
      image: "/Jarvis.png",
      type: "Cross-Platform Multimodal AI Assistant",
      overview: "A cross-platform multimodal AI assistant providing real-time voice interaction, desktop automation, visual understanding, and persistent contextual memory.",
      description: "JARVIS is an intelligent desktop assistant integrating large language models, speech recognition, computer vision, web intelligence, and system telemetry across Windows, macOS, and Linux to execute natural language workflows and monitor hardware vitals through an adaptive HUD interface.",
      problemSolves: "Consolidates desktop automation, multi-step system workflows, research retrieval, and hardware telemetry into a unified voice-driven AI interface.",
      architecture: "Asynchronous Python engine orchestrating Gemini API multimodal reasoning, SpeechRecognition voice pipelines, OpenCV visual processing, PyAutoGUI automation, and SQLite contextual memory.",
      techStack: {
        languages: ["Python", "SQL"],
        frameworks: ["AsyncIO", "Playwright"],
        mlAi: ["Gemini API", "Computer Vision (OpenCV)", "SpeechRecognition", "Multimodal Perception"],
        databases: ["SQLite (Context Memory)"],
        tools: ["PyAutoGUI", "psutil (Telemetry)", "Docker"]
      },
      tech: ["Python", "Gemini API", "OpenCV", "SpeechRecognition", "Playwright", "SQLite", "AsyncIO"],
      github: "https://github.com/Vaibhav20k/Personalized-Jarvis-",
      highlights: [
        "Low-latency multimodal AI pipeline combining voice recognition, LLM reasoning, visual processing, and desktop automation.",
        "Cross-platform system control launching applications, executing shell commands, and controlling browsers via natural language.",
        "Persistent contextual memory retaining user preferences, projects, and conversation history across sessions.",
        "Real-time hardware telemetry engine tracking CPU, GPU, memory, and thermals with proactive voice alerts."
      ]
    },
    {
      id: "orbitair",
      name: "OrbitAir",
      image: "/Orbitair.png",
      type: "Aviation Telemetry & Spatial Intelligence",
      overview: "An automated real-time aviation telemetry tracker analyzing flight routes, mapping density grids, and predicting airspace occupancy patterns.",
      description: "OrbitAir is an automated spatial telemetry platform developed for analyzing flight routes and density grids. The system schedules data ingestion scripts to pull transponder feeds, parses high-frequency JSON packets into an optimized PostgreSQL spatial database, and streams live route projections to a responsive React Mapbox dashboard.",
      problemSolves: "Parses and visualizes dense transponder flight feeds in real time, delivering high-performance spatial queries under 50ms.",
      architecture: "Python telemetry ingestion pipeline -> normalized spatial PostgreSQL store -> FastAPI REST services -> Mapbox GL vector map renderer.",
      techStack: {
        languages: ["Python", "TypeScript", "JavaScript", "SQL"],
        frameworks: ["FastAPI", "React", "Tailwind CSS"],
        mlAi: ["Spatial Route Prediction", "Density Grid Modeling"],
        databases: ["PostgreSQL (Spatial Indexing)"],
        tools: ["Mapbox GL", "Docker", "Vercel"]
      },
      tech: ["Python", "FastAPI", "React", "PostgreSQL", "Mapbox GL", "Tailwind CSS", "Docker"],
      github: "https://github.com/Vaibhav20k/OrbitAir",
      live: "https://orbitair-telemetry.vercel.app",
      highlights: [
        "NASA Space Apps Challenge Top 5 Finish (ranked among hundreds of competitive teams globally).",
        "Python telemetry parser handling high-frequency JSON packets without dropping frames.",
        "Optimized PostgreSQL spatial indexing filters to query thousands of active flights under 50ms.",
        "Interactive Mapbox flight trail renderer computing live route projections on user interaction."
      ]
    },
    {
      id: "leomeo",
      name: "Leo-Meo",
      image: "/leomeo.png",
      type: "AI & Satellite Data Intelligence",
      overview: "An automated satellite data scraping, processing, and RAG intelligence platform designed to ingest earth observation datasets and extract context-aware insights.",
      description: "Leo-Meo automates the ingestion, normalization, and machine-learning analysis of large-scale satellite telemetry feeds (e.g., NASA data). It bridges raw geospatial data streams with context-aware Retrieval-Augmented Generation (RAG), allowing researchers to query spatial patterns and environmental observations in natural language.",
      problemSolves: "Eliminates manual satellite data scraping and fragmented processing pipelines through an end-to-end automated async ingestion and vector search architecture.",
      architecture: "Automated Selenium & BeautifulSoup scrapers feed an asynchronous FastAPI processing pipeline that extracts spatial features, generates vector embeddings, and serves RAG context lookups.",
      techStack: {
        languages: ["Python", "SQL"],
        frameworks: ["FastAPI", "Uvicorn"],
        mlAi: ["Scikit-Learn", "RAG Pipeline", "Pandas", "NumPy", "Vector Embeddings"],
        databases: ["SQLite", "Vector Store"],
        tools: ["Selenium", "BeautifulSoup4", "Requests", "Docker"]
      },
      tech: ["Python", "FastAPI", "RAG", "Scikit-Learn", "Selenium", "Pandas", "SQLite"],
      github: "https://github.com/Vaibhav20k/Leo-Meo",
      highlights: [
        "Automated scraping and pipeline ingestion of NASA and public satellite observation datasets.",
        "Built context-aware RAG pipeline for natural-language querying over processed spatial observations.",
        "High-performance FastAPI asynchronous backend with lightweight database persistence.",
        "Integrated ML-based spatial data transformation and numerical computing with Pandas & NumPy."
      ]
    },
    {
      id: "communityos",
      name: "CommunityOS",
      image: "/Communeos.png",
      type: "Adaptive Multi-Agent Community Platform",
      overview: "An AI-powered community operations platform deploying specialized agent swarms to personalize member onboarding, match mentors, and deliver real-time operational intelligence.",
      description: "CommunityOS transforms static community servers into adaptive, intelligent environments. By observing member interactions, code queries, and engagement signals, specialized AI agents dynamically tailor welcome roadmaps, match mentors using semantic embeddings, and alert community leaders to churn risks.",
      problemSolves: "Solves low member retention and generic onboarding in developer communities through automated, hyper-personalized AI workflows.",
      architecture: "Next.js 15 App Router frontend paired with a modular FastAPI backend orchestrating multi-agent LLM workflows and vector search matching.",
      techStack: {
        languages: ["Python", "TypeScript", "JavaScript"],
        frameworks: ["Next.js 15", "React", "FastAPI", "Tailwind CSS"],
        mlAi: ["Multi-Agent Swarms", "OpenAI API", "OpenRouter", "LangChain", "Vector Embeddings"],
        databases: ["SQLite", "PostgreSQL", "ChromaDB"],
        tools: ["Docker", "Node.js", "Uvicorn", "Vercel"]
      },
      tech: ["Next.js 15", "FastAPI", "Multi-Agent AI", "Python", "TypeScript", "Tailwind CSS", "LangChain"],
      github: "https://github.com/Vaibhav20k/CommuneOS",
      highlights: [
        "PAYTM AGENT{A}THON WINNER — Grabbed 1st place in Paytm office for autonomous community operations.",
        "Engineered multi-agent orchestration for dynamic welcome roadmaps and mentor-mentee pairing.",
        "Real-time operational dashboard with member engagement radar charts and churn risk telemetry.",
        "Context-aware resource discovery using semantic vector embeddings."
      ]
    },
    {
      id: "behaviour-iq",
      name: "BehaviourIQ",
      image: "/BehaviouralIQ.png",
      type: "Local-First Graph AI Behavioral Intelligence",
      overview: "A local-first behavioral intelligence platform that constructs temporal behavior graphs from system audit logs and uses Graph Neural Networks and AI agents for explainable anomaly detection.",
      description: "BehaviourIQ is a local-first security platform that transforms Linux auth logs, macOS syslogs, Docker event streams, and CloudTrail into universal Entity-Event-Context-Time temporal behavior graphs. It runs Graph Neural Networks (PyTorch Geometric) and local LangGraph investigation agents to identify multi-hop lateral movement and behavioral drift without leaking sensitive logs to cloud vendors.",
      problemSolves: "Replaces noisy cloud SIEMs and privacy-compromising log uploads with 100% offline, explainable graph anomaly detection.",
      architecture: "Multi-source log ingestion into an offline SQLite graph store, processed by GNN topological encoders, multi-horizon statistical baselines, and LangGraph agents.",
      techStack: {
        languages: ["Python", "Rust", "SQL"],
        frameworks: ["PyTorch", "PyTorch Geometric", "FastAPI"],
        mlAi: ["Graph Neural Networks (GNNs)", "LangGraph", "FAISS", "NetworkX", "Scikit-Learn"],
        databases: ["SQLite (Local-First Engine)", "FAISS Vector Store"],
        tools: ["Docker", "Pydantic", "AsyncIO", "Pytest"]
      },
      tech: ["PyTorch Geometric", "GNNs", "LangGraph", "Python", "Rust", "FAISS", "SQLite", "FastAPI"],
      github: "https://github.com/Vaibhav20k/BehaviourIQ",
      highlights: [
        "100% local-first and offline-capable architecture preserving complete audit log privacy.",
        "Universal Behavior Graph transforming heterogeneous OS, container, and cloud audit logs.",
        "GNN topological embeddings detecting complex multi-hop lateral movement across entities.",
        "Multi-layer temporal statistical baselines across short, medium, and long-term activity windows."
      ]
    },
    {
      id: "race",
      name: "RACE",
      image: "/RACE.png",
      type: "Autonomous Closed-Loop Revenue Recovery Engine",
      overview: "An intelligent, closed-loop revenue recovery decision engine that predicts payment failure recoverability, selects optimal intervention strategies via Expected Recovery Value, and enforces financial safety gates.",
      description: "RACE (Revenue Adaptive Control Engine) is an autonomous revenue recovery engine that detects failed payment transactions, diagnoses root causes from failure telemetry, evaluates competing interventions using Expected Recovery Value (ERV) models, enforces deterministic financial safety constraints, and verifies real payment settlement.",
      problemSolves: "Eliminates naive fixed-interval retry loops and aggressive dunning that spike gateway costs and customer churn, maximizing net incremental recovered revenue.",
      architecture: "Event-driven decision pipeline combining ML classification, ERV optimization, deterministic safety policy gates, and reinforcement feedback loops with full CI test validation.",
      techStack: {
        languages: ["Python", "SQL"],
        frameworks: ["FastAPI", "Pydantic v2", "Uvicorn"],
        mlAi: ["Scikit-Learn", "XGBoost", "Expected Recovery Value (ERV) Models", "Bandit Policies"],
        databases: ["PostgreSQL", "SQLite", "Redis"],
        tools: ["Docker", "GitHub Actions CI/CD", "Pytest (63/63 Passing Tests)", "Cloudflare"]
      },
      tech: ["Python", "FastAPI", "XGBoost", "ERV Optimization", "PostgreSQL", "Redis", "Docker", "Pytest"],
      github: "https://github.com/Vaibhav20k/RACE--Revenue-Adaptive-Control-Engine",
      highlights: [
        "Production-ready engine with 63/63 passing test suite across recovery decision tracks.",
        "Dynamic Expected Recovery Value (ERV) ranking balancing recovery probability against gateway costs.",
        "Deterministic financial safety gates enforcing velocity limits, cooldowns, and fee caps.",
        "Closed-loop feedback updating decision policies upon authoritative payment settlement."
      ]
    },
    {
      id: "rcai",
      name: "RCAI",
      image: "/RCAI.png",
      type: "Evidence-Driven Autonomous Root Cause Analysis",
      overview: "An autonomous AI system that investigates software incidents by evaluating competing hypotheses, gathering diagnostic evidence with cryptographic provenance, and executing bounded remediations.",
      description: "RCAI (Root Cause Analysis Intelligence) automates production incident investigation and SRE triage. It actively generates competing failure hypotheses from metric anomalies, executes targeted diagnostic tools to collect evidence, cryptographically signs evidence provenance, gates remediations with deterministic policies, and independently verifies live system recovery.",
      problemSolves: "Eliminates high MTTR (Mean Time to Resolution) and human guesswork during complex distributed systems outages.",
      architecture: "Modular autonomous investigation loop featuring hypothesis generation, information-gain evidence selection, cryptographic audit trails, policy gates, and verification probes.",
      techStack: {
        languages: ["Python", "TypeScript", "SQL"],
        frameworks: ["FastAPI", "Next.js / React", "Pydantic", "Uvicorn"],
        mlAi: ["Hypothesis Evaluation Engines", "Bayesian Confidence Scoring", "LLM Reasoning"],
        databases: ["PostgreSQL", "SQLite", "Redis"],
        tools: ["Docker", "Pytest (97/97 Passing Tests)", "Render", "Vercel", "Prometheus"]
      },
      tech: ["Python", "FastAPI", "Bayesian Inference", "Docker", "Next.js", "PostgreSQL", "Pytest"],
      github: "https://github.com/Vaibhav20k/RCAI",
      highlights: [
        "Comprehensive frozen v2.0.0 release validated with 97/97 passing test suite.",
        "Evidence-driven hypothesis evaluation ranking root causes by Bayesian confidence.",
        "Cryptographic provenance ledger ensuring immutability of diagnostic evidence.",
        "Deterministic policy gate executing bounded remediation with automated live outcome verification."
      ]
    }
  ],

  experience: [
    {
      role: "SWD intern",
      org: "Cimplifie",
      duration: "Jun 2026 — July 2026",
      description: "Shipped 4 client-facing React dashboards consuming internal REST APIs, reducing average client reporting turnaround from 3 days to same-day by replacing manual Excel exports with live data views."
              
    },         
    {
      role: "Lead Software Architect",
      org: "SpaceOPS Hackathon Group",
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
    "PAYTM AGENT{A}THON WINNER - Grabbed FIRST place in paytm office build CommunityOS - Adaptive AI Community Platform",
    "NASA Space Apps Challenge - Finished in Top 5 (out of hundreds of teams globally) for aerospace tracking.",
    "Smart India Hackathon 2025 - Selected Participant represented ADGIPS, Delhi.",
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

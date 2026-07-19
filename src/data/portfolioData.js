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
      type: "Personal Project",
      ownership: " Full-Stack & Machine Learning Engineer (Designed and developed the complete architecture, backend, ML pipeline, database, and infrastructure)",
      description: " An enterprise-grade real-time financial transaction anomaly detection platform built to identify fraudulent payment behavior using machine learning and behavioral analytics. The system leverages an event-driven microservice architecture to ingest transaction streams, engineer user behavioral features, execute low-latency anomaly inference, persist audit trails, and expose scalable REST APIs for fraud investigation, analytics, and operational monitoring.",
      tech: ["Go","Python","FastAPI","PostgreSQL","Redis","Apache Kafka","Docker","Prometheus","Grafana","Scikit-learn","XGBoost","GitHub Actions"],
      github: "https://github.com/Vaibhav20k/DualSentry-model.git",
      highlights: [
        "Architected and developed a distributed event-driven backend using Apache Kafka to decouple transaction ingestion, feature engineering, anomaly inference, and alert generation.",
        "Engineered behavioral feature pipelines using transaction velocity, spending deviation, merchant patterns, temporal activity, device fingerprints, IP intelligence, and historical user baselines for anomaly detection.",
        "Implemented machine learning-based fraud detection with configurable risk thresholds and hybrid rule-based validation to improve detection precision while minimizing false positives.",
        "Designed a normalized PostgreSQL database with optimized indexing, audit logging, and relational data models for scalable financial transaction processing.",
        "Built high-performance FastAPI services exposing secure REST endpoints for transaction ingestion, anomaly scoring, fraud investigation, and analytics dashboards.",
        "Integrated Redis caching to accelerate feature retrieval and reduce inference latency for real-time fraud analysis.",
        "Containerized the complete platform using Docker Compose and implemented observability with Prometheus and Grafana for monitoring service health and system performance.",
        "Automated code quality and deployment validation through GitHub Actions CI/CD pipelines with linting, testing, and build verification."
      ]
    },
    {
      id: "jarvis",
      name: "JARVIS",
      type: "Personal Project",
      ownership: " AI Systems Engineer (Designed and developed the complete architecture, voice pipeline, multimodal intelligence, and desktop automation framework)",
      description: "A  Cross-platform multimodal AI assistant engineered to provide real-time voice interaction, desktop automation, visual understanding, and persistent contextual memory across Windows, macOS, and Linux. The system integrates large language models, speech recognition, computer vision, web intelligence, and system telemetry to execute natural language commands, automate complex workflows, monitor hardware resources, and deliver personalized contextual assistance through an adaptive real-time interface.",
      tech: ["Python","Gemini API","Playwright","OpenCV","SpeechRecognition","PyAutoGUI","psutil","SQLite","AsyncIO","Docker"],
      github: "https://github.com/Vaibhav20k/Personalized-Jarvis-",
      highlights: [
        "Engineered a low-latency multimodal AI pipeline combining speech recognition, LLM reasoning, computer vision, and desktop automation for real-time conversational assistance.",
        "Developed cross-platform system automation capable of launching applications, executing terminal commands, managing files, controlling browsers, and orchestrating multi-step workflows using natural language.",
        "Implemented persistent contextual memory to retain user preferences, projects, language settings, and conversation history, enabling personalized long-term interactions.",
        "Built a real-time hardware telemetry engine monitoring CPU, GPU, memory utilization, and system temperatures with intelligent threshold detection and proactive voice alerts.",
        "Integrated advanced web intelligence using Gemini Grounded Search with automatic fallback mechanisms for news retrieval, research, product comparison, and real-time information aggregation.",
        "Designed a dynamic adaptive HUD supporting voice interactions, multimodal content rendering, live search visualization, and contextual response streaming.",
        "Implemented multimodal perception by combining screen understanding, webcam-based visual processing, and voice input to enable context-aware task execution.",
        "Optimized asynchronous task orchestration using Python AsyncIO to support concurrent speech processing, web search, system monitoring, and AI inference with minimal response latency."
      ]
    },
    {
      id: "orbitair",
      name: "OrbitAir",
      type: "Group Project",
      ownership: " Core Developer (Owned data scraping, backend, frontend, and database design)",
      description: " An automated real-time aviation telemetry tracker developed for  analyzing flight routes, mapping density grids, and predicting airspace occupancy patterns. The system schedules data ingestion scripts to pull transponder feeds, parses them into a spatial database , and streams real-time maps via a responsive React web dashboard.",
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
      ownership: " Lead Architect (Owned server administration scripts, system metrics, and UI components)",
      description: " A centralized cloud  infrastructure  monitoring dashboard tailored for containerized  architectures and microservices. Orchestrates server status reporting , indexes system logs , aggregates error metrics , and provides real-time alerts through WebSockets. Features shell command triggers directly from the web console.",
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

import type { Profile } from "./types";

/**
 * Single source of truth for all site copy.
 * Transcribed from docs/PLAN.md §2 (content inventory) and §9 (resolved
 * decisions). Components import this object and never hard-code copy.
 */
export const profile: Profile = {
  name: "Rohith Anand",
  role: "MSc Data Science Student @ Trinity College Dublin",
  location: "Dublin, Ireland",
  email: "therohithanand@gmail.com",

  tagline:
    "I build ML systems that hold up outside the lab: deep learning, computer vision, and NLP, from research prototype to feasibility.",

  status:
    "Ex-Research Associate at Stryker · open to ML/data opportunities",

  intro:
    "Over a year and a half at Stryker I took healthcare ML systems from first prototype to feasibility. Now in Dublin for my MSc, I'm also researching how reliably large language models judge clinical AI.",

  highlights: [
    "1.5 years of AI research at Stryker",
    "Kaggle Expert",
    "2nd Runner-up, Hacktomania (IEEE COMPSOC)",
    "CGPA 8.96, CS (AI/ML)",
  ],

  focusAreas: [
    { title: "Deep Learning & Computer Vision", blurb: "From pose estimation to live surgical workflows." },
    { title: "ML Systems & MLOps", blurb: "Feature engineering, training and evaluation pipelines." },
    { title: "LLM Evaluation Research", blurb: "Auditing LLM judges for bias and validity." },
  ],

  about: [
    "I optimize for models that hold up outside the lab, pipelines that other people can run, and claims that survive validation.",
    "Behind that: a BTech in Computer Science (AI/ML) from Vellore Institute of Technology, Chennai, Kaggle Expert rank, and a habit of sweating the small details, because those decide whether a system ships.",
  ],

  socials: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/lemonredwood",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/lemonredwood",
    },
    {
      platform: "kaggle",
      label: "Kaggle",
      href: "https://www.kaggle.com/therohithanand",
    },
    {
      platform: "email",
      label: "Email",
      href: "mailto:therohithanand@gmail.com",
    },
  ],

  skills: [
    {
      name: "Languages",
      skills: ["Python", "SQL", "R", "Java", "C++", "TypeScript"],
    },
    {
      name: "ML / DL",
      skills: [
        "PyTorch",
        "TensorFlow",
        "scikit-learn",
        "XGBoost",
        "CatBoost",
        "Hugging Face",
        "OpenCV",
      ],
    },
    {
      name: "Domains",
      skills: [
        "Computer Vision",
        "NLP",
        "Explainable AI",
        "Deep Learning",
      ],
    },
    {
      name: "Data & Tools",
      skills: [
        "Pandas",
        "NumPy",
        "PostgreSQL",
        "MySQL",
        "Docker",
        "Kubernetes",
        "Azure",
        "Git / CI/CD",
      ],
    },
  ],

  experience: [
    {
      company: "Stryker Global Technology Center (SGTC)",
      title: "AI Research Associate",
      location: "Bangalore, India",
      period: "Feb 2025 – Jul 2026",
      workstreams: [
        {
          name: "Battery Prognostics",
          summary: "Li-ion battery health forecasting",
          result: "0.0301 MAE on remaining-useful-life prediction",
          bullets: [
            "Built Physics-Informed Neural Networks in PyTorch, encoding electrochemical constraints directly into the model.",
            "Modeled degradation with regression and polynomial-fit lifecycle analysis.",
          ],
        },
        {
          name: "ProCuity",
          summary: "Pressure-injury reduction",
          result: "96.24% posture-classification accuracy",
          bullets: [
            "Took the feature to a successful feasibility exit in a 3-person team, owning feature engineering and the training and evaluation pipeline.",
            "Combined sensor-based pose estimation with an ensemble of four deep models and CatBoost.",
            "Engineered 75+ spatial, temporal, and respiratory features using dual-window processing.",
            "Lifted the hardest posture class from 78.6% to 94.2% on out-of-distribution patients with real-time per-patient normalisation (Welford's algorithm), no retraining.",
          ],
        },
        {
          name: "Hospital Status Automation & Archer",
          summary: "Biomedical annotation & surgical-workflow CV",
          bullets: [
            "Orchestrated large-scale biomedical data annotation.",
            "Produced a high-fidelity computer-vision dataset of live surgical workflows.",
          ],
        },
      ],
    },
  ],

  projects: [
    {
      name: "ClinJudge",
      blurb:
        "Auditing LLM-as-judge evaluators of clinical AI for demographic bias and measurement validity.",
      bullets: [
        "Counterfactual method: fix the answer, vary patient demographics, read any verdict change as bias.",
        "Validity battery against a human anchor plus a cached, resumable judging CLI.",
      ],
      stack: ["Python", "pytest", "uv", "vLLM", "Ollama", "Transformers"],
      badge: "Research · in progress",
    },
    {
      name: "Drone Reforestation Planner",
      blurb:
        "Turns drone imagery into a planting plan that avoids trees, roads and steep slopes.",
      bullets: [
        "Detects existing trees with DeepForest and builds a canopy height model from DSM/DTM rasters.",
        "Plans and simulates the drone's planting path over viable ground.",
      ],
      stack: ["Python", "rasterio", "DeepForest", "OpenCV", "OpenDroneMap"],
      badge: "Computer Vision",
      repo: {
        label: "Source",
        href: "https://github.com/lemonredwood/drone-based-reforestation",
      },
    },
    {
      name: "TenderLens",
      blurb:
        "Procurement intelligence over Irish public tenders: search and RAG on EU TED notices.",
      bullets: [
        "Resumable, idempotent ingestion of 12 months of TED notices into normalised Postgres, re-runnable from raw JSON.",
        "pgvector schema ready for hybrid search and cited RAG answers, with join keys for the CRO company register.",
      ],
      stack: ["Python", "PostgreSQL", "pgvector", "httpx", "Docker", "pytest"],
      badge: "In progress",
    },
    {
      name: "DraupECHO",
      blurb:
        "Real-time audio danger detection that turns a distress signal into an emergency response.",
      bullets: [
        "Live speech to text with emotion and tone classification at 93.4% accuracy.",
        "Fires Twilio and geolocation alerts when danger is detected.",
      ],
      stack: [
        "AssemblyAI",
        "Hugging Face Transformers",
        "Twilio",
        "Geolocation",
      ],
      badge: "Intel GenAI Hackathon",
    },
    {
      name: "Spatial Speak",
      blurb:
        "A voice assistant for space-agriculture research, grounded in NASA and Scholar datasets.",
      bullets: [
        "Voice-driven Q&A built on Next.js and Python with AssemblyAI speech.",
        "Retrieval-augmented answers from LLaMA 3 8B running locally via Ollama.",
      ],
      stack: ["Next.js", "Python", "AssemblyAI", "Ollama", "LLaMA 3 8B", "RAG"],
      badge: "Cosmonova Hackathon",
    },
    {
      name: "IMD Weather Agent",
      blurb:
        "A local-LLM agent that reads India Meteorological Department bulletins and answers weather questions.",
      bullets: [
        "ReAct agent that parses the latest IMD bulletin PDFs into structured rainfall data.",
        "Gemma 2B LoRA-tuned on tool-use traces to learn the agent's reasoning format.",
      ],
      stack: ["Python", "LangChain", "llama.cpp", "PEFT / LoRA", "PyMuPDF"],
      badge: "Agentic AI Hackathon",
      repo: {
        label: "Source",
        href: "https://github.com/lemonredwood/agentic-ai-hackathon",
      },
    },
  ],

  certificates: [
    {
      name: "Android Development Masterclass",
      issuer: "Udemy",
      year: 2024,
    },
    {
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI",
      year: 2024,
    },
    {
      name: "Deep Learning Fundamentals",
      issuer: "NVIDIA",
      year: 2024,
    },
  ],

  education: [
    {
      institution: "Trinity College Dublin",
      degree: "MSc in Data Science",
      period: "Sept 2026 – Present",
    },
    {
      institution: "Vellore Institute of Technology, Chennai",
      degree: "BTech, Computer Science (AI/ML Specialization)",
      detail: "CGPA 8.96",
      period: "Sept 2022 – July 2026",
    },
    {
      institution: "Delhi Public School, Nalco",
    },
  ],

  societies: [
    {
      name: "Microsoft Innovators Club",
      role: "Competitive Programming",
    },
    {
      name: "Hindi Literary Association",
      role: "Operations Lead",
    },
    {
      name: "AR/VR Club",
    },
    {
      name: "Linux Club",
    },
  ],

  // Newest first. Every entry is drawn from the resume — no invented dates or
  // claims. Kaggle Expert / Hacktomania carry no dates on the resume and so are
  // intentionally absent here.
  timeline: [
    {
      date: "Sept 2026",
      title: "Started MSc in Data Science, Trinity College Dublin",
      kind: "education",
    },
    {
      date: "31 Jul 2026",
      title: "Wrapped up as AI Research Associate at Stryker",
      kind: "work",
    },
    {
      date: "Jul 2026",
      title: "Completed BTech in Computer Science (AI/ML), Vellore Institute of Technology, Chennai",
      detail: "CGPA 8.96",
      kind: "education",
    },
    {
      date: "Feb 2025",
      title: "Joined Stryker",
      detail: "Bangalore, India",
      kind: "work",
    },
  ],

  resumeUrl: "/resume.pdf",
};

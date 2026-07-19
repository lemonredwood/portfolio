import type { Profile } from "./types";

/**
 * Single source of truth for all site copy.
 * Transcribed from docs/PLAN.md §2 (content inventory) and §9 (resolved
 * decisions). Components import this object and never hard-code copy.
 */
export const profile: Profile = {
  name: "Rohith Anand",
  role: "Incoming MSc in Data Science @ Trinity College Dublin",
  location: "Bangalore, India",
  email: "therohithanand@gmail.com",

  tagline:
    "I build ML systems that ship: deep learning, computer vision, and NLP, from research to production.",

  status:
    "Wrapping up at Stryker · moving to Dublin in Sept 2026 · open to ML/data opportunities",

  intro:
    "I'm Rohith, a machine learning engineer moving from industry research into graduate study. Over the past year and a half at Stryker I took healthcare ML systems from first prototype to feasibility, owning the data, the modeling, and the trade-offs along the way. That work taught me what I now optimize for: models that hold up outside the lab, pipelines that other people can run, and claims that survive validation. This September I begin an MSc in Data Science at Trinity College Dublin, and alongside it I'm researching how reliably large language models judge clinical AI.",

  highlights: [
    "1.5 years of AI research at Stryker",
    "Kaggle Expert",
    "4 hackathon builds",
    "CGPA 8.96, CS (AI/ML)",
  ],

  featured: {
    label: "Currently researching",
    text: "ClinJudge, an audit harness for LLM-as-judge evaluators of clinical AI",
    href: "#projects",
  },

  focusAreas: [
    { title: "Deep Learning & Computer Vision", blurb: "Models that hold up on real sensor data, from pose estimation to live surgical workflows." },
    { title: "ML Systems & MLOps", blurb: "Pipelines owned end to end, from first prototype to feasibility exit, with MLOps on Azure." },
    { title: "LLM Evaluation Research", blurb: "Auditing LLM-as-judge evaluators for demographic bias and measurement validity." },
  ],

  about: [
    "At Stryker's Global Technology Center in Bangalore I built physics-informed networks that forecast Li-ion battery health, pose-estimation pipelines that flag pressure-injury risk, and computer-vision datasets drawn from live surgical workflows. Procuity, the largest of these, also had me running MLOps on Azure.",
    "Underneath the projects: a BTech in Computer Science with an AI/ML specialization from Vellore Institute of Technology, Chennai (CGPA 8.96), Kaggle Expert rank, and a habit of sweating the small details, because those are what decide whether a system ships.",
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
      skills: ["Python", "R", "Java", "Kotlin", "C / C++", "SQL"],
    },
    {
      name: "ML / DL",
      skills: [
        "PyTorch",
        "TensorFlow",
        "Keras",
        "scikit-learn",
        "XGBoost",
        "OpenCV",
        "MLOps",
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
      name: "Cloud & Other",
      skills: ["Azure", "Android Development", "MySQL", "Front-end Web"],
    },
    {
      name: "Core CS Coursework",
      skills: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Computer Networks",
        "Database Systems",
        "Compiler Design",
        "Cryptography & Network Security",
        "Theory of Computation",
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
          bullets: [
            "Built Physics-Informed Neural Networks in PyTorch, encoding electrochemical constraints directly into the model.",
            "Reached 0.0301 MAE on remaining-useful-life (RUL) prediction.",
            "Modeled degradation with regression and polynomial-fit lifecycle analysis.",
          ],
        },
        {
          name: "Procuity",
          summary: "Pressure-injury reduction",
          bullets: [
            "Owned the ML pipeline end to end, from inception through feasibility exit, running MLOps on Azure.",
            "Combined sensor-based pose estimation with an ensemble of four deep models and CatBoost, hitting 96.24% posture-classification accuracy.",
            "Engineered 75+ spatial, temporal, and respiratory features using dual-window processing.",
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
      repo: {
        label: "Source",
        href: "https://github.com/lemonredwood/ClinJudge",
      },
    },
    {
      name: "The Grind",
      blurb:
        "A live, multiplayer LeetCode tracker for grinding problems with friends in real time.",
      bullets: [
        "Group progress syncs across everyone in real time on Supabase.",
        "Live on GitHub Pages and in production use today.",
      ],
      stack: ["Supabase", "Realtime", "GitHub Pages"],
      badge: "LIVE",
      live: {
        label: "Live site",
        href: "https://lemonredwood.github.io/the-grind/",
      },
      repo: {
        label: "Source",
        href: "https://github.com/lemonredwood/the-grind",
      },
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
  ],

  achievements: [
    {
      label: "Kaggle Expert",
      href: "https://www.kaggle.com/therohithanand",
    },
    {
      label: "2nd Runner-up, Hacktomania",
      detail: "IEEE COMPSOC",
    },
    {
      label: "4 hackathons",
      detail: "Cosmonova, Intel GenAI, Brighter India, V-Strykathon",
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
      period: "From Sept 2026",
      status: "incoming",
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
      title: "MSc in Data Science, Trinity College Dublin",
      kind: "next",
    },
    {
      date: "Jul 2026",
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
    {
      date: "Sept 2022",
      title: "Started BTech at Vellore Institute of Technology, Chennai",
      kind: "education",
    },
  ],

  resumeUrl: "/resume.pdf",
};

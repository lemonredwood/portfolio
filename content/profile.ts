import type { Profile } from "./types";

/**
 * Single source of truth for all site copy.
 * Transcribed from docs/PLAN.md §2 (content inventory) and §9 (resolved
 * decisions). Components import this object and never hard-code copy.
 */
export const profile: Profile = {
  name: "Rohith Anand",
  role: "AI Research Associate @ Stryker",
  location: "Bangalore, India",
  email: "therohithanand@gmail.com",

  // Final tagline, verbatim from PLAN §9.4.
  tagline:
    "I build ML systems that ship — deep learning, computer vision, and NLP, from research to production.",

  about: [
    "I build machine-learning systems that make it out of the notebook and into production. My work runs across deep learning, computer vision, and NLP, and I care most about the part that usually gets skipped: making a model hold up once it meets real, messy data.",
    "Most recently, as an AI Research Associate at Stryker's Global Technology Center in Bangalore, I built physics-informed networks that forecast Li-ion battery health, pose-estimation pipelines that flag pressure-injury risk, and computer-vision datasets drawn from live surgical workflows — usually owning each one from first prototype through feasibility, data and modeling and trade-offs included.",
    "I finished a BTech in Computer Science with an AI/ML specialization at VIT Chennai (CGPA 8.96) this July, and in September I'm moving to Dublin to start an MSc in Data Science at Trinity College Dublin. I keep the fundamentals sharp — I'm a Kaggle Expert — because the systems that ship are the ones where the small details are right.",
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
      name: "Other",
      skills: ["Android Development", "MySQL", "Front-end Web"],
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
            "Owned the ML pipeline end to end, from inception through feasibility exit.",
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
      name: "The Grind",
      blurb:
        "A live, multiplayer LeetCode tracker for grinding problems with friends in real time.",
      bullets: [
        "Multiplayer tracker where a group's LeetCode progress syncs across everyone in real time.",
        "Built on Supabase for realtime state and persistence.",
        "Deployed on GitHub Pages and live in production today.",
        "Fully open source at lemonredwood/the-grind.",
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
        "Transcribes live audio with AssemblyAI speech-to-text.",
        "Classifies emotion and tone with Hugging Face Transformers at 93.4% accuracy.",
        "Scans transcripts through keyword risk pipelines to catch distress signals.",
        "Fires Twilio and geolocation emergency alerts when danger is detected.",
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
        "A voice assistant for space-agriculture research — ask questions out loud, get answers grounded in NASA and Scholar sources.",
      bullets: [
        "Voice-driven Q&A for space-agriculture research, built on Next.js and Python.",
        "Transcribes speech with AssemblyAI.",
        "Answers with retrieval-augmented generation using LLaMA 3 8B via Ollama.",
        "Grounds every response in NASA and Scholar datasets.",
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
      institution: "VIT Chennai",
      degree: "BTech, Computer Science — AI/ML Specialization",
      detail: "CGPA 8.96",
      period: "Sept 2022 – July 2026",
    },
    {
      institution: "DPS Nalco",
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

  resumeUrl: "/resume.pdf",
};

export interface Internship {
  id: string;
  role: string;
  company: string;
  period: string;
  startDate?: string;
  endDate?: string;
  badge?: string;
  description: string;
  bulletPoints: string[];
  skills: string[];
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Autonomous Systems' | 'Computer Vision & AI' | 'NLP & Chatbots' | 'Cloud & GenAI' | 'Audio AI';
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  presentedAt?: string;
  metrics?: { label: string; value: string }[];
  isFlagship?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: { name: string; level: number; category: string }[];
}

export const PERSONAL_INFO = {
  name: "Sai Keerthika V",
  tagline: "Data Analyst | Artificial Intelligence Engineer",
  email: "saikeerthika88@gmail.com",
  phone: "+91 9789746174",
  location: "Coimbatore, Tamil Nadu, India",
  linkedin: "https://linkedin.com/in/sai-keerthika-v",
  linkedinDisplay: "linkedin.com/in/sai-keerthika-v",
  github: "https://github.com/keerthika07",
  githubDisplay: "github.com/keerthika07",
  resumePath: "/assets/aistudio/SAI_KEERTHIKA_V_AI_Engineer_Intern_20261016_8216f6b9.pdf",
  cgpa: "7.52 / 10",
  educationDegree: "B. Tech in Artificial Intelligence and Data Science",
  institution: "Coimbatore Institute of Engineering and Technology",
  graduationYear: "2023 – Present",
  summary: `B. Tech Artificial Intelligence and Data Science student with hands-on experience in Artificial Intelligence, Machine Learning, Python, Data Analysis, and AI-powered application development through internships and academic projects. Experienced in developing AI-based applications, autonomous drone automation, GPS-based navigation, and web development solutions. Strong problem-solving and analytical skills focused on building practical and scalable intelligent solutions. Seeking entry-level opportunities in AI/ML Engineering and AI Engineering.`
};

export const INTERNSHIPS: Internship[] = [
  {
    id: "datamites",
    company: "Data Mites",
    role: "Artificial Engineer Intern",
    period: "18th July - Present",
    badge: "Current Role",
    icon: "Brain",
    description: "Developing hands-on skills in Python, Machine Learning, Deep Learning, NLP, Computer Vision, and Generative AI while executing practical AI/ML projects.",
    bulletPoints: [
      "Developing hands-on skills in Python, Machine Learning, Deep Learning, NLP, Computer Vision, and Generative AI.",
      "Working on practical AI/ML projects and applying industry-relevant techniques to real data sets.",
      "Building generative AI pipelines and testing contextual inference models."
    ],
    skills: ["Python", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Generative AI"]
  },
  {
    id: "codealpha",
    company: "Code Alpha",
    role: "Artificial Intelligence Intern",
    period: "10th April - 10th May 2026",
    badge: "AI Engineering",
    icon: "Cpu",
    description: "Developed multi-domain AI-based applications including language translation, conversational agent FAQ chatbot, generative music model, and real-time object detection.",
    bulletPoints: [
      "Developed AI-based applications including a language translation tool, FAQ chatbot, music generation model, and real-time object detection system.",
      "Applied Artificial Intelligence, Machine Learning, and Deep Learning concepts for practical application development.",
      "Worked on AI model development, real-time object detection, chatbot development, and intelligent application solutions."
    ],
    skills: ["Deep Learning", "Object Detection", "NLP", "Chatbots", "Music Generation", "Python"]
  },
  {
    id: "codebinding",
    company: "Code Binding",
    role: "AI & Machine Learning Intern",
    period: "21st June - 05th July 2025",
    badge: "Model Development",
    icon: "Network",
    description: "Focused on practical model engineering, weekly technical reviews, and algorithmic problem-solving for machine learning systems.",
    bulletPoints: [
      "Worked on Artificial Intelligence and Machine Learning concepts, focusing on practical model development.",
      "Participated in AI/ML development tasks and weekly technical reviews to improve model understanding and implementation.",
      "Applied problem-solving approaches to develop and evaluate machine learning solutions."
    ],
    skills: ["Machine Learning", "Supervised Learning", "Model Evaluation", "Python", "Data Processing"]
  },
  {
    id: "nextlogic",
    company: "Next Logic",
    role: "Web Development Intern",
    period: "07th Dec - 20th Dec 2025",
    badge: "Frontend Engineering",
    icon: "Layout",
    description: "Engineered responsive web interfaces and integrated modular user-facing components with HTML, CSS, and modern JavaScript.",
    bulletPoints: [
      "Developed and integrated frontend modules using HTML, CSS, and JavaScript.",
      "Worked on responsive web interfaces, frontend development, and user-facing application components.",
      "Gained practical exposure to real-world web development workflows and software engineering practices."
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Frontend Development", "Responsive UI"]
  },
  {
    id: "ioc",
    company: "IOC Training",
    role: "AI/ML Cloud Deployment",
    period: "23rd Sep - 29th Sep 2024",
    badge: "Cloud MLOps",
    icon: "Cloud",
    description: "Gained hands-on exposure to deploying Machine Learning models on cloud environments and building reproducible serving workflows.",
    bulletPoints: [
      "Gained hands-on exposure to Machine Learning model deployment on cloud platforms.",
      "Learned the fundamentals of AI/ML deployment, cloud-based model implementation, and deployment workflows.",
      "Explored the process of moving machine learning solutions from development to cloud environments."
    ],
    skills: ["Cloud Deployment", "Model Serving", "MLOps Fundamentals", "Cloud Platforms"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "autonomous-drone",
    title: "Autonomous Drone Delivery System",
    category: "Autonomous Systems",
    isFlagship: true,
    tagline: "GPS-guided automated payload delivery drone with real-time waypoint navigation",
    description: "Developed and worked on the end-to-end automation of a GPS-enabled autonomous drone using real-time latitude and longitude navigation coordinates. Features automated payload delivery mechanism and precision waypoint tracking.",
    presentedAt: "SAEINDIA Autonomous Drone Development Challenge",
    features: [
      "Real-time latitude & longitude coordinate navigation algorithm",
      "Automated payload delivery workflow following predefined waypoint routes",
      "Live autonomous delivery demonstration presented at SAEINDIA challenge",
      "Avionics telemetry tracking and fail-safe return-to-launch logic"
    ],
    techStack: ["Python", "GPS Navigation", "Autonomous Systems", "Sensors & Telemetry", "Embedded Logic"],
    metrics: [
      { label: "Challenge Presentation", value: "SAEINDIA Finalist" },
      { label: "Navigation Mode", value: "Real-time Lat/Lon" },
      { label: "Workflow", value: "100% Automated" }
    ]
  },
  {
    id: "object-detection",
    title: "Real-Time Object Detection System",
    category: "Computer Vision & AI",
    tagline: "High-speed multi-class visual recognition and spatial bounding box engine",
    description: "Engineered a real-time computer vision detection pipeline trained to identify, label, and locate multiple physical objects across live video feeds with high confidence metrics.",
    features: [
      "Live stream camera frame ingestion and tensor transformation",
      "Bounding box spatial regression and multi-class classification",
      "Optimized inference time for responsive frame-rate execution",
      "Developed during AI internship at Code Alpha"
    ],
    techStack: ["Python", "Computer Vision", "Deep Learning", "TensorFlow", "OpenCV"],
    metrics: [
      { label: "Inference Latency", value: "< 35ms" },
      { label: "Class Coverage", value: "Multi-class" }
    ]
  },
  {
    id: "translation-tool",
    title: "Intelligent Language Translation Tool",
    category: "NLP & Chatbots",
    tagline: "Contextual neural machine translation engine across diverse natural languages",
    description: "Developed a language translation application leveraging modern natural language processing models to translate text with semantic fidelity and idiom preservation.",
    features: [
      "Cross-lingual sequence-to-sequence translation architecture",
      "Context-aware token processing avoiding literal translation pitfalls",
      "Interactive user interface for instant text translation and verification",
      "Built and tested during Code Alpha AI residency"
    ],
    techStack: ["Python", "NLP", "Transformers", "Sequence Modeling", "Web UI"],
    metrics: [
      { label: "Processing", value: "Context-Aware" },
      { label: "Domain", value: "Multilingual NLP" }
    ]
  },
  {
    id: "music-generation",
    title: "AI Melodic Music Generation Model",
    category: "Audio AI",
    tagline: "Deep generative algorithmic synthesizer producing original musical progressions",
    description: "Created an AI music generation model using deep learning and probabilistic sequencing to synthesize harmonically structured melodies and rhythm patterns.",
    features: [
      "Algorithmic note duration and pitch prediction network",
      "Generative sequence generation conditioned on chord templates",
      "Audio file rendering and playback pipeline",
      "Exploration of creative AI and generative neural modeling"
    ],
    techStack: ["Python", "Deep Learning", "Generative AI", "Audio Processing", "NumPy"],
    metrics: [
      { label: "Format", value: "MIDI / Audio" },
      { label: "Style", value: "Generative Melodies" }
    ]
  },
  {
    id: "faq-chatbot",
    title: "Intelligent FAQ AI Chatbot",
    category: "NLP & Chatbots",
    tagline: "Automated intent classification and natural conversational query assistant",
    description: "Built an intelligent FAQ conversational agent capable of parsing natural user inquiries, matching intent semantic vectors, and returning exact knowledge base resolutions.",
    features: [
      "Intent recognition and query classification with NLP",
      "Similarity ranking against reference domain queries",
      "Fallback query management and dialog state tracking",
      "Applied during Code Alpha internship"
    ],
    techStack: ["Python", "NLP", "Intent Classification", "Vector Similarity", "Chatbot Architecture"],
    metrics: [
      { label: "Response Time", value: "Instantaneous" },
      { label: "Accuracy", value: "High Intent Match" }
    ]
  },
  {
    id: "cloud-ml-pipeline",
    title: "AI/ML Cloud Deployment & Inference Pipeline",
    category: "Cloud & GenAI",
    tagline: "Scalable cloud deployment patterns for serving containerized ML models",
    description: "Architected model deployment blueprints exploring how trained machine learning models transition from experimental notebooks into resilient, observable cloud endpoints.",
    features: [
      "Containerized model packaging and dependency isolation",
      "RESTful API inference endpoints for client integration",
      "Cloud resource management and latency monitoring",
      "Completed during IOC Training on Cloud MLOps"
    ],
    techStack: ["Python", "Cloud Platforms", "MLOps", "Model Deployment", "Inference APIs"],
    metrics: [
      { label: "Environment", value: "Cloud-Ready" },
      { label: "Architecture", value: "REST API Serving" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "Code",
    description: "Core algorithmic problem solving and software programming",
    skills: [
      { name: "Python", level: 92, category: "Programming" },
      { name: "C", level: 80, category: "Programming" },
      { name: "C++", level: 78, category: "Programming" },
      { name: "R", level: 75, category: "Programming" },
      { name: "Java", level: 72, category: "Programming" }
    ]
  },
  {
    title: "AI & Machine Learning Concepts",
    icon: "BrainCircuit",
    description: "Foundational and modern AI/ML architectures and algorithms",
    skills: [
      { name: "Supervised Learning", level: 90, category: "AI / ML" },
      { name: "Unsupervised Learning", level: 86, category: "AI / ML" },
      { name: "Support Vector Machines (SVM)", level: 85, category: "AI / ML" },
      { name: "Decision Trees & Ensembles", level: 88, category: "AI / ML" },
      { name: "K-Means Clustering", level: 84, category: "AI / ML" },
      { name: "Natural Language Processing (NLP)", level: 88, category: "AI / ML" },
      { name: "Prompt Engineering", level: 90, category: "AI / ML" },
      { name: "Generative AI", level: 86, category: "AI / ML" },
      { name: "Computer Vision", level: 85, category: "AI / ML" }
    ]
  },
  {
    title: "Libraries, Tools & Frameworks",
    icon: "Layers",
    description: "Data analysis, scientific computing, and model execution",
    skills: [
      { name: "Pandas", level: 92, category: "Libraries" },
      { name: "NumPy", level: 90, category: "Libraries" },
      { name: "Scikit-learn", level: 88, category: "Libraries" },
      { name: "TensorFlow (Basics)", level: 76, category: "Libraries" },
      { name: "Matplotlib & Seaborn", level: 88, category: "Libraries" },
      { name: "Git & GitHub", level: 85, category: "Tools" },
      { name: "VS Code", level: 92, category: "Tools" },
      { name: "Microsoft Excel & PowerPoint", level: 88, category: "Tools" }
    ]
  },
  {
    title: "Data & Databases",
    icon: "Database",
    description: "Data modeling, statistical inference, and database querying",
    skills: [
      { name: "Descriptive & Inferential Statistics", level: 86, category: "Data" },
      { name: "Hypothesis Testing", level: 84, category: "Data" },
      { name: "MySQL (Basics)", level: 76, category: "Database" },
      { name: "MongoDB", level: 78, category: "Database" }
    ]
  },
  {
    title: "Web Development",
    icon: "Globe",
    description: "Interactive front-end user interfaces and responsive web design",
    skills: [
      { name: "HTML5", level: 90, category: "Web" },
      { name: "CSS3 & Tailwind", level: 88, category: "Web" },
      { name: "JavaScript", level: 82, category: "Web" },
      { name: "Front-End Development", level: 85, category: "Web" }
    ]
  }
];

export const CERTIFICATIONS = [
  {
    title: "Python Fundamentals",
    issuer: "Infosys Springboard",
    credentialId: "INF-PY-FUND",
    category: "Programming",
    icon: "Terminal",
    date: "Certified",
    description: "Comprehensive mastery in core Python data structures, algorithms, object-oriented principles, and scripting."
  },
  {
    title: "Machine Learning",
    issuer: "Infosys Springboard",
    credentialId: "INF-ML-SPEC",
    category: "Artificial Intelligence",
    icon: "Cpu",
    date: "Certified",
    description: "In-depth training on predictive modeling, regression, classification, clustering, model validation, and metrics."
  },
  {
    title: "Computer Vision",
    issuer: "Infosys Springboard",
    credentialId: "INF-CV-ADV",
    category: "Deep Learning",
    icon: "Eye",
    date: "Certified",
    description: "Image processing, spatial convolutions, feature extraction, object detection frameworks, and visual intelligence."
  }
];

export const EDUCATION = [
  {
    institution: "Coimbatore Institute of Engineering and Technology",
    degree: "B. Tech, Artificial Intelligence and Data Science",
    period: "2023 – Present",
    score: "CGPA: 7.52 / 10",
    location: "Coimbatore, Tamil Nadu",
    highlights: [
      "Rigorous curriculum covering Advanced ML, Deep Learning, Statistics, and Algorithm Design.",
      "Active participant in autonomous drone development competitions (SAEINDIA Challenge).",
      "Multiple internship completions alongside full-time degree coursework."
    ]
  },
  {
    institution: "Bharani Park Matric Hr. Sec. School",
    degree: "Higher Secondary Certificate (HSC)",
    period: "2022 – 2023",
    score: "Completed with Distinction",
    location: "Tamil Nadu",
    highlights: ["Strong foundation in Mathematics, Physics, and Computer Science fundamentals."]
  },
  {
    institution: "Bharani Park Matric Hr. Sec. School",
    degree: "Secondary School Leaving Certificate (SSLC)",
    period: "2020 – 2021",
    score: "Completed with Distinction",
    location: "Tamil Nadu",
    highlights: ["Academic excellence across STEM disciplines and analytical coursework."]
  }
];

export const KEY_COMPETENCES = [
  { name: "Problem Solving", desc: "Decomposing complex technical challenges into modular, verifiable steps." },
  { name: "Analytical Thinking", desc: "Rigorous statistical validation and empirical hypothesis testing." },
  { name: "AI/ML Application Development", desc: "Translating theoretical models into production-ready software solutions." },
  { name: "Data Analysis", desc: "Extracting actionable insights from high-dimensional datasets using Pandas & Seaborn." },
  { name: "Automation", desc: "Designing autonomous workflows for GPS drone routing and data pipelines." },
  { name: "Team Collaboration", desc: "Active participation in sprint reviews, technical discussions, and cross-functional teams." }
];

export const LANGUAGES = [
  { name: "Tamil", proficiency: "Native / Bilingual", level: 100 },
  { name: "English", proficiency: "Professional Working", level: 90 },
  { name: "Telugu", proficiency: "Conversational", level: 75 }
];

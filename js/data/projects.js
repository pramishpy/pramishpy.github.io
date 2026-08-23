/**
 * Projects Data - Single Source of Truth
 */

export const projectsData = [
    {
        id: "ai-transcript-verification",
        title: "AI Transcript Verification for MS Board of Nursing",
        icon: "fa-file-medical",
        category: "ai-llms",
        categoryLabel: "AI & Systems",
        featured: true,
        summary: "Human-in-the-loop AI system using AWS Lambda, Django, and Amazon Textract to automate nursing transcript verification, reducing document processing from days to 2-4 standardized minutes.",
        highlight: "Engineered a Python rule engine with 13 licensure rules to detect fraud patterns with 100% decision transparency and strict PII isolation.",
        techStack: ["AWS Lambda", "Django", "Amazon Textract", "Python", "React", "Human-in-the-Loop", "PII Security"],
        liveUrl: "https://d3sdke4b9dybsk.cloudfront.net",
        githubUrl: null,
        caseStudyUrl: null
    },
    {
        id: "polymer-morphology",
        title: "Polymer Morphology Research Platform",
        icon: "fa-atom",
        category: "systems",
        categoryLabel: "Systems & ETL",
        featured: true,
        summary: "Full-stack research platform with Django, React, PostgreSQL on GCP, managing enterprise data models and automated ETL workflows for 50,000+ experimental records.",
        highlight: "Reduced bulk record upload time by 97%, powering analytical dashboards, Plotly visualizations, and standardized data governance for scientists.",
        techStack: ["Python", "Django", "Django REST", "PostgreSQL", "React", "Plotly.js", "GCP", "ETL Pipelines"],
        liveUrl: "https://polymermorphology.org",
        githubUrl: null,
        caseStudyUrl: null
    },
    {
        id: "polyvision",
        title: "PolyVision: Polymer Image Analysis & Vision App",
        icon: "fa-microscope",
        category: "vision",
        categoryLabel: "Computer Vision",
        featured: true,
        summary: "Cross-platform desktop application in C++ and Qt 6 for high-throughput polymer microscopy image analysis, advanced segmentation, and statistical morphological characterization.",
        highlight: "Achieved 10-15x faster image processing compared to manual methods with 95%+ detection accuracy and multi-threaded batch processing.",
        techStack: ["C++20", "Qt 6", "OpenCV", "CMake", "Qt Charts", "QCustomPlot", "Multi-Threading"],
        liveUrl: null,
        githubUrl: "https://github.com/pramishpy/PolyVision",
        caseStudyUrl: "polyvision-case-study.html"
    },
    {
        id: "collabnet",
        title: "CollabNet: Research & Developer Collaboration",
        icon: "fa-users-gear",
        category: "systems",
        categoryLabel: "Systems & Web",
        featured: true,
        summary: "High-performance platform connecting developers and research collaborators, architected with Next.js, React, and PostgreSQL achieving a 98/100 Lighthouse performance score.",
        highlight: "Engineered PostgreSQL schemas for 1,000+ concurrent transactions with Row Level Security (RLS) ensuring defensive data isolation.",
        techStack: ["Next.js", "React", "PostgreSQL", "SQL", "Row Level Security", "Performance Tuning"],
        liveUrl: "https://collabnet.vercel.app/",
        githubUrl: null,
        caseStudyUrl: null
    },
    {
        id: "mentally",
        title: "Mentally: Automated CI/CD & AR Health App",
        icon: "fa-brain",
        category: "ai-llms",
        categoryLabel: "AI & AR",
        featured: false,
        summary: "Autonomous deployment infrastructure using GitHub Actions and Docker with unit testing pipelines, paired with a Flask backend and WebAR experiences.",
        highlight: "Maintained 99.9% uptime with rigorous automated test suites and validation workflows for interactive augmented reality sessions.",
        techStack: ["GitHub Actions", "Docker", "Flask", "Python", "A-Frame", "AR.js", "CI/CD"],
        liveUrl: "https://mentally.pramishpandey.com.np/",
        githubUrl: null,
        caseStudyUrl: null
    },
    {
        id: "digital-galatea",
        title: "Digital Galatea 2025: Affective Conversational AI",
        icon: "fa-robot",
        category: "ai-llms",
        categoryLabel: "AI & LLMs",
        featured: false,
        summary: "Affective conversational AI application exploring simulated human emotions and emotional memory in multi-turn dialogues.",
        highlight: "Integrated Gemini API with custom contextual prompt chaining and sentiment weighting in Python.",
        techStack: ["Gemini API", "Python", "JavaScript", "HTML5", "CSS3"],
        liveUrl: null,
        githubUrl: "https://github.com/pramishpy/Digital-Galatea",
        caseStudyUrl: null
    },
    {
        id: "codebusters",
        title: "CodeBusters: Interactive Code Learning Platform",
        icon: "fa-code",
        category: "open-source",
        categoryLabel: "Open Source",
        featured: false,
        summary: "Interactive browser-based coding education platform featuring real-time client-side code execution with Skulpt and PrismJS syntax highlighting.",
        highlight: "Structured modular programming curricula with instant test evaluation in the browser.",
        techStack: ["JavaScript", "HTML5", "CSS3", "Skulpt", "PrismJS"],
        liveUrl: "https://pramishpandey.com.np/CodeBusters/",
        githubUrl: "https://github.com/pramishpy/CodeBusters",
        caseStudyUrl: null
    },
    {
        id: "ms-license-test",
        title: "Mississippi License Practice System",
        icon: "fa-car-side",
        category: "open-source",
        categoryLabel: "Web Utility",
        featured: false,
        summary: "Accessible online practice test platform for the Mississippi state computerized license examination with instant feedback scoring.",
        highlight: "Engineered randomized question generation and localized offline storage support.",
        techStack: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
        liveUrl: "https://pramishpy.github.io/mississippi-license-practice-tests/",
        githubUrl: "https://github.com/pramishpy/mississippi-license-practice-tests",
        caseStudyUrl: null
    }
];

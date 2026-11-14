"""
Career Taxonomy & Industry Benchmark Skill Matrices
Defines core expectations for various tech career paths.
Note: SkillPath AI benchmarks against open market standards and does NOT promise employment.
"""

CAREER_TAXONOMY = {
    "Full-Stack AI Engineer": {
        "title": "Full-Stack AI Engineer",
        "slug": "full-stack-ai-engineer",
        "domain": "Artificial Intelligence & Web Engineering",
        "description": "Bridges web applications with generative AI, LLM orchestrations, modern frontends, and robust backend APIs.",
        "market_demand": "Very High",
        "average_readiness_benchmark": 85,
        "required_skills": {
            "Python": "Intermediate",
            "FastAPI": "Intermediate",
            "React": "Intermediate",
            "Docker": "Beginner",
            "LLM Orchestration": "Intermediate",
            "SQL": "Beginner",
            "Git": "Intermediate"
        },
        "secondary_skills": ["Vector Databases", "TypeScript", "Tailwind CSS", "Redis"],
        "match_weights": {
            "Python": 20,
            "FastAPI": 15,
            "React": 15,
            "LLM Orchestration": 20,
            "Docker": 10,
            "SQL": 10,
            "Git": 10
        },
        "suitability_keywords": ["ai", "full-stack", "python", "react", "llm", "backend", "web"]
    },
    "Data Scientist & ML Specialist": {
        "title": "Data Scientist & ML Specialist",
        "slug": "data-scientist-ml-specialist",
        "domain": "Data Science & Machine Learning",
        "description": "Analyzes complex datasets, builds predictive models, conducts statistical testing, and trains machine learning pipelines.",
        "market_demand": "High",
        "average_readiness_benchmark": 80,
        "required_skills": {
            "Python": "Advanced",
            "Machine Learning": "Intermediate",
            "SQL": "Intermediate",
            "Data Analysis": "Advanced",
            "Statistics": "Intermediate",
            "Git": "Beginner"
        },
        "secondary_skills": ["PyTorch", "Pandas", "Scikit-Learn", "Data Visualization"],
        "match_weights": {
            "Python": 25,
            "Machine Learning": 25,
            "SQL": 15,
            "Data Analysis": 15,
            "Statistics": 10,
            "Git": 10
        },
        "suitability_keywords": ["data", "machine learning", "statistics", "math", "python", "analytics"]
    },
    "Cloud DevOps & Platform Engineer": {
        "title": "Cloud DevOps & Platform Engineer",
        "slug": "cloud-devops-platform-engineer",
        "domain": "Cloud Infrastructure & SRE",
        "description": "Automates deployment pipelines, ensures cloud scalability, maintains Kubernetes clusters, and monitors infrastructure reliability.",
        "market_demand": "Very High",
        "average_readiness_benchmark": 85,
        "required_skills": {
            "Docker": "Intermediate",
            "Linux": "Intermediate",
            "CI/CD Pipelines": "Intermediate",
            "Cloud Infrastructure": "Intermediate",
            "Python": "Beginner",
            "Git": "Intermediate"
        },
        "secondary_skills": ["Kubernetes", "Terraform", "AWS", "Bash Scripting"],
        "match_weights": {
            "Docker": 25,
            "Linux": 20,
            "CI/CD Pipelines": 20,
            "Cloud Infrastructure": 15,
            "Python": 10,
            "Git": 10
        },
        "suitability_keywords": ["cloud", "devops", "docker", "infrastructure", "linux", "automation"]
    },
    "Frontend Architect & UI Engineer": {
        "title": "Frontend Architect & UI Engineer",
        "slug": "frontend-architect-ui-engineer",
        "domain": "User Experience & Web Applications",
        "description": "Specializes in craft, responsive user interfaces, accessible design systems, client-side state management, and web performance.",
        "market_demand": "High",
        "average_readiness_benchmark": 80,
        "required_skills": {
            "React": "Advanced",
            "JavaScript": "Advanced",
            "HTML/CSS": "Advanced",
            "Tailwind CSS": "Intermediate",
            "TypeScript": "Intermediate",
            "Git": "Intermediate"
        },
        "secondary_skills": ["Next.js", "State Management", "Web Performance", "Testing"],
        "match_weights": {
            "React": 30,
            "JavaScript": 25,
            "HTML/CSS": 15,
            "Tailwind CSS": 10,
            "TypeScript": 10,
            "Git": 10
        },
        "suitability_keywords": ["frontend", "ui", "ux", "react", "javascript", "web", "design"]
    },
    "Backend Systems & API Engineer": {
        "title": "Backend Systems & API Engineer",
        "slug": "backend-systems-api-engineer",
        "domain": "Systems & Database Architecture",
        "description": "Designs high-throughput REST and GraphQL APIs, manages database normalization, caching, security, and microservice architectures.",
        "market_demand": "Very High",
        "average_readiness_benchmark": 85,
        "required_skills": {
            "Python": "Intermediate",
            "FastAPI": "Intermediate",
            "SQL": "Intermediate",
            "Docker": "Beginner",
            "System Design": "Beginner",
            "Git": "Intermediate"
        },
        "secondary_skills": ["PostgreSQL", "Redis", "Microservices", "Security"],
        "match_weights": {
            "Python": 25,
            "FastAPI": 20,
            "SQL": 20,
            "Docker": 15,
            "System Design": 10,
            "Git": 10
        },
        "suitability_keywords": ["backend", "api", "database", "python", "sql", "systems"]
    },
    "Cybersecurity & DevSecOps Analyst": {
        "title": "Cybersecurity & DevSecOps Analyst",
        "slug": "cybersecurity-devsecops-analyst",
        "domain": "Information Security & Threat Analysis",
        "description": "Safeguards systems against vulnerabilities, implements defensive configurations, audits code, and monitors threat intelligence.",
        "market_demand": "Very High",
        "average_readiness_benchmark": 85,
        "required_skills": {
            "Linux": "Intermediate",
            "Networking": "Intermediate",
            "Security Fundamentals": "Intermediate",
            "Python": "Beginner",
            "Docker": "Beginner",
            "Git": "Beginner"
        },
        "secondary_skills": ["Penetration Testing", "Cryptography", "OWASP", "SIEM"],
        "match_weights": {
            "Security Fundamentals": 30,
            "Networking": 25,
            "Linux": 20,
            "Python": 10,
            "Docker": 10,
            "Git": 5
        },
        "suitability_keywords": ["security", "cyber", "networking", "linux", "threat", "audit"]
    }
}

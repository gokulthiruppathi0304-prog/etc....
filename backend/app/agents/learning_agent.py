"""
Agent E: Learning Recommendation Agent
Recommends curated, high-impact free learning resources and practice exercises for missing skills.
"""

from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent

RESOURCE_CATALOG = {
    "FastAPI": [
        {"title": "Official FastAPI Tutorial - User Guide", "type": "Documentation", "url": "https://fastapi.tiangolo.com/tutorial/", "time": "3 hours"},
        {"title": "Building Production APIs with Pydantic v2 & AsyncIO", "type": "Interactive Guide", "url": "https://fastapi.tiangolo.com/async/", "time": "2 hours"},
        {"title": "FastAPI Full-Stack GitHub Template & Best Practices", "type": "Repository", "url": "https://github.com/tiangolo/full-stack-fastapi-template", "time": "4 hours"}
    ],
    "React": [
        {"title": "React.dev Interactive Quick Start & Hooks in Depth", "type": "Interactive Tutorial", "url": "https://react.dev/learn", "time": "4 hours"},
        {"title": "Thinking in React: Component State Architecture", "type": "Documentation", "url": "https://react.dev/learn/thinking-in-react", "time": "2 hours"},
        {"title": "Building Responsive Dashboards with Tailwind CSS & Lucide", "type": "Code Sandbox", "url": "https://tailwindcss.com/docs", "time": "3 hours"}
    ],
    "Docker": [
        {"title": "Docker 101: Containerization Fundamentals for Web Apps", "type": "Interactive Lab", "url": "https://docs.docker.com/get-started/", "time": "2 hours"},
        {"title": "Writing Production Multi-Stage Dockerfiles for Python & Node", "type": "Documentation", "url": "https://docs.docker.com/build/building/multi-stage/", "time": "2 hours"}
    ],
    "LLM Orchestration": [
        {"title": "Autonomous Agents & Tool Calling Architecture", "type": "Guide", "url": "https://python.langchain.com/docs/concepts/", "time": "3 hours"},
        {"title": "Prompt Engineering & Structured Outputs with Pydantic", "type": "Interactive Lab", "url": "https://cookbook.openai.com/", "time": "2.5 hours"}
    ],
    "SQL": [
        {"title": "PostgreSQL Exercises & Complex Analytical Queries", "type": "Practice Sandbox", "url": "https://pgexercises.com/", "time": "3 hours"},
        {"title": "Database Normalization, Foreign Keys & Indexes", "type": "Documentation", "url": "https://www.postgresql.org/docs/", "time": "2 hours"}
    ],
    "Git": [
        {"title": "Git Branching Interactive Visualizer", "type": "Interactive Game", "url": "https://learngitbranching.js.org/", "time": "1.5 hours"},
        {"title": "Conventional Commits & Semantic Versioning", "type": "Reference", "url": "https://www.conventionalcommits.org/", "time": "1 hour"}
    ]
}

class LearningRecommendationAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-learning-recommendations",
            name="Learning Recommendation Agent",
            role="Curriculum & Resource Curator",
            description="Matches identified skill gaps to free high-quality documentation, interactive exercises, and practice sandboxes.",
            icon="BookOpen"
        )

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        gaps = input_data.get("gaps", [])
        recommendations: List[Dict[str, Any]] = []

        for gap in gaps[:4]:
            skill_name = gap.get("skill") if isinstance(gap, dict) else ""
            priority = gap.get("priority", "Medium") if isinstance(gap, dict) else "Medium"
            
            resources = RESOURCE_CATALOG.get(skill_name, [
                {"title": f"Complete {skill_name} Developer Guide", "type": "Documentation", "url": f"https://devdocs.io", "time": "3 hours"},
                {"title": f"Hands-on {skill_name} Sandbox Exercises", "type": "Interactive Lab", "url": "https://github.com", "time": "2 hours"}
            ])

            recommendations.append({
                "skill": skill_name,
                "priority": priority,
                "recommended_action": f"Focus {gap.get('weight', 15)}% of study hours on {skill_name} practical projects.",
                "resources": resources
            })

        return {
            "total_curated_skills": len(recommendations),
            "recommendations": recommendations,
            "source_type": "rule-based"
        }

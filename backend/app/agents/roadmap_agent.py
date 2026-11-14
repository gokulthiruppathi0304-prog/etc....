"""
Agent F: Roadmap Agent
Constructs structured, adaptive weekly learning milestones tailored to the learner's
skill gaps, weekly commitment, and target career pathway.
"""

from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.models.roadmap import Roadmap, WeekModule, TaskItem

ROADMAP_TEMPLATES = {
    "Full-Stack AI Engineer": [
        {
            "week": 1,
            "skill": "FastAPI",
            "title": "Modern Python APIs & Pydantic Validation",
            "objective": "Build high-speed asynchronous REST APIs with request validation, dependency injection, and automatic OpenAPI documentation.",
            "practice_task": "Create 3 CRUD endpoints with Pydantic request & response models.",
            "project": "Build an AI Job Description Parser API that validates payload schemas.",
            "hours": 10,
            "tasks": [
                {"id": "t1-1", "title": "Setup virtual environment and install FastAPI & Uvicorn", "type": "practice"},
                {"id": "t1-2", "title": "Implement Pydantic models with strict typing and constraints", "type": "practice"},
                {"id": "t1-3", "title": "Build modular API router with Dependency Injection", "type": "project"}
            ]
        },
        {
            "week": 2,
            "skill": "React",
            "title": "Interactive Frontend & State Architecture",
            "objective": "Master React functional components, custom hooks, and Tailwind CSS for modern responsive dashboards.",
            "practice_task": "Build dynamic search filter and progress bar components with useState and useEffect.",
            "project": "Build a responsive Analytics Dashboard that fetches data from your FastAPI backend.",
            "hours": 12,
            "tasks": [
                {"id": "t2-1", "title": "Configure Vite + React with Tailwind CSS and Lucide icons", "type": "practice"},
                {"id": "t2-2", "title": "Implement stateful dashboard cards and interactive filter tags", "type": "practice"},
                {"id": "t2-3", "title": "Connect frontend API client to FastAPI endpoints using fetch/Axios", "type": "project"}
            ]
        },
        {
            "week": 3,
            "skill": "LLM Orchestration",
            "title": "Agentic Workflows & Tool Calling",
            "objective": "Design multi-agent architectures that decompose complex requests into discrete specialized worker agents.",
            "practice_task": "Implement an orchestrator pattern with fallback deterministic rule-based algorithms.",
            "project": "Engineer a Career Digital Twin agent that updates learner capability vectors.",
            "hours": 12,
            "tasks": [
                {"id": "t3-1", "title": "Structure BaseAgent with timing instrumentation and status logging", "type": "practice"},
                {"id": "t3-2", "title": "Implement fallback handlers for zero-key offline execution", "type": "practice"},
                {"id": "t3-3", "title": "Assemble Central Orchestrator synthesizing multi-agent outputs", "type": "project"}
            ]
        },
        {
            "week": 4,
            "skill": "Docker",
            "title": "Containerization & Production Packaging",
            "objective": "Package full-stack web and AI applications into reproducible, lightweight Docker containers.",
            "practice_task": "Write multi-stage Dockerfiles for both frontend (Nginx) and backend (Python).",
            "project": "Create a docker-compose.yml file that launches frontend, backend, and PostgreSQL with one command.",
            "hours": 10,
            "tasks": [
                {"id": "t4-1", "title": "Write optimized backend Dockerfile using non-root user", "type": "practice"},
                {"id": "t4-2", "title": "Configure multi-container Docker Compose with networking", "type": "practice"},
                {"id": "t4-3", "title": "Perform healthcheck and volume persistence testing", "type": "project"}
            ]
        },
        {
            "week": 5,
            "skill": "SQL & Vector Databases",
            "title": "Relational Data Modeling & Retrieval",
            "objective": "Design relational schemas and explore embeddings for contextual semantic retrieval.",
            "practice_task": "Write complex SQL queries with JOINs, aggregations, and subqueries.",
            "project": "Implement persistent career roadmaps and user profile storage in Supabase/PostgreSQL.",
            "hours": 10,
            "tasks": [
                {"id": "t5-1", "title": "Design normalized schema for learner profiles and assessments", "type": "practice"},
                {"id": "t5-2", "title": "Connect database connection pool to FastAPI lifecycle", "type": "practice"},
                {"id": "t5-3", "title": "Implement CRUD migration scripts", "type": "project"}
            ]
        },
        {
            "week": 6,
            "skill": "System Integration",
            "title": "Full-Stack AI Capstone Deployment",
            "objective": "Integrate end-to-end telemetry, error boundaries, assessment labs, and live deployment.",
            "practice_task": "Write automated end-to-end integration tests using pytest.",
            "project": "Deploy and demo your complete SkillPath AI application with live documentation.",
            "hours": 14,
            "tasks": [
                {"id": "t6-1", "title": "Run full backend test suite with Pytest and verify coverage", "type": "practice"},
                {"id": "t6-2", "title": "Polish UI transitions, empty states, and toast notifications", "type": "practice"},
                {"id": "t6-3", "title": "Record 3-minute hackathon demo video and document setup", "type": "project"}
            ]
        }
    ]
}

class RoadmapAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-roadmap",
            name="Roadmap Agent",
            role="Personalized Learning Path Engineer",
            description="Generates weekly milestone curricula with objectives, tasks, and deliverables customized to career goals.",
            icon="Milestone"
        )

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        target_career = input_data.get("target_career", "Full-Stack AI Engineer")
        weekly_hours = input_data.get("weekly_hours", 10)
        revision_skills = input_data.get("revision_skills", [])
        existing_roadmap = input_data.get("existing_roadmap")

        # Pick template or build customized weekly modules
        template_weeks = ROADMAP_TEMPLATES.get(target_career)
        if not template_weeks:
            # Fallback template adapted to target career
            template_weeks = ROADMAP_TEMPLATES["Full-Stack AI Engineer"]

        modules: List[Dict[str, Any]] = []
        total_tasks = 0
        completed_tasks = 0

        # Check existing completion status if updating existing roadmap
        completed_task_ids = set()
        if existing_roadmap and isinstance(existing_roadmap, dict):
            for mod in existing_roadmap.get("modules", []):
                for t in mod.get("tasks", []):
                    if t.get("completed"):
                        completed_task_ids.add(t.get("id"))

        for item in template_weeks:
            tasks_list = []
            for t in item["tasks"]:
                is_done = t["id"] in completed_task_ids
                total_tasks += 1
                if is_done:
                    completed_tasks += 1

                tasks_list.append({
                    "id": t["id"],
                    "title": t["title"],
                    "description": f"Focus on practical implementation for {item['skill']}.",
                    "completed": is_done,
                    "task_type": t.get("type", "practice")
                })

            is_rev = item["skill"] in revision_skills
            modules.append({
                "week_number": item["week"],
                "title": item["title"],
                "skill_focus": item["skill"],
                "learning_objective": item["objective"],
                "practice_task": item["practice_task"],
                "project_deliverable": item["project"],
                "estimated_hours": item["hours"],
                "tasks": tasks_list,
                "is_revision": is_rev,
                "revision_reason": f"Reinforcement flagged: Need to strengthen {item['skill']} concepts." if is_rev else None
            })

        progress_pct = int((completed_tasks / total_tasks * 100)) if total_tasks > 0 else 0

        return {
            "target_career": target_career,
            "total_weeks": len(modules),
            "overall_progress_percentage": progress_pct,
            "total_tasks_count": total_tasks,
            "completed_tasks_count": completed_tasks,
            "modules": modules,
            "source_type": "rule-based"
        }

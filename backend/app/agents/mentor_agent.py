"""
Agent H: AI Mentor Agent
Provides contextual career and engineering mentorship, answering questions
with reference to the student's active profile, gaps, and roadmap.
"""

from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent

class AIMentorAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-mentor",
            name="AI Mentor Agent",
            role="Context-Aware Engineering Mentor",
            description="Interactively guides learners, recommends project architectures, and explains complex skill pathways.",
            icon="Bot"
        )

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        message = input_data.get("message", "").strip().lower()
        profile = input_data.get("profile", {})
        target_career = profile.get("target_career", "Full-Stack AI Engineer")
        skills = [s.get("name") if isinstance(s, dict) else getattr(s, "name", "") for s in profile.get("current_skills", [])]
        name = profile.get("full_name", "Alex")

        # Context-aware rule-based expert matching
        suggested_followups = [
            f"What projects should I build for {target_career}?",
            "How do I prepare for the FastAPI assessment?",
            "What is the difference between Docker images and containers?"
        ]

        if "gap" in message or "missing" in message or "what should i learn" in message:
            reply = (
                f"Hi {name}, based on your target of becoming a **{target_career}**, "
                f"your most urgent gaps are **FastAPI** (for backend API integration) and **Docker** (for containerized deployments). "
                f"I recommend starting with Week 1 of your adaptive roadmap: building a typed API with Pydantic and async endpoints."
            )
            suggested_followups = [
                "Show me the Week 1 FastAPI tasks",
                "How do I start with Docker as a beginner?",
                "How does the Assessment Lab test my skills?"
            ]

        elif "docker" in message or "container" in message:
            reply = (
                "Great question! Think of a **Docker Image** as an immutable blueprint (like a recipe or a class), "
                "and a **Docker Container** as the actual running kitchen or instance executing that recipe. "
                "For your AI and web apps, containerizing guarantees your application behaves identically on your Mac, on Linux, or in cloud deployment."
            )
            suggested_followups = [
                "What is docker-compose used for?",
                "How do I write a Dockerfile for FastAPI?",
                "Take Docker quiz in Assessment Lab"
            ]

        elif "fastapi" in message or "backend" in message or "api" in message:
            reply = (
                "FastAPI is an ideal choice for AI engineers because it natively supports asynchronous I/O (`async def`), "
                "which is critical when waiting for LLM completions or vector searches. Furthermore, Pydantic handles automatic "
                "data validation and OpenAPI documentation at `/docs` right out of the box."
            )
            suggested_followups = [
                "How does Dependency Injection work in FastAPI?",
                "What is ASGI vs WSGI?",
                "Take FastAPI Diagnostic Quiz"
            ]

        elif "project" in message or "portfolio" in message or "hackathon" in message:
            reply = (
                f"To stand out for a **{target_career}** role, don't build another simple to-do list. Instead, build a **Multi-Agent Orchestrator** "
                f"(just like SkillPath AI!) that combines a FastAPI backend, a clean React UI with Tailwind, and autonomous specialized Python workers. "
                f"Demonstrate how you handle graceful fallbacks when external APIs are unavailable!"
            )
            suggested_followups = [
                "How should I structure multi-agent communications?",
                "How to deploy this on a Mac locally?",
                "Explain the Agent Command Center"
            ]

        elif "career" in message or "job" in message or "internship" in message:
            reply = (
                f"For {target_career}, hiring teams look for three proof points: (1) clean, well-tested Python and modern React code, "
                f"(2) containerized reproducible setups with Docker, and (3) realistic understanding of system constraints and latency. "
                f"Your current profile shows good Python fundamentals—focusing on bridging FastAPI and React over the next 4 weeks will dramatically boost your readiness."
            )
            suggested_followups = [
                "What is my current career readiness score?",
                "Compare Full-Stack AI Engineer vs Backend Engineer",
                "How does the Digital Twin measure my skills?"
            ]

        else:
            reply = (
                f"Hello {name}! I'm tracking your progress toward **{target_career}**. "
                f"You currently have verified Python competencies, and your roadmap has structured modules ready for FastAPI, React, and LLM Orchestration. "
                f"Feel free to ask me for architecture advice, code reviews, or concept explanations anytime!"
            )

        return {
            "reply": reply,
            "suggested_followups": suggested_followups,
            "referenced_agent": self.name,
            "source_type": "rule-based"
        }

"""
Agent A: Profile Agent
Analyzes student profile, educational background, interests, and learning styles.
"""

from typing import Dict, Any
from app.agents.base_agent import BaseAgent

class ProfileAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-profile",
            name="Profile Agent",
            role="Student Persona & Interest Synthesizer",
            description="Analyzes background, learning preferences, weekly capacity, and constructs the baseline profile vectors.",
            icon="UserCheck"
        )

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        profile = input_data.get("profile", {})
        skills = profile.get("current_skills", [])
        interests = profile.get("interests", [])
        weekly_hours = profile.get("weekly_hours_commitment", 10)
        education = profile.get("education_level", "Undergraduate")
        learning_style = profile.get("learning_style", "Hands-on projects")

        # Calculate estimated vs assessed ratio
        total_skills = len(skills)
        assessed_skills = sum(1 for s in skills if s.get("status") == "ASSESSED")
        estimated_skills = total_skills - assessed_skills
        
        assessed_ratio_pct = int((assessed_skills / total_skills * 100)) if total_skills > 0 else 0

        # Determine learner velocity archetype
        if weekly_hours >= 15:
            commitment_tier = "Intensive Sprint (Fast Pace)"
        elif weekly_hours >= 8:
            commitment_tier = "Steady Momentum (Standard Hackathon/Semester Pace)"
        else:
            commitment_tier = "Micro-learning (Self-paced Casual)"

        # Infer learner archetype
        interests_lower = [str(i).lower() for i in interests]
        if any("ai" in i or "machine learning" in i for i in interests_lower):
            archetype = "AI-Driven Builder"
        elif any("frontend" in i or "ui" in i for i in interests_lower):
            archetype = "Product & Visual Experience Crafter"
        else:
            archetype = "Systems & Full-Stack Architect"

        summary = (
            f"{profile.get('full_name', 'Learner')} is currently in {education} with an interest in "
            f"{', '.join(interests[:3]) if interests else 'software engineering'}. "
            f"Shows a preference for '{learning_style}' and commits {weekly_hours} hours/week ({commitment_tier})."
        )

        return {
            "learner_archetype": archetype,
            "commitment_tier": commitment_tier,
            "weekly_hours": weekly_hours,
            "total_skills_count": total_skills,
            "assessed_skills_count": assessed_skills,
            "estimated_skills_count": estimated_skills,
            "assessed_ratio_pct": assessed_ratio_pct,
            "synthesis_summary": summary,
            "source_type": "rule-based"
        }

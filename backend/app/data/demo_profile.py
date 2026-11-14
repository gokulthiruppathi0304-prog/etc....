"""
Sample Demo Profile for SkillPath AI 2.0
Used for initial platform startup and one-click demo data reset.
"""

from app.models.profile import LearnerProfile, LearnerSkill, SkillProficiency, SkillVerificationStatus

def get_demo_profile() -> LearnerProfile:
    return LearnerProfile(
        id="demo-learner-001",
        full_name="Alex Chen",
        education_level="Undergraduate (Computer Science, 3rd Year)",
        current_skills=[
            LearnerSkill(
                name="Python",
                level=SkillProficiency.INTERMEDIATE,
                status=SkillVerificationStatus.ASSESSED,
                assessed_score=85
            ),
            LearnerSkill(
                name="Git",
                level=SkillProficiency.INTERMEDIATE,
                status=SkillVerificationStatus.ESTIMATED,
                assessed_score=None
            ),
            LearnerSkill(
                name="JavaScript",
                level=SkillProficiency.BEGINNER,
                status=SkillVerificationStatus.ESTIMATED,
                assessed_score=None
            ),
            LearnerSkill(
                name="HTML/CSS",
                level=SkillProficiency.INTERMEDIATE,
                status=SkillVerificationStatus.ESTIMATED,
                assessed_score=None
            )
        ],
        interests=[
            "Artificial Intelligence",
            "Full-Stack Web Development",
            "Open Source Tools",
            "API Engineering"
        ],
        target_career="Full-Stack AI Engineer",
        learning_style="Hands-on projects with architectural feedback",
        weekly_hours_commitment=12,
        readiness_score=58,
        digital_twin_summary=(
            "Alex has solid fundamental Python competency (assessed at 85%) and Git version control, "
            "with beginner familiarity in JavaScript. Primary skill gaps for the target Full-Stack AI Engineer "
            "role include FastAPI microservices, React UI architecture, Docker containerization, and LLM Orchestration."
        )
    )

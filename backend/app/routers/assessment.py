"""
Assessment Router
Generates skill diagnostic tests and evaluates student submissions.
"""

from fastapi import APIRouter
from typing import Dict, Any
import datetime
from app.database import db
from app.models.assessment import AssessmentGenerateRequest, AssessmentSubmission
from app.models.profile import LearnerSkill, SkillProficiency, SkillVerificationStatus
from app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/api/assessment", tags=["AI Assessment Lab"])

@router.post("/generate")
def generate_assessment(req: AssessmentGenerateRequest) -> Dict[str, Any]:
    """Generates diagnostic multiple-choice questions for the requested skill."""
    result = orchestrator.assessment_agent.run({
        "action": "generate",
        "skill": req.skill,
        "num_questions": req.num_questions
    })
    return result

@router.post("/evaluate")
def evaluate_assessment(sub: AssessmentSubmission) -> Dict[str, Any]:
    """Evaluates student answers, scores the quiz, and upgrades Digital Twin skill status."""
    answers_payload = [
        {"question_id": a.question_id, "selected_option_id": a.selected_option_id}
        for a in sub.answers
    ]

    result = orchestrator.assessment_agent.run({
        "action": "evaluate",
        "skill": sub.skill,
        "answers": answers_payload
    })

    score = result.get("score", 0)
    passed = result.get("passed", False)

    # Update or add skill in Learner Profile
    matched_skill = None
    for s in db.profile.current_skills:
        if s.name.lower() == sub.skill.lower():
            matched_skill = s
            break

    if matched_skill:
        if passed:
            matched_skill.status = SkillVerificationStatus.ASSESSED
            matched_skill.assessed_score = score
            if score >= 85:
                matched_skill.level = SkillProficiency.ADVANCED
            elif score >= 70:
                matched_skill.level = SkillProficiency.INTERMEDIATE
        else:
            # Keep estimated or mark score
            matched_skill.assessed_score = score
    else:
        # Add new skill to profile
        new_level = SkillProficiency.INTERMEDIATE if score >= 70 else SkillProficiency.BEGINNER
        db.profile.current_skills.append(
            LearnerSkill(
                name=sub.skill,
                level=new_level,
                status=SkillVerificationStatus.ASSESSED if passed else SkillVerificationStatus.ESTIMATED,
                assessed_score=score
            )
        )

    # Record in assessment history
    db.assessment_history.insert(0, {
        "skill": sub.skill,
        "score": score,
        "passed": passed,
        "status": "ASSESSED" if passed else "REVISION_RECOMMENDED",
        "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "notes": result.get("evaluation_summary")
    })

    # Log activity
    db.activities.insert(0, {
        "id": f"act-{len(db.activities)+1}",
        "action": f"Assessment: {sub.skill}",
        "detail": f"Scored {score}% ({'PASSED' if passed else 'REVIEW NEEDED'})",
        "time": "Just now",
        "type": "assessment"
    })

    # Trigger orchestrator synchronization
    report = orchestrator.run_full_pipeline(
        profile_data=db.profile.model_dump(),
        existing_roadmap=db.roadmap.model_dump() if db.roadmap else None,
        assessment_history=db.assessment_history
    )
    db.profile.readiness_score = report.readiness_score

    result["updated_readiness_score"] = db.profile.readiness_score
    return result

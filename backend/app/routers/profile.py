"""
Profile Router
Endpoints for managing learner profile, interests, and demo resets.
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import datetime
from app.database import db
from app.config import settings
from app.models.profile import LearnerProfile, ProfileUpdateRequest
from app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/api", tags=["Learner Profile"])

@router.get("/profile")
def get_profile() -> Dict[str, Any]:
    """Returns the current learner profile with storage notice and digital twin metadata."""
    return {
        "profile": db.profile,
        "storage_mode": settings.active_database_mode,
        "storage_notice": settings.storage_limitation_notice,
        "activities": db.activities[:6]
    }

@router.post("/profile")
def update_profile(req: ProfileUpdateRequest) -> Dict[str, Any]:
    """Updates learner profile fields and triggers multi-agent digital twin recalculation."""
    curr = db.profile

    if req.full_name is not None:
        curr.full_name = req.full_name
    if req.education_level is not None:
        curr.education_level = req.education_level
    if req.current_skills is not None:
        curr.current_skills = req.current_skills
    if req.interests is not None:
        curr.interests = req.interests
    if req.target_career is not None:
        curr.target_career = req.target_career
    if req.learning_style is not None:
        curr.learning_style = req.learning_style
    if req.weekly_hours_commitment is not None:
        curr.weekly_hours_commitment = req.weekly_hours_commitment

    curr.updated_at = datetime.datetime.now().isoformat()

    # Trigger orchestrator synchronization
    report = orchestrator.run_full_pipeline(
        profile_data=curr.model_dump(),
        existing_roadmap=db.roadmap.model_dump() if db.roadmap else None,
        assessment_history=db.assessment_history
    )

    curr.readiness_score = report.readiness_score
    curr.digital_twin_summary = report.executive_summary

    # Update or invalidate roadmap so next view adapts to new target career
    if req.target_career is not None:
        from app.models.roadmap import Roadmap
        db.roadmap = Roadmap(**report.roadmap_preview)

    # Log activity
    db.activities.insert(0, {
        "id": f"act-{len(db.activities)+1}",
        "action": "Profile Updated",
        "detail": f"Target: {curr.target_career} | {len(curr.current_skills)} skills declared",
        "time": "Just now",
        "type": "profile"
    })

    return {
        "message": "Profile updated and Digital Twin synchronized successfully.",
        "profile": curr,
        "orchestrator_summary": report.executive_summary,
        "readiness_score": curr.readiness_score
    }

@router.post("/demo/reset")
def reset_demo() -> Dict[str, Any]:
    """Resets the application to initial demo learner state."""
    db.reset_to_demo()
    
    # Run orchestrator pipeline on initial demo data
    report = orchestrator.run_full_pipeline(
        profile_data=db.profile.model_dump(),
        existing_roadmap=None,
        assessment_history=db.assessment_history
    )
    
    from app.models.roadmap import Roadmap
    db.roadmap = Roadmap(**report.roadmap_preview)
    db.profile.readiness_score = report.readiness_score
    db.profile.digital_twin_summary = report.executive_summary

    return {
        "message": "Demo data restored successfully to baseline demo profile.",
        "profile": db.profile,
        "readiness_score": db.profile.readiness_score
    }

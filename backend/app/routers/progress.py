"""
Progress Analytics Router
Provides performance metrics, velocity charts, and assessment logs.
"""

from fastapi import APIRouter
from typing import Dict, Any
from app.database import db
from app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/api/progress", tags=["Progress Analytics"])

@router.get("")
def get_progress() -> Dict[str, Any]:
    """Returns comprehensive learning telemetry and progress analytics."""
    # Ensure roadmap exists
    if not db.roadmap:
        roadmap_dict = orchestrator.roadmap_agent.run({
            "target_career": db.profile.target_career,
            "weekly_hours": db.profile.weekly_hours_commitment
        })
        from app.models.roadmap import Roadmap
        db.roadmap = Roadmap(**roadmap_dict)

    prog_output = orchestrator.progress_agent.run({
        "roadmap": db.roadmap.model_dump(),
        "assessment_history": db.assessment_history,
        "profile": db.profile.model_dump()
    })

    # Prepare weekly completion breakdown for Recharts
    weekly_breakdown = []
    for m in db.roadmap.modules:
        c_count = sum(1 for t in m.tasks if t.completed)
        t_count = len(m.tasks)
        weekly_breakdown.append({
            "week": f"W{m.week_number}",
            "title": m.skill_focus,
            "completed": c_count,
            "total": t_count,
            "pct": int((c_count / t_count * 100)) if t_count > 0 else 0
        })

    return {
        "overview": prog_output,
        "weekly_breakdown": weekly_breakdown,
        "assessment_history": db.assessment_history,
        "readiness_score": db.profile.readiness_score,
        "target_career": db.profile.target_career,
        "source_type": prog_output.get("source_type", "rule-based")
    }

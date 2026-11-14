"""
Roadmap Router
Manages adaptive weekly learning paths and task completion tracking.
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import datetime
from app.database import db
from app.models.roadmap import Roadmap, TaskToggleRequest
from app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/api/roadmap", tags=["Adaptive Learning Roadmap"])

@router.get("")
def get_roadmap() -> Dict[str, Any]:
    """Retrieves current personalized roadmap or synthesizes one if none exists."""
    if not db.roadmap or db.roadmap.target_career != db.profile.target_career:
        # Check struggling skills
        progress_out = orchestrator.progress_agent.run({
            "profile": db.profile.model_dump(),
            "assessment_history": db.assessment_history
        })
        
        roadmap_dict = orchestrator.roadmap_agent.run({
            "target_career": db.profile.target_career,
            "weekly_hours": db.profile.weekly_hours_commitment,
            "revision_skills": progress_out.get("struggling_skills", []),
            "existing_roadmap": db.roadmap.model_dump() if db.roadmap else None
        })
        db.roadmap = Roadmap(**roadmap_dict)

    return {
        "roadmap": db.roadmap,
        "target_career": db.profile.target_career,
        "source_type": db.roadmap.source_type
    }

@router.post("/update")
def toggle_task(req: TaskToggleRequest) -> Dict[str, Any]:
    """Marks a roadmap task complete or incomplete, updating progress metrics."""
    if not db.roadmap:
        get_roadmap()

    found = False
    task_name = ""
    for module in db.roadmap.modules:
        if module.week_number == req.week_number:
            for t in module.tasks:
                if t.id == req.task_id:
                    t.completed = req.completed
                    task_name = t.title
                    found = True
                    break
        if found:
            break

    if not found:
        raise HTTPException(status_code=404, detail="Task not found in roadmap")

    # Recalculate progress percentage
    total_tasks = 0
    completed_tasks = 0
    for m in db.roadmap.modules:
        for t in m.tasks:
            total_tasks += 1
            if t.completed:
                completed_tasks += 1

    db.roadmap.overall_progress_percentage = int((completed_tasks / total_tasks * 100)) if total_tasks > 0 else 0
    db.roadmap.last_adapted_at = datetime.datetime.now().isoformat()

    # Log activity
    db.activities.insert(0, {
        "id": f"act-{len(db.activities)+1}",
        "action": "Task " + ("Completed" if req.completed else "Reopened"),
        "detail": f"Week {req.week_number}: {task_name}",
        "time": "Just now",
        "type": "roadmap"
    })

    return {
        "message": "Task updated successfully",
        "overall_progress_percentage": db.roadmap.overall_progress_percentage,
        "roadmap": db.roadmap
    }

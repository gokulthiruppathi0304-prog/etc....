"""
Agent Command Center Router
Telemetry, execution inspector, and orchestration trigger for all eight specialized agents.
"""

from fastapi import APIRouter
from typing import Dict, Any
from app.database import db
from app.agents.orchestrator import orchestrator
from app.models.agent import OrchestratorReport

router = APIRouter(prefix="/api/agents", tags=["Agent Command Center"])

@router.get("/status")
def get_agents_status() -> Dict[str, Any]:
    """Returns the live status, execution timing, and I/O payloads of all eight agents."""
    statuses = orchestrator.get_all_agent_statuses()
    return {
        "total_agents": len(statuses),
        "agents": list(statuses.values()),
        "orchestrator_state": "ACTIVE"
    }

@router.post("/trigger-pipeline", response_model=OrchestratorReport)
def trigger_orchestrator_pipeline() -> OrchestratorReport:
    """Executes the full eight-agent coordinated pipeline and returns a synthesized intelligence report."""
    report = orchestrator.run_full_pipeline(
        profile_data=db.profile.model_dump(),
        existing_roadmap=db.roadmap.model_dump() if db.roadmap else None,
        assessment_history=db.assessment_history
    )
    
    # Synchronize updated readiness to profile
    db.profile.readiness_score = report.readiness_score
    db.profile.digital_twin_summary = report.executive_summary

    # Log activity
    db.activities.insert(0, {
        "id": f"act-{len(db.activities)+1}",
        "action": "Multi-Agent Synthesis",
        "detail": f"Executed full 8-agent pipeline (Readiness: {report.readiness_score}%)",
        "time": "Just now",
        "type": "agents"
    })

    return report

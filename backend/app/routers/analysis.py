"""
Analysis & Career Matching Router
Endpoints for skill gap analysis and career compatibility evaluation.
"""

from fastapi import APIRouter
from typing import Dict, Any, Optional
from pydantic import BaseModel
from app.database import db
from app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/api", tags=["Analysis & Career Matching"])

class AnalyzeRequest(BaseModel):
    target_career: Optional[str] = None

class CareerMatchRequest(BaseModel):
    include_all_domains: bool = True

@router.post("/analyze")
def analyze_skills(req: Optional[AnalyzeRequest] = None) -> Dict[str, Any]:
    """Analyzes current learner skills against target career requirements."""
    target_career = (req.target_career if req and req.target_career else db.profile.target_career)
    
    skill_output = orchestrator.skill_agent.run({
        "profile": db.profile.model_dump(),
        "target_career": target_career
    })
    
    profile_output = orchestrator.profile_agent.run({
        "profile": db.profile.model_dump()
    })

    learning_output = orchestrator.learning_agent.run({
        "gaps": skill_output.get("all_gaps", []),
        "target_career": target_career
    })

    return {
        "target_career": target_career,
        "readiness_score": skill_output.get("readiness_score", 58),
        "total_gaps_count": skill_output.get("total_gaps_count", 0),
        "high_priority_gaps": skill_output.get("high_priority_gaps", []),
        "all_gaps": skill_output.get("all_gaps", []),
        "chart_comparison": skill_output.get("chart_comparison", []),
        "learning_recommendations": learning_output.get("recommendations", []),
        "persona_summary": profile_output.get("synthesis_summary"),
        "source_type": skill_output.get("source_type", "rule-based")
    }

@router.post("/career-match")
def match_careers(req: Optional[CareerMatchRequest] = None) -> Dict[str, Any]:
    """Evaluates compatibility scores across all tech career pathways."""
    career_output = orchestrator.career_agent.run({
        "profile": db.profile.model_dump()
    })

    return {
        "career_matches": career_output.get("career_matches", []),
        "top_match": career_output.get("top_match"),
        "disclaimer": career_output.get("disclaimer"),
        "source_type": career_output.get("source_type", "rule-based")
    }

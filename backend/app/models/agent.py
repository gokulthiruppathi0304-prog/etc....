from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
import datetime

class AgentMetadata(BaseModel):
    id: str
    name: str
    role: str
    description: str
    icon: str
    status: str = "IDLE"  # IDLE, RUNNING, SUCCESS, ERROR
    source_type: str = "rule-based"  # rule-based or llm
    last_run_timestamp: Optional[str] = None
    execution_time_ms: Optional[int] = 0
    input_payload: Optional[Dict[str, Any]] = None
    output_payload: Optional[Dict[str, Any]] = None

class OrchestratorReport(BaseModel):
    pipeline_status: str = "SUCCESS"
    executed_at: str = Field(default_factory=lambda: datetime.datetime.now().isoformat())
    total_agents: int = 8
    source_type: str = "rule-based"
    readiness_score: int
    executive_summary: str
    agent_status_map: Dict[str, AgentMetadata]
    digital_twin_state: Dict[str, Any]
    skill_gaps: List[Dict[str, Any]]
    career_matches: List[Dict[str, Any]]
    roadmap_preview: Dict[str, Any]
    recommended_next_action: str

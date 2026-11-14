from typing import List, Optional
from pydantic import BaseModel, Field
import datetime

class TaskItem(BaseModel):
    id: str
    title: str
    description: str
    completed: bool = False
    task_type: str = "practice"  # 'concept', 'practice', 'project'

class WeekModule(BaseModel):
    week_number: int
    title: str
    skill_focus: str
    learning_objective: str
    practice_task: str
    project_deliverable: str
    estimated_hours: int = 10
    tasks: List[TaskItem] = []
    is_revision: bool = False
    revision_reason: Optional[str] = None

class Roadmap(BaseModel):
    id: str = "roadmap-001"
    target_career: str
    total_weeks: int = 6
    overall_progress_percentage: int = 0
    modules: List[WeekModule] = []
    generated_by: str = "Roadmap Agent (Multi-Agent Engine)"
    source_type: str = "rule-based"  # 'rule-based' or 'llm'
    last_adapted_at: str = Field(default_factory=lambda: datetime.datetime.now().isoformat())

class TaskToggleRequest(BaseModel):
    week_number: int
    task_id: str
    completed: bool

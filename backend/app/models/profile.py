from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field
import datetime

class SkillProficiency(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"

class SkillVerificationStatus(str, Enum):
    ESTIMATED = "ESTIMATED"
    ASSESSED = "ASSESSED"

class LearnerSkill(BaseModel):
    name: str
    level: SkillProficiency = SkillProficiency.BEGINNER
    status: SkillVerificationStatus = SkillVerificationStatus.ESTIMATED
    assessed_score: Optional[int] = Field(default=None, description="Score 0-100 if assessed by AI Assessment Lab")

class LearnerProfile(BaseModel):
    id: str = "demo-learner-001"
    full_name: str = "Alex Chen"
    education_level: str = "Undergraduate (Computer Science)"
    current_skills: List[LearnerSkill] = []
    interests: List[str] = []
    target_career: str = "Full-Stack AI Engineer"
    learning_style: str = "Hands-on projects with code reviews"
    weekly_hours_commitment: int = 12
    readiness_score: int = 58
    digital_twin_summary: Optional[str] = None
    updated_at: str = Field(default_factory=lambda: datetime.datetime.now().isoformat())

class ProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    education_level: Optional[str] = None
    current_skills: Optional[List[LearnerSkill]] = None
    interests: Optional[List[str]] = None
    target_career: Optional[str] = None
    learning_style: Optional[str] = None
    weekly_hours_commitment: Optional[int] = None

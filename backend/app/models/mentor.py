from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
import datetime

class ChatMessage(BaseModel):
    id: str
    sender: str  # 'student' or 'mentor'
    text: str
    timestamp: str = Field(default_factory=lambda: datetime.datetime.now().strftime("%I:%M %p"))
    source_type: Optional[str] = "rule-based"

class MentorChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None

class MentorChatResponse(BaseModel):
    reply: str
    source_type: str = "rule-based"  # 'rule-based' or 'llm'
    suggested_followups: List[str] = []
    referenced_agent: str = "AI Mentor Agent"

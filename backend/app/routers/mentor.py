"""
AI Career Mentor Router
Interactive mentoring chat referencing active profile, gaps, and roadmap context.
"""

from fastapi import APIRouter
from typing import Dict, Any, List
import datetime
from app.database import db
from app.models.mentor import MentorChatRequest, MentorChatResponse, ChatMessage
from app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/api/mentor", tags=["AI Career Mentor"])

@router.get("/history")
def get_chat_history() -> List[Dict[str, Any]]:
    """Returns conversation history with the AI Career Mentor."""
    return db.chat_history

@router.post("/chat", response_model=MentorChatResponse)
def chat_with_mentor(req: MentorChatRequest) -> MentorChatResponse:
    """Processes student question and returns context-aware guidance."""
    # Record student message in datastore
    user_msg_id = f"user-{len(db.chat_history) + 1}"
    user_msg = {
        "id": user_msg_id,
        "sender": "student",
        "text": req.message,
        "timestamp": datetime.datetime.now().strftime("%I:%M %p"),
        "source_type": "user"
    }
    db.chat_history.append(user_msg)

    # Invoke AI Mentor Agent with rich contextual state
    mentor_output = orchestrator.mentor_agent.run({
        "message": req.message,
        "profile": db.profile.model_dump(),
        "roadmap": db.roadmap.model_dump() if db.roadmap else None,
        "context": req.context or {}
    })

    reply_text = mentor_output.get("reply", "I'm reviewing your learning roadmap. How can I assist further?")
    source_type = mentor_output.get("source_type", "rule-based")
    followups = mentor_output.get("suggested_followups", [])

    mentor_msg_id = f"mentor-{len(db.chat_history) + 1}"
    mentor_msg = {
        "id": mentor_msg_id,
        "sender": "mentor",
        "text": reply_text,
        "timestamp": datetime.datetime.now().strftime("%I:%M %p"),
        "source_type": source_type
    }
    db.chat_history.append(mentor_msg)

    return MentorChatResponse(
        reply=reply_text,
        source_type=source_type,
        suggested_followups=followups,
        referenced_agent="AI Mentor Agent"
    )

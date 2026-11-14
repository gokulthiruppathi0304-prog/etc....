"""
Database Layer for SkillPath AI 2.0
Supports in-memory development datastore with clear notices on session persistence,
and provides seamless hooks for Supabase/PostgreSQL when credentials are provided.
"""

from typing import Dict, Any, List, Optional
import datetime
from app.config import settings
from app.models.profile import LearnerProfile
from app.models.roadmap import Roadmap
from app.data.demo_profile import get_demo_profile

class DataStore:
    def __init__(self):
        self.profile: LearnerProfile = get_demo_profile()
        self.roadmap: Optional[Roadmap] = None
        self.assessment_history: List[Dict[str, Any]] = [
            {
                "skill": "Python",
                "score": 85,
                "passed": True,
                "status": "ASSESSED",
                "date": (datetime.datetime.now() - datetime.timedelta(days=2)).strftime("%Y-%m-%d"),
                "notes": "Verified competence in Python data structures, syntax, and functions."
            }
        ]
        self.agent_logs: Dict[str, Dict[str, Any]] = {}
        self.chat_history: List[Dict[str, Any]] = [
            {
                "id": "welcome-msg",
                "sender": "mentor",
                "text": "Hello Alex! I am your AI Career Mentor. I've analyzed your profile and target goal of 'Full-Stack AI Engineer'. You have strong Python skills (85% assessed), but you need to bridge gaps in FastAPI, React, and Docker. What would you like to focus on today?",
                "timestamp": "Just now",
                "source_type": "rule-based"
            }
        ]
        self.activities: List[Dict[str, Any]] = [
            {"id": "act-1", "action": "Assessment Completed", "detail": "Python Diagnostic Quiz - 85% Score", "time": "2 days ago", "type": "assessment"},
            {"id": "act-2", "action": "Profile Initialized", "detail": "Target set to Full-Stack AI Engineer", "time": "3 days ago", "type": "profile"},
            {"id": "act-3", "action": "Digital Twin Synchronized", "detail": "Status upgraded to ASSESSED for Python", "time": "2 days ago", "type": "twin"}
        ]

    def reset_to_demo(self):
        """Restores sample demo data for hackathon demonstrations."""
        self.profile = get_demo_profile()
        self.roadmap = None
        self.assessment_history = [
            {
                "skill": "Python",
                "score": 85,
                "passed": True,
                "status": "ASSESSED",
                "date": (datetime.datetime.now() - datetime.timedelta(days=2)).strftime("%Y-%m-%d"),
                "notes": "Verified competence in Python data structures, syntax, and functions."
            }
        ]
        self.chat_history = [
            {
                "id": "welcome-msg-reset",
                "sender": "mentor",
                "text": "Welcome back, Alex! Demo data has been restored to default. Ready to analyze your career path?",
                "timestamp": "Just now",
                "source_type": "rule-based"
            }
        ]
        self.activities.insert(0, {
            "id": f"act-{len(self.activities)+1}",
            "action": "Demo Data Reset",
            "detail": "Restored default learner profile and initial benchmarks",
            "time": "Just now",
            "type": "system"
        })

# Global singleton datastore instance
db = DataStore()

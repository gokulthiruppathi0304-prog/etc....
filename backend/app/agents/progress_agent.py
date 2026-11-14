"""
Agent G: Progress Agent
Tracks roadmap velocity, detects learning bottlenecks or low assessment scores,
and clearly separates measured vs estimated metrics.
"""

from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent

class ProgressAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-progress",
            name="Progress Agent",
            role="Velocity & Remediation Tracker",
            description="Tracks completion milestones, flags learning bottlenecks, and calculates verified vs estimated progress.",
            icon="TrendingUp"
        )

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        roadmap = input_data.get("roadmap") or {}
        assessment_history = input_data.get("assessment_history") or []
        profile = input_data.get("profile") or {}

        modules = roadmap.get("modules", []) if isinstance(roadmap, dict) else getattr(roadmap, "modules", [])
        
        total_tasks = 0
        completed_tasks = 0
        for m in modules:
            tasks = m.get("tasks", []) if isinstance(m, dict) else getattr(m, "tasks", [])
            for t in tasks:
                total_tasks += 1
                is_done = t.get("completed", False) if isinstance(t, dict) else getattr(t, "completed", False)
                if is_done:
                    completed_tasks += 1

        task_completion_pct = int((completed_tasks / total_tasks * 100)) if total_tasks > 0 else 0

        # Assess exam history
        struggling_skills: List[str] = []
        mastered_skills: List[str] = []
        recent_scores: List[int] = []

        for record in assessment_history:
            s_name = record.get("skill", "")
            sc = record.get("score", 0)
            recent_scores.append(sc)
            if sc < 70:
                if s_name not in struggling_skills:
                    struggling_skills.append(s_name)
            else:
                if s_name not in mastered_skills:
                    mastered_skills.append(s_name)

        average_assessment_score = int(sum(recent_scores) / len(recent_scores)) if recent_scores else 0

        # Build measured vs estimated analytics
        measured_data_points = len(assessment_history) + completed_tasks
        estimated_data_points = len(profile.get("current_skills", [])) - len(mastered_skills)
        if estimated_data_points < 0:
            estimated_data_points = 0

        # Recommended Next Action logic
        if struggling_skills:
            next_action = f"Reinforce {struggling_skills[0]}: Review quiz feedback and complete Week practice exercises."
        elif completed_tasks < total_tasks:
            # Find next incomplete task
            found_task = None
            for m in modules:
                tasks = m.get("tasks", []) if isinstance(m, dict) else getattr(m, "tasks", [])
                for t in tasks:
                    if not (t.get("completed", False) if isinstance(t, dict) else getattr(t, "completed", False)):
                        found_task = t.get("title") if isinstance(t, dict) else getattr(t, "title", "Next Task")
                        break
                if found_task:
                    break
            next_action = f"Complete next roadmap task: '{found_task or 'Start Week 1 Module'}'."
        else:
            next_action = "Take the FastAPI Diagnostic Assessment to upgrade your verified skill badge."

        return {
            "task_completion_percentage": task_completion_pct,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "average_assessment_score": average_assessment_score,
            "struggling_skills": struggling_skills,
            "mastered_skills": mastered_skills,
            "needs_revision": len(struggling_skills) > 0,
            "measured_data_points_count": measured_data_points,
            "estimated_data_points_count": estimated_data_points,
            "recommended_next_action": next_action,
            "source_type": "rule-based"
        }

"""
Agent B: Skill Intelligence Agent
Identifies missing skills, proficiency gaps, priority levels, and calculates career readiness scores.
"""

from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.data.career_taxonomy import CAREER_TAXONOMY

PROFICIENCY_SCORES = {
    "None": 0,
    "Beginner": 35,
    "Intermediate": 70,
    "Advanced": 100
}

class SkillIntelligenceAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-skill-intelligence",
            name="Skill Intelligence Agent",
            role="Skill Gap & Competency Benchmarker",
            description="Evaluates declared vs verified skills against target career matrices to extract high-priority gaps.",
            icon="Activity"
        )

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        profile = input_data.get("profile", {})
        target_career_name = input_data.get("target_career") or profile.get("target_career", "Full-Stack AI Engineer")
        current_skills = profile.get("current_skills", [])

        # Fetch career benchmark from taxonomy
        career_meta = CAREER_TAXONOMY.get(target_career_name) or CAREER_TAXONOMY["Full-Stack AI Engineer"]
        required_skills = career_meta["required_skills"]
        match_weights = career_meta.get("match_weights", {})

        current_skill_map = {}
        for s in current_skills:
            name = s.get("name") if isinstance(s, dict) else getattr(s, "name", "")
            level = s.get("level") if isinstance(s, dict) else getattr(s, "level", "Beginner")
            status = s.get("status") if isinstance(s, dict) else getattr(s, "status", "ESTIMATED")
            score = s.get("assessed_score") if isinstance(s, dict) else getattr(s, "assessed_score", None)
            if name:
                current_skill_map[name.lower()] = {
                    "name": name,
                    "level": level,
                    "status": status,
                    "assessed_score": score
                }

        gaps: List[Dict[str, Any]] = []
        chart_comparison: List[Dict[str, Any]] = []
        total_possible_weight = 0
        earned_weight = 0

        for req_skill, target_level in required_skills.items():
            weight = match_weights.get(req_skill, 15)
            total_possible_weight += weight
            target_score = PROFICIENCY_SCORES.get(target_level, 70)

            matched_learner_skill = current_skill_map.get(req_skill.lower())

            if matched_learner_skill:
                curr_level = matched_learner_skill["level"]
                curr_status = matched_learner_skill["status"]
                curr_score = PROFICIENCY_SCORES.get(curr_level, 35)

                # If assessed with numerical test score, use verified weight
                if matched_learner_skill["assessed_score"] is not None:
                    curr_score = matched_learner_skill["assessed_score"]

                ratio = min(1.0, curr_score / max(1, target_score))
                earned_weight += weight * ratio

                if ratio < 0.9:
                    # Partial gap
                    priority = "High" if weight >= 20 else "Medium"
                    gaps.append({
                        "skill": req_skill,
                        "current_level": curr_level,
                        "target_level": target_level,
                        "priority": priority,
                        "status": curr_status,
                        "gap_type": "Proficiency Upgrade",
                        "weight": weight,
                        "description": f"Target role requires {target_level} competency; currently at {curr_level}."
                    })
                
                chart_comparison.append({
                    "skill": req_skill,
                    "current": curr_score,
                    "benchmark": target_score,
                    "status": curr_status
                })
            else:
                # Completely missing skill
                priority = "High" if weight >= 15 else "Medium"
                gaps.append({
                    "skill": req_skill,
                    "current_level": "None",
                    "target_level": target_level,
                    "priority": priority,
                    "status": "UNACQUIRED",
                    "gap_type": "Missing Foundation",
                    "weight": weight,
                    "description": f"Essential skill missing. Required at {target_level} level for {target_career_name}."
                })
                chart_comparison.append({
                    "skill": req_skill,
                    "current": 0,
                    "benchmark": target_score,
                    "status": "MISSING"
                })

        readiness_score = int((earned_weight / total_possible_weight * 100)) if total_possible_weight > 0 else 50
        # Sort gaps by priority (High first)
        gaps.sort(key=lambda x: (0 if x["priority"] == "High" else 1, -x["weight"]))

        return {
            "target_career": target_career_name,
            "readiness_score": readiness_score,
            "total_gaps_count": len(gaps),
            "high_priority_gaps": [g for g in gaps if g["priority"] == "High"],
            "all_gaps": gaps,
            "chart_comparison": chart_comparison,
            "source_type": "rule-based"
        }

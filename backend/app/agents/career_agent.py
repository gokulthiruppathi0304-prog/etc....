"""
Agent C: Career Matching Agent
Matches learner skills and interests to prospective tech career pathways.
Clearly notes that recommendations are educational indicators, not guarantees of employment.
"""

from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.data.career_taxonomy import CAREER_TAXONOMY

class CareerMatchingAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-career-matching",
            name="Career Matching Agent",
            role="Career Vector & Domain Matcher",
            description="Computes compatibility scores across technology pathways, explaining foundational overlaps and gaps.",
            icon="Compass"
        )

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        profile = input_data.get("profile", {})
        current_skills = profile.get("current_skills", [])
        interests = [str(i).lower() for i in profile.get("interests", [])]

        user_skills_lower = {}
        for s in current_skills:
            name = s.get("name") if isinstance(s, dict) else getattr(s, "name", "")
            if name:
                user_skills_lower[name.lower()] = s

        matches: List[Dict[str, Any]] = []

        for career_name, career_info in CAREER_TAXONOMY.items():
            req_skills = career_info["required_skills"]
            suitability = career_info.get("suitability_keywords", [])
            weights = career_info.get("match_weights", {})

            matched_skills = []
            missing_skills = []
            total_points = 0
            earned_points = 0

            for skill_name, req_level in req_skills.items():
                w = weights.get(skill_name, 15)
                total_points += w
                if skill_name.lower() in user_skills_lower:
                    matched_skills.append(skill_name)
                    earned_points += w
                else:
                    missing_skills.append(skill_name)

            # Bonus for interest alignment (up to 15%)
            interest_bonus = 0
            matching_interests = [kw for kw in suitability if any(kw in user_int for user_int in interests)]
            if matching_interests:
                interest_bonus = min(15, len(matching_interests) * 5)

            raw_score = (earned_points / total_points * 85) if total_points > 0 else 40
            final_match_pct = min(98, max(25, int(raw_score + interest_bonus)))

            reasoning = (
                f"You currently possess {len(matched_skills)} of {len(req_skills)} essential skills "
                f"({', '.join(matched_skills) if matched_skills else 'foundations in progress'}). "
            )
            if matching_interests:
                reasoning += f"Strong domain affinity observed with your stated interests in {', '.join(matching_interests[:2])}."
            else:
                reasoning += "Acquiring the remaining missing competencies will unlock full role compatibility."

            matches.append({
                "career_title": career_name,
                "slug": career_info["slug"],
                "domain": career_info["domain"],
                "description": career_info["description"],
                "market_demand": career_info["market_demand"],
                "match_score": final_match_pct,
                "matched_skills": matched_skills,
                "missing_skills": missing_skills,
                "match_reasoning": reasoning,
                "is_current_target": career_name == profile.get("target_career")
            })

        # Sort matches by match score descending
        matches.sort(key=lambda x: -x["match_score"])

        return {
            "career_matches": matches,
            "top_match": matches[0] if matches else None,
            "disclaimer": "SkillPath AI provides exploratory educational guidance based on open skill frameworks. It does not promise employment or guaranteed career placement.",
            "source_type": "rule-based"
        }

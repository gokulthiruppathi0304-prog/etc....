"""
Agent D: Assessment Agent
Generates targeted diagnostic questions, evaluates submissions, provides explanations,
and updates learner skills from ESTIMATED to ASSESSED.
"""

from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.data.question_bank import get_questions_for_skill, QUESTION_BANK
from app.models.assessment import AssessmentResult, QuestionReview

class AssessmentAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-assessment",
            name="Assessment Agent",
            role="Skill Diagnostic Examiner & Evaluator",
            description="Generates skill assessment questions, grades answers, provides explanations, and validates competency.",
            icon="CheckSquare"
        )

    def generate_quiz(self, skill: str, count: int = 4) -> List[Dict[str, Any]]:
        """Public helper to retrieve questions stripped of the answer key for the frontend."""
        raw_questions = get_questions_for_skill(skill, count)
        public_questions = []
        for q in raw_questions:
            public_questions.append({
                "id": q["id"],
                "skill": q["skill"],
                "question": q["question"],
                "options": q["options"],
                "difficulty": q.get("difficulty", "Beginner")
            })
        return public_questions

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        action = input_data.get("action", "generate")
        skill = input_data.get("skill", "Python")

        if action == "generate":
            questions = self.generate_quiz(skill, input_data.get("num_questions", 4))
            return {
                "skill": skill,
                "questions": questions,
                "total_questions": len(questions),
                "source_type": "rule-based"
            }

        elif action == "evaluate":
            answers = input_data.get("answers", [])  # list of {question_id, selected_option_id}
            
            # Find questions in question bank
            flat_bank = {}
            for s_name, q_list in QUESTION_BANK.items():
                for q in q_list:
                    flat_bank[q["id"]] = q

            correct_count = 0
            reviews: List[Dict[str, Any]] = []

            for ans in answers:
                qid = ans.get("question_id") if isinstance(ans, dict) else getattr(ans, "question_id", "")
                selected = ans.get("selected_option_id") if isinstance(ans, dict) else getattr(ans, "selected_option_id", "")
                
                q_data = flat_bank.get(qid)
                if not q_data:
                    continue

                is_correct = (selected == q_data["correct_option_id"])
                if is_correct:
                    correct_count += 1

                reviews.append({
                    "question_id": qid,
                    "question": q_data["question"],
                    "selected_option_id": selected,
                    "correct_option_id": q_data["correct_option_id"],
                    "is_correct": is_correct,
                    "explanation": q_data["explanation"]
                })

            total_q = len(answers) if len(answers) > 0 else 1
            score = int((correct_count / total_q) * 100)
            passed = score >= 70

            if passed:
                summary = f"Great work! You scored {score}% ({correct_count}/{total_q} correct). Competence verified!"
                recommendation = f"Your skill status for '{skill}' has been upgraded to verified [ASSESSED]."
            else:
                summary = f"You scored {score}% ({correct_count}/{total_q} correct). Fundamental concepts need reinforcement."
                recommendation = f"Review the explanation cards below and complete the targeted practice module on {skill}."

            return {
                "skill": skill,
                "score": score,
                "total_questions": total_q,
                "correct_count": correct_count,
                "passed": passed,
                "evaluation_summary": summary,
                "recommendation": recommendation,
                "reviews": reviews,
                "status_updated_to": "ASSESSED" if passed else "REVISION_RECOMMENDED",
                "source_type": "rule-based"
            }

        return {"error": "Invalid action requested"}

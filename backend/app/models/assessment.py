from typing import List, Optional
from pydantic import BaseModel, Field

class AssessmentOption(BaseModel):
    id: str  # e.g., 'A', 'B', 'C', 'D'
    text: str

class AssessmentQuestion(BaseModel):
    id: str
    skill: str
    question: str
    options: List[AssessmentOption]
    correct_option_id: str
    explanation: str
    difficulty: str = "Beginner"

class AssessmentQuestionPublic(BaseModel):
    id: str
    skill: str
    question: str
    options: List[AssessmentOption]
    difficulty: str = "Beginner"

class AssessmentGenerateRequest(BaseModel):
    skill: str
    num_questions: int = 4

class AssessmentSubmissionItem(BaseModel):
    question_id: str
    selected_option_id: str

class AssessmentSubmission(BaseModel):
    skill: str
    answers: List[AssessmentSubmissionItem]

class QuestionReview(BaseModel):
    question_id: str
    question: str
    selected_option_id: str
    correct_option_id: str
    is_correct: bool
    explanation: str

class AssessmentResult(BaseModel):
    skill: str
    score: int  # 0 to 100
    total_questions: int
    correct_count: int
    passed: bool
    evaluation_summary: str
    recommendation: str
    reviews: List[QuestionReview]
    status_updated_to: str = "ASSESSED"
    source_type: str = "rule-based"

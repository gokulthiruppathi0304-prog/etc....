"""
Unit Tests for all Eight Specialized Agents and Central Orchestrator
"""

import pytest
from app.agents.profile_agent import ProfileAgent
from app.agents.skill_agent import SkillIntelligenceAgent
from app.agents.career_agent import CareerMatchingAgent
from app.agents.assessment_agent import AssessmentAgent
from app.agents.learning_agent import LearningRecommendationAgent
from app.agents.roadmap_agent import RoadmapAgent
from app.agents.progress_agent import ProgressAgent
from app.agents.mentor_agent import AIMentorAgent
from app.agents.orchestrator import CentralOrchestrator
from app.data.demo_profile import get_demo_profile

@pytest.fixture
def sample_profile():
    return get_demo_profile().model_dump()

def test_profile_agent(sample_profile):
    agent = ProfileAgent()
    result = agent.run({"profile": sample_profile})
    assert result["_agent"]["id"] == "agent-profile"
    assert result["source_type"] == "rule-based"
    assert "learner_archetype" in result
    assert result["total_skills_count"] == 4
    assert result["assessed_skills_count"] >= 1

def test_skill_intelligence_agent(sample_profile):
    agent = SkillIntelligenceAgent()
    result = agent.run({"profile": sample_profile, "target_career": "Full-Stack AI Engineer"})
    assert result["_agent"]["id"] == "agent-skill-intelligence"
    assert "readiness_score" in result
    assert result["readiness_score"] > 0
    assert "high_priority_gaps" in result
    assert len(result["chart_comparison"]) > 0

def test_career_matching_agent(sample_profile):
    agent = CareerMatchingAgent()
    result = agent.run({"profile": sample_profile})
    assert result["_agent"]["id"] == "agent-career-matching"
    assert len(result["career_matches"]) >= 5
    top = result["career_matches"][0]
    assert "match_score" in top
    assert "match_reasoning" in top
    assert "disclaimer" in result

def test_assessment_agent():
    agent = AssessmentAgent()
    
    # Test generation
    gen_result = agent.run({"action": "generate", "skill": "Python", "num_questions": 3})
    assert len(gen_result["questions"]) == 3
    assert "options" in gen_result["questions"][0]

    # Test evaluation with known correct answer
    q1 = gen_result["questions"][0]
    eval_result = agent.run({
        "action": "evaluate",
        "skill": "Python",
        "answers": [{"question_id": "py-01", "selected_option_id": "B"}]
    })
    assert eval_result["score"] == 100
    assert eval_result["passed"] is True
    assert eval_result["status_updated_to"] == "ASSESSED"

def test_learning_recommendation_agent():
    agent = LearningRecommendationAgent()
    gaps = [{"skill": "FastAPI", "priority": "High", "weight": 20}]
    result = agent.run({"gaps": gaps, "target_career": "Full-Stack AI Engineer"})
    assert result["total_curated_skills"] >= 1
    assert len(result["recommendations"][0]["resources"]) > 0

def test_roadmap_agent():
    agent = RoadmapAgent()
    result = agent.run({"target_career": "Full-Stack AI Engineer", "weekly_hours": 10})
    assert result["total_weeks"] == 6
    assert len(result["modules"]) == 6
    assert len(result["modules"][0]["tasks"]) > 0

def test_progress_agent(sample_profile):
    agent = ProgressAgent()
    roadmap_mock = {
        "modules": [
            {"tasks": [{"id": "t1", "completed": True}, {"id": "t2", "completed": False}]}
        ]
    }
    result = agent.run({
        "profile": sample_profile,
        "roadmap": roadmap_mock,
        "assessment_history": [{"skill": "Python", "score": 85}]
    })
    assert result["task_completion_percentage"] == 50
    assert "recommended_next_action" in result

def test_ai_mentor_agent(sample_profile):
    agent = AIMentorAgent()
    result = agent.run({"message": "What is Docker?", "profile": sample_profile})
    assert "Docker" in result["reply"]
    assert len(result["suggested_followups"]) > 0

def test_central_orchestrator(sample_profile):
    orchestrator = CentralOrchestrator()
    report = orchestrator.run_full_pipeline(profile_data=sample_profile)
    assert report.pipeline_status == "SUCCESS"
    assert report.total_agents == 8
    assert report.readiness_score > 0
    assert len(report.agent_status_map) == 8
    assert len(report.career_matches) > 0

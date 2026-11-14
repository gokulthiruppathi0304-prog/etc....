"""
Integration Tests for FastAPI Endpoints
"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert "SkillPath AI" in data["app_name"]

def test_profile_endpoints():
    # GET profile
    get_res = client.get("/api/profile")
    assert get_res.status_code == 200
    assert "profile" in get_res.json()
    
    # POST profile update
    update_res = client.post("/api/profile", json={
        "full_name": "Alex Chen Tester",
        "target_career": "Backend Systems & API Engineer"
    })
    assert update_res.status_code == 200
    assert update_res.json()["profile"]["full_name"] == "Alex Chen Tester"
    assert update_res.json()["profile"]["target_career"] == "Backend Systems & API Engineer"

def test_analysis_endpoints():
    # POST analyze
    res = client.post("/api/analyze", json={"target_career": "Full-Stack AI Engineer"})
    assert res.status_code == 200
    data = res.json()
    assert "readiness_score" in data
    assert "high_priority_gaps" in data

    # POST career-match
    match_res = client.post("/api/career-match")
    assert match_res.status_code == 200
    assert len(match_res.json()["career_matches"]) > 0

def test_assessment_endpoints():
    # Generate assessment
    gen_res = client.post("/api/assessment/generate", json={"skill": "Python", "num_questions": 2})
    assert gen_res.status_code == 200
    questions = gen_res.json()["questions"]
    assert len(questions) == 2

    # Evaluate assessment
    eval_res = client.post("/api/assessment/evaluate", json={
        "skill": "Python",
        "answers": [
            {"question_id": questions[0]["id"], "selected_option_id": "B"}
        ]
    })
    assert eval_res.status_code == 200
    assert "score" in eval_res.json()

def test_roadmap_and_progress_endpoints():
    # GET roadmap
    rm_res = client.get("/api/roadmap")
    assert rm_res.status_code == 200
    roadmap = rm_res.json()["roadmap"]
    assert len(roadmap["modules"]) > 0
    
    # Update task
    first_task = roadmap["modules"][0]["tasks"][0]
    toggle_res = client.post("/api/roadmap/update", json={
        "week_number": 1,
        "task_id": first_task["id"],
        "completed": True
    })
    assert toggle_res.status_code == 200
    
    # GET progress
    prog_res = client.get("/api/progress")
    assert prog_res.status_code == 200
    assert "overview" in prog_res.json()

def test_mentor_chat():
    chat_res = client.post("/api/mentor/chat", json={
        "message": "How do I build a FastAPI application?"
    })
    assert chat_res.status_code == 200
    data = chat_res.json()
    assert "reply" in data
    assert data["source_type"] == "rule-based"

def test_agents_status():
    status_res = client.get("/api/agents/status")
    assert status_res.status_code == 200
    data = status_res.json()
    assert data["total_agents"] == 8

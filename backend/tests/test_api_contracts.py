from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_system_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_system_root_epics():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "epics" in data
    assert len(data["epics"]) == 6

def test_assistant_chat():
    payload = {
        "message": "What is the striking time for slab formwork?",
        "topic": "concrete_standards"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert len(data["code_references"]) > 0

def test_site_log_processing():
    payload = {
        "site_name": "Metro Center Tower",
        "date": "2026-10-25",
        "weather_summary": "Clear, 26°C",
        "workforce": {"masons": 10, "helpers": 15},
        "active_equipment": ["Excavator CAT 320"],
        "completed_activities": ["Excavated basement pit section 4"],
        "reported_delays": [],
        "material_deliveries": ["20 tons sand"]
    }
    response = client.post("/api/site-log/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["total_manpower"] == 25
    assert "productivity_rating" in data
    assert len(data["tomorrow_action_plan"]) > 0

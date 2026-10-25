from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_generate_project_plan():
    payload = {
        "project_name": "Sunset Heights",
        "project_type": "Residential High-Rise",
        "total_area_sqft": 30000.0,
        "target_duration_months": 15,
        "estimated_budget": 4500000.0,
        "floors": 4,
        "soil_condition": "Clayey silt with medium plasticity"
    }
    response = client.post("/api/planning/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["project_name"] == "Sunset Heights"
    assert len(data["phases"]) == 5
    assert len(data["milestones"]) > 0
    assert len(data["critical_path"]) > 0
    assert data["cost_per_sqft"] == 150.0

def test_planning_templates():
    response = client.get("/api/planning/templates")
    assert response.status_code == 200
    templates = response.json()
    assert isinstance(templates, list)
    assert len(templates) >= 3

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_weather_advisory_hot():
    payload = {
        "location": "Central Plaza Site",
        "temperature_c": 38.0,
        "humidity_pct": 25.0,
        "precipitation_prob_pct": 0.0,
        "wind_speed_kmh": 22.0,
        "planned_activities": ["Concrete Slab Pouring", "Tower Crane Lifting"]
    }
    response = client.post("/api/weather/advisory", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "High" in data["plastic_shrinkage_risk"] or "Severe" in data["concrete_curing_condition"]
    assert len(data["activities_assessment"]) == 2

def test_weather_advisory_high_wind():
    payload = {
        "location": "Coastal Development",
        "temperature_c": 24.0,
        "humidity_pct": 60.0,
        "precipitation_prob_pct": 10.0,
        "wind_speed_kmh": 45.0,
        "planned_activities": ["Tower Crane Lifting"]
    }
    response = client.post("/api/weather/advisory", json=payload)
    assert response.status_code == 200
    data = response.json()
    crane_assess = [a for a in data["activities_assessment"] if "crane" in a["activity"].lower()][0]
    assert crane_assess["status"] == "NO-GO"

def test_weather_presets():
    response = client.get("/api/weather/presets")
    assert response.status_code == 200
    presets = response.json()
    assert len(presets) >= 3

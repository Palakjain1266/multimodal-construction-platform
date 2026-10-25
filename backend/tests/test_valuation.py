from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_valuation_calculate():
    payload = {
        "property_name": "Horizon Heights Unit 12B",
        "property_type": "Residential Luxury Suite",
        "built_up_area_sqft": 2200.0,
        "location_tier": "Tier 1 - Prime Downtown",
        "construction_quality": "Luxury",
        "age_years": 1,
        "parking_spaces": 2,
        "amenities_rating": 5
    }
    response = client.post("/api/valuation/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["estimated_market_value"] > 0
    assert data["price_per_sqft"] > 0
    assert len(data["comparable_properties"]) == 3
    assert data["projected_5yr_appreciation_pct"] > 0

def test_valuation_tiers():
    response = client.get("/api/valuation/tiers")
    assert response.status_code == 200
    data = response.json()
    assert "location_tiers" in data
    assert "construction_qualities" in data

from typing import List, Dict, Any
from fastapi import APIRouter
from app.models.weather import WeatherAdvisoryRequest, WeatherAdvisoryResponse
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/api/weather", tags=["Weather-Aware Advisory"])

@router.post("/advisory", response_model=WeatherAdvisoryResponse, summary="Evaluate Construction Activity Feasibility Under Current Weather")
async def get_weather_advisory(request: WeatherAdvisoryRequest):
    """
    Evaluates ambient temperature, wind, humidity, and precipitation probability against
    ACI concrete curing limits, crane lifting wind thresholds, and painting tolerances.
    """
    return WeatherService.evaluate_weather(request)

@router.get("/presets", response_model=List[Dict[str, Any]], summary="Get Standard Weather Scenario Presets")
async def get_weather_presets():
    return [
        {
            "name": "High Heatwave & Dry Wind (Plastic Shrinkage Danger)",
            "temperature_c": 39.5,
            "humidity_pct": 22.0,
            "precipitation_prob_pct": 5.0,
            "wind_speed_kmh": 32.0,
            "planned_activities": ["Concrete Slab Pouring", "Tower Crane Lifting", "Exterior Facade Painting"]
        },
        {
            "name": "Incoming Gale Storm & Heavy Rain",
            "temperature_c": 21.0,
            "humidity_pct": 92.0,
            "precipitation_prob_pct": 85.0,
            "wind_speed_kmh": 46.0,
            "planned_activities": ["Tower Crane Lifting", "Deep Trench Excavation", "Exterior Facade Painting", "Concrete Slab Pouring"]
        },
        {
            "name": "Optimal Spring Conditions (All Clear)",
            "temperature_c": 23.0,
            "humidity_pct": 55.0,
            "precipitation_prob_pct": 10.0,
            "wind_speed_kmh": 14.0,
            "planned_activities": ["Concrete Slab Pouring", "Tower Crane Lifting", "Exterior Facade Painting", "Deep Trench Excavation"]
        }
    ]

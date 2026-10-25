from typing import List, Optional
from pydantic import BaseModel, Field

class WeatherAdvisoryRequest(BaseModel):
    location: str = Field(default="Metro Construction Zone", example="North District Site B")
    temperature_c: float = Field(..., example=34.5)
    humidity_pct: float = Field(..., ge=0, le=100, example=45.0)
    precipitation_prob_pct: float = Field(..., ge=0, le=100, example=15.0)
    wind_speed_kmh: float = Field(..., ge=0, example=28.0)
    planned_activities: List[str] = Field(
        default=["Concrete Slab Pouring", "Tower Crane Lifting", "Exterior Waterproofing & Painting", "Deep Trench Excavation"]
    )

class ActivityFeasibility(BaseModel):
    activity: str
    status: str = Field(..., description="'GO', 'CAUTION', or 'NO-GO'")
    risk_factors: List[str]
    specific_guidelines: str

class WeatherAdvisoryResponse(BaseModel):
    location: str
    temperature_c: float
    humidity_pct: float
    precipitation_prob_pct: float
    wind_speed_kmh: float
    overall_site_risk: str
    concrete_curing_condition: str
    plastic_shrinkage_risk: str
    activities_assessment: List[ActivityFeasibility]
    reschedule_recommendations: List[str]
    critical_safety_alerts: List[str]

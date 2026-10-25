from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class ChatMessageRequest(BaseModel):
    message: str = Field(..., example="What is the minimum curing time for OPC concrete before striking slab formwork?")
    topic: Optional[str] = Field(default="general", example="concrete_standards")

class ChatMessageResponse(BaseModel):
    timestamp: str
    reply: str
    code_references: List[str]
    suggested_followups: List[str]

class DailySiteLogRequest(BaseModel):
    site_name: str = Field(..., example="Apex Tower Phase 2")
    date: str = Field(..., example="2026-10-25")
    weather_summary: str = Field(default="Clear, 29°C, 10 km/h wind")
    workforce: Dict[str, int] = Field(..., example={"masons": 12, "carpenters": 8, "electricians": 4, "rebar_fitters": 10, "helpers": 18})
    active_equipment: List[str] = Field(..., example=["Tower Crane 1", "Concrete Transit Mixer", "Scissor Lift"])
    completed_activities: List[str] = Field(..., example=["Poured 45m3 grade C30 concrete on 4th floor slab", "Installed MEP conduits in Sector B"])
    reported_delays: List[str] = Field(default=[], example=["Late aggregate delivery caused 1.5 hr delay in morning mix"])
    material_deliveries: List[str] = Field(default=[], example=["30 MT Fe500 TMT Steel Bars", "120 bags Portland Cement"])

class DailySiteLogResponse(BaseModel):
    site_name: str
    date: str
    total_manpower: int
    executive_summary: str
    productivity_rating: str
    delay_impact_analysis: str
    critical_bottlenecks: List[str]
    tomorrow_action_plan: List[str]
    safety_compliance_notes: List[str]

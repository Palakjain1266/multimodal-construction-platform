from typing import List, Optional
from pydantic import BaseModel, Field

class PPEItem(BaseModel):
    name: str = Field(..., description="Name of PPE (e.g. Hard Hat, Hi-Vis Vest, Goggles, Gloves, Steel-toe Boots, Safety Harness)")
    detected: bool = Field(..., description="Whether PPE was detected on workers")
    status: str = Field(..., description="'compliant', 'missing', or 'partial'")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Detection confidence score")
    recommendation: Optional[str] = Field(None, description="Actionable recommendation if missing")

class HazardItem(BaseModel):
    category: str = Field(..., description="Hazard category (e.g. Fall Hazard, Scaffolding Risk, Electrical, Tripping)")
    description: str = Field(..., description="Detailed description of the detected condition")
    severity: str = Field(..., description="'Low', 'Medium', 'High', or 'Critical'")
    location_hint: str = Field(..., description="Approximate region or element in the image")
    mitigation: str = Field(..., description="Mandatory immediate mitigation step")

class SafetyAnalysisResponse(BaseModel):
    timestamp: str
    safety_score: int = Field(..., ge=0, le=100, description="Overall site safety score out of 100")
    risk_level: str = Field(..., description="'Low', 'Moderate', 'High', 'Critical'")
    workers_detected: int = Field(..., ge=0)
    ppe_compliance_rate: float = Field(..., ge=0.0, le=100.0, description="Percentage of compliant PPE items")
    ppe_checklist: List[PPEItem]
    detected_hazards: List[HazardItem]
    immediate_actions: List[str]
    osha_references: List[str]
    engine_mode: str = Field(default="heuristic_multimodal")

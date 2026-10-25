from typing import List, Optional
from pydantic import BaseModel, Field

class CrackDetectionResponse(BaseModel):
    timestamp: str
    crack_detected: bool = Field(..., description="Whether cracking was identified")
    crack_type: str = Field(..., description="Classification (e.g. Hairline Surface, Structural Shear, Settlement, Shrinkage)")
    estimated_width_mm: float = Field(..., description="Estimated average crack width in millimeters")
    severity: str = Field(..., description="'Low', 'Moderate', 'High', or 'Critical'")
    structural_risk_score: int = Field(..., ge=0, le=100, description="Risk index to structural stability (0-100)")
    structural_integrity_risk: str = Field(..., description="Verbal assessment of structural risk")
    probable_causes: List[str] = Field(..., description="Likely causes: thermal expansion, differential settlement, overload, curing defect")
    recommended_repair_methods: List[str] = Field(..., description="Recommended remediation procedures")
    required_materials: List[str] = Field(..., description="Epoxy resin, polyurethane grout, carbon fiber wrap, rebar stitching")
    urgency_timeframe: str = Field(..., description="Remediation timeline: Immediate, within 7 days, 30 days, or monitor")
    estimated_repair_cost_range: str = Field(..., description="Estimated cost band (e.g. $500 - $1,800)")
    engine_mode: str = Field(default="heuristic_multimodal")

from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class ProjectPlanRequest(BaseModel):
    project_name: str = Field(..., example="Grandview Commercial Plaza")
    project_type: str = Field(..., example="Commercial")
    total_area_sqft: float = Field(..., gt=0, example=25000.0)
    target_duration_months: int = Field(..., gt=0, example=14)
    estimated_budget: float = Field(..., gt=0, example=3500000.0)
    floors: int = Field(default=3, ge=1)
    soil_condition: str = Field(default="Normal Cohesive", example="Normal Cohesive")

class TaskItem(BaseModel):
    id: str
    title: str
    duration_days: int
    deliverable: str

class PhaseItem(BaseModel):
    phase_number: int
    name: str
    start_day: int
    end_day: int
    duration_days: int
    budget_allocated: float
    percentage_of_budget: float
    tasks: List[TaskItem]

class MilestoneItem(BaseModel):
    name: str
    day: int
    inspection_required: str

class RiskMitigationItem(BaseModel):
    risk: str
    likelihood: str
    impact: str
    mitigation_strategy: str

class ProjectPlanResponse(BaseModel):
    project_name: str
    project_type: str
    total_area_sqft: float
    target_duration_months: int
    total_estimated_days: int
    total_budget: float
    cost_per_sqft: float
    phases: List[PhaseItem]
    milestones: List[MilestoneItem]
    critical_path: List[str]
    risk_mitigation: List[RiskMitigationItem]
    resource_allocation: Dict[str, str]

from typing import List, Dict, Any
from fastapi import APIRouter
from app.models.planning import ProjectPlanRequest, ProjectPlanResponse
from app.services.planning_service import PlanningService

router = APIRouter(prefix="/api/planning", tags=["Construction Project Planning"])

@router.post("/generate", response_model=ProjectPlanResponse, summary="Generate 5-Phase Construction Project Plan")
async def generate_project_plan(request: ProjectPlanRequest):
    """
    Generate a comprehensive 5-phase Work Breakdown Structure (WBS),
    Gantt timeline days, budget distribution, critical path, and risk mitigations.
    """
    return PlanningService.generate_plan(request)

@router.get("/templates", response_model=List[Dict[str, Any]], summary="Get Standard Project Planning Presets")
async def get_planning_templates():
    """
    Returns common pre-configured construction project templates for quick testing.
    """
    return [
        {
            "project_name": "Skyline Commercial Hub",
            "project_type": "Commercial High-Rise",
            "total_area_sqft": 45000.0,
            "target_duration_months": 18,
            "estimated_budget": 6500000.0,
            "floors": 6,
            "soil_condition": "Dense Sand with Shallow Water Table"
        },
        {
            "project_name": "Greenfield Residential Villas",
            "project_type": "Residential Gated Community",
            "total_area_sqft": 18000.0,
            "target_duration_months": 10,
            "estimated_budget": 2400000.0,
            "floors": 2,
            "soil_condition": "Normal Cohesive Clay"
        },
        {
            "project_name": "Logistics & Cold Storage Facility",
            "project_type": "Industrial Warehouse",
            "total_area_sqft": 60000.0,
            "target_duration_months": 12,
            "estimated_budget": 4800000.0,
            "floors": 1,
            "soil_condition": "Engineered Compacted Fill"
        }
    ]

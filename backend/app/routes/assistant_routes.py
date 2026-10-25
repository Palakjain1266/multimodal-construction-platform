from typing import Dict, Any
from fastapi import APIRouter
from app.models.assistant import (
    ChatMessageRequest,
    ChatMessageResponse,
    DailySiteLogRequest,
    DailySiteLogResponse
)
from app.services.knowledge_base import KnowledgeBaseService
from app.services.site_log_service import SiteLogService

router = APIRouter(prefix="/api", tags=["Assistant & Advisory Engine"])

@router.post("/assistant/chat", response_model=ChatMessageResponse, summary="Query Construction & Safety Knowledge Base")
async def chat_with_assistant(request: ChatMessageRequest):
    """
    Ask technical questions regarding OSHA safety standards, ACI concrete curing times,
    slump tests, and structural specifications.
    """
    return KnowledgeBaseService.answer_query(request)

@router.post("/site-log/analyze", response_model=DailySiteLogResponse, summary="Process Daily Site Observation Log")
async def analyze_site_log(request: DailySiteLogRequest):
    """
    Synthesize trade workforce, active equipment, completed work items, and delays
    into an executive productivity report with actionable next-day priorities.
    """
    return SiteLogService.process_log(request)

@router.get("/site-log/sample", response_model=Dict[str, Any], summary="Get Pre-configured Sample Site Log")
async def get_sample_site_log():
    return {
        "site_name": "Skyline Commercial Hub - Block B",
        "date": "2026-10-25",
        "weather_summary": "Partly cloudy, 28°C, humidity 54%, wind 12 km/h",
        "workforce": {
            "masons": 14,
            "rebar_fitters": 12,
            "carpenters": 10,
            "electricians": 6,
            "plumbers": 5,
            "helpers": 24
        },
        "active_equipment": [
            "Tower Crane #1 (Model Potain MDT 219)",
            "36m Truck-Mounted Concrete Boom Pump",
            "Transit Mixers (4 Units)",
            "Scissor Lift (2 Units)"
        ],
        "completed_activities": [
            "Cast 65 m3 Grade C35 concrete on 5th floor transfer slab",
            "Tied rebar for core lift wall starter bars",
            "Installed electrical conduit piping across Sector 3 ceiling",
            "Completed plumbing hydro-test on 3rd floor riser"
        ],
        "reported_delays": [
            "Morning aggregate truck stuck in perimeter traffic, delaying initial concrete batch by 40 minutes"
        ],
        "material_deliveries": [
            "40 Metric Tons Fe500D High-Yield Rebar",
            "180 Bags Ordinary Portland Cement (OPC 53)",
            "200 linear meters PVC drainage pipes"
        ]
    }

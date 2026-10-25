from typing import Dict, Any
from fastapi import APIRouter
from app.models.valuation import ValuationRequest, ValuationResponse
from app.services.valuation_service import ValuationService

router = APIRouter(prefix="/api/valuation", tags=["Real Estate Valuation Engine"])

@router.post("/calculate", response_model=ValuationResponse, summary="Compute Automated Valuation & Comparable Market Analysis")
async def calculate_property_valuation(request: ValuationRequest):
    """
    Computes property market value, price per square foot, construction cost breakdown,
    depreciation, comparable property transactions, and 5-year capital appreciation projection.
    """
    return ValuationService.calculate_valuation(request)

@router.get("/tiers", response_model=Dict[str, Any], summary="Get Valuation Parameters & Market Tiers Reference")
async def get_valuation_tiers():
    return {
        "location_tiers": [
            {"tier": "Tier 1 - Prime Downtown", "multiplier": "2.4x - 2.8x", "avg_price_sqft": "$350 - $650"},
            {"tier": "Tier 2 - Suburban Growth", "multiplier": "1.5x - 1.8x", "avg_price_sqft": "$220 - $340"},
            {"tier": "Tier 3 - Developing Peripheral", "multiplier": "1.1x - 1.3x", "avg_price_sqft": "$140 - $210"}
        ],
        "construction_qualities": [
            {"grade": "Standard", "rate_sqft": "$130", "materials": "Standard reinforced concrete, ceramic tiles, standard aluminum joinery"},
            {"grade": "Premium", "rate_sqft": "$195", "materials": "Vitrified porcelain, thermal break facade, energy star HVAC"},
            {"grade": "Luxury", "rate_sqft": "$285", "materials": "Imported Italian marble, smart automation, custom curtain walls"}
        ]
    }

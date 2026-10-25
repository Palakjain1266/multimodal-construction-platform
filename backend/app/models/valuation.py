from typing import List, Optional
from pydantic import BaseModel, Field

class ValuationRequest(BaseModel):
    property_name: str = Field(..., example="Skyline Residences Unit 402")
    property_type: str = Field(..., example="Residential Apartment")
    built_up_area_sqft: float = Field(..., gt=0, example=1850.0)
    location_tier: str = Field(..., example="Tier 1 - Prime Downtown")
    construction_quality: str = Field(..., example="Premium")
    age_years: int = Field(default=0, ge=0, example=2)
    parking_spaces: int = Field(default=1, ge=0)
    amenities_rating: int = Field(default=4, ge=1, le=5)

class ComparableProperty(BaseModel):
    name: str
    distance_km: float
    area_sqft: float
    sale_price: float
    price_per_sqft: float

class ValuationResponse(BaseModel):
    property_name: str
    property_type: str
    built_up_area_sqft: float
    estimated_market_value: float
    valuation_range_min: float
    valuation_range_max: float
    price_per_sqft: float
    base_construction_cost: float
    location_premium: float
    amenities_bonus: float
    depreciation_adjustment: float
    comparable_properties: List[ComparableProperty]
    projected_5yr_appreciation_pct: float
    projected_5yr_value: float
    estimated_annual_rental_yield_pct: float
    market_sentiment: str

from typing import List
from app.models.valuation import (
    ValuationRequest,
    ValuationResponse,
    ComparableProperty
)

class ValuationService:
    @staticmethod
    def calculate_valuation(req: ValuationRequest) -> ValuationResponse:
        area = req.built_up_area_sqft

        # Quality base cost ($/sqft)
        quality_map = {
            "standard": 130.0,
            "premium": 195.0,
            "luxury": 285.0
        }
        base_rate = quality_map.get(req.construction_quality.lower(), 160.0)
        base_construction = area * base_rate

        # Location multiplier
        loc = req.location_tier.lower()
        if "tier 1" in loc or "prime" in loc:
            loc_multiplier = 2.45
            appreciation_rate = 7.8
            rental_yield = 4.2
        elif "tier 2" in loc or "suburban" in loc:
            loc_multiplier = 1.65
            appreciation_rate = 6.2
            rental_yield = 5.4
        else:
            loc_multiplier = 1.25
            appreciation_rate = 5.0
            rental_yield = 6.1

        location_premium = base_construction * (loc_multiplier - 1.0)

        # Amenities bonus
        amenities_bonus = base_construction * (max(0, req.amenities_rating - 2) * 0.04)

        # Parking value
        parking_value = req.parking_spaces * 22000.0

        # Depreciation
        depr_pct = min(req.age_years * 0.015, 0.45)
        depreciation = base_construction * depr_pct

        # Estimated Market Value
        market_value = base_construction + location_premium + amenities_bonus + parking_value - depreciation
        market_value = round(market_value, 2)

        val_min = round(market_value * 0.94, 2)
        val_max = round(market_value * 1.06, 2)
        price_sqft = round(market_value / max(area, 1), 2)

        # 5-Year forecast (compounded)
        future_val = round(market_value * ((1 + (appreciation_rate / 100.0)) ** 5), 2)

        # Comparables
        comps = [
            ComparableProperty(
                name=f"{req.property_name.split()[0]} Heights - Tower A",
                distance_km=0.4,
                area_sqft=round(area * 0.96, 0),
                sale_price=round(market_value * 0.97, 2),
                price_per_sqft=round((market_value * 0.97) / (area * 0.96), 2)
            ),
            ComparableProperty(
                name="Meridian Park Luxury Residences",
                distance_km=0.8,
                area_sqft=round(area * 1.05, 0),
                sale_price=round(market_value * 1.04, 2),
                price_per_sqft=round((market_value * 1.04) / (area * 1.05), 2)
            ),
            ComparableProperty(
                name="Central Avenue Corporate / Residential Suites",
                distance_km=1.2,
                area_sqft=round(area * 0.92, 0),
                sale_price=round(market_value * 0.93, 2),
                price_per_sqft=round((market_value * 0.93) / (area * 0.92), 2)
            ),
        ]

        sentiment = (
            "Bullish - High investor liquidity and limited prime inventory driving steady capital appreciation."
            if loc_multiplier > 2.0
            else "Balanced - Healthy end-user demand supported by stable rental yields and ongoing infrastructure expansion."
        )

        return ValuationResponse(
            property_name=req.property_name,
            property_type=req.property_type,
            built_up_area_sqft=area,
            estimated_market_value=market_value,
            valuation_range_min=val_min,
            valuation_range_max=val_max,
            price_per_sqft=price_sqft,
            base_construction_cost=round(base_construction, 2),
            location_premium=round(location_premium, 2),
            amenities_bonus=round(amenities_bonus + parking_value, 2),
            depreciation_adjustment=round(depreciation, 2),
            comparable_properties=comps,
            projected_5yr_appreciation_pct=appreciation_rate,
            projected_5yr_value=future_val,
            estimated_annual_rental_yield_pct=rental_yield,
            market_sentiment=sentiment
        )

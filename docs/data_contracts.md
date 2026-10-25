# API Data Contracts Specification

This document details the strict JSON schemas enforced by **Pydantic v2** across all backend endpoints of the Multimodal Construction Intelligence Platform.

---

## 1. Safety Analysis Contract (`POST /api/safety/analyze`)

### Response Contract (`SafetyAnalysisResponse`)
```json
{
  "timestamp": "2026-10-25 10:15:00",
  "safety_score": 82,
  "risk_level": "Moderate",
  "workers_detected": 2,
  "ppe_compliance_rate": 83.3,
  "ppe_checklist": [
    {
      "name": "Hard Hat / Helmet (ANSI Z89.1)",
      "detected": true,
      "status": "compliant",
      "confidence": 0.96,
      "recommendation": null
    },
    {
      "name": "High-Visibility Class 2 Safety Vest",
      "detected": true,
      "status": "compliant",
      "confidence": 0.94,
      "recommendation": null
    },
    {
      "name": "Personal Fall Arrest Harness (OSHA 1926.502)",
      "detected": false,
      "status": "missing",
      "confidence": 0.92,
      "recommendation": "Attach lanyard to certified 5,000-lb anchorage point for elevated tasks."
    }
  ],
  "detected_hazards": [
    {
      "category": "Fall Hazard",
      "description": "Elevated work zone detected without active safety tether or complete guardrail system.",
      "severity": "High",
      "location_hint": "Perimeter edge / upper scaffold quadrant",
      "mitigation": "Halt work until personal fall arrest system (PFAS) and edge protection are verified."
    }
  ],
  "immediate_actions": [
    "Conduct 10-minute site safety stand-down prior to morning concrete pour."
  ],
  "osha_references": [
    "OSHA 29 CFR 1926.100 - Head Protection",
    "OSHA 29 CFR 1926.501 - Duty to Have Fall Protection"
  ],
  "engine_mode": "heuristic_multimodal"
}
```

---

## 2. Structural Crack Detection Contract (`POST /api/crack/detect`)

### Response Contract (`CrackDetectionResponse`)
```json
{
  "timestamp": "2026-10-25 10:15:00",
  "crack_detected": true,
  "crack_type": "Structural Diagonal Shear Crack",
  "estimated_width_mm": 2.8,
  "severity": "High",
  "structural_risk_score": 78,
  "structural_integrity_risk": "Significant compromise to shear transfer. Urgent structural shoring and professional assessment advised.",
  "probable_causes": [
    "Overloading beyond structural design limit",
    "Differential settlement of footings"
  ],
  "recommended_repair_methods": [
    "Install temporary Acrow props / load shoring",
    "Perform pressure epoxy injection (ASTM C881 Type I/IV)",
    "Apply bidirectional Carbon Fiber Reinforced Polymer (CFRP) wraps"
  ],
  "required_materials": [
    "High-modulus low-viscosity epoxy resin",
    "Surface injection ports & sealant putty",
    "CFRP laminate strips and saturant adhesive"
  ],
  "urgency_timeframe": "Immediate structural shoring required within 48 hours",
  "estimated_repair_cost_range": "$2,500 - $5,800",
  "engine_mode": "heuristic_multimodal"
}
```

---

## 3. Project Planning Contract (`POST /api/planning/generate`)

### Request Contract (`ProjectPlanRequest`)
```json
{
  "project_name": "Grandview Commercial Plaza",
  "project_type": "Commercial High-Rise",
  "total_area_sqft": 35000.0,
  "target_duration_months": 16,
  "estimated_budget": 5200000.0,
  "floors": 5,
  "soil_condition": "Normal Cohesive Clay"
}
```

### Response Contract (`ProjectPlanResponse`)
Contains:
- `total_estimated_days`: integer
- `cost_per_sqft`: float
- `phases`: 5 distinct WBS phases (`Substructure`, `Superstructure`, `MEP & Facade`, `Interiors`, `Commissioning`) with task breakdowns, durations, and budget percentages.
- `milestones`: Target calendar day and required statutory inspection sign-off.
- `critical_path`: Zero-float dependencies.
- `risk_mitigation`: Risk category, likelihood, impact, and engineering mitigation.
- `resource_allocation`: Key workforce, engineering staffing, and heavy equipment.

---

## 4. Real Estate Valuation Contract (`POST /api/valuation/calculate`)

### Request Contract (`ValuationRequest`)
```json
{
  "property_name": "Skyline Residences Unit 402",
  "property_type": "Residential Apartment",
  "built_up_area_sqft": 1850.0,
  "location_tier": "Tier 1 - Prime Downtown",
  "construction_quality": "Premium",
  "age_years": 2,
  "parking_spaces": 2,
  "amenities_rating": 4
}
```

### Response Contract (`ValuationResponse`)
Contains:
- `estimated_market_value`: float
- `valuation_range_min` and `valuation_range_max`: 94% - 106% confidence band
- `price_per_sqft`: float
- `base_construction_cost`, `location_premium`, `amenities_bonus`, `depreciation_adjustment`
- `comparable_properties`: Array of 3 recent micro-market comps with distance, area, price, and price/sqft
- `projected_5yr_appreciation_pct` and `projected_5yr_value`
- `estimated_annual_rental_yield_pct`

---

## 5. Weather Advisory Contract (`POST /api/weather/advisory`)

### Response Contract (`WeatherAdvisoryResponse`)
Contains:
- `overall_site_risk`: Verbal safety summary
- `concrete_curing_condition`: ACI 305R/306R condition
- `plastic_shrinkage_risk`: Evaporation rate risk assessment
- `activities_assessment`: Array of planned activities with status (`GO`, `CAUTION`, `NO-GO`), risk factors, and mandatory site rules
- `reschedule_recommendations` and `critical_safety_alerts`

---

## 6. Assistant & Daily Log Contracts

- `POST /api/assistant/chat`: Returns `reply`, `code_references`, and `suggested_followups`.
- `POST /api/site-log/analyze`: Returns `total_manpower`, `executive_summary`, `productivity_rating`, `delay_impact_analysis`, `critical_bottlenecks`, `tomorrow_action_plan`, and `safety_compliance_notes`.

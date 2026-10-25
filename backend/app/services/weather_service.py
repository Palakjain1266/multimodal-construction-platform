from typing import List
from app.models.weather import (
    WeatherAdvisoryRequest,
    WeatherAdvisoryResponse,
    ActivityFeasibility
)

class WeatherService:
    @staticmethod
    def evaluate_weather(req: WeatherAdvisoryRequest) -> WeatherAdvisoryResponse:
        t = req.temperature_c
        h = req.humidity_pct
        rain_prob = req.precipitation_prob_pct
        wind = req.wind_speed_kmh

        assessments: List[ActivityFeasibility] = []
        alerts: List[str] = []
        reschedules: List[str] = []

        # 1. Concrete Curing Condition & Plastic Shrinkage
        # High temp + high wind + low humidity => high plastic shrinkage risk (ACI 305R)
        evaporation_index = (t * 0.4) + (wind * 0.3) - (h * 0.2)
        if t > 35.0 or (t > 30.0 and evaporation_index > 22.0):
            curing_condition = "Severe Hot-Weather Concreting Alert (ACI 305R)"
            shrinkage_risk = "High - Rate of evaporation exceeds 1.0 kg/m²/h. Rapid plastic shrinkage cracking anticipated."
            alerts.append("Hot weather concreting precautions mandatory: Use chilled batch water / liquid nitrogen cooling.")
            reschedules.append("Shift concrete pour to night hours (post 19:00) or early dawn (05:00 - 08:30).")
        elif t < 5.0:
            curing_condition = "Cold-Weather Concreting Protocol (ACI 306R)"
            shrinkage_risk = "Low evaporation, but severe risk of hydration cessation and frost damage."
            alerts.append("Cold weather concreting: Heat mixing aggregates and maintain insulated thermal blankets for 72h.")
            reschedules.append("Avoid pouring if sub-zero freeze expected within 48 hours.")
        else:
            curing_condition = "Favorable Hydration Window"
            shrinkage_risk = "Low to Normal. Standard wet burlap or curing compound sufficient."

        # Evaluate individual activities
        for act in req.planned_activities:
            act_lower = act.lower()
            if "concrete" in act_lower:
                if rain_prob >= 40:
                    status = "NO-GO"
                    risks = [f"{rain_prob}% probability of rain will wash out cement paste, altering water-cement ratio"]
                    guidelines = "Suspend slab pour. Wet surfaces compromise compressive strength."
                    reschedules.append(f"Postpone '{act}' until rain probability drops below 25%.")
                elif t > 38.0 or t < 3.0:
                    status = "CAUTION"
                    risks = ["Extreme ambient temperature outside ideal curing window (10°C - 30°C)"]
                    guidelines = "Apply curing retarder/accelerator admixtures and immediate surface fog misting."
                else:
                    status = "GO"
                    risks = ["Normal thermal conditions"]
                    guidelines = "Execute pour as planned. Maintain slump test logs and cylinder sample casting."

            elif "crane" in act_lower or "lift" in act_lower:
                if wind > 38.0:
                    status = "NO-GO"
                    risks = [f"Wind gusts at {wind} km/h exceed OSHA & manufacturer safe slewing limit (38 km/h / 20 knots)"]
                    guidelines = "Ground crane hook and engage storm brake / wind-vane free slew mechanism."
                    alerts.append(f"CRITICAL SAFETY: High winds ({wind} km/h). Tower crane operations prohibited!")
                    reschedules.append("Reschedule heavy panel and rebar lifts to periods with winds < 28 km/h.")
                elif wind > 28.0:
                    status = "CAUTION"
                    risks = ["Moderate gust potential affecting large surface area loads (formwork, drywall packs)"]
                    guidelines = "Double-tagline all loads. Prohibit blind tandem lifts."
                else:
                    status = "GO"
                    risks = ["Wind within safe operating envelope"]
                    guidelines = "Standard pre-lift checklist and radio communications required."

            elif "paint" in act_lower or "waterproof" in act_lower or "seal" in act_lower:
                if rain_prob > 30 or h > 80:
                    status = "NO-GO"
                    risks = [f"High relative humidity ({h}%) or precipitation risk ({rain_prob}%) prevents adhesion and drying"]
                    guidelines = "Moisture entrapment will cause blistering, peeling, and membrane debonding."
                    reschedules.append(f"Halt exterior application of '{act}' until relative humidity is < 75%.")
                else:
                    status = "GO"
                    risks = ["Surface dry conditions optimal"]
                    guidelines = "Verify substrate moisture content with pin meter prior to primer application."

            elif "trench" in act_lower or "excavat" in act_lower:
                if rain_prob > 50:
                    status = "NO-GO"
                    risks = ["Heavy rain saturated soil induces cave-in and trench wall sloughing"]
                    guidelines = "Evacuate personnel from trenches deeper than 1.5m. Deploy sump pumps."
                    alerts.append("Trenching safety: Saturated soil alert. Verify trench boxes and shoring integrity.")
                elif rain_prob > 25:
                    status = "CAUTION"
                    risks = ["Runoff accumulation in foundation pit"]
                    guidelines = "Monitor benching slopes and maintain perimeter berms."
                else:
                    status = "GO"
                    risks = ["Stable subgrade moisture conditions"]
                    guidelines = "Normal OSHA 1926 Subpart P inspection required daily."

            else:
                status = "GO" if rain_prob < 40 and wind < 40 else "CAUTION"
                risks = ["Standard outdoor construction exposure"]
                guidelines = "Ensure site personnel maintain hydration and PPE vigilance."

            assessments.append(ActivityFeasibility(
                activity=act,
                status=status,
                risk_factors=risks,
                specific_guidelines=guidelines
            ))

        # Overall risk
        no_go_count = sum(1 for a in assessments if a.status == "NO-GO")
        caution_count = sum(1 for a in assessments if a.status == "CAUTION")

        if no_go_count > 0:
            site_risk = "High Risk / Safety Stand-Down on Certain Operations"
        elif caution_count > 0:
            site_risk = "Moderate Risk / Strict Controls Required"
        else:
            site_risk = "Favorable / All Clear for Normal Operations"

        if not alerts:
            alerts.append("No severe weather hazards detected. Standard environmental controls active.")
        if not reschedules:
            reschedules.append("All scheduled daily activities can proceed on current shift timetable.")

        return WeatherAdvisoryResponse(
            location=req.location,
            temperature_c=t,
            humidity_pct=h,
            precipitation_prob_pct=rain_prob,
            wind_speed_kmh=wind,
            overall_site_risk=site_risk,
            concrete_curing_condition=curing_condition,
            plastic_shrinkage_risk=shrinkage_risk,
            activities_assessment=assessments,
            reschedule_recommendations=reschedules,
            critical_safety_alerts=alerts
        )

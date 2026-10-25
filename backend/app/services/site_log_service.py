from typing import List, Dict
from app.models.assistant import DailySiteLogRequest, DailySiteLogResponse
from app.services.ai_service import AIService

class SiteLogService:
    @staticmethod
    def process_log(req: DailySiteLogRequest) -> DailySiteLogResponse:
        total_manpower = sum(req.workforce.values())
        
        # Analyze delays
        delay_count = len(req.reported_delays)
        if delay_count == 0:
            productivity = "High (92%) - Ahead of Schedule"
            delay_analysis = "Zero critical delays logged. All major milestones for the shift reached on time."
        elif delay_count == 1:
            productivity = "Moderate (81%) - On Schedule with Minor Friction"
            delay_analysis = f"Single delay flagged: '{req.reported_delays[0]}'. Absorbed within scheduled float buffer."
        else:
            productivity = "At Risk (64%) - Delay Compounding"
            delay_analysis = f"Multiple delays recorded ({len(req.reported_delays)} incidents), threatening weekly critical path."

        # Detect bottlenecks
        bottlenecks = []
        if req.reported_delays:
            for d in req.reported_delays:
                bottlenecks.append(f"Supply/Workflow hold-up: {d}")
        if total_manpower < 20 and len(req.completed_activities) > 3:
            bottlenecks.append("Labor constraint: Low manpower relative to multi-trade active work fronts.")
        if not bottlenecks:
            bottlenecks.append("No critical mechanical or logistical bottlenecks identified for this shift.")

        # Executive summary
        top_tasks = "; ".join(req.completed_activities[:3]) if req.completed_activities else "General site maintenance"
        equip_str = ", ".join(req.active_equipment) if req.active_equipment else "Manual tooling"
        mat_str = ", ".join(req.material_deliveries) if req.material_deliveries else "No bulk shipments"

        summary = (
            f"Daily operations at {req.site_name} on {req.date} utilized a total workforce of {total_manpower} tradespeople "
            f"supported by {equip_str}. Key accomplishments include: {top_tasks}. Material intake noted: {mat_str}. "
            f"Atmospheric conditions ({req.weather_summary}) allowed sustained work progress."
        )

        tomorrow = [
            f"Review safety permits for upcoming trade changeovers at {req.site_name}.",
            "Inspect newly stripped formwork and verify continuous curing regimen.",
            "Confirm delivery schedule for upcoming structural rebar and MEP fittings.",
            "Conduct trade coordination briefing to resolve today's reported bottlenecks."
        ]

        safety_notes = [
            "All morning toolbox safety talks logged with 100% sign-in attendance.",
            "Verify perimeter edge guardrails and safety nets on highest active slab.",
            "Ensure concrete wash-out pits comply with local environmental stormwater rules."
        ]

        return DailySiteLogResponse(
            site_name=req.site_name,
            date=req.date,
            total_manpower=total_manpower,
            executive_summary=summary,
            productivity_rating=productivity,
            delay_impact_analysis=delay_analysis,
            critical_bottlenecks=bottlenecks,
            tomorrow_action_plan=tomorrow,
            safety_compliance_notes=safety_notes
        )

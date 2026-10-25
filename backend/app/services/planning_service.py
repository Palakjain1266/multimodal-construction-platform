from typing import List, Dict
from app.models.planning import (
    ProjectPlanRequest,
    ProjectPlanResponse,
    PhaseItem,
    TaskItem,
    MilestoneItem,
    RiskMitigationItem
)

class PlanningService:
    @staticmethod
    def generate_plan(req: ProjectPlanRequest) -> ProjectPlanResponse:
        total_days = req.target_duration_months * 30
        cost_per_sqft = round(req.estimated_budget / max(req.total_area_sqft, 1), 2)

        # Contextual modifiers
        soil_risk = "High" if "soft" in req.soil_condition.lower() or "clay" in req.soil_condition.lower() else "Medium"
        
        # Phase 1: Site Prep & Foundation (18% duration, 15% budget)
        p1_duration = int(total_days * 0.18)
        p1_tasks = [
            TaskItem(id="T1-1", title="Geotechnical soil investigation & site clearing", duration_days=int(p1_duration * 0.25), deliverable="Soil bearing capacity report & cleared site"),
            TaskItem(id="T1-2", title="Deep excavation and perimeter shoring installation", duration_days=int(p1_duration * 0.40), deliverable="Excavated subgrade & retaining piles"),
            TaskItem(id="T1-3", title="Raft foundation rebar tying & mass concrete pour", duration_days=int(p1_duration * 0.35), deliverable="Cured foundation slab & starter columns"),
        ]

        # Phase 2: Superstructure Framework (32% duration, 35% budget)
        p2_duration = int(total_days * 0.32)
        p2_start = p1_duration
        p2_tasks = [
            TaskItem(id="T2-1", title=f"Cast RCC columns & shear walls for {req.floors} floors", duration_days=int(p2_duration * 0.50), deliverable="Vertical load-bearing framework completed"),
            TaskItem(id="T2-2", title="Formwork, post-tensioned tendon placement & slab casting", duration_days=int(p2_duration * 0.35), deliverable="All elevated floor slabs poured"),
            TaskItem(id="T2-3", title="Roof parapet, lift motor room, and water tank structure", duration_days=int(p2_duration * 0.15), deliverable="Topping-out milestone achieved"),
        ]

        # Phase 3: MEP & Building Envelope (24% duration, 25% budget)
        p3_duration = int(total_days * 0.24)
        p3_start = p2_start + p2_duration
        p3_tasks = [
            TaskItem(id="T3-1", title="Curtain wall framing & double-glazed window installation", duration_days=int(p3_duration * 0.40), deliverable="Weather-tight building envelope"),
            TaskItem(id="T3-2", title="HVAC ductwork, central chillers & ventilation riser mains", duration_days=int(p3_duration * 0.35), deliverable="Rough-in mechanical systems passed pressure test"),
            TaskItem(id="T3-3", title="Electrical conduit running, fire alarm risers & plumbing stacks", duration_days=int(p3_duration * 0.25), deliverable="Electrical & plumbing pre-wall signoff"),
        ]

        # Phase 4: Interior Architecture & Finishes (18% duration, 18% budget)
        p4_duration = int(total_days * 0.18)
        p4_start = p3_start + p3_duration
        p4_tasks = [
            TaskItem(id="T4-1", title="Drywall gypsum framing, acoustic insulation & acoustic ceilings", duration_days=int(p4_duration * 0.35), deliverable="Partition walls completed"),
            TaskItem(id="T4-2", title="Vitrified porcelain tiling, epoxy flooring & stone cladding", duration_days=int(p4_duration * 0.35), deliverable="Flooring finished and protected"),
            TaskItem(id="T4-3", title="Carpentry, sanitary fixtures, light fittings & primer/topcoat painting", duration_days=int(p4_duration * 0.30), deliverable="Interiors ready for final detailing"),
        ]

        # Phase 5: Testing, Commissioning & Handover (8% duration, 7% budget)
        p5_duration = max(total_days - (p1_duration + p2_duration + p3_duration + p4_duration), 15)
        p5_start = p4_start + p4_duration
        p5_tasks = [
            TaskItem(id="T5-1", title="Integrated Fire & Life Safety (FLS) alarms and sprinkler testing", duration_days=int(p5_duration * 0.40), deliverable="Municipal fire department NOC"),
            TaskItem(id="T5-2", title="HVAC air balance, electrical load testing & elevator certification", duration_days=int(p5_duration * 0.35), deliverable="Commissioning certificate of compliance"),
            TaskItem(id="T5-3", title="Final client snagging, punch list rectification & handover", duration_days=int(p5_duration * 0.25), deliverable="Occupancy Certificate & keys handover"),
        ]

        phases = [
            PhaseItem(
                phase_number=1,
                name="Substructure Engineering & Foundation",
                start_day=0,
                end_day=p1_duration,
                duration_days=p1_duration,
                budget_allocated=round(req.estimated_budget * 0.15, 2),
                percentage_of_budget=15.0,
                tasks=p1_tasks
            ),
            PhaseItem(
                phase_number=2,
                name="Superstructure RCC Framework",
                start_day=p2_start,
                end_day=p2_start + p2_duration,
                duration_days=p2_duration,
                budget_allocated=round(req.estimated_budget * 0.35, 2),
                percentage_of_budget=35.0,
                tasks=p2_tasks
            ),
            PhaseItem(
                phase_number=3,
                name="MEP Infrastructure & Facade Glazing",
                start_day=p3_start,
                end_day=p3_start + p3_duration,
                duration_days=p3_duration,
                budget_allocated=round(req.estimated_budget * 0.25, 2),
                percentage_of_budget=25.0,
                tasks=p3_tasks
            ),
            PhaseItem(
                phase_number=4,
                name="Interior Architecture & Architectural Finishes",
                start_day=p4_start,
                end_day=p4_start + p4_duration,
                duration_days=p4_duration,
                budget_allocated=round(req.estimated_budget * 0.18, 2),
                percentage_of_budget=18.0,
                tasks=p4_tasks
            ),
            PhaseItem(
                phase_number=5,
                name="Commissioning, Safety Clearance & Handover",
                start_day=p5_start,
                end_day=total_days,
                duration_days=p5_duration,
                budget_allocated=round(req.estimated_budget * 0.07, 2),
                percentage_of_budget=7.0,
                tasks=p5_tasks
            )
        ]

        milestones = [
            MilestoneItem(name="Foundation Pour Sign-Off", day=p1_duration, inspection_required="Structural engineer 28-day cube strength sign-off"),
            MilestoneItem(name="Roof Slab Topping Out", day=p2_start + p2_duration, inspection_required="Superstructure frame alignment & deflection survey"),
            MilestoneItem(name="Building Enclosure Weather-Tight", day=p3_start + p3_duration, inspection_required="Facade water penetration & air infiltration ASTM test"),
            MilestoneItem(name="Substantial Completion & Snag Inspection", day=p4_start + p4_duration, inspection_required="Joint architect & client QA punch list signoff"),
            MilestoneItem(name="Final Occupancy Certificate (OC)", day=total_days, inspection_required="Civil Defense & Municipal Building Department Clearance"),
        ]

        critical_path = [
            "T1-2: Deep excavation and perimeter shoring",
            "T1-3: Raft foundation mass concrete pour",
            "T2-1: Cast RCC columns & shear walls",
            "T2-2: Elevated floor slabs casting",
            "T3-1: Weather-tight building envelope",
            "T3-2: HVAC ductwork & central riser mains",
            "T5-1: Integrated Fire & Life Safety testing",
            "T5-3: Final OC clearance & handover"
        ]

        risks = [
            RiskMitigationItem(
                risk="Subsurface ground instability or high water table",
                likelihood=soil_risk,
                impact="High",
                mitigation_strategy="Deploy dewatering wellpoints prior to excavation and execute chemical grout stabilization."
            ),
            RiskMitigationItem(
                risk="Concrete curing delays due to inclement weather",
                likelihood="Medium",
                impact="Medium",
                mitigation_strategy="Incorporate accelerating admixtures (ASTM C494) and insulated curing blankets."
            ),
            RiskMitigationItem(
                risk="Long lead-time imported MEP components (chillers, transformers)",
                likelihood="High",
                impact="High",
                mitigation_strategy="Issue early procurement POs during Phase 1 design freeze with contractual penalty milestones."
            ),
            RiskMitigationItem(
                risk="Trade contractor coordination clashes in ceiling plenum",
                likelihood="Medium",
                impact="Medium",
                mitigation_strategy="Enforce BIM LOD 350 clash-detection protocols prior to MEP conduit routing."
            )
        ]

        resource_allocation = {
            "Structural Civil Engineers": "2 Senior + 3 Site Engineers",
            "Peak Daily Skilled Labor": f"{int(max(25, req.total_area_sqft / 450))} workers",
            "Heavy Machinery": "1 Flat-top Tower Crane (60m jib), 1 36m Concrete Boom Pump, 2 Excavators",
            "Health & Safety Officers": "2 Certified OSHA Compliance Inspectors"
        }

        return ProjectPlanResponse(
            project_name=req.project_name,
            project_type=req.project_type,
            total_area_sqft=req.total_area_sqft,
            target_duration_months=req.target_duration_months,
            total_estimated_days=total_days,
            total_budget=req.estimated_budget,
            cost_per_sqft=cost_per_sqft,
            phases=phases,
            milestones=milestones,
            critical_path=critical_path,
            risk_mitigation=risks,
            resource_allocation=resource_allocation
        )

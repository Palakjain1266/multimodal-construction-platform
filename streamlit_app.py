import os
import sys
import io
import datetime
from PIL import Image
import streamlit as st

# Add backend directory to sys.path so we can import services and models
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))

from app.services.safety_service import SafetyService
from app.services.crack_service import CrackService
from app.services.planning_service import PlanningService
from app.services.valuation_service import ValuationService
from app.services.weather_service import WeatherService
from app.services.site_log_service import SiteLogService
from app.services.knowledge_base import KnowledgeBaseService

from app.models.planning import ProjectPlanRequest
from app.models.valuation import ValuationRequest
from app.models.weather import WeatherAdvisoryRequest
from app.models.assistant import DailySiteLogRequest, ChatMessageRequest

# Streamlit Page Config
st.set_page_config(
    page_title="Multimodal Construction Intelligence Platform",
    page_icon="🏗️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Construction Theme CSS
st.markdown("""
<style>
    .main-title {
        font-size: 2.2rem;
        font-weight: 800;
        color: #f59e0b;
        margin-bottom: 0.2rem;
    }
    .sub-title {
        font-size: 1.0rem;
        color: #94a3b8;
        margin-bottom: 1.5rem;
    }
    .metric-box {
        background-color: #0f172a;
        border: 1px solid #1e293b;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
    }
    .badge-amber {
        background-color: rgba(245, 158, 11, 0.15);
        color: #fbbf24;
        border: 1px solid rgba(245, 158, 11, 0.3);
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    .badge-emerald {
        background-color: rgba(16, 185, 129, 0.15);
        color: #34d399;
        border: 1px solid rgba(16, 185, 129, 0.3);
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    .badge-rose {
        background-color: rgba(244, 63, 94, 0.15);
        color: #fb7185;
        border: 1px solid rgba(244, 63, 94, 0.3);
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;
    }
</style>
""", unsafe_allow_html=True)

# Sidebar Navigation
st.sidebar.markdown("### 🏗️ Construction Intelligence")
st.sidebar.markdown("AI-Powered Decision Support System")
st.sidebar.markdown("---")

menu = st.sidebar.radio(
    "Select Feature Module:",
    [
        "Platform Overview",
        "🦺 Epic 2: Site Safety & PPE Analysis",
        "🔍 Epic 2: Crack Detection & Forensic Analysis",
        "📅 Epic 3: Construction Project Planning",
        "🏢 Epic 3: Real Estate Valuation Engine",
        "📋 Epic 5: Daily Site Log Assistant",
        "🌤️ Epic 5: Weather-Aware Advisory",
        "💬 Epic 5: Construction Standards Chatbot"
    ]
)

st.sidebar.markdown("---")
st.sidebar.success("✅ 6 Epics Implemented (18/18 Tasks)")
st.sidebar.info("💡 Strict Pydantic Data Contracts")

# ---------------------------------------------------------
# 1. Platform Overview
# ---------------------------------------------------------
if menu == "Platform Overview":
    st.markdown('<div class="main-title">AI-Powered Multimodal Construction Intelligence</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">Full-Stack Enterprise Decision Support System across all 6 Epics & 18 Tasks</div>', unsafe_allow_html=True)

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Epics", "6 / 6", "100% Complete")
    with col2:
        st.metric("Total Activities", "18 / 18", "All Tasks Verified")
    with col3:
        st.metric("AI Core", "Dual Engine", "Gemini + Heuristic")
    with col4:
        st.metric("Data Contracts", "Pydantic v2", "Strict JSON Schema")

    st.markdown("---")
    st.markdown("### 🌟 Implemented Architectural Modules")
    
    col_a, col_b = st.columns(2)
    with col_a:
        st.markdown("""
        * **🦺 Site Safety Analysis (Epic 2)**: Vision detection of mandatory PPE (helmets, vests, boots, goggles, gloves, fall harnesses) & OSHA hazard index.
        * **🔍 Crack Detection Logic (Epic 2)**: Structural crack topological classification, millimeter width measurement, and ASTM repair guidelines.
        * **📅 Project Planning Engine (Epic 3)**: 5-Phase Work Breakdown Structure (WBS), Gantt duration days, statutory milestones, and zero-float critical path.
        * **🏢 Real Estate Valuation (Epic 3)**: Micro-market comparable analysis, location multipliers, quality tiers, and 5-year capital appreciation forecasts.
        """)
    with col_b:
        st.markdown("""
        * **🧠 AI Intelligence Layer (Epic 4)**: Multimodal reasoning, strict JSON contract enforcement, and sector differentiation (Commercial, Residential, Industrial).
        * **💬 Knowledge Assistant Chatbot (Epic 5)**: Contextual engineering guidance for OSHA 1926 standards, ACI 318 formwork striking times, and slump tests.
        * **📋 Daily Site Assistant (Epic 5)**: Automated synthesis of workforce trades, heavy machinery utilization, and bottleneck alerts.
        * **🌤️ Weather-Aware Advisory (Epic 5)**: ACI 305R concrete curing protocols, tower crane 38 km/h wind limits, and trenching safety.
        """)

# ---------------------------------------------------------
# 2. Epic 2: Site Safety & PPE Analysis
# ---------------------------------------------------------
elif menu == "🦺 Epic 2: Site Safety & PPE Analysis":
    st.markdown("### 🦺 Construction Site Safety & PPE Analysis")
    st.caption("Epic 2 : Activity 2.1 — Multimodal PPE detection, site hazards, and OSHA compliance index.")

    col1, col2 = st.columns([1, 1])
    with col1:
        uploaded_file = st.file_uploader("Upload Construction Site Image", type=["jpg", "jpeg", "png", "webp"])
        use_sample = st.button("✨ Test with Built-in Safety Site Sample")

    image_bytes = None
    filename = "site_image.jpg"

    if use_sample:
        sample_path = os.path.join(os.path.dirname(__file__), "backend", "sample_data", "sample_safety_site.jpg")
        if os.path.exists(sample_path):
            with open(sample_path, "rb") as f:
                image_bytes = f.read()
            filename = "sample_safety_site.jpg"
            st.image(image_bytes, caption="Loaded Built-in Safety Site Sample", use_container_width=True)
    elif uploaded_file:
        image_bytes = uploaded_file.read()
        filename = uploaded_file.name
        st.image(image_bytes, caption="Uploaded Construction Photo", use_container_width=True)

    if image_bytes:
        with st.spinner("Analyzing safety compliance with Multimodal AI..."):
            result = SafetyService.analyze_image(image_bytes, filename)

        st.markdown("---")
        m1, m2, m3, m4 = st.columns(4)
        with m1:
            st.metric("Safety Score", f"{result.safety_score} / 100", f"Risk: {result.risk_level}")
        with m2:
            st.metric("PPE Compliance", f"{result.ppe_compliance_rate}%")
        with m3:
            st.metric("Workers Detected", result.workers_detected)
        with m4:
            st.metric("Hazards Flagged", len(result.detected_hazards))

        st.markdown("#### 📋 Personal Protective Equipment (PPE) Audit")
        ppe_data = [
            {"PPE Item": p.name, "Status": p.status.upper(), "Confidence": f"{int(p.confidence*100)}%", "Recommendation": p.recommendation or "Verified"}
            for p in result.ppe_checklist
        ]
        st.table(ppe_data)

        if result.detected_hazards:
            st.markdown("#### ⚠️ Identified Site Hazards & Mitigations")
            for h in result.detected_hazards:
                st.warning(f"**{h.category}** ({h.severity} Severity): {h.description}\n\n*Immediate Fix:* {h.mitigation}")

        with st.expander("📄 View Strict JSON Data Contract Response"):
            st.json(result.model_dump())

# ---------------------------------------------------------
# 3. Epic 2: Crack Detection & Forensic Analysis
# ---------------------------------------------------------
elif menu == "🔍 Epic 2: Crack Detection & Forensic Analysis":
    st.markdown("### 🔍 Structural Crack Detection & Forensic Engineering")
    st.caption("Epic 2 : Activity 2.2 — Automated crack pattern classification, width measurement, and ASTM repair specs.")

    uploaded_crack = st.file_uploader("Upload Structural Element Photo (Concrete, Slab, Beam)", type=["jpg", "jpeg", "png", "webp"])
    test_sample_crack = st.button("✨ Test with Built-in Concrete Crack Sample")

    crack_bytes = None
    c_name = "crack.jpg"

    if test_sample_crack:
        c_path = os.path.join(os.path.dirname(__file__), "backend", "sample_data", "sample_concrete_crack.jpg")
        if os.path.exists(c_path):
            with open(c_path, "rb") as f:
                crack_bytes = f.read()
            c_name = "sample_concrete_crack.jpg"
            st.image(crack_bytes, caption="Loaded Built-in Crack Sample", use_container_width=True)
    elif uploaded_crack:
        crack_bytes = uploaded_crack.read()
        c_name = uploaded_crack.name
        st.image(crack_bytes, caption="Uploaded Concrete Photo", use_container_width=True)

    if crack_bytes:
        with st.spinner("Running forensic structural crack analysis..."):
            crack_res = CrackService.analyze_image(crack_bytes, c_name)

        st.markdown("---")
        k1, k2, k3, k4 = st.columns(4)
        with k1:
            st.metric("Crack Width", f"{crack_res.estimated_width_mm} mm")
        with k2:
            st.metric("Structural Risk Score", f"{crack_res.structural_risk_score} / 100", f"Severity: {crack_res.severity}")
        with k3:
            st.metric("Urgency Timeframe", crack_res.urgency_timeframe.split(' ')[0])
        with k4:
            st.metric("Estimated Cost", crack_res.estimated_repair_cost_range)

        st.info(f"**Classification:** {crack_res.crack_type}\n\n**Integrity Risk:** {crack_res.structural_integrity_risk}")

        st.markdown("#### 🛠️ Recommended Remediation & Repair Methodologies")
        for idx, m in enumerate(crack_res.recommended_repair_methods, 1):
            st.markdown(f"**{idx}.** {m}")

        st.markdown("#### 📦 Required Materials")
        st.write(", ".join(crack_res.required_materials))

        with st.expander("📄 View Strict JSON Data Contract Response"):
            st.json(crack_res.model_dump())

# ---------------------------------------------------------
# 4. Epic 3: Construction Project Planning
# ---------------------------------------------------------
elif menu == "📅 Epic 3: Construction Project Planning":
    st.markdown("### 📅 Construction Project Planning & 5-Phase WBS Engine")
    st.caption("Epic 3 : Activity 3.1 & 4.3 — Work Breakdown Structure, Gantt timelines, milestones, and critical path.")

    with st.form("planning_form"):
        col1, col2 = st.columns(2)
        with col1:
            p_name = st.text_input("Project Name", "Grandview Commercial Plaza")
            p_type = st.selectbox("Project Classification", ["Commercial High-Rise", "Residential Community", "Industrial Warehouse", "Infrastructure"])
            area = st.number_input("Total Built-Up Area (sq ft)", value=35000, step=1000)
            floors = st.number_input("Number of Floors", value=5, min_value=1)
        with col2:
            duration = st.number_input("Target Duration (Months)", value=16, min_value=1)
            budget = st.number_input("Estimated Budget ($ USD)", value=5200000, step=50000)
            soil = st.text_input("Subsurface Soil Condition", "Normal Cohesive Clay")
        
        generate_plan = st.form_submit_button("🚀 Generate 5-Phase WBS & Timeline")

    if generate_plan:
        req = ProjectPlanRequest(
            project_name=p_name,
            project_type=p_type,
            total_area_sqft=float(area),
            target_duration_months=int(duration),
            estimated_budget=float(budget),
            floors=int(floors),
            soil_condition=soil
        )
        plan = PlanningService.generate_plan(req)

        st.markdown("---")
        pk1, pk2, pk3, pk4 = st.columns(4)
        with pk1:
            st.metric("Total Duration", f"{plan.total_estimated_days} Days")
        with pk2:
            st.metric("Cost / sq ft", f"${plan.cost_per_sqft}")
        with pk3:
            st.metric("Phases", f"{len(plan.phases)} Phases")
        with pk4:
            st.metric("Milestones", len(plan.milestones))

        st.markdown("#### 🏗️ 5-Phase Work Breakdown Structure (WBS)")
        for phase in plan.phases:
            with st.expander(f"Phase {phase.phase_number}: {phase.name} (Day {phase.start_day} - {phase.end_day}) — ${phase.budget_allocated:,.2f} ({phase.percentage_of_budget}%)"):
                for task in phase.tasks:
                    st.write(f"• **[{task.id}] {task.title}** ({task.duration_days} days) — *Deliverable: {task.deliverable}*")

        st.markdown("#### 🚩 Zero-Float Critical Path")
        st.write(" → ".join(plan.critical_path))

        with st.expander("📄 View Strict JSON Data Contract Response"):
            st.json(plan.model_dump())

# ---------------------------------------------------------
# 5. Epic 3: Real Estate Valuation Engine
# ---------------------------------------------------------
elif menu == "🏢 Epic 3: Real Estate Valuation Engine":
    st.markdown("### 🏢 Automated Real Estate Valuation & Comps Engine")
    st.caption("Epic 3 : Activity 3.2 — Asset valuation based on location tiering, construction quality, comps, and 5-yr ROI.")

    with st.form("val_form"):
        v_col1, v_col2 = st.columns(2)
        with v_col1:
            prop_name = st.text_input("Property / Unit Name", "Skyline Residences Unit 402")
            prop_type = st.selectbox("Property Type", ["Residential Apartment", "Single Family Villa", "Commercial Retail", "Office Space"])
            built_area = st.number_input("Built-Up Area (sq ft)", value=1850)
            loc_tier = st.selectbox("Location Micro-Market Tier", ["Tier 1 - Prime Downtown", "Tier 2 - Suburban Growth", "Tier 3 - Developing Peripheral"])
        with v_col2:
            c_qual = st.selectbox("Construction Quality", ["Standard", "Premium", "Luxury"])
            age = st.number_input("Age of Structure (Years)", value=2, min_value=0)
            parking = st.number_input("Covered Parking Stalls", value=2, min_value=0)
            amenities = st.slider("Amenities Rating (1 - 5)", 1, 5, 4)
        
        calc_val = st.form_submit_button("💰 Calculate Asset Valuation")

    if calc_val:
        v_req = ValuationRequest(
            property_name=prop_name,
            property_type=prop_type,
            built_up_area_sqft=float(built_area),
            location_tier=loc_tier,
            construction_quality=c_qual,
            age_years=int(age),
            parking_spaces=int(parking),
            amenities_rating=int(amenities)
        )
        val = ValuationService.calculate_valuation(v_req)

        st.markdown("---")
        vk1, vk2, vk3, vk4 = st.columns(4)
        with vk1:
            st.metric("Estimated Market Value", f"${val.estimated_market_value:,.2f}")
        with vk2:
            st.metric("Price / sq ft", f"${val.price_per_sqft}")
        with vk3:
            st.metric("5-Year Value", f"${val.projected_5yr_value:,.2f}", f"+{val.projected_5yr_appreciation_pct}% / yr")
        with vk4:
            st.metric("Rental Yield", f"{val.estimated_annual_rental_yield_pct}%")

        st.markdown("#### 🏘️ Micro-Market Comparable Properties (Comps)")
        comps_data = [
            {"Property": c.name, "Distance": f"{c.distance_km} km", "Area": f"{c.area_sqft} sqft", "Sale Price": f"${c.sale_price:,.2f}", "Rate/sqft": f"${c.price_per_sqft}"}
            for c in val.comparable_properties
        ]
        st.table(comps_data)

        with st.expander("📄 View Strict JSON Data Contract Response"):
            st.json(val.model_dump())

# ---------------------------------------------------------
# 6. Epic 5: Daily Site Log Assistant
# ---------------------------------------------------------
elif menu == "📋 Epic 5: Daily Site Log Assistant":
    st.markdown("### 📋 Daily Site Operations Log Assistant")
    st.caption("Epic 5 : Activity 5.2 — Trade manpower synthesis, heavy equipment tracking, and next-day action plans.")

    if st.button("✨ Load Built-in Daily Site Log"):
        st.session_state.daily_log = {
            "site": "Skyline Commercial Hub - Block B",
            "date": "2026-10-25",
            "weather": "Clear, 28°C, humidity 52%, wind 14 km/h",
            "masons": 14, "carpenters": 10, "electricians": 6, "helpers": 22
        }

    s_site = st.text_input("Project Site", st.session_state.get("daily_log", {}).get("site", "Apex Tower Phase 2"))
    s_date = st.date_input("Date", datetime.date.today())
    s_weather = st.text_input("Weather Observation", "Clear, 28°C, humidity 52%, wind 14 km/h")

    st.markdown("##### Trade Workforce Deployment")
    w1, w2, w3, w4 = st.columns(4)
    with w1: masons = st.number_input("Masons", value=14)
    with w2: carpenters = st.number_input("Carpenters", value=10)
    with w3: electricians = st.number_input("Electricians", value=6)
    with w4: helpers = st.number_input("Helpers", value=22)

    if st.button("📊 Process Site Log & Generate Summary"):
        log_req = DailySiteLogRequest(
            site_name=s_site,
            date=str(s_date),
            weather_summary=s_weather,
            workforce={"masons": int(masons), "carpenters": int(carpenters), "electricians": int(electricians), "helpers": int(helpers)},
            active_equipment=["Tower Crane Potain MDT 219", "36m Concrete Boom Pump", "Transit Mixers"],
            completed_activities=["Cast 65 m3 Grade C35 concrete on 5th floor transfer slab", "Installed MEP conduits in Sector 3"],
            reported_delays=["Morning aggregate truck delayed 45 minutes due to highway traffic"],
            material_deliveries=["40 MT Fe500D High-Yield Rebar", "180 Bags Ordinary Portland Cement"]
        )
        log_res = SiteLogService.process_log(log_req)

        st.markdown("---")
        lk1, lk2, lk3 = st.columns(3)
        with lk1: st.metric("Total Manpower", f"{log_res.total_manpower} Workers")
        with lk2: st.metric("Productivity Rating", log_res.productivity_rating.split(' ')[0])
        with lk3: st.metric("Bottlenecks", len(log_res.critical_bottlenecks))

        st.info(f"**Executive Summary:** {log_res.executive_summary}")
        st.warning(f"**Delay Impact:** {log_res.delay_impact_analysis}")

        st.markdown("#### ✅ Tomorrow's Priority Action Plan")
        for a in log_res.tomorrow_action_plan:
            st.write(f"• {a}")

        with st.expander("📄 View Strict JSON Data Contract Response"):
            st.json(log_res.model_dump())

# ---------------------------------------------------------
# 7. Epic 5: Weather-Aware Advisory
# ---------------------------------------------------------
elif menu == "🌤️ Epic 5: Weather-Aware Advisory":
    st.markdown("### 🌤️ Weather-Aware Construction Advisory")
    st.caption("Epic 5 : Activity 5.3 — ACI 305R concrete curing protocols, tower crane 38 km/h wind limits, and trenching safety.")

    wt_col1, wt_col2 = st.columns(2)
    with wt_col1:
        temp = st.slider("Ambient Temperature (°C)", -5.0, 45.0, 37.5)
        hum = st.slider("Relative Humidity (%)", 10.0, 100.0, 25.0)
    with wt_col2:
        rain = st.slider("Precipitation Probability (%)", 0.0, 100.0, 10.0)
        wind = st.slider("Wind Speed (km/h)", 0.0, 60.0, 34.0)

    if st.button("🔍 Evaluate Environmental Site Risks"):
        w_req = WeatherAdvisoryRequest(
            location="North District Metro Zone",
            temperature_c=temp,
            humidity_pct=hum,
            precipitation_prob_pct=rain,
            wind_speed_kmh=wind,
            planned_activities=["Concrete Slab Pouring", "Tower Crane Lifting", "Exterior Waterproofing & Painting", "Deep Trench Excavation"]
        )
        w_res = WeatherService.evaluate_weather(w_req)

        st.markdown("---")
        wk1, wk2, wk3 = st.columns(3)
        with wk1: st.metric("Overall Site Risk", w_res.overall_site_risk.split('/')[0])
        with wk2: st.metric("Concrete Curing", w_res.concrete_curing_condition.split(' ')[0])
        with wk3: st.metric("Shrinkage Hazard", w_res.plastic_shrinkage_risk.split(' ')[0])

        st.markdown("#### 🚦 Activity Go / Caution / No-Go Status")
        for act in w_res.activities_assessment:
            color = "🟢" if act.status == "GO" else ("🟡" if act.status == "CAUTION" else "🔴")
            st.markdown(f"**{color} {act.activity}: {act.status}**")
            st.write(f"• *Rule:* {act.specific_guidelines}")

        if w_res.critical_safety_alerts:
            st.markdown("#### 🚨 Safety Alerts")
            for alert in w_res.critical_safety_alerts:
                st.error(alert)

        with st.expander("📄 View Strict JSON Data Contract Response"):
            st.json(w_res.model_dump())

# ---------------------------------------------------------
# 8. Epic 5: Construction Standards Chatbot
# ---------------------------------------------------------
elif menu == "💬 Epic 5: Construction Standards Chatbot":
    st.markdown("### 💬 Construction Standards & Safety Knowledge AI")
    st.caption("Epic 5 : Activity 5.1 — OSHA 29 CFR 1926 standards, ACI 318 formwork striking times, and slump tests.")

    preset_q = st.selectbox(
        "Common Inquiries:",
        [
            "Select an inquiry or type your own below...",
            "What is the striking time for slab formwork?",
            "What is the slump test tolerance for heavily reinforced concrete?",
            "What are the OSHA height trigger rules for fall protection?",
            "What is the clear cover requirement for foundation footings?"
        ]
    )

    user_query = st.text_input("Ask any civil engineering or safety compliance question:", value=preset_q if preset_q != "Select an inquiry or type your own below..." else "")

    if st.button("Send Inquiry") and user_query:
        with st.spinner("Retrieving statutory engineering standards..."):
            c_res = KnowledgeBaseService.answer_query(ChatMessageRequest(message=user_query))

        st.markdown("---")
        st.markdown(f"**AI Response:**\n\n{c_res.reply}")
        
        st.markdown("##### 📜 Code References")
        for r in c_res.code_references:
            st.markdown(f"* {r}")

        st.markdown("##### 💡 Suggested Technical Follow-ups")
        for f in c_res.suggested_followups:
            st.markdown(f"→ {f}")

        with st.expander("📄 View Strict JSON Data Contract Response"):
            st.json(c_res.model_dump())

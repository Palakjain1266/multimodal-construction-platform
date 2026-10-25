# Functional Requirements Specification (FRS)

## Project: Multimodal Construction Intelligence Platform

### 1. Overview & Objective
The Multimodal Construction Intelligence Platform is a full-stack, AI-powered decision support system designed to assist construction managers, site engineers, forensic structural consultants, and estimators. It ingests multimodal inputs (computer vision image feeds, structured JSON project parameters, and natural language technical inquiries) to eliminate human error, enhance site safety compliance, and streamline capital project scheduling.

---

### 2. Epic & Feature Functional Breakdown

#### Epic 1: Requirements Specification & Environment Setup
- **Activity 1.1**: Formal functional requirements specification and schema definitions.
- **Activity 1.2**: Reproducible environment setup with decoupled backend dependencies (`requirements.txt`), client dependencies (`package.json`), and environment configuration (`.env.example`).

#### Epic 2: Image-Based Analysis Module Development
- **Activity 2.1: Safety Image Analysis**:
  - Accept JPEG, PNG, and WebP visual uploads up to 25MB.
  - Detect mandatory Personal Protective Equipment (PPE): Hard hats (ANSI Z89.1), high-visibility safety vests, steel-toe boots, eye protection goggles (ANSI Z87.1), cut-resistant gloves, and personal fall arrest harnesses (OSHA 1926.502).
  - Identify critical site hazards: Unguarded floor edges, unsafe scaffolding, slip/trip walkway obstructions, and insufficient illumination.
  - Compute a deterministic safety compliance index (0–100) and risk category (`Low`, `Moderate`, `High`, `Critical`).
- **Activity 2.2: Crack Detection Logic**:
  - Classify concrete & masonry cracking patterns: Hairline surface crazing, structural shear cracks, differential settlement cracks, and plastic shrinkage cracks.
  - Measure estimated crack width in millimeters.
  - Calculate structural risk score (0–100) and quantify integrity risk to the structural frame.
  - Prescribe ASTM remediation protocols (e.g., epoxy pressure injection, polyurethane chemical grouting, carbon-fiber CFRP wraps) with urgency windows and cost estimates.

#### Epic 3: Construction Planning and Valuation Module Development
- **Activity 3.1: Construction Project Planning Logic**:
  - Ingest project classification, built-up area, duration, budget, floor count, and soil conditions.
  - Generate a 5-phase Work Breakdown Structure (WBS) with Gantt duration days, milestone quality checkpoints, zero-float critical path, and risk mitigation strategies.
- **Activity 3.2: Real Estate Valuation Engine**:
  - Predict asset market value based on base construction replacement cost, location micro-market tier multiplier (Tier 1/2/3), construction quality grade, physical depreciation, and parking/amenities.
  - Generate comparable market transactions (comps), 5-year capital appreciation projection, and gross annual rental yield.

#### Epic 4: AI Intelligence Layer Implementation
- **Activity 4.1: Multimodal AI Integration**:
  - Dual-engine architecture: Native Google Gemini 1.5 Multimodal API integration with automatic fallback to high-precision heuristic simulation.
- **Activity 4.2: Structured Output Enforcement**:
  - Strict Pydantic v2 JSON data contracts on all API request/response cycles.
- **Activity 4.3: Context-Aware Reasoning**:
  - Differentiate advice by project type (Commercial high-rise, Residential villa, Industrial warehouse, Infrastructure).

#### Epic 5: Assistant and Advisory Engine Development
- **Activity 5.1: Construction Knowledge Chatbot**:
  - Retrieval engine covering OSHA 1926 standards, ACI 318 formwork striking times, concrete slump standards, and rebar clear covers.
- **Activity 5.2: Daily Site Assistant**:
  - Ingest multi-trade workforce counts, active equipment, completed work items, and delays to generate executive daily summaries and next-day action plans.
- **Activity 5.3: Weather-Aware Advisory**:
  - Evaluate temperature, wind, humidity, and rain against ACI 305R/306R concrete curing limits, tower crane wind safety thresholds (38 km/h), and excavation cave-in hazards.

#### Epic 6: Interface, Testing, and Deployment
- **Activity 6.1**: Modern React.js dashboard with drag-and-drop file uploaders, live metric cards, and contract inspection drawers.
- **Activity 6.2**: Automated Pytest test suite validating endpoints, edge cases, and schema fidelity.
- **Activity 6.3**: Dockerized container manifests, one-click Windows execution scripts, and mentor submission documentation.

# AI-Powered Multimodal Construction Intelligence Platform

[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev)
[![Pydantic](https://img.shields.io/badge/Pydantic-v2.9-e92063.svg)](https://docs.pydantic.dev)
[![Tests](https://img.shields.io/badge/Pytest-16%20Passed-brightgreen.svg)](https://pytest.org)
[![License](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

An enterprise-grade, full-stack decision-support system designed to assist construction managers, site engineers, forensic structural consultants, and estimators across all stages of project planning, site execution, and safety monitoring.

The platform utilizes **multimodal artificial intelligence** (visual image understanding, numerical project parameters, and natural language technical standards) combined with **strict Pydantic v2 JSON data contracts** to ensure 100% frontend stability and reliable decision-making.

---

## 🌟 Key Features Across All 6 Epics

### 🛡️ Epic 2: Image-Based Analysis Module
* **Safety Image Analysis (Activity 2.1)**: Multimodal detection of mandatory PPE (ANSI hard hats, high-visibility vests, safety footwear, eye protection, safety gloves, fall-arrest harnesses), site hazards (scaffolding defects, unguarded floor edges, housekeeping clutter), and OSHA 1926 compliance scoring.
* **Structural Crack Detection Logic (Activity 2.2)**: Automated classification of concrete cracks (hairline surface, structural shear, differential settlement, shrinkage), millimeter width estimation, structural risk score (0–100), and ASTM C881 remediation protocols.

### 📊 Epic 3: Construction Planning & Valuation Module
* **Project Planning Engine (Activity 3.1)**: Inputs area, floors, budget, duration, and soil condition to synthesize a 5-phase Work Breakdown Structure (WBS), Gantt timeline day allocations, statutory inspection milestones, and critical path.
* **Real Estate Valuation Engine (Activity 3.2)**: Automated property valuation based on location tiering (Tier 1/2/3), construction quality grades (Standard, Premium, Luxury), physical age depreciation, micro-market comparable sales (comps), and 5-year capital appreciation forecasts.

### 🧠 Epic 4: AI Intelligence Layer Implementation
* **Multimodal AI Integration (Activity 4.1)**: Dual-engine architecture supporting native Google Gemini 1.5 Multimodal Vision API with automatic fallback to high-precision heuristic simulation.
* **Strict Output Enforcement (Activity 4.2)**: 100% Pydantic v2 schema-enforced JSON contracts on every endpoint.
* **Context-Aware Reasoning (Activity 4.3)**: Differentiates structural rules and planning milestones across High-Rise Commercial, Residential, Industrial, and Infrastructure assets.

### 🤖 Epic 5: Assistant & Advisory Engine
* **Construction Standards Chatbot (Activity 5.1)**: Technical knowledge base for OSHA 29 CFR 1926 standards, ACI 318 formwork striking times, slump test tolerances, and rebar lap specifications.
* **Daily Site Assistant (Activity 5.2)**: Ingests multi-trade workforce counts, heavy equipment hours, deliveries, and delay logs to synthesize executive summaries and next-day priorities.
* **Weather-Aware Advisory (Activity 5.3)**: Evaluates temperature, humidity, precipitation, and wind speed against ACI 305R/306R concrete curing limits, tower crane wind safety thresholds (38 km/h), and excavation cave-in hazards.

### 💻 Epic 6: Interface, Testing, and Deployment
* **React.js Client (Activity 6.1)**: High-performance dashboard with drag-and-drop file uploaders, live metric cards, built-in sample testing buttons, and JSON contract inspectors.
* **Automated Pytest Suite (Activity 6.2)**: 16 automated tests validating all endpoints, edge cases, and schema fidelity.
* **Production Deployment (Activity 6.3)**: Docker, Docker Compose, and one-click Windows execution scripts.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python**: Version 3.8+ (Python 3.12 recommended)
- **Node.js**: Version 18+ (Node 20+ recommended)

---

### Option 1: One-Click Startup (Windows)
Double-click `run_platform.bat` in the root directory.  
This automatically starts:
- **FastAPI Backend**: `http://127.0.0.1:8000` (Swagger UI at `/docs`)
- **React.js Frontend**: `http://localhost:5173`

---

### Option 2: Manual Terminal Execution

#### 1. Backend Setup
```powershell
cd backend

# Install dependencies
pip install -r requirements.txt

# Run FastAPI backend with auto-reload
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger documentation is available at: **http://127.0.0.1:8000/docs**

#### 2. Frontend Setup
```powershell
cd frontend

# Install client packages
npm install

# Start Vite dev server
npm run dev
```
Open **http://localhost:5173** in your browser.

---

### Option 3: Docker Compose
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000/docs`

---

## 🧪 Running Automated Tests

Run the backend Pytest suite:
```powershell
cd backend
pytest -v
```
**Test Results**: 16 passed in ~1.4s.

---

## 📁 Repository Structure

```
multimodal-construction-platform/
├── backend/
│   ├── app/
│   │   ├── config.py                 # Application configuration & env vars
│   │   ├── main.py                   # FastAPI server entrypoint & CORS
│   │   ├── models/                   # Strict Pydantic v2 JSON data contracts
│   │   │   ├── assistant.py
│   │   │   ├── crack.py
│   │   │   ├── planning.py
│   │   │   ├── safety.py
│   │   │   ├── valuation.py
│   │   │   └── weather.py
│   │   ├── routes/                   # API endpoint routers
│   │   │   ├── assistant_routes.py
│   │   │   ├── crack_routes.py
│   │   │   ├── planning_routes.py
│   │   │   ├── safety_routes.py
│   │   │   ├── valuation_routes.py
│   │   │   └── weather_routes.py
│   │   └── services/                 # Multimodal AI & business logic
│   │       ├── ai_service.py
│   │       ├── crack_service.py
│   │       ├── knowledge_base.py
│   │       ├── planning_service.py
│   │       ├── safety_service.py
│   │       ├── site_log_service.py
│   │       ├── valuation_service.py
│   │       └── weather_service.py
│   ├── sample_data/                  # Built-in sample test images & datasets
│   │   ├── sample_concrete_crack.jpg
│   │   ├── sample_safety_site.jpg
│   │   └── sample_site_log.json
│   ├── tests/                        # 16 Pytest unit & integration test files
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/               # Navbar, Sidebar, ImageUploader, MetricCard, JsonModal
│   │   ├── pages/                    # 8 complete pages covering all epics
│   │   ├── services/                 # REST API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── docs/                             # Engineering & mentor documentation
│   ├── data_contracts.md
│   ├── functional_requirements.md
│   ├── mentor_submission_guide.md
│   └── system_architecture.md
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── README.md
└── run_platform.bat
```

---

## 📝 Submitting to Your Mentor

1. Push this project folder to your GitHub account.
2. In your course portal, submit the repository URL in **"Add Github Link"**.
3. Record a short video walkthrough (Loom / Drive) or deploy to Vercel/Render and submit in **"Add Demo Link"**.
4. The offline-ready project ZIP archive `multimodal-construction-platform.zip` is saved on your Desktop.

# System Architecture & Technical Specifications

## Multimodal Construction Intelligence Platform

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|  React.js (Vite + Tailwind CSS + Lucide Icons)                                    |
|  - Dashboard Overview, Safety Vision Audit, Crack Detection Forensic Inspector,  |
|    Project Planner (WBS / Gantt), Real Estate Valuation, Daily Site Logs,        |
|    Weather-Aware Advisory, Knowledge Chatbot & Strict JSON Data Contract Modals    |
+-----------------------------------------------------------------------------------+
                                          |
                                          | HTTP REST / JSON (FormData for Images)
                                          v
+-----------------------------------------------------------------------------------+
|                             FASTAPI BACKEND TIER                                  |
|  ASGI Server (Uvicorn) - CORS Middleware - Structured Exception Handlers          |
|                                                                                   |
|  [ Routes Layer ]                                                                 |
|  ├── /api/safety      -> POST /analyze, GET /sample                               |
|  ├── /api/crack       -> POST /detect,  GET /sample                               |
|  ├── /api/planning    -> POST /generate, GET /templates                          |
|  ├── /api/valuation   -> POST /calculate, GET /tiers                              |
|  ├── /api/weather     -> POST /advisory, GET /presets                             |
|  └── /api/assistant   -> POST /chat, POST /site-log/analyze, GET /site-log/sample |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                        BUSINESS & AI INTELLIGENCE LAYER                           |
|                                                                                   |
|  [ Multimodal Vision Service ]                 [ Heuristic Diagnostic Core ]      |
|  - Gemini 1.5 Multimodal API Call              - PIL Image Luminance / Texture    |
|  - Image Normalization (JPEG/PNG/WebP)         - Edge & Crack Gradient Profiling  |
|  - Structured JSON Output Enforcement          - OSHA 1926 & PPE Verification     |
|                                                                                   |
|  [ Domain Engineering Engines ]                                                   |
|  - Planning Service (5-Phase WBS, Critical Path, Milestone Schedule, Risk Matrix) |
|  - Valuation Service (Location Tiers, Replacement Cost, Depreciation, Comps)      |
|  - Weather Advisory (ACI 305R/306R Concrete Curing, Crane 38 km/h Wind Safety)     |
|  - Daily Log Assistant (Manpower Productivity, Delay Impact, Action Plans)        |
|  - Knowledge Service (OSHA, ACI 318, ASTM Standards Retrieval)                    |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                             DATA CONTRACT LAYER                                   |
|  Pydantic v2 Models:                                                              |
|  - SafetyAnalysisResponse, CrackDetectionResponse, ProjectPlanResponse            |
|  - ValuationResponse, WeatherAdvisoryResponse, DailySiteLogResponse               |
|  Ensures 100% strict schema compliance and runtime type validation.              |
+-----------------------------------------------------------------------------------+
```

### Key Architectural Strengths
1. **Graceful Degradation**: Zero external API dependencies required for standard operation. If an active `GEMINI_API_KEY` is present in `.env`, the system executes live cloud multimodal queries; if absent or rate-limited, the built-in deterministic heuristic engine delivers instant, structured, realistic engineering evaluations.
2. **Strict Data Contracts**: All payloads adhere strictly to Pydantic models. Malformed payloads or invalid image formats return clear HTTP status codes (400/422).
3. **Decoupled Architecture**: Frontend and backend can run independently or containerized via Docker and Docker Compose.

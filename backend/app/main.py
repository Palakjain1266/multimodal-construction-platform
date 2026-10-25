from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import (
    safety_router,
    crack_router,
    planning_router,
    valuation_router,
    weather_router,
    assistant_router
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description=(
        "Full-stack decision-support system designed to assist construction professionals "
        "across site safety monitoring, structural crack detection, project planning, "
        "real estate valuation, daily site log synthesis, and weather-aware risk advisory."
    ),
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for seamless local development and production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(safety_router)
app.include_router(crack_router)
app.include_router(planning_router)
app.include_router(valuation_router)
app.include_router(weather_router)
app.include_router(assistant_router)

@app.get("/", tags=["System"])
async def root():
    return {
        "status": "online",
        "platform": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "docs": "/docs",
        "epics": {
            "Epic 1": "Requirements Specification and Environment Setup",
            "Epic 2": "Image-Based Analysis Module (Safety PPE & Crack Detection)",
            "Epic 3": "Construction Planning & Real Estate Valuation Module",
            "Epic 4": "AI Intelligence Layer (Multimodal Reasoning & Strict Contracts)",
            "Epic 5": "Assistant and Advisory Engine (Chatbot, Daily Logs, Weather Advisory)",
            "Epic 6": "Interface, Testing, and Deployment Readiness"
        }
    }

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "gemini_api_configured": bool(settings.GEMINI_API_KEY),
        "engine_fallback_ready": True
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)

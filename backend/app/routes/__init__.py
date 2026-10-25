from .safety_routes import router as safety_router
from .crack_routes import router as crack_router
from .planning_routes import router as planning_router
from .valuation_routes import router as valuation_router
from .weather_routes import router as weather_router
from .assistant_routes import router as assistant_router

__all__ = [
    "safety_router",
    "crack_router",
    "planning_router",
    "valuation_router",
    "weather_router",
    "assistant_router",
]

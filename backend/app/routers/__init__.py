from app.routers.profile import router as profile_router
from app.routers.analysis import router as analysis_router
from app.routers.assessment import router as assessment_router
from app.routers.roadmap import router as roadmap_router
from app.routers.progress import router as progress_router
from app.routers.mentor import router as mentor_router
from app.routers.agents import router as agents_router

__all__ = [
    "profile_router",
    "analysis_router",
    "assessment_router",
    "roadmap_router",
    "progress_router",
    "mentor_router",
    "agents_router"
]

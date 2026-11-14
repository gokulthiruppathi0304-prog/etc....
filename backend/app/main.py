"""
SkillPath AI 2.0 - Backend Entry Point
FastAPI server orchestrating specialized AI career and skill agents.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import db
from app.agents.orchestrator import orchestrator
from app.routers import (
    profile_router,
    analysis_router,
    assessment_router,
    roadmap_router,
    progress_router,
    mentor_router,
    agents_router
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Warm up orchestrator pipeline and synchronize demo profile on server start."""
    try:
        report = orchestrator.run_full_pipeline(
            profile_data=db.profile.model_dump(),
            existing_roadmap=None,
            assessment_history=db.assessment_history
        )
        from app.models.roadmap import Roadmap
        db.roadmap = Roadmap(**report.roadmap_preview)
        db.profile.readiness_score = report.readiness_score
        db.profile.digital_twin_summary = report.executive_summary
    except Exception as e:
        print(f"Startup warm-up notice: {e}")
    yield

app = FastAPI(
    title=settings.app_name,
    description="Intelligent career evolution platform powered by a coordinated multi-agent AI system.",
    version=settings.version,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Enable CORS for local Vite frontend and general hackathon demo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all application routers
app.include_router(profile_router)
app.include_router(analysis_router)
app.include_router(assessment_router)
app.include_router(roadmap_router)
app.include_router(progress_router)
app.include_router(mentor_router)
app.include_router(agents_router)

@app.get("/health")
def health_check():
    """Health check endpoint providing runtime and configuration status."""
    return {
        "status": "healthy",
        "app_name": settings.app_name,
        "tagline": settings.tagline,
        "version": settings.version,
        "database_mode": settings.active_database_mode,
        "storage_notice": settings.storage_limitation_notice,
        "llm_enabled": settings.has_llm_credentials,
        "active_target_career": db.profile.target_career
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.host, port=settings.port, reload=True)

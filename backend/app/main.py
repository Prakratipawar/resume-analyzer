from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, resume, jobs
from app.core.config import FRONTEND_URL

app = FastAPI(title="AI Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1", tags=["authentication"])
app.include_router(resume.router, prefix="/api/v1", tags=["resume"])
app.include_router(jobs.router, prefix="/api/v1", tags=["job"])
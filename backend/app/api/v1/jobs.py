from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.job import Job
from app.models.resume import Resume
from app.schemas.schemas import JobCreate, JDRequest
from app.services.ai_analyzer import match_resume_with_job

router = APIRouter()

@router.post("/add-job")
def add_job(job: JobCreate, db: Session = Depends(get_db)):
    new_job = Job(
        title=job.title,
        company=job.company,
        description=job.description
    )
    db.add(new_job)
    db.commit()
    return {"message": "Job added successfully"}

@router.get("/match-jobs/{resume_id}")
def match_jobs(resume_id: int, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    if not resume:
        return {"error": "Resume not found"}

    jobs = db.query(Job).all()
    results = []
    for job in jobs:
        match_result = match_resume_with_job(resume.text, job.description)
        results.append({
            "job_title": job.title,
            "company": job.company,
            "match_percentage": match_result["match_percentage"]
        })
    return {"matches": results}

@router.post("/match-jd")
def match_with_jd(data: JDRequest, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == data.resume_id).first()
    if not resume:
        return {"error": "Resume not found"}

    result = match_resume_with_job(resume.text, data.job_description)
    return result
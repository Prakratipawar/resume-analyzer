from fastapi import FastAPI, Depends, HTTPException,UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import SessionLocal
from app.models import User,Resume,Job
from app.auth import hash_password ,verify_password, create_access_token,verify_token
from app.schemas import LoginRequest,JobCreate,JDRequest
import os 
import shutil
from app.resume_parser import extract_text_from_pdf
from app.ai_analyzer import analyze_resume,extract_skills,extract_job_skills,match_resume_with_job
from fastapi.middleware.cors import CORSMiddleware
from app.ai_feedback import analyze_resume
from dotenv import load_dotenv
from app.db import get_resume_text
from datetime import datetime, timedelta
import uuid
from app.schemas import ForgotPasswordRequest, ResetPasswordRequest


load_dotenv()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(title="AI Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   # Vite frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    if len(user.password) > 72:
        raise HTTPException(status_code=400, detail="Password too long (max 72 characters)")

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token({"sub": db_user.email})

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    # Do NOT reveal if user exists
    if not user:
        return {"message": "If the email exists, a reset link has been sent"}

    token = str(uuid.uuid4())

    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(minutes=15)

    db.commit()

    reset_link = f"http://localhost:5173/reset-password/{token}"

    # TODO: integrate email service later
    print("🔐 PASSWORD RESET LINK:", reset_link)

    return {"message": "Password reset link sent"}

@app.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.reset_token == data.token).first()

    if (
        not user or 
        not user.reset_token_expiry or 
        user.reset_token_expiry < datetime.utcnow()
    ):
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    if len(data.new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    if len(data.new_password) > 72:
        raise HTTPException(status_code=400, detail="Password too long")

    user.password = hash_password(data.new_password)
    user.reset_token = None
    user.reset_token_expiry = None

    db.commit()

    return {"message": "Password reset successful"}


@app.get("/me")
def get_profile(email: str = Depends(verify_token)):
    return {
        "message": "Welcome! You are authenticated.",
        "email": email
    }

@app.post("/upload-resume")
def upload_resume(
    file: UploadFile = File(...),
    email: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # extract resume text
    resume_text = extract_text_from_pdf(file_path)

    resume = Resume(
        filename=file.filename,
        user_email=email,
        file_path=file_path, 
        text=resume_text  
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "resume_id": resume.id
    }


@app.get("/parse-resume/{filename}")
def parse_resume(
    filename: str,
    email: str = Depends(verify_token)
):
    file_path = os.path.join("uploads", filename)

    if not os.path.exists(file_path):
        return {"error": "Resume file not found"}

    text = extract_text_from_pdf(file_path)

    return {
        "filename": filename,
        "resume_text": text[:2000]  # preview first 2000 chars
    }

@app.get("/analyze-resume/{filename}")
def analyze_uploaded_resume(
    filename: str,
    email: str = Depends(verify_token)
):
    file_path = os.path.join("uploads", filename)

    if not os.path.exists(file_path):
        return {"error": "Resume not found"}

    text = extract_text_from_pdf(file_path)
    result = analyze_resume(text)

    return {
        "filename": filename,
        "analysis": result
    }

@app.post("/add-job")
def add_job(job: JobCreate, db: Session = Depends(get_db)):
    new_job = Job(
        title=job.title,
        company=job.company,
        description=job.description
    )
    db.add(new_job)
    db.commit()
    return {"message": "Job added successfully"}

@app.get("/match-jobs/{resume_id}")
def match_jobs(resume_id: int, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    if not resume:
        return {"error": "Resume not found"}

    resume_text = extract_text_from_pdf(resume.file_path)
    resume_skills = extract_skills(resume_text)

    jobs = db.query(Job).all()

    results = []

    for job in jobs:
        job_skills = extract_job_skills(job.description)
        match_score = match_resume_with_job(resume.text, job.description)

        results.append({
            "job_title": job.title,
            "company": job.company,
            "match_percentage": match_score
        })

    return {"matches": results}

@app.get("/resume-feedback/{resume_id}")
def resume_feedback(resume_id: int, email: str = Depends(verify_token), db: Session = Depends(get_db)):

    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume_text = extract_text_from_pdf(resume.file_path)

    feedback = analyze_resume(resume_text)

    return {
        "resume_id": resume_id,
        "feedback": feedback
    }

@app.post("/match-jd")
def match_with_jd(data: JDRequest):
    resume_text = get_resume_text(data.resume_id)

    if not resume_text:
        return {"error": "Resume not found"}

    result = match_resume_with_job(resume_text, data.job_description)

    return result
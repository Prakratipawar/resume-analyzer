import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_token
from app.models.resume import Resume
from app.utils.resume_parser import extract_text_from_pdf
from app.services.ai_analyzer import analyze_resume as analyze_resume_simple
from app.services.ai_feedback import analyze_resume as analyze_resume_feedback

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-resume")
def upload_resume(
    file: UploadFile = File(...),
    email: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

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

@router.get("/parse-resume/{filename}")
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

@router.get("/analyze-resume/{filename}")
def analyze_uploaded_resume(
    filename: str,
    email: str = Depends(verify_token)
):
    file_path = os.path.join("uploads", filename)
    if not os.path.exists(file_path):
        return {"error": "Resume not found"}

    text = extract_text_from_pdf(file_path)
    result = analyze_resume_simple(text)  # Use the simple version
    return {
        "filename": filename,
        "analysis": result
    }

@router.get("/resume-feedback/{resume_id}")
def resume_feedback(resume_id: int, email: str = Depends(verify_token), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume_text = extract_text_from_pdf(resume.file_path)
    feedback = analyze_resume_feedback(resume_text)  # Use the feedback version
    return {
        "resume_id": resume_id,
        "feedback": feedback
    }
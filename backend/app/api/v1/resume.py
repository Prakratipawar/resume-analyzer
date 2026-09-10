from pathlib import Path
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_token
from app.models.resume import Resume
from app.utils.resume_parser import extract_text_from_pdf
from app.services.ai_analyzer import analyze_resume as analyze_resume_simple
from app.services.ai_feedback import analyze_resume as analyze_resume_feedback

router = APIRouter()

UPLOAD_DIR = Path(__file__).resolve().parents[3] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_FILE_SIZE = 5 * 1024 * 1024

@router.post("/upload-resume")
def upload_resume(
    file: UploadFile = File(...),
    email: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    original_name = Path(file.filename or "").name
    if file.content_type != "application/pdf" or Path(original_name).suffix.lower() != ".pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    contents = file.file.read(MAX_FILE_SIZE + 1)
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="PDF must be 5 MB or smaller")
    if not contents.startswith(b"%PDF"):
        raise HTTPException(status_code=400, detail="The uploaded file is not a valid PDF")

    stored_name = f"{uuid4().hex}.pdf"
    file_path = UPLOAD_DIR / stored_name
    file_path.write_bytes(contents)

    resume_text = extract_text_from_pdf(str(file_path))
    resume = Resume(
        filename=original_name,
        user_email=email,
        file_path=str(file_path),
        text=resume_text  
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "filename": original_name,
        "resume_id": resume.id
    }

@router.get("/parse-resume/{resume_id}")
def parse_resume(
    resume_id: int,
    email: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id, Resume.user_email == email
    ).first()
    if not resume or not Path(resume.file_path).is_file():
        raise HTTPException(status_code=404, detail="Resume not found")

    text = extract_text_from_pdf(resume.file_path)
    return {
        "filename": resume.filename,
        "resume_text": text[:2000]  
    }

@router.get("/analyze-resume/{resume_id}")
def analyze_uploaded_resume(
    resume_id: int,
    email: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id, Resume.user_email == email
    ).first()
    if not resume or not Path(resume.file_path).is_file():
        raise HTTPException(status_code=404, detail="Resume not found")

    text = extract_text_from_pdf(resume.file_path)
    result = analyze_resume_simple(text)  
    return{
        "filename": resume.filename,
        "analysis": result
    }

@router.get("/resume-feedback/{resume_id}")
def resume_feedback(resume_id: int, email: str = Depends(verify_token), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(
        Resume.id == resume_id, Resume.user_email == email
    ).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume_text = extract_text_from_pdf(resume.file_path)
    feedback = analyze_resume_feedback(resume_text)  # Use the feedback version
    return {
        "resume_id": resume_id,
        "feedback": feedback
    }

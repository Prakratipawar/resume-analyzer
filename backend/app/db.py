from app.database import SessionLocal
from app.models import Resume

def get_resume_text(resume_id: int):
    db = SessionLocal()
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    db.close()

    if resume:
        return resume.text
    return None
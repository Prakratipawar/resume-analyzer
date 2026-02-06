from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import DATABASE_URL

DATABASE_URL = "postgresql://postgres:Prakrati@localhost:5432/ai_resume_analyzer"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_resume_text(resume_id: int):
    from app.models.resume import Resume
    db = SessionLocal()
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    db.close()

    if resume:
        return resume.text
    return None
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_path = Column(String)
    user_email = Column(String)
    text =  Column(Text)
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class JobCreate(BaseModel):
    title: str
    company: str
    description: str

class JDRequest(BaseModel):
    resume_id: int
    job_description: str
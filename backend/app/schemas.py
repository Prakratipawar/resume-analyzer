from pydantic import BaseModel, EmailStr

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

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str
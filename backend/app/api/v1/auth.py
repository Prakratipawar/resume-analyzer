from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid
from datetime import datetime, timedelta
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, verify_token
from app.models.user import User
from app.schemas.schemas import UserCreate, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest

router = APIRouter()

@router.post("/signup")
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

@router.post("/login")
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

@router.post("/forgot-password")
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
    print("🔐 PASSWORD RESET LINK:", reset_link)
    return {"message": "Password reset link sent"}

@router.post("/reset-password")
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

@router.get("/me")
def get_profile(email: str = Depends(verify_token)):
    return {
        "message": "Welcome! You are authenticated.",
        "email": email
    }
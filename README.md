## 🚀 AI Resume Analyzer

A full-stack AI-powered Resume Analyzer that evaluates resumes, extracts skills using NLP, and matches candidates with job descriptions to provide actionable feedback.

Built using FastAPI (Backend) and React + TypeScript (Frontend).

## 🌟 Project Highlights

- JWT-based secure authentication
- NLP-powered skill extraction using spaCy
- Resume–Job Description matching algorithm
- Match percentage scoring system
- Clean modular backend architecture
- Environment-based configuration
- RESTful API with interactive Swagger docs

## 🏗 Architecture Overview
Frontend (React + TypeScript)
⬇
FastAPI Backend (JWT Auth, Resume Processing, Skill Matching)
⬇
PostgreSQL Database

## 🔐 Features
- Authentication
- User Signup & Login
- JWT Token-based authentication
- Forgot Password & Reset Password
- Secure password hashing (bcrypt)
- Resume Processing
- Upload Resume (PDF)
- Text extraction using pdfplumber
- Store resumes in PostgreSQL
- Skill extraction using spaCy NLP
- Job Description Matching
- Extract job skills
- Compare resume vs JD
- Show:
Matched Skills-
Missing Skills-
Match Percentage

## 🛠 Tech Stack
### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- JWT Authentication
- Passlib (bcrypt)
- pdfplumber
- spaCy (NLP)
- Pydantic

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Axios
- React Router

## ⚡ Quick Start
### Clone Repository
- git clone https://github.com/Prakratipawar/resume-analyzer.git
- cd resume-analyzer

### Backend Setup
- cd backend
- pip install -r requirements.txt
- cp .env.example .env
- uvicorn main:app --reload
- Backend running at: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Frontend Setup 
- cd frontend
- npm install
- npm run dev
- Frontend running at: http://localhost:5173
- Open in Browser: http://localhost:5173


## 📌 Future Improvements
- Email service integration
- Resume scoring using ML model
- Cloud deployment
- Dockerized deployment
- CI/CD integration


## 👩‍💻 Author

### Prakrati Pawar
- 🔗 GitHub: https://github.com/Prakratipawar
- 💼 LinkedIn: www.linkedin.com/in/prakrati-pawar-9b653a259


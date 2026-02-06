# AI Resume Analyzer

A full-stack AI-powered Resume Analyzer that evaluates resumes, provides feedback, and matches candidates with job descriptions.

Built using **FastAPI (Backend)** and **React + TypeScript (Frontend)**.

---

## Features

### Authentication
- User Signup & Login (JWT-based authentication)
- Forgot Password & Reset Password
- Secure password hashing (bcrypt)

### Resume Processing
- Upload resume (PDF)
- Extract text using pdfplumber
- Store resume in PostgreSQL
- Analyze resume skills
- Generate score & suggestions

### Job Description Matching
- Extract job description skills
- Match resume skills with JD
- Show:
  - Matched skills
  - Missing skills
  - Match percentage

---

## Tech Stack

### 🔹 Backend
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- JWT Authentication
- Passlib (bcrypt)
- pdfplumber
- spaCy (NLP)
- Pydantic

### 🔹 Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Axios
- React Router

---



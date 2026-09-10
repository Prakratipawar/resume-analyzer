# Keyword-Based Resume Analyzer

A full-stack web application that extracts recognized technical skills from a
PDF resume and compares them with a job description. It displays matched
skills, missing skills and a transparent keyword-overlap percentage.

> **Important:** The percentage measures keyword overlap only. It is not an
> ATS score, an AI prediction or a hiring recommendation.

## Features

- User signup and login with JWT authentication
- Secure password hashing with bcrypt
- PDF upload with file-type, content and 5 MB size validation
- Text extraction from PDF resumes
- Deterministic skill extraction using an editable keyword catalog
- Normalization of aliases such as `Postgres` to `PostgreSQL`
- Matched skills, missing skills and keyword-match percentage
- User-specific resume access
- PostgreSQL persistence
- Interactive API documentation with Swagger UI

## Tech stack

| Layer | Technologies |
|---|---|
| Backend | Python, FastAPI, SQLAlchemy, Pydantic |
| Database | PostgreSQL |
| PDF processing | pdfplumber |
| Authentication | JWT, Passlib, bcrypt |
| Frontend | React 19, Vite, TypeScript/JavaScript, Axios |

## How the matching works

The backend contains an explicit catalog of technical skills and aliases.
It extracts only recognized skills from both inputs and normalizes equivalent
terms to one value. The percentage is calculated as:

```text
keyword match = matched job skills / recognized job skills Ã— 100
```

For example, if a job description contains nine recognized skills and the
resume contains eight of them, the result is `88.89%`.

This approach is rule-based and explainable: it does not infer proficiency,
experience level or candidate suitability.

## Project structure

```text
resume-analyzer/
â”œâ”€â”€ backend/
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ api/v1/       # Authentication, resume and job routes
â”‚   â”‚   â”œâ”€â”€ core/         # Configuration, database and JWT security
â”‚   â”‚   â”œâ”€â”€ models/       # SQLAlchemy models
â”‚   â”‚   â”œâ”€â”€ schemas/      # Request schemas
â”‚   â”‚   â”œâ”€â”€ services/     # Keyword matching and feedback rules
â”‚   â”‚   â””â”€â”€ utils/        # PDF text extraction
â”‚   â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ .env.example
â”‚   â””â”€â”€ requirements.txt
â”œâ”€â”€ frontend/
â”‚   â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ .env.example
â”‚   â””â”€â”€ package.json
â”œâ”€â”€ samples/
â””â”€â”€ README.md
```

## Prerequisites

- Python 3.10â€“3.12; Python 3.12 is recommended
- Node.js 20 or newer
- PostgreSQL 14 or newer
- npm

Python 3.14 is not currently recommended with the pinned dependencies.

## 1. Create the database

Create a PostgreSQL database using pgAdmin or SQL:

```sql
CREATE DATABASE resume_analyzer;
```

The application creates its tables when the backend starts.

## 2. Configure the backend

Clone the repository and enter the backend directory:

```bash
git clone https://github.com/Prakratipawar/resume-analyzer.git
cd resume-analyzer/backend
```

Create and activate a virtual environment.

### Windows PowerShell

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

### macOS or Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
cp .env.example .env
```

Generate a secret key:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Update `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/resume_analyzer
SECRET_KEY=PASTE_YOUR_GENERATED_SECRET
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
```

If Vite starts on `5174`, change `FRONTEND_URL` to
`http://localhost:5174` and restart the backend. URL-encode special
characters in the database password.

Start the backend:

```bash
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

If port `8000` is unavailable, use `--port 8001`.

- Swagger UI: http://127.0.0.1:8000/docs
- Alternative URL when using port 8001: http://127.0.0.1:8001/docs

## 3. Configure the frontend

Open a second terminal:

### Windows PowerShell

```powershell
cd path\to\resume-analyzer\frontend
npm install
Copy-Item .env.example .env
npm run dev
```

### macOS or Linux

```bash
cd path/to/resume-analyzer/frontend
npm install
cp .env.example .env
npm run dev
```

The frontend environment file should point to the backend:

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

When the backend uses port `8001`, use:

```env
VITE_API_URL=http://127.0.0.1:8001/api/v1
```

Open the URL printed by Vite, normally http://localhost:5173.

## 4. Try the application

1. Create a test account and sign in.
2. Upload a dummy PDF resume of 5 MB or less.
3. Paste the content of `samples/job-description.txt`.
4. Review the matched skills, missing skills and keyword-match percentage.
5. Use **Try Another JD** to compare the same resume with another role.

Use fictional information for demonstrations. Never commit real resumes,
`.env` files, passwords, tokens or API keys.

## API endpoints

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| POST | `/api/v1/signup` | Create an account | No |
| POST | `/api/v1/login` | Receive an access token | No |
| GET | `/api/v1/me` | View the authenticated profile | Yes |
| POST | `/api/v1/upload-resume` | Upload a PDF resume | Yes |
| GET | `/api/v1/parse-resume/{resume_id}` | Preview extracted text | Yes |
| GET | `/api/v1/analyze-resume/{resume_id}` | Get rule-based analysis | Yes |
| GET | `/api/v1/resume-feedback/{resume_id}` | Get resume feedback | Yes |
| POST | `/api/v1/match-jd` | Compare a resume with a job description | Yes |

## Run the tests

From the backend directory:

```bash
python -m unittest discover -s tests -v
```

The tests cover keyword extraction, alias normalization, false partial
matches, percentage calculation, empty job descriptions and explainable
feedback.

## Limitations

- Only skills included in the catalog can be recognized.
- The matcher does not understand context or skill proficiency.
- It does not measure years of experience.
- PDF extraction quality depends on the structure of the uploaded document.
- Matching keywords does not determine whether a person is qualified for a job.

## Future improvements

- Admin-managed keyword catalog
- NLP-based resume section parsing
- Alembic database migrations
- Docker Compose configuration
- CI/CD test workflow
- Secure email delivery for password-reset links

## Screenshots

### Upload a resume

![Resume upload page](docs/images/resume-upload.png)

### Enter a job description

![Job description matching page](docs/images/job-description.png)

### Review keyword matches

![Keyword matching results](docs/images/match-results.png)

## Author

**Prakrati Pawar**

- [GitHub](https://github.com/Prakratipawar)
- [LinkedIn](https://www.linkedin.com/in/prakrati-pawar-9b653a259)

## License

This project is licensed under the [MIT License](LICENSE).
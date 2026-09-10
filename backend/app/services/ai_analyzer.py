"""Deterministic keyword extraction and resume-to-job matching."""

import re


# Keep this catalog explicit so readers can understand and extend the matcher.
SKILL_ALIASES = {
    "amazon web services": "aws", "aws": "aws", "c sharp": "c#", "c#": "c#",
    "c plus plus": "c++", "c++": "c++", "ci/cd": "ci/cd",
    "continuous integration": "ci/cd", "css": "css", "django": "django",
    "docker": "docker", "fastapi": "fastapi", "flask": "flask", "git": "git",
    "github": "github", "google cloud": "gcp", "gcp": "gcp", "html": "html",
    "java": "java", "javascript": "javascript", "kubernetes": "kubernetes",
    "linux": "linux", "machine learning": "machine learning", "mongodb": "mongodb",
    "mysql": "mysql", "next.js": "next.js", "node.js": "node.js",
    "nlp": "natural language processing",
    "natural language processing": "natural language processing",
    "postgres": "postgresql", "postgresql": "postgresql", "power bi": "power bi",
    "python": "python", "react": "react", "redis": "redis",
    "rest api": "rest api", "rest apis": "rest api",
    "restful api": "rest api", "restful apis": "rest api", "sql": "sql",
    "sqlalchemy": "sqlalchemy", "tailwind": "tailwind css",
    "tailwind css": "tailwind css", "typescript": "typescript",
}


def _contains_keyword(text: str, keyword: str) -> bool:
    pattern = rf"(?<![a-z0-9]){re.escape(keyword)}(?![a-z0-9])"
    return re.search(pattern, text, flags=re.IGNORECASE) is not None


def extract_skills(text: str) -> list[str]:
    """Return normalized skills from the explicit catalog."""
    if not text:
        return []
    matches = {
        normalized
        for keyword, normalized in SKILL_ALIASES.items()
        if _contains_keyword(text, keyword)
    }
    return sorted(matches)


def analyze_resume(text: str) -> dict:
    """Provide transparent, rule-based feedback about a resume."""
    normalized_text = text.lower()
    expected_sections = {
        "summary": ("summary", "profile", "objective"),
        "experience": ("experience", "employment", "work history"),
        "education": ("education", "qualification"),
        "skills": ("skills", "technical skills"),
        "projects": ("projects", "project experience"),
    }
    present_sections = [
        section
        for section, labels in expected_sections.items()
        if any(label in normalized_text for label in labels)
    ]
    missing_sections = sorted(set(expected_sections) - set(present_sections))
    skills = extract_skills(text)
    score = round(
        (len(present_sections) / len(expected_sections)) * 60
        + min(len(skills), 10) / 10 * 40
    )
    suggestions = [f"Add a clear {section.title()} section." for section in missing_sections]
    if len(skills) < 5:
        suggestions.append("Add relevant technical skills that you can demonstrate.")

    return {
        "skills": skills,
        "score": score,
        "present_sections": present_sections,
        "missing_sections": missing_sections,
        "suggestions": suggestions,
        "score_explanation": "60% section completeness and 40% recognized skill coverage.",
    }


def match_resume_with_job(resume_text: str, job_text: str) -> dict:
    """Compare normalized skill keywords; this is not an ATS prediction."""
    resume_skills = set(extract_skills(resume_text))
    job_skills = set(extract_skills(job_text))
    matched = sorted(resume_skills & job_skills)
    missing = sorted(job_skills - resume_skills)
    match_percentage = round(len(matched) / len(job_skills) * 100, 2) if job_skills else 0
    return {
        "resume_skills": sorted(resume_skills),
        "job_skills": sorted(job_skills),
        "matched_skills": matched,
        "missing_skills": missing,
        "match_percentage": match_percentage,
        "disclaimer": "This percentage measures keyword overlap only; it is not an ATS or hiring prediction.",
    }

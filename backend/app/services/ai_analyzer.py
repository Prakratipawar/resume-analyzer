import spacy
import re

nlp = spacy.load("en_core_web_sm")

STOPWORDS = {
    "and", "or", "with", "experience", "knowledge", "developer", "engineer",
    "years", "good", "strong", "expert", "hands-on", "using", "working",
    "ability", "skills", "familiar", "required", "must", "should",
    "responsibilities", "role", "job", "candidate"
}

def extract_skills(text):
    text = text.lower()

    words = re.findall(r"[a-zA-Z+#.]+", text)

    skills = [
        w for w in words
        if len(w) > 2 and w not in STOPWORDS
    ]

    return list(set(skills))


def analyze_resume(text):
    skills = extract_skills(text)

    score = min(len(skills) * 5, 100)

    suggestions = []
    if "projects" not in text.lower():
        suggestions.append("Add a Projects section")
    if "experience" not in text.lower():
        suggestions.append("Add an Experience section")
    if len(skills) < 10:
        suggestions.append("Add more technical skills")

    return {
        "skills": skills,
        "score": score,
        "suggestions": suggestions
    }


def extract_job_skills(job_text):
    return extract_skills(job_text)


def match_resume_with_job(resume_text, job_text):
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_text)

    matched = list(set(resume_skills) & set(job_skills))
    missing = list(set(job_skills) - set(resume_skills))

    if not job_skills:
        match_percentage = 0
    else:
        match_percentage = round((len(matched) / len(job_skills)) * 100, 2)

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched,
        "missing_skills": missing,
        "match_percentage": match_percentage
    }

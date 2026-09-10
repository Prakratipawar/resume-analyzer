"""Rule-based feedback kept separate from job-description matching."""

from app.services.ai_analyzer import analyze_resume as analyze_resume_rules


def analyze_resume(resume_text: str) -> dict:
    result = analyze_resume_rules(resume_text)
    strengths = [f"Includes a {name.title()} section" for name in result["present_sections"]]
    if result["skills"]:
        strengths.append(f"Recognized skills: {', '.join(result['skills'])}")
    weaknesses = [f"Missing a clear {name.title()} section" for name in result["missing_sections"]]
    return {
        "score": result["score"],
        "strengths": strengths or ["The resume contains readable text"],
        "weaknesses": weaknesses,
        "suggestions": result["suggestions"],
        "overall_feedback": result["score_explanation"],
    }

import unittest

from app.services.ai_analyzer import analyze_resume, extract_skills, match_resume_with_job


class KeywordAnalyzerTests(unittest.TestCase):
    def test_extracts_and_normalizes_known_skills(self):
        text = "Built REST APIs with Python, FastAPI, Postgres and AWS."
        self.assertEqual(
            extract_skills(text),
            ["aws", "fastapi", "postgresql", "python", "rest api"],
        )

    def test_does_not_match_java_inside_javascript(self):
        self.assertEqual(extract_skills("JavaScript and TypeScript"), ["javascript", "typescript"])

    def test_match_percentage_uses_job_skills_as_denominator(self):
        result = match_resume_with_job(
            "Python FastAPI PostgreSQL",
            "Looking for Python, FastAPI, PostgreSQL and Docker.",
        )
        self.assertEqual(result["matched_skills"], ["fastapi", "postgresql", "python"])
        self.assertEqual(result["missing_skills"], ["docker"])
        self.assertEqual(result["match_percentage"], 75.0)

    def test_empty_job_description_has_zero_match(self):
        self.assertEqual(match_resume_with_job("Python", "")["match_percentage"], 0)

    def test_resume_feedback_is_explainable(self):
        result = analyze_resume("Summary\nSkills\nPython\nExperience\nEducation\nProjects")
        self.assertEqual(result["present_sections"], [
            "summary", "experience", "education", "skills", "projects"
        ])
        self.assertIn("score_explanation", result)


if __name__ == "__main__":
    unittest.main()

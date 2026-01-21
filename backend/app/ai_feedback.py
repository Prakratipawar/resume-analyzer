# from openai import OpenAI
# import os
# from dotenv import load_dotenv


# load_dotenv()
# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# def analyze_resume(resume_text):
#     prompt = f"""
#     You are an expert technical recruiter.

#     Analyze the following resume and provide:
#     1. Resume quality score out of 100
#     2. Strengths
#     3. Weaknesses
#     4. Missing skills
#     5. Improvement suggestions
#     6. ATS optimization tips

#     Resume:
#     {resume_text}
#     """

#     response = client.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[
#             {"role": "system", "content": "You are a resume expert"},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.4
#     )

#     return response.choices[0].message.content
def analyze_resume(resume_text: str):
    return {
        "score": 82,
        "strengths": [
            "Strong Python and backend development skills",
            "Experience with FastAPI and SQLAlchemy",
            "Good understanding of REST APIs",
            "Hands-on project experience"
        ],
        "weaknesses": [
            "Resume summary could be more impactful",
            "Lack of quantified achievements",
            "Project descriptions can be more detailed"
        ],
        "suggestions": [
            "Add measurable results (e.g., improved performance by 30%)",
            "Include GitHub and portfolio links",
            "Highlight leadership or teamwork experience",
            "Optimize resume for ATS keywords"
        ],
        "overall_feedback": "Your resume shows strong technical potential. With better structure and quantified achievements, it can become highly competitive."
    }

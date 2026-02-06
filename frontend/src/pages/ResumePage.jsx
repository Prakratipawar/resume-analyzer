/*currently this file is not in use */

import { useState, useEffect } from "react";
import API from "../services/api";

function ResumePage() {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  const resumeId = localStorage.getItem("resume_id");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await API.get(`/resume-feedback/${resumeId}`);
      console.log("API Response:", res.data);

      setFeedback(res.data.feedback);
      setLoading(false);
    } catch (err) {
      console.log("API Error:", err);
      setLoading(false);
    }
  };

  if (loading) return <h3>Analyzing your resume...</h3>;

  if (!feedback) return <h3>No feedback available</h3>;

  return (
    <div style={{ maxWidth: 800, margin: "80px auto" }}>
      <h2>Resume Feedback</h2>

      <h3>Resume Score: {feedback.score}/100</h3>

      <div style={{ marginTop: 20 }}>
        <h4>Overall Feedback</h4>
        <p>{feedback.overall_feedback}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Strengths</h4>
        <ul>
          {feedback.strengths.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Weaknesses</h4>
        <ul>
          {feedback.weaknesses.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Suggestions</h4>
        <ul>
          {feedback.suggestions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResumePage;

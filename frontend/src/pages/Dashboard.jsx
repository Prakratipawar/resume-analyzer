import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const resumeId = localStorage.getItem("resume_id");

  useEffect(() => {
    if (!resumeId) {
      navigate("/upload");
      return;
    }

    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await API.get(`/resume-feedback/${resumeId}`);
      setResume(res.data.feedback);
    } catch (err) {
      console.log(err);
    }
  };

  if (!resume) return <h3>Loading dashboard...</h3>;

  return (
    <div style={{ maxWidth: 1000, margin: "60px auto" }}>
      <h1>AI Resume Dashboard</h1>

      <div style={cardStyle}>
        <h2>Resume Score</h2>
        <h1>{resume.score}/100</h1>
      </div>

      <div style={cardStyle}>
        <h2>Overall Feedback</h2>
        <p>{resume.overall_feedback}</p>
      </div>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <h3>Strengths</h3>
          <ul>
            {resume.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <div style={cardStyle}>
          <h3>Weaknesses</h3>
          <ul>
            {resume.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>

        <div style={cardStyle}>
          <h3>Suggestions</h3>
          <ul>
            {resume.suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <button onClick={() => navigate("/matches")}>View Job Matches</button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 10,
  padding: 20,
  marginBottom: 20,
  background: "#fafafa"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 20
};

export default Dashboard;

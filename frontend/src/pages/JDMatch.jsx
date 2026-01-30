import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function JDMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const matchJD = async () => {
    try {
      setLoading(true);
      const resumeId = localStorage.getItem("resume_id");

      const res = await axios.post("http://localhost:8000/match-jd", {
        resume_id: resumeId,
        job_description: jobDescription
      });

      setResult(res.data);
    } catch {
      alert("Matching failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2>Resume vs Job Description</h2>
          <p style={subtext}>
            Paste the job description to see how well your resume matches
          </p>

          <textarea
            rows="8"
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={textareaStyle}
          />

          <button
          onClick={matchJD}
          disabled={!jobDescription.trim() || loading}
          style={{
        ...buttonStyle,
          opacity: !jobDescription.trim() || loading ? 0.6 : 1,
         cursor: !jobDescription.trim() || loading ? "not-allowed" : "pointer"
         }}
          >
         {loading ? "Matching..." : "Match JD"}
         </button>


          {result && (
          <div style={resultBox}>
          <div style={scoreBox}>
          <span style={scoreLabel}>Match Score</span>
          <span style={scoreValue}>{result.match_percentage}%</span>
          </div>

          <div style={skillsSection}>
          <h4>Matched Skills</h4>
          <div style={chipContainer}>
           {result.matched_skills.length > 0
          ? result.matched_skills.map((skill, i) => (
              <span key={i} style={chipGreen}>{skill}</span>
            ))
          : <span style={muted}>No matched skills</span>}
          </div>
          </div>

          <div style={skillsSection}>
          <h4>Missing Skills</h4>
          <div style={chipContainer}>
           {result.missing_skills.length > 0
          ? result.missing_skills.map((skill, i) => (
              <span key={i} style={chipRed}>{skill}</span>
            ))
          : <span style={muted}>Nothing missing 🎉</span>}
           </div>
           </div>
           </div>
            )}

        </div>
      </div>
    </>
  );
}

const pageStyle = {
  minHeight: "calc(100vh - 70px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const cardStyle = {
  width: "600px",
  background: "#f9f9ff",
  padding: "32px",
  borderRadius: "16px",
  textAlign: "center"
};

const subtext = { fontSize: "14px", color: "#555", marginBottom: "16px" };

const scoreBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff",
  padding: "14px 18px",
  borderRadius: "10px",
  marginBottom: "20px"
};

const scoreLabel = {
  fontSize: "14px",
  opacity: 0.9
};

const scoreValue = {
  fontSize: "22px",
  fontWeight: "700"
};

const skillsSection = {
  marginBottom: "16px"
};

const chipContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "8px"
};

const chipGreen = {
  padding: "6px 12px",
  borderRadius: "20px",
  background: "#e6f7ec",
  color: "#0f9d58",
  fontSize: "13px",
  fontWeight: "500"
};

const chipRed = {
  padding: "6px 12px",
  borderRadius: "20px",
  background: "#fdecea",
  color: "#d93025",
  fontSize: "13px",
  fontWeight: "500"
};

const muted = {
  fontSize: "13px",
  color: "#777"
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "16px"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600"
};

const resultBox = {
  marginTop: "20px",
  padding: "16px",
  background: "#f1f5ff",
  borderRadius: "12px",
  textAlign: "left"
};

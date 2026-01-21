import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function JobMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const resumeId = localStorage.getItem("resume_id");
      const res = await API.get(`/match-jobs/${resumeId}`);
      setMatches(res.data.matches);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <h2>AI Job Matches</h2>

      {loading && <p>Loading matches...</p>}
      {!loading && matches.length === 0 && <p>No matches found</p>}

      {matches.map((job, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        >
          <h3>{job.job_title}</h3>
          <p><b>Company:</b> {job.company}</p>
          <p><b>Match:</b> {job.match_percentage}%</p>
        </div>
      ))}

      <button onClick={() => navigate("/resume-feedback")}>
        Get Resume Feedback
      </button>
    </div>
  );
}

export default JobMatches;

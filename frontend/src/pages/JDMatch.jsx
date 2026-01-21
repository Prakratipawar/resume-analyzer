import { useState } from "react";
import axios from "axios";

export default function JDMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const matchJD = async () => {
    try {
      setLoading(true);
      const resumeId = localStorage.getItem("resume_id");
      const res = await axios.post("http://localhost:8000/match-jd", {
        resume_id:resumeId,
        job_description: jobDescription,
      });

      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.detail || "Matching failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Resume vs Job Description Matcher</h1>

      <textarea
        className="w-full border p-3 rounded mb-4"
        rows="8"
        placeholder="Paste Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={matchJD}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Matching..." : "Match JD"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">
            Match Score: {result.match_percentage}%
          </h2>

          <p className="mb-2">
            <b>Matched Skills:</b> {result.matched_skills.join(", ")}
          </p>

          <p className="mb-2">
            <b>Missing Skills:</b> {result.missing_skills.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JDMatchInput from "./JDMatchInput.jsx";
import JDMatchResults from "./JDMatchResults.jsx";

export default function JDMatch() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("input"); 
  const [savedJD, setSavedJD] = useState("");

  const matchJD = async () => {
    if (!jobDescription.trim()) return;
    
    try {
      setLoading(true);
      const resumeId = localStorage.getItem("resume_id");

      const res = await axios.post("http://localhost:8000/api/v1/match-jd", {
        resume_id: resumeId,
        job_description: jobDescription
      });

      setSavedJD(jobDescription);
      setResult(res.data);
      setView("results");
    } catch {
      alert("Matching failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    navigate("/upload");
  };

  const tryAnother = () => {
    setView("input");
    setJobDescription(savedJD);
  };

  const handleBack = () => {
    if (view === "results") {
      setView("input");
      setJobDescription(savedJD);
    } else {
      navigate("/upload");
    }
  };

  if (view === "input") {
    return (
      <JDMatchInput
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        loading={loading}
        matchJD={matchJD}
        handleBack={handleBack}
      />
    );
  }

  return (
    <JDMatchResults
      result={result}
      tryAnother={tryAnother}
      resetForm={resetForm}
      handleBack={handleBack}
    />
  );
}
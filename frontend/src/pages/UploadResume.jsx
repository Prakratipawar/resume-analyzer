import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/upload-resume", formData);
      const resumeId = res.data.resume_id;
      localStorage.setItem("resume_id", resumeId);
      setMessage("Resume uploaded successfully!");
      console.log(res.data);
      navigate("/jd-match");
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "100px auto" }}>
      <h2>Upload Resume</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        /><br /><br />

        <button type="submit">Upload Resume</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default UploadResume;

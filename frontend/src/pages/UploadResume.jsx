import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
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
     localStorage.setItem("resume_id", res.data.resume_id);

     setMessage("Resume uploaded successfully!");

     setTimeout(() => {
      navigate("/jd-match");
       }, 1500); // 1.5 seconds delay
       } catch {
       setMessage("Upload failed");
       }
       };

  return (
    <>
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2 style={heading}>Upload Your Resume here</h2>
          <p style={subtext}>
           Upload your resume to get job matching                         
          </p>

          <form onSubmit={handleUpload}>
          <label style={uploadBox}>
           <input
             type="file"
             accept=".pdf"
             onChange={(e) => setFile(e.target.files[0])}
             style={{ display: "none" }}
           />

          {file ? (
          <span style={{ color: "#333" }}>{file.name}</span>
          ) : (
         <span style={{ color: "#777" }}>Choose PDF Resume</span>
          )}
         </label>

        <button style={buttonStyle} type="submit">
         Upload Resume
        </button>
        </form>


          {message && <p style={messageStyle}>{message}</p>}
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "calc(100vh - 70px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const cardStyle = {
  width: "420px",
  background: "#f9f9ff",
  padding: "32px",
  borderRadius: "16px",
  textAlign: "center"
};

const heading = { fontSize: "22px", marginBottom: "6px" };
const subtext = { fontSize: "14px", color: "#555", marginBottom: "20px" };

const uploadBox = {
  width: "100%",
  height: "120px",
  border: "2px dashed #667eea",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginBottom: "20px",
  background: "#fff",
  fontSize: "15px",
  fontWeight: "500",
};
const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const messageStyle = {
  marginTop: "15px",
  fontSize: "14px"
};

export default UploadResume;

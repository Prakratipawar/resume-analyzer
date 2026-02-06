export default function JDMatchInput({ 
  jobDescription, 
  setJobDescription, 
  loading, 
  matchJD, 
  handleBack 
}) {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "8px", textAlign: "center" }}>Resume vs Job Description</h2>
        <p style={subtext}>
          Paste the job description to see how well your resume matches
        </p>

        <div style={inputContainerStyle}>
          <textarea
            rows="10"
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={buttonContainerStyle}>
          <button
            onClick={matchJD}
            disabled={!jobDescription.trim() || loading}
            style={{
              ...buttonStyle,
              opacity: !jobDescription.trim() || loading ? 0.6 : 1,
              cursor: !jobDescription.trim() || loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Analyzing..." : "Match Resume with JD"}
          </button>
        </div>

        <p style={hintStyle}>
          💡 <strong>Tip:</strong> Copy and paste the full job description including requirements, skills, and responsibilities.
        </p>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handleBack} style={backButtonStyle}>
            ← Back to Upload Resume
          </button>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "calc(100vh - 70px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  padding: "20px"
};

const cardStyle = {
  width: "800px",
  maxWidth: "95%",
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
};

const subtext = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "30px",
  textAlign: "center"
};

const hintStyle = {
  fontSize: "13px",
  color: "#777",
  textAlign: "center",
  marginTop: "20px",
  padding: "12px",
  background: "#f8f9ff",
  borderRadius: "8px"
};

const inputContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "24px"
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px"
};

const textareaStyle = {
  width: "100%",
  maxWidth: "600px",
  padding: "16px",
  borderRadius: "12px",
  border: "2px solid #e0e0e0",
  fontSize: "15px",
  resize: "vertical",
  minHeight: "200px",
  fontFamily: "inherit",
  lineHeight: "1.5",
  transition: "border-color 0.3s"
};

const buttonStyle = {
  width: "100%",
  maxWidth: "600px",
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  cursor: "pointer"
};

const backButtonStyle = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid #667eea",
  background: "transparent",
  color: "#667eea",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer"
};
import { 
  PAGE_STYLES, 
  CARD_STYLES, 
  BUTTON_STYLES, 
  INPUT_STYLES,
  COLORS 
} from './styles'; 

export default function JDMatchInput({ 
  jobDescription, 
  setJobDescription, 
  loading, 
  matchJD, 
  handleBack 
}) {
  return (
    <div style={PAGE_STYLES.fullPageGradient}>
      <div style={CARD_STYLES.featureCard}>
        <h2 style={{ marginBottom: "8px", textAlign: "center" }}>
          Resume vs Job Description
        </h2>
        <p style={{ fontSize: "14px", color: COLORS.gray500, marginBottom: "30px", textAlign: "center" }}>
          Paste the job description to see how well your resume matches
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <textarea
            rows="10"
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={INPUT_STYLES.textarea}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <button
            onClick={matchJD}
            disabled={!jobDescription.trim() || loading}
            style={{
              ...BUTTON_STYLES.primary,
              maxWidth: "600px",
              width: "100%",
              opacity: !jobDescription.trim() || loading ? 0.6 : 1,
              cursor: !jobDescription.trim() || loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Analyzing..." : "Match Resume with JD"}
          </button>
        </div>

        <p style={{ fontSize: "13px", color: COLORS.gray500, textAlign: "center", 
                    marginTop: "20px", padding: "12px", background: "#f8f9ff", borderRadius: "8px" }}>
          💡 <strong>Tip:</strong> Copy and paste the full job description
        </p>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handleBack} style={BUTTON_STYLES.outline}>
            ← Back to Upload Resume
          </button>
        </div>
      </div>
    </div>
  );
}
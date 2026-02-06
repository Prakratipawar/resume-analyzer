export default function JDMatchResults({ result, tryAnother, resetForm, handleBack }) {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={headerRow}>
          <h2 style={{ margin: 0 }}>Match Results</h2>
          <button onClick={tryAnother} style={backButtonStyle}>
            Try Another JD
          </button>
        </div>
        <p style={subtext}>
          Analysis of your resume against the job description
        </p>

        <div style={scoreCard}>
          <div style={scoreCircle}>
            <span style={scorePercent}>{result.match_percentage}%</span>
            <span style={scoreLabel}>Match Score</span>
          </div>
          <div style={scoreDetails}>
            <div style={scoreStat}>
              <span style={statNumber}>{result.matched_skills.length}</span>
              <span style={statLabel}>Matched Skills</span>
            </div>
            <div style={statDivider}></div>
            <div style={scoreStat}>
              <span style={statNumber}>{result.missing_skills.length}</span>
              <span style={statLabel}>Missing Skills</span>
            </div>
          </div>
        </div>

        <div style={resultsGrid}>
          <div style={skillsCard}>
            <div style={cardHeaderGreen}>
              <h3 style={{ margin: 0, color: "#0f9d58" }}>✅ Matched Skills</h3>
            </div>
            <div style={cardContent}>
              {result.matched_skills.length > 0 ? (
                <div style={skillsGrid}>
                  {result.matched_skills.map((skill, i) => (
                    <div key={i} style={skillItemGreen}>
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={emptyState}>
                  <span style={muted}>No skills matched</span>
                </div>
              )}
            </div>
          </div>

          <div style={skillsCard}>
            <div style={cardHeaderRed}>
              <h3 style={{ margin: 0, color: "#d93025" }}>⚠️ Missing Skills</h3>
            </div>
            <div style={cardContent}>
              {result.missing_skills.length > 0 ? (
                <div style={skillsGrid}>
                  {result.missing_skills.map((skill, i) => (
                    <div key={i} style={skillItemRed}>
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={emptyState}>
                  <span style={muted}>All skills matched! 🎉</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {result.missing_skills.length > 0 && (
          <div style={recommendationCard}>
            <h4 style={{ marginBottom: "12px", color: "#333" }}>💡 Recommendations</h4>
            <ul style={recommendationList}>
              <li>Consider adding these missing skills to your resume</li>
              <li>Highlight your matched skills more prominently</li>
              <li>Tailor your experience to better match the job requirements</li>
            </ul>
          </div>
        )}

        <div style={actionButtons}>
          <button onClick={resetForm} style={secondaryButton}>
            Start Over
          </button>
          <button onClick={() => window.print()} style={printButton}>
            Print Results
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

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px"
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

const scoreCard = {
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(135deg, #f5f7ff, #e3e9ff)",
  borderRadius: "16px",
  padding: "30px",
  marginBottom: "30px",
  gap: "40px"
};

const scoreCircle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "140px",
  height: "140px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff",
  flexShrink: 0
};

const scorePercent = {
  fontSize: "36px",
  fontWeight: "700",
  lineHeight: 1
};

const scoreLabel = {
  fontSize: "14px",
  opacity: 0.9,
  marginTop: "8px"
};

const scoreDetails = {
  flex: 1,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
};

const scoreStat = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const statNumber = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#333"
};

const statLabel = {
  fontSize: "14px",
  color: "#666",
  marginTop: "4px"
};

const statDivider = {
  width: "1px",
  height: "60px",
  background: "#ddd"
};

const resultsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  marginBottom: "30px"
};

const skillsCard = {
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e0e0e0",
  overflow: "hidden"
};

const cardHeaderGreen = {
  padding: "16px 20px",
  background: "#e6f7ec",
  borderBottom: "1px solid #d4edda"
};

const cardHeaderRed = {
  padding: "16px 20px",
  background: "#fdecea",
  borderBottom: "1px solid #f5c6cb"
};

const cardContent = {
  padding: "20px",
  maxHeight: "300px",
  overflowY: "auto"
};

const skillsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gap: "10px"
};

const skillItemGreen = {
  padding: "10px 12px",
  borderRadius: "8px",
  background: "#e6f7ec",
  color: "#0f9d58",
  fontSize: "13px",
  fontWeight: "500",
  textAlign: "center",
  wordBreak: "break-word"
};

const skillItemRed = {
  padding: "10px 12px",
  borderRadius: "8px",
  background: "#fdecea",
  color: "#d93025",
  fontSize: "13px",
  fontWeight: "500",
  textAlign: "center",
  wordBreak: "break-word"
};

const emptyState = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  color: "#777"
};

const recommendationCard = {
  background: "#fff8e1",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "30px",
  border: "1px solid #ffe082"
};

const recommendationList = {
  margin: 0,
  paddingLeft: "20px",
  color: "#333",
  fontSize: "14px",
  lineHeight: "1.6"
};

const actionButtons = {
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginTop: "20px"
};

const secondaryButton = {
  padding: "12px 24px",
  borderRadius: "8px",
  border: "1px solid #667eea",
  background: "transparent",
  color: "#667eea",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s"
};

const printButton = {
  padding: "12px 24px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s"
};

const muted = {
  fontSize: "14px",
  color: "#777"
};
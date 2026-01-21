import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={navStyle}>
      <h3>AI Resume Analyzer</h3>
      <div>
        <Link to="/dashboard">Dashboard</Link>{" | "}
        <Link to="/jd-match">JD match</Link>{" | "}
        <Link to="/upload">Upload Resume</Link>
      </div>
    </div>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 40px",
  borderBottom: "1px solid #ddd",
  marginBottom: 30
};

export default Navbar;

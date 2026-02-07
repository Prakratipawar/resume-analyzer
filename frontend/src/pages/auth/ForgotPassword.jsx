import { useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent!");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Error occurred");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2>Reset Password</h2>
        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
          Enter your registered email
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Send Reset Link
          </button>
        </form>

        {message && <p style={{ marginTop: "15px" }}>{message}</p>}

        <Link to="/" style={{ fontSize: "13px" }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const cardStyle = {
  width: "400px",
  background: "#fff",
  padding: "30px",
  borderRadius: "15px",
  textAlign: "center"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer"
};

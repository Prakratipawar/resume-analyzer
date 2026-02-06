import { useState } from "react";
import API from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();   
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/reset-password", {
       token,
       new_password: password,
       });


      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.detail || "Reset failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2>Create New Password</h2>

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Reset Password
          </button>
        </form>

        {message && <p style={{ marginTop: "15px" }}>{message}</p>}
      </div>
    </div>
  );
}


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

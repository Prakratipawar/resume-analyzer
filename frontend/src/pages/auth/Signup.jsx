import { useState } from "react";
import API from "../../services/api";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate} from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setMessage(res.data.message || "Signup successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
       setTimeout(() => {
       navigate("/");
       }, 1000);
    } catch (err) {
      setMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h2 style={titleStyle}>Create Account</h2>
        <p style={subtitleStyle}>Sign up to get started</p>

        {/* Name */}
        <div style={fieldWrapper}>
          <label style={labelStyle}>Name</label>
          <div style={inputWrapper}>
            <User size={18} style={iconStyle} />
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div style={fieldWrapper}>
          <label style={labelStyle}>Email</label>
          <div style={inputWrapper}>
            <Mail size={18} style={iconStyle} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div style={fieldWrapper}>
          <label style={labelStyle}>Password</label>
          <div style={inputWrapper}>
            <Lock size={18} style={iconStyle} />
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div style={{ ...fieldWrapper, marginBottom: "22px" }}>
          <label style={labelStyle}>Confirm Password</label>
          <div style={inputWrapper}>
            <Lock size={18} style={iconStyle} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Already have account */}
        <div
          style={{
            textAlign: "center",
            marginTop: "14px",
            fontSize: "14px",
            color: "#666"
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#4a6cf7",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Login
          </Link>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              marginTop: "18px",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor: message.includes("successful")
                ? "#e7f7e7"
                : "#f7e7e7",
              border: `1px solid ${
                message.includes("successful") ? "#a7d8a7" : "#f7c6c6"
              }`
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: message.includes("successful")
                  ? "#2e7d32"
                  : "#d32f2f"
              }}
            >
              {message}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const fieldWrapper = { marginBottom: "18px" };

const labelStyle = {
  marginBottom: "6px",
  display: "block",
  fontWeight: "700",
  fontSize: "14px",
  color: "#333"
};

const inputWrapper = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  border: "2px solid #e0e0e0",
  borderRadius: "10px",
  backgroundColor: "#f8f9fa",
  padding: "0 12px",
  boxSizing: "border-box"
};

const inputStyle = {
  width: "100%",
  padding: "12px 8px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  background: "transparent"
};

const iconStyle = { marginRight: "8px", opacity: 0.6 };

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const cardStyle = {
  maxWidth: "480px",
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.95)",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  fontFamily: "Arial, sans-serif"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "6px"
};

const subtitleStyle = {
  textAlign: "center",
  fontSize: "14px",
  color: "#666",
  marginBottom: "24px"
};

const buttonStyle = {
  width: "100%",
  marginTop: "10px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer"
};

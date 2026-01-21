import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Send signup request to backend
      const res = await API.post("/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setMessage("Account created successfully! Redirecting to login...");
      
      // Wait 2 seconds then redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{ 
        maxWidth: 400, 
        width: "100%",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        backdropFilter: "blur(10px)"
      }}>
        <h2 style={{ 
          textAlign: "center", 
          color: "#333",
          fontSize: "26px", // Same as login
          marginBottom: "8px", // Same as login
          fontWeight: "bold"
        }}>
          Resume Analyzer
        </h2>
        
        <h3 style={{ 
          textAlign: "center", 
          color: "#555",
          marginBottom: "12px", // Same as login
          fontWeight: "normal",
          fontSize: "18px" // Same as login
        }}>
          Create Account
        </h3>
        
        <p style={{ 
          textAlign: "center", 
          color: "#666",
          marginBottom: "25px", // Same as login
          fontSize: "14px",
          lineHeight: "1.5"
        }}>
          Sign up to analyze your resume instantly
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: "18px" }}> {/* Same as login */}
            <label style={{ 
              display: "block",
              marginBottom: "6px", // Reduced
              color: "#333",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px", // Same as login
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
                backgroundColor: "#f8f9fa"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4a6cf7"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: "18px" }}> {/* Same as login */}
            <label style={{ 
              display: "block",
              marginBottom: "6px", // Reduced
              color: "#333",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px", // Same as login
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
                backgroundColor: "#f8f9fa"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4a6cf7"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "18px" }}> {/* Same as login */}
            <label style={{ 
              display: "block",
              marginBottom: "6px", // Reduced
              color: "#333",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px", // Same as login
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
                backgroundColor: "#f8f9fa"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4a6cf7"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: "22px" }}> {/* Same as login's bottom margin */}
            <label style={{ 
              display: "block",
              marginBottom: "6px", // Reduced
              color: "#333",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px", // Same as login
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
                backgroundColor: "#f8f9fa"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4a6cf7"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px", // Same as login
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginBottom: "22px", // Same as login
              transition: "transform 0.2s, box-shadow 0.2s, opacity 0.3s",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
              }
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <div style={{ 
          textAlign: "center", 
          fontSize: "14px",
          color: "#666"
        }}>
          Already have an account?{" "}
          <Link 
            to="/login" 
            style={{ 
              color: "#4a6cf7", 
              textDecoration: "none",
              fontWeight: "bold",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.color = "#3a5bd9"}
            onMouseLeave={(e) => e.target.style.color = "#4a6cf7"}
          >
            Login
          </Link>
        </div>

        {/* Message Display */}
        {message && (
          <div style={{ 
            textAlign: "center", 
            marginTop: "18px", // Same as login
            padding: "10px", // Same as login
            borderRadius: "8px",
            backgroundColor: message.includes("successfully") ? "#e7f7e7" : "#f7e7e7",
            border: `1px solid ${message.includes("successfully") ? "#a7d8a7" : "#f7c6c6"}`
          }}>
            <p style={{ 
              color: message.includes("successfully") ? "#2e7d32" : "#d32f2f",
              fontSize: "14px",
              margin: 0
            }}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
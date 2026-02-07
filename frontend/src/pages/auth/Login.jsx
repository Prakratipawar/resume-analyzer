import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { Mail, Lock } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      setMessage("Login successful!");
      navigate("/upload");

    } catch (err) {
      setMessage("Invalid login credentials");
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
          fontSize: "26px",
          marginBottom: "8px",
          fontWeight: "bold"
        }}>
          Resume Analyzer
        </h2>
        
        <h3 style={{ 
          textAlign: "center", 
          color: "#333",
          marginBottom: "12px",
          fontWeight: "bold",
          fontSize: "20px"
        }}>
          Login
        </h3>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "18px" }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center",
              marginBottom: "6px"
            }}>
              
              <span style={{
                color: "#333",
                fontSize: "15px",
                fontWeight: "700"
              }}>
                Email
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#666",
                pointerEvents: "none"
              }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
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
          </div>
          <div style={{ marginBottom: "18px" }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center",
              marginBottom: "6px"
            }}>
              <span style={{
                color: "#333",
                fontSize: "15px",
                fontWeight: "700"
              }}>
                Password
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#666",
                pointerEvents: "none"
              }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
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
          </div>

          <div style={{ 
            textAlign: "right", 
            marginBottom: "22px"
          }}>
            <Link 
              to="/forgot-password" 
              style={{ 
                color: "#4a6cf7", 
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "color 0.3s"
              }}
              onMouseEnter={(e) => e.target.style.color = "#3a5bd9"}
              onMouseLeave={(e) => e.target.style.color = "#4a6cf7"}
            >
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "22px",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            Login
          </button>
        </form>

        <div style={{ 
          textAlign: "center", 
          fontSize: "14px",
          color: "#666"
        }}>
          Don't have an account?{" "}
          <Link 
            to="/signup" 
            style={{ 
              color: "#4a6cf7", 
              textDecoration: "none",
              fontWeight: "bold",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.color = "#3a5bd9"}
            onMouseLeave={(e) => e.target.style.color = "#4a6cf7"}
          >
            Sign up
          </Link>
        </div>

        {message && (
          <div style={{ 
            textAlign: "center", 
            marginTop: "18px",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: message.includes("successful") ? "#e7f7e7" : "#f7e7e7",
            border: `1px solid ${message.includes("successful") ? "#a7d8a7" : "#f7c6c6"}`
          }}>
            <p style={{ 
              color: message.includes("successful") ? "#2e7d32" : "#d32f2f",
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

export default Login;
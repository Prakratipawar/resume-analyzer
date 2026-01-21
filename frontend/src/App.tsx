import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadResume from "./pages/UploadResume";
import ResumePage from "./pages/ResumePage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import JDMatch from "./pages/JDMatch";

// Layout component that conditionally shows Navbar
function Layout() {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/signup"];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/jd-match" element={<JDMatch />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-feedback" element={<ResumePage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
function Navbar() {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>AI Resume Analyzer</h1>
    </header>
  );
}

const headerStyle = {
  height: "70px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
  position: "sticky",
  top: 0,
  zIndex: 100
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#4a6cf7",
  margin: 0,
  letterSpacing: "0.5px"
};

export default Navbar;

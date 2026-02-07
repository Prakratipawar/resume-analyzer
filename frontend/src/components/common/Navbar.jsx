import { HEADER_STYLES } from './styles';  

function Navbar() {
  return (
    <header style={HEADER_STYLES.navbar}>
      <h1 style={HEADER_STYLES.title}>AI Resume Analyzer</h1>
    </header>
  );
}
export default Navbar;
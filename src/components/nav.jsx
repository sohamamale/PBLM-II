import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Nav = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          GroundSlot
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/booking" className="nav-link">Book Slot</Link>
          <Link to="/timings" className="nav-link">Timings</Link>
          <Link to="/approvals" className="nav-link">Authority Approvals</Link>
        </div>
        <div className="nav-actions">
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <Link to="/login" className="nav-btn nav-btn-outline">Login</Link>
          <Link to="/signup" className="nav-btn nav-btn-primary">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
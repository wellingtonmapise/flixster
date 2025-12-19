import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./TopNav.css";

const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="top-nav">
      <div className="nav-brand">
        <span className="brand-mark">FLIXSTER</span>
      </div>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/favorites" onClick={closeMenu}>
          Favorites
        </NavLink>
        <NavLink to="/watched" onClick={closeMenu}>
          Watched
        </NavLink>
      </nav>
      <button
        className="nav-toggle"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <FaBars />
      </button>
    </header>
  );
};

export default TopNav;

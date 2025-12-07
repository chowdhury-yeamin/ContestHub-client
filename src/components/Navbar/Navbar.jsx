import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import logo from "../../assets/contest-project-logo.png";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ user, logout }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Contests", path: "/all-contests" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="pt-3">
      <nav className="sticky top-4 bg-primary-custom backdrop-blur-md shadow-lg rounded-3xl z-50 mx-auto max-w-11/12 text-white">
        {/* Navbar with primary blue color scheme */}
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-white">ContestHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-accent-custom font-semibold"
                    : "text-white/90 hover:text-accent-custom"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
              className="btn btn-ghost btn-circle"
              aria-label="Toggle theme"
              type="button"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {user ? (
              <div className="relative">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName || user.name || "User"
                    )}&background=random`
                  }
                  alt="User"
                  onClick={toggleDropdown}
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-base-100 border border-base-300 rounded shadow-lg">
                    <div className="px-4 py-2 border-b border-base-300 text-base-content">
                      {user.displayName || user.name}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-base-200 text-base-content"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-base-200 text-base-content"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-accent-custom px-4 py-2 border border-white/30 rounded hover:border-accent-custom transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 bg-accent-custom hover:bg-accent-custom/90 text-white px-4 py-2 rounded font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-base-100 border-t border-base-300 px-2 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-primary-custom font-semibold px-3 py-2 rounded"
                    : "block text-base-content hover:text-primary-custom px-3 py-2 rounded"
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
              className="block w-full text-left px-3 py-2 hover:bg-base-200 rounded text-base-content"
              type="button"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 hover:bg-base-200 rounded text-base-content"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-base-200 rounded text-base-content"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 hover:bg-base-200 rounded text-base-content"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 hover:bg-base-200 rounded text-base-content"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

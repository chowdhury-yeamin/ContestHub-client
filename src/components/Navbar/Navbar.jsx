import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaUser } from "react-icons/fa";
import { div } from "framer-motion/client";
import { Sparkles, Zap } from "lucide-react";

const Navbar = ({ user, logout }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "All Contests", path: "/all-contests", icon: "🎯" },
    { name: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { name: "About", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📧" },
    { name: "Dashboard", path: "/dashboard/participated", icon: "☰" },
  ];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const hover3D = {
    rotateX: [-2, 2, -1],
    rotateY: [2, -2, 1],
    scale: 1.12,
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const particleBurst = {
    opacity: [0, 1, 0],
    scale: [0.4, 1.4, 0.2],
    transition: { duration: 0.6 },
  };

  const shineSweep = {
    x: ["-150%", "150%"],
    opacity: [0, 1, 0],
    transition: { duration: 0.8, ease: "linear" },
  };

  const neonPulse = {
    boxShadow: [
      "0 0 0px rgba(255,255,255,0)",
      "0 0 25px rgba(255,255,255,0.7)",
      "0 0 0px rgba(255,255,255,0)",
    ],
    transition: { duration: 1.2, repeat: Infinity },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? "rgba(15, 23, 42, 0.95)"
              : "rgba(15, 23, 42, 0.8)",
          }}
          className="relative backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl"
        >
          {/* Gradient Animation */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 bg-[length:200%_100%] pointer-events-none"
            style={{ filter: "blur(20px)" }}
          />

          <div className="relative flex justify-between items-center px-4 sm:px-6 py-3">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 group"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
                    <FaTrophy className="text-2xl text-white" />
                  </div>
                </motion.div>
                <span className="font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  ContestHub
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-1 group ${
                      isActive
                        ? "text-white "
                        : "text-slate-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-1 font-medium">
                        <span className="text-lg">{link.icon}</span>
                        {link.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-white/10 rounded-lg"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Desktop Dropdown */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className=" border-2 border-white/30 flex items-center rounded-[50%] cursor-pointer hover:shadow-md transition"
                  >
                    <img
                      src={
                        user?.photoURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user?.name || "User"
                        )}&background=6366F1&color=fff&size=64`
                      }
                      alt={user?.name}
                      className="relative w-12 h-12 rounded-full border-2 border-white/30 object-cover shadow-xl"
                      key={user?.photoURL}
                    />
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full z-50 mt-2 rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white/20 overflow-hidden text-sm"
                      >
                        <div className="flex flex-col cursor-pointer">
                          {user && (
                            <div className="px-4 py-3 border-b border-white/10 font-bold cursor-default text-md">
                              {user.displayName || user.name || "User"}
                            </div>
                          )}
                          <Link
                            to="/dashboard"
                            className="px-4 py-3 hover:bg-neutral-800 transition font-semibold"
                          >
                            Dashboard
                          </Link>
                          <div
                            onClick={handleLogout}
                            className="px-4 py-3 hover:bg-neutral-800 transition font-semibold cursor-pointer"
                          >
                            Logout
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-500 transition"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-visible border-t border-white/10"
              >
                <div className="p-4 space-y-2">
                  {navLinks.map((link, idx) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "text-white bg-white/10"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="font-medium">{link.name}</span>
                    </NavLink>
                  ))}

                  {!user && (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold block"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold block"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

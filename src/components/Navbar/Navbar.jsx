import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSun,
  FaMoon,
  FaTrophy,
  FaUser,
  FaCog,
  FaBell,
  FaSearch,
} from "react-icons/fa";


const Navbar = ({ user, logout }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "All Contests", path: "/all-contests", icon: "🎯" },
    { name: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { name: "About", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📧" },
  ];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or handle search
      console.log("Searching for:", searchQuery);
      setSearchOpen(false);
    }
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
          className="relative backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Gradient Border Animation */}
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
                  animate={{
                    rotate: [0, 360],
                  }}
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg transition-colors group ${
                      isActive
                        ? "text-white"
                        : "text-slate-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-2 font-medium">
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
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.05 }}
                      />
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">

              {/* User Section */}
              {user ? (
                <div className="relative hidden sm:block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-sm opacity-75"
                      />
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.displayName || user.name || "User"
                          )}&background=6366F1&color=fff&size=200`
                        }
                        alt={user.displayName || user.name}
                        className="relative w-8 h-8 rounded-full border-2 border-white/20"
                      />
                    </div>
                    <span className="text-sm font-medium text-white hidden md:block">
                      {(user.displayName || user.name || "User").split(" ")[0]}
                    </span>
                    <motion.svg
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-br from-indigo-600/20 to-purple-600/20">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                user.photoURL ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  user.displayName || user.name || "User"
                                )}&background=6366F1&color=fff&size=200`
                              }
                              alt={user.displayName || user.name}
                              className="w-12 h-12 rounded-full border-2 border-white/20"
                            />
                            <div>
                              <div className="font-bold text-white">
                                {user.displayName || user.name}
                              </div>
                              <div className="text-xs text-slate-400">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          {[
                            {
                              icon: FaUser,
                              label: "Dashboard",
                              path: "/dashboard",
                            },
                            {
                              icon: FaTrophy,
                              label: "My Contests",
                              path: "/my-contests",
                            },
                            {
                              icon: FaCog,
                              label: "Settings",
                              path: "/settings",
                            },
                          ].map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.path}
                              onClick={() => setDropdownOpen(false)}
                            >
                              <motion.div
                                whileHover={{
                                  x: 4,
                                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white transition-colors"
                              >
                                <item.icon className="text-indigo-400" />
                                <span className="font-medium">
                                  {item.label}
                                </span>
                              </motion.div>
                            </Link>
                          ))}
                        </div>

                        {/* Logout */}
                        <div className="p-2 border-t border-white/10">
                          <motion.button
                            whileHover={{
                              x: 4,
                              backgroundColor: "rgba(239, 68, 68, 0.1)",
                            }}
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            <span className="font-medium">Logout</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all font-medium"
                    >
                      Login
                    </motion.div>
                  </Link>
                  <Link to="/register">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all"
                    >
                      Sign Up
                    </motion.div>
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

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-white/10"
              >
                <div className="p-4">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                      placeholder="Search contests..."
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      autoFocus
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden border-t border-white/10"
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
                      {({ isActive }) => (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 w-full"
                        >
                          <span className="text-xl">{link.icon}</span>
                          <span className="font-medium">{link.name}</span>
                        </motion.div>
                      )}
                    </NavLink>
                  ))}

                  <div className="pt-4 border-t border-white/10 space-y-2">
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setMenuOpen(false)}
                        >
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <FaUser />
                            <span className="font-medium">Dashboard</span>
                          </motion.div>
                        </Link>
                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span className="font-medium">Logout</span>
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center justify-center px-4 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all font-medium"
                          >
                            Login
                          </motion.div>
                        </Link>
                        <Link to="/register" onClick={() => setMenuOpen(false)}>
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg"
                          >
                            Sign Up
                          </motion.div>
                        </Link>
                      </>
                    )}
                  </div>
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
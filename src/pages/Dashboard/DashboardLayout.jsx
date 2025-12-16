import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaTrophy,
  FaUser,
  FaPlus,
  FaList,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaCrown,
  FaStar,
  FaRocket,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const [stats, setStats] = useState({
    activeContests: 0,
    totalWins: 0,
    totalWinnings: 0,
    totalContests: 0,
    totalParticipants: 0,
    totalSubmissions: 0,
    totalPrizes: 0,
    pendingContests: 0,
    rejectedContests: 0,
    totalUsers: 0,
  });

  // Fetch stats dynamically
  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error("No token found in localStorage");

        const response = await fetch(
          "https://contest-hub-server-psi.vercel.app/api/stats",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();

        // Map API data safely to state without touching UI
        setStats((prev) => ({
          activeContests: data.activeContests ?? prev.activeContests,
          totalWins: data.totalWins ?? prev.totalWins,
          totalWinnings: data.totalWinnings ?? prev.totalWinnings,
          totalContests: data.totalContests ?? prev.totalContests,
          totalParticipants: data.totalParticipants ?? prev.totalParticipants,
          totalSubmissions: data.totalSubmissions ?? prev.totalSubmissions,
          totalPrizes: data.totalPrizes ?? prev.totalPrizes,
          pendingContests: data.pendingContests ?? prev.pendingContests,
          rejectedContests: data.rejectedContests ?? prev.rejectedContests,
          totalUsers: data.totalUsers ?? prev.totalUsers,
        }));
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, [user]);

  // -----------------------------
  // ROLE-BASED ROUTES
  // -----------------------------
  const normalUserRoutes = [
    {
      path: "/dashboard/participated",
      label: "My Participated Contests",
      gradient: "from-blue-500 to-cyan-500",
      emoji: "📋",
    },
    {
      path: "/dashboard/winnings",
      label: "My Winning Contests",
      gradient: "from-amber-500 to-orange-500",
      emoji: "🏆",
    },
    {
      path: "/dashboard/profile",
      label: "My Profile",
      gradient: "from-purple-500 to-pink-500",
      emoji: "👤",
    },
  ];

  const creatorRoutes = [
    {
      path: "/dashboard/add-contest",
      label: "Add Contest",
      gradient: "from-emerald-500 to-teal-500",
      emoji: "➕",
    },
    {
      path: "/dashboard/my-contests",
      label: "My Created Contests",
      gradient: "from-indigo-500 to-purple-500",
      emoji: "🎯",
    },
    {
      path: "/dashboard/submissions",
      label: "Submitted Tasks",
      gradient: "from-pink-500 to-rose-500",
      emoji: "📄",
    },
    {
      path: "/dashboard/profile",
      label: "My Profile",
      gradient: "from-purple-500 to-pink-500",
      emoji: "👤",
    },
  ];

  const adminRoutes = [
    {
      path: "/dashboard/manage-users",
      label: "Manage Users",
      gradient: "from-blue-500 to-cyan-500",
      emoji: "👥",
    },
    {
      path: "/dashboard/creator-requests",
      label: "Creator Requests",
      gradient: "from-purple-500 to-pink-500",
      emoji: "👨‍💼",
    },
    {
      path: "/dashboard/manage-contests",
      label: "Manage Contests",
      gradient: "from-orange-500 to-red-500",
      emoji: "⚙️",
    },
    {
      path: "/dashboard/profile",
      label: "My Profile",
      gradient: "from-purple-500 to-pink-500",
      emoji: "👤",
    },
  ];

  const routes =
    user?.role === "admin"
      ? [...adminRoutes]
      : user?.role === "creator"
      ? [...creatorRoutes]
      : [...normalUserRoutes];

  // -----------------------------
  // ROLE BADGE
  // -----------------------------
  const roleBadge = {
    admin: {
      label: "Admin",
      gradient: "from-red-500 to-orange-500",
      emoji: "👑",
    },
    creator: {
      label: "Creator",
      gradient: "from-purple-500 to-pink-500",
      emoji: "🚀",
    },
    user: {
      label: "User",
      gradient: "from-blue-500 to-cyan-500",
      emoji: "⭐",
    },
  }[user?.role ?? "user"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:pt-28 lg:px-8 py-8 relative z-10 lg:pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
                Dashboard
              </h1>
              <p className="text-lg text-slate-400">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold">
                  {user?.displayName || user?.name || "User"}
                </span>
              </p>
            </div>

            {/* Role Badge */}
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${roleBadge.gradient} rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-2xl"
                >
                  {roleBadge.emoji}
                </motion.span>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    Role
                  </div>
                  <div
                    className={`text-lg font-black text-transparent bg-clip-text bg-gradient-to-r ${roleBadge.gradient}`}
                  >
                    {roleBadge.label}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative sticky top-24"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" />
                    <h2 className="text-xl font-black text-white">Dashboard</h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    Quick access to your features
                  </p>
                </div>

                {/* Links */}
                <ul className="space-y-2">
                  {routes.map((route, idx) => {
                    const isActive = location.pathname === route.path;
                    return (
                      <motion.li
                        key={route.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.03, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group"
                      >
                        {isActive && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${route.gradient} rounded-xl blur-md opacity-50`}
                          />
                        )}
                        <Link
                          to={route.path}
                          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                            isActive
                              ? `bg-gradient-to-r ${route.gradient} text-white shadow-lg`
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="text-xl">{route.emoji}</span>
                          <span className="flex-1 text-sm">{route.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="w-2 h-2 rounded-full bg-white"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-bold">
                    Quick Stats
                  </h3>
                  <div className="space-y-2">
                    {/* Participated / Active Contests */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        {user?.role === "user"
                          ? "Participated"
                          : "Active Contests"}
                      </span>
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        {user?.role === "user"
                          ? user?.participatedCount || 0
                          : stats?.activeContests || 0}
                      </span>
                    </div>

                    {/* Wins / Participants / Users */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        {user?.role === "user"
                          ? "Total Wins"
                          : user?.role === "admin"
                          ? "Total Users"
                          : "Participants"}
                      </span>
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                        {user?.role === "user"
                          ? user?.totalWins || 0
                          : user?.role === "admin"
                          ? stats?.totalUsers || 0
                          : stats?.totalParticipants || 0}
                      </span>
                    </div>

                    {/* Winnings / Prize Pool */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        {user?.role === "user"
                          ? "Total Winnings"
                          : "Prize Pool"}
                      </span>
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                        $
                        {user?.role === "user"
                          ? user?.totalWinnings || 0
                          : stats?.totalPrizes || 0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl blur-xl group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[70vh]">
                <Outlet />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

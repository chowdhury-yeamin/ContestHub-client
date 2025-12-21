import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useUserProfile,
  useUpdateProfile,
  useUserStats,
} from "../../../hooks/useUsers";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  FaUser,
  FaUsers,
  FaTrophy,
  FaChartLine,
  FaFire,
  FaMedal,
  FaEdit,
  FaSave,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaStar,
  FaCrown,
  FaCheckCircle,
  FaTimes,
  FaShieldAlt,
  FaUsersCog,
  FaClipboardCheck,
  FaPlusCircle,
  FaChartBar,
  FaRocket,
  FaFlag,
  FaUserShield,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const { user, refetchUser } = useAuth();
  const { data: profile, isLoading, refetch } = useUserProfile();
  const { data: stats, isLoading: statsLoading } = useUserStats();
  const updateMutation = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      name: profile?.name || user?.name || user?.displayName || "",
      photoURL: profile?.photoURL || user?.photoURL || "",
      bio: profile?.bio || "",
      address: profile?.address || "",
    });
  }, [profile, user, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateMutation.mutateAsync(formData);
      await refetch();
      if (refetchUser) {
        await refetchUser();
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });

      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "Something went wrong.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const userRole = user?.role || profile?.role || "user";

  const chartData = profile
    ? [
        { name: "Won", value: user.wonCount || 0, color: "#10b981" },
        {
          name: "Participated",
          value: (user.participatedCount || 0) - (user.wonCount || 0),
          color: "#6366f1",
        },
      ]
    : [];

  const winPercentage = user?.participatedCount
    ? (((user.wonCount || 0) / user.participatedCount) * 100).toFixed(1)
    : 0;

  const getUserStatus = () => {
    const wins = user.wonCount || 0;
    if (wins >= 10)
      return {
        title: "Legend",
        icon: FaCrown,
        gradient: "from-amber-400 to-orange-500",
        emoji: "👑",
      };
    if (wins >= 5)
      return {
        title: "Expert",
        icon: FaTrophy,
        gradient: "from-purple-400 to-pink-500",
        emoji: "🏆",
      };
    if (wins >= 3)
      return {
        title: "Pro",
        icon: FaMedal,
        gradient: "from-blue-400 to-cyan-500",
        emoji: "🥇",
      };
    if (wins >= 1)
      return {
        title: "Rising Star",
        icon: FaStar,
        gradient: "from-emerald-400 to-teal-500",
        emoji: "⭐",
      };
    return {
      title: "Beginner",
      icon: FaFire,
      gradient: "from-slate-400 to-slate-600",
      emoji: "🔥",
    };
  };

  const userStatus = getUserStatus();

  const roleConfig = {
    admin: {
      title: "Admin Dashboard",
      icon: FaShieldAlt,
      gradient: "from-red-400 to-orange-500",
      badge: "👨‍💼",
      bgGradient: "from-red-600/30 via-orange-600/30 to-yellow-600/30",
    },
    creator: {
      title: "Creator Dashboard",
      icon: FaRocket,
      gradient: "from-purple-400 to-pink-500",
      badge: "🎨",
      bgGradient: "from-purple-600/30 via-pink-600/30 to-rose-600/30",
    },
    user: {
      title: "My Profile",
      icon: FaUser,
      gradient: userStatus.gradient,
      badge: userStatus.emoji,
      bgGradient: "from-indigo-600/30 via-purple-600/30 to-pink-600/30",
    },
  };

  const currentRole = roleConfig[userRole] || roleConfig.user;

  if (isLoading || statsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity },
          }}
        >
          <currentRole.icon className="text-6xl text-indigo-400" />
        </motion.div>
        <p className="mt-4 text-slate-300 font-medium">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-4xl"
        >
          {currentRole.badge}
        </motion.div>
        <div>
          <h2 className="text-3xl font-black text-white drop-shadow-lg">
            {currentRole.title}
          </h2>
          <p className="text-slate-200 font-medium">
            {userRole === "admin" && "Manage platform and oversee operations"}
            {userRole === "creator" && "Create and manage your contests"}
            {userRole === "user" && "Track your contest participation"}
          </p>
        </div>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={profile?.photoURL || user?.photoURL}
        className="relative group"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentRole.gradient} rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`}
        />
        <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
                key={profile?.photoURL || user?.photoURL}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${currentRole.gradient} rounded-full blur-lg opacity-75`}
                />
                <img
                  src={
                    profile?.photoURL ||
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile?.name || user?.name || "User"
                    )}&background=6366F1&color=fff&size=200`
                  }
                  alt={profile?.name || user?.name}
                  className="relative w-32 h-32 rounded-full border-4 border-white/30 object-cover shadow-xl"
                  key={profile?.photoURL || user?.photoURL}
                />
                <div
                  className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${currentRole.gradient} w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg`}
                >
                  <currentRole.icon className="text-white text-xl" />
                </div>
              </motion.div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                {profile?.name || user?.name || user?.displayName || "User"}
              </h3>
              {(profile?.bio || user?.bio) && (
                <p className="text-slate-100 mb-4 max-w-2xl font-medium">
                  {profile?.bio || user?.bio}
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-200 font-medium">
                {(profile?.email || user?.email) && (
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                    <FaEnvelope className="text-blue-400" />
                    <span>{profile?.email || user?.email}</span>
                  </div>
                )}
                {(profile?.address || user?.address) && (
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                    <FaMapMarkerAlt className="text-emerald-400" />
                    <span>{profile?.address || user?.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <FaCalendarAlt className="text-purple-400" />
                  <span>
                    Joined{" "}
                    {new Date(
                      profile?.createdAt || user?.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ADMIN ROLE */}
      {userRole === "admin" && stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Users",
                value: stats.totalUsers || 0,
                icon: FaUsers,
                gradient: "from-blue-400 to-cyan-500",
                emoji: "👥",
              },
              {
                label: "Pending Contests",
                value: stats.pendingContests || 0,
                icon: FaClipboardCheck,
                gradient: "from-amber-400 to-orange-500",
                emoji: "⏳",
              },
              {
                label: "Total Contests",
                value: stats.totalContests || 0,
                icon: FaCheckCircle,
                gradient: "from-emerald-400 to-teal-500",
                emoji: "✅",
              },
              {
                label: "Total Prizes",
                value: `$${(stats.totalPrizes || 0).toLocaleString()}`,
                icon: FaChartBar,
                gradient: "from-purple-400 to-pink-500",
                emoji: "💰",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-20 group-hover:opacity-40 transition-opacity rounded-xl blur-lg`}
                />
                <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl drop-shadow-lg">
                      {stat.emoji}
                    </span>
                    <stat.icon
                      className={`text-2xl text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    />
                  </div>
                  <div className="text-2xl font-black text-white mb-2 drop-shadow-lg">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-200 font-bold">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2 drop-shadow-lg">
                <FaUsersCog className="text-red-400" />
                Admin Privileges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "User Management",
                    desc: "Manage roles & permissions",
                    icon: FaUserShield,
                    color: "blue",
                  },
                  {
                    title: "Contest Approval",
                    desc: "Review & approve contests",
                    icon: FaClipboardCheck,
                    color: "amber",
                  },
                  {
                    title: "Platform Settings",
                    desc: "Configure system settings",
                    icon: FaShieldAlt,
                    color: "emerald",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-slate-800/50 border-2 border-white/20 rounded-xl p-5 cursor-pointer hover:bg-slate-800/80 transition-all shadow-lg"
                  >
                    <item.icon
                      className={`text-4xl text-${item.color}-400 mb-3 drop-shadow-lg`}
                    />
                    <h4 className="font-black text-white mb-2 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-200 font-medium">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* CREATOR ROLE */}
      {userRole === "creator" && stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Contests Created",
                value: stats.totalContests || 0,
                icon: FaPlusCircle,
                gradient: "from-purple-400 to-pink-500",
                emoji: "📝",
              },
              {
                label: "Total Participants",
                value: stats.totalParticipants || 0,
                icon: FaUsers,
                gradient: "from-blue-400 to-cyan-500",
                emoji: "👥",
              },
              {
                label: "Total Submissions",
                value: stats.totalSubmissions || 0,
                icon: FaTrophy,
                gradient: "from-amber-400 to-orange-500",
                emoji: "📄",
              },
              {
                label: "Total Prizes",
                value: `$${(stats.totalPrizes || 0).toLocaleString()}`,
                icon: FaChartLine,
                gradient: "from-emerald-400 to-teal-500",
                emoji: "💰",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-20 group-hover:opacity-40 transition-opacity rounded-xl blur-lg`}
                />
                <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl drop-shadow-lg">
                      {stat.emoji}
                    </span>
                    <stat.icon
                      className={`text-2xl text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    />
                  </div>
                  <div className="text-2xl font-black text-white mb-2 drop-shadow-lg">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-200 font-bold">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                  <FaRocket className="text-purple-400" />
                  Creator Tools
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      title: "Create New Contest",
                      icon: FaPlusCircle,
                      color: "purple",
                    },
                    {
                      title: "Manage Contests",
                      icon: FaClipboardCheck,
                      color: "blue",
                    },
                    { title: "View Submissions", icon: FaFlag, color: "amber" },
                    {
                      title: "Declare Winners",
                      icon: FaCrown,
                      color: "emerald",
                    },
                  ].map((tool, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border-2 border-white/20 hover:bg-slate-800/80  transition-all shadow-lg"
                    >
                      <tool.icon
                        className={`text-2xl text-${tool.color}-400`}
                      />
                      <span className="text-white font-bold text-lg">
                        {tool.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                  <FaChartBar className="text-indigo-400" />
                  Performance Stats
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Pending",
                      value: stats.pendingContests || 0,
                      color: "amber",
                    },
                    {
                      label: "Rejected",
                      value: stats.rejectedContests || 0,
                      color: "red",
                    },
                    {
                      label: "Avg. Participants",
                      value:
                        stats.totalContests > 0
                          ? Math.round(
                              stats.totalParticipants / stats.totalContests
                            )
                          : 0,
                      color: "blue",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border-2 border-white/20 shadow-lg"
                    >
                      <span className="text-slate-200 font-bold text-lg">
                        {item.label}
                      </span>
                      <span
                        className={`text-3xl font-black text-${item.color}-400 drop-shadow-lg`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* USER ROLE */}
      {userRole === "user" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Participated",
                value: user?.participatedCount || 0,
                icon: FaChartLine,
                gradient: "from-blue-400 to-cyan-500",
                emoji: "📊",
              },
              {
                label: "Won",
                value: user?.wonCount || 0,
                icon: FaTrophy,
                gradient: "from-amber-400 to-orange-500",
                emoji: "🏆",
              },
              {
                label: "Win Rate",
                value: `${winPercentage}%`,
                icon: FaStar,
                gradient: "from-emerald-400 to-teal-500",
                emoji: "⭐",
              },
              {
                label: "Status",
                value: userStatus.title,
                icon: userStatus.icon,
                gradient: userStatus.gradient,
                emoji: userStatus.emoji,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-20 group-hover:opacity-40 transition-opacity rounded-xl blur-lg`}
                />
                <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl drop-shadow-lg">
                      {stat.emoji}
                    </span>
                    <stat.icon
                      className={`text-2xl text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    />
                  </div>
                  <div className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-200 font-bold">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                  <span className="text-3xl">📈</span> Win Percentage
                </h3>
                {profile && profile.participatedCount > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={800}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            border: "2px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "0.75rem",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        />
                        <Legend
                          wrapperStyle={{ color: "#fff", fontWeight: "bold" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-4 pt-4 border-t-2 border-white/20">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2 drop-shadow-lg">
                        {winPercentage}%
                      </div>
                      <p className="text-base text-slate-200 font-bold">
                        Overall Win Rate
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-7xl mb-4 drop-shadow-lg">📊</div>
                    <p className="text-slate-200 font-bold text-lg">
                      No participation data yet
                    </p>
                    <p className="text-sm text-slate-300 mt-2 font-medium">
                      Start participating in contests!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                  <span className="text-3xl">🎯</span> Quick Stats
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Total Contests",
                      value: user?.participatedCount || 0,
                      gradient: "from-blue-400 to-cyan-400",
                    },
                    {
                      label: "Total Wins",
                      value: user?.wonCount || 0,
                      gradient: "from-emerald-400 to-teal-400",
                    },
                    {
                      label: "Success Rate",
                      value: `${winPercentage}%`,
                      gradient: "from-amber-400 to-orange-400",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border-2 border-white/20 hover:bg-slate-800/80 transition-all cursor-pointer shadow-lg"
                    >
                      <span className="text-slate-200 font-bold text-lg">
                        {item.label}
                      </span>
                      <span
                        className={`font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} drop-shadow-lg`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 rounded-2xl blur-xl" />
            <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-black text-white mb-8 text-center flex items-center justify-center gap-3 drop-shadow-lg">
                <span className="text-4xl">🏅</span> Achievement Badges
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  {
                    name: "First Win",
                    unlocked: (profile?.wonCount || 0) >= 1,
                    emoji: "🥇",
                    gradient: "from-amber-400 to-orange-500",
                  },
                  {
                    name: "Hat Trick",
                    unlocked: (profile?.wonCount || 0) >= 3,
                    emoji: "🎩",
                    gradient: "from-purple-400 to-pink-500",
                  },
                  {
                    name: "High Five",
                    unlocked: (profile?.wonCount || 0) >= 5,
                    emoji: "✋",
                    gradient: "from-blue-400 to-cyan-500",
                  },
                  {
                    name: "Perfect 10",
                    unlocked: (profile?.wonCount || 0) >= 10,
                    emoji: "💯",
                    gradient: "from-emerald-400 to-teal-500",
                  },
                  {
                    name: "Legend",
                    unlocked: (profile?.wonCount || 0) >= 20,
                    emoji: "👑",
                    gradient: "from-red-400 to-orange-500",
                  },
                ].map((badge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                    whileHover={{ scale: badge.unlocked ? 1.15 : 1 }}
                    className={`relative text-center p-5 rounded-xl border-2 ${
                      badge.unlocked
                        ? "border-white/30 bg-slate-800/70 shadow-lg"
                        : "border-white/10 bg-slate-800/30 opacity-50"
                    }`}
                  >
                    {badge.unlocked && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${badge.gradient} rounded-xl blur-md opacity-40`}
                      />
                    )}
                    <div className="relative">
                      <div
                        className={`text-4xl mb-2 ${
                          badge.unlocked ? "" : "grayscale"
                        }`}
                      >
                        {badge.emoji}
                      </div>
                      <div
                        className={`text-xs font-bold ${
                          badge.unlocked
                            ? `text-transparent bg-clip-text bg-gradient-to-r ${badge.gradient}`
                            : "text-slate-600"
                        }`}
                      >
                        {badge.name}
                      </div>
                      {badge.unlocked && (
                        <FaCheckCircle className="absolute -top-1 -right-1 text-emerald-500 text-sm" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Edit Modal  */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentRole.bgGradient} rounded-2xl blur-2xl`}
              />
              <div className="relative bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    <span className="text-3xl">✏️</span> Edit Profile
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <FaTimes className="text-2xl" />
                  </motion.button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Name *
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        <span>⚠️</span> {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Photo URL
                    </label>
                    <input
                      {...register("photoURL")}
                      type="url"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      {...register("bio")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Address
                    </label>
                    <input
                      {...register("address")}
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="Your location"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={updateMutation.isLoading}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updateMutation.isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            ⏳
                          </motion.div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;

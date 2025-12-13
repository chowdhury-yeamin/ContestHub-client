import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserProfile, useUpdateProfile } from "../../../hooks/useUsers";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
  FaAward,
  FaGem,
  FaRocket,
  FaBolt,
  FaFlag,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading, refetch } = useUserProfile();
  const updateMutation = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);

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
      });
    }
  };

  const userRole = user?.role || profile?.role || "user";

  const chartData = profile
    ? [
        { name: "Won", value: profile.wonCount || 0, color: "#10b981" },
        {
          name: "Participated",
          value: (profile.participatedCount || 0) - (profile.wonCount || 0),
          color: "#6366f1",
        },
      ]
    : [];

  const winPercentage = profile?.participatedCount
    ? (((profile.wonCount || 0) / profile.participatedCount) * 100).toFixed(1)
    : 0;

  const getUserStatus = () => {
    const wins = profile?.wonCount || 0;
    if (wins >= 10)
      return {
        title: "Legend",
        icon: FaCrown,
        gradient: "from-amber-500 to-orange-500",
        emoji: "👑",
      };
    if (wins >= 5)
      return {
        title: "Expert",
        icon: FaTrophy,
        gradient: "from-purple-500 to-pink-500",
        emoji: "🏆",
      };
    if (wins >= 3)
      return {
        title: "Pro",
        icon: FaMedal,
        gradient: "from-blue-500 to-cyan-500",
        emoji: "🥇",
      };
    if (wins >= 1)
      return {
        title: "Rising Star",
        icon: FaStar,
        gradient: "from-emerald-500 to-teal-500",
        emoji: "⭐",
      };
    return {
      title: "Beginner",
      icon: FaFire,
      gradient: "from-slate-400 to-slate-500",
      emoji: "🔥",
    };
  };

  const userStatus = getUserStatus();

  // Role-specific data
  const roleConfig = {
    admin: {
      title: "Admin Dashboard",
      icon: FaShieldAlt,
      gradient: "from-red-500 to-orange-500",
      badge: "👨‍💼",
      bgGradient: "from-red-600/20 via-orange-600/20 to-yellow-600/20",
    },
    creator: {
      title: "Creator Dashboard",
      icon: FaRocket,
      gradient: "from-purple-500 to-pink-500",
      badge: "🎨",
      bgGradient: "from-purple-600/20 via-pink-600/20 to-rose-600/20",
    },
    user: {
      title: "My Profile",
      icon: FaUser,
      gradient: userStatus.gradient,
      badge: userStatus.emoji,
      bgGradient: "from-indigo-600/20 via-purple-600/20 to-pink-600/20",
    },
  };

  const currentRole = roleConfig[userRole] || roleConfig.user;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity },
          }}
        >
          <currentRole.icon className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading your profile...</p>
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
          <h2 className="text-3xl font-black text-white">
            {currentRole.title}
          </h2>
          <p className="text-slate-400">
            {userRole === "admin" && "Manage platform and oversee operations"}
            {userRole === "creator" && "Create and manage your contests"}
            {userRole === "user" && "Track your contest participation"}
          </p>
        </div>
      </motion.div>

      {/* Profile Header - Universal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentRole.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
        />
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
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
                  className="relative w-32 h-32 rounded-full border-4 border-white/20 object-cover"
                />
                <div
                  className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${currentRole.gradient} w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-950`}
                >
                  <currentRole.icon className="text-white text-xl" />
                </div>
              </motion.div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-2">
                {user?.name || user?.displayName || profile?.name || "User"}
              </h3>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <motion.span className="text-2xl">
                  {currentRole.badge}
                </motion.span>
                <span
                  className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentRole.gradient} uppercase`}
                >
                  {userRole}
                </span>
              </div>
              {profile?.bio && (
                <p className="text-slate-400 mb-4 max-w-2xl">{profile.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-400">
                {(profile?.email || user?.email) && (
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-400" />
                    <span>{profile?.email || user?.email}</span>
                  </div>
                )}
                {profile?.address && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-400" />
                    <span>{profile.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
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
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ADMIN ROLE UI */}
      {userRole === "admin" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Users",
                value: "1,234",
                icon: FaUsers,
                gradient: "from-blue-500 to-cyan-500",
                emoji: "👥",
              },
              {
                label: "Pending Contests",
                value: "23",
                icon: FaClipboardCheck,
                gradient: "from-amber-500 to-orange-500",
                emoji: "⏳",
              },
              {
                label: "Approved Contests",
                value: "156",
                icon: FaCheckCircle,
                gradient: "from-emerald-500 to-teal-500",
                emoji: "✅",
              },
              {
                label: "Platform Revenue",
                value: "$45.2K",
                icon: FaChartBar,
                gradient: "from-purple-500 to-pink-500",
                emoji: "💰",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 transition-opacity rounded-xl blur-lg`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.emoji}</span>
                    <stat.icon
                      className={`text-lg text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
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
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
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
                    className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all"
                  >
                    <item.icon
                      className={`text-3xl text-${item.color}-400 mb-3`}
                    />
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* CREATOR ROLE UI */}
      {userRole === "creator" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Contests Created",
                value: profile?.contestsCreated || 0,
                icon: FaPlusCircle,
                gradient: "from-purple-500 to-pink-500",
                emoji: "📝",
              },
              {
                label: "Total Participants",
                value: "1,847",
                icon: FaUsers,
                gradient: "from-blue-500 to-cyan-500",
                emoji: "👥",
              },
              {
                label: "Prizes Distributed",
                value: "$12.5K",
                icon: FaTrophy,
                gradient: "from-amber-500 to-orange-500",
                emoji: "💰",
              },
              {
                label: "Avg. Participation",
                value: "47",
                icon: FaChartLine,
                gradient: "from-emerald-500 to-teal-500",
                emoji: "📊",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 transition-opacity rounded-xl blur-lg`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.emoji}</span>
                    <stat.icon
                      className={`text-lg text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
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
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all"
                    >
                      <tool.icon
                        className={`text-2xl text-${tool.color}-400`}
                      />
                      <span className="text-white font-semibold">
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
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-2xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <FaChartBar className="text-indigo-400" />
                  Performance Stats
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Success Rate", value: "87%", color: "emerald" },
                    { label: "Avg. Submissions", value: "47", color: "blue" },
                    { label: "Total Revenue", value: "$12.5K", color: "amber" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                    >
                      <span className="text-slate-400">{item.label}</span>
                      <span
                        className={`text-2xl font-black text-${item.color}-400`}
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

      {/* USER ROLE UI */}
      {userRole === "user" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Participated",
                value: profile?.participatedCount || 0,
                icon: FaChartLine,
                gradient: "from-blue-500 to-cyan-500",
                emoji: "📊",
              },
              {
                label: "Won",
                value: profile?.wonCount || 0,
                icon: FaTrophy,
                gradient: "from-amber-500 to-orange-500",
                emoji: "🏆",
              },
              {
                label: "Win Rate",
                value: `${winPercentage}%`,
                icon: FaStar,
                gradient: "from-emerald-500 to-teal-500",
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
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 transition-opacity rounded-xl blur-lg`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.emoji}</span>
                    <stat.icon
                      className={`text-lg text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
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
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">📈</span> Win Percentage
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
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "0.5rem",
                            color: "#fff",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-4 pt-4 border-t border-white/10">
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-1">
                        {winPercentage}%
                      </div>
                      <p className="text-sm text-slate-400 font-medium">
                        Overall Win Rate
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-slate-400">No participation data yet</p>
                    <p className="text-sm text-slate-500 mt-2">
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-rose-600/10 rounded-2xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Quick Stats
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Total Contests",
                      value: profile?.participatedCount || 0,
                      gradient: "from-blue-400 to-cyan-400",
                    },
                    {
                      label: "Total Wins",
                      value: profile?.wonCount || 0,
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
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <span className="text-slate-400 font-medium">
                        {item.label}
                      </span>
                      <span
                        className={`font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Achievement Badges - Only for Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-white mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-3xl">🏅</span> Achievement Badges
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  {
                    name: "First Win",
                    unlocked: (profile?.wonCount || 0) >= 1,
                    emoji: "🥇",
                    gradient: "from-amber-500 to-orange-500",
                  },
                  {
                    name: "Hat Trick",
                    unlocked: (profile?.wonCount || 0) >= 3,
                    emoji: "🎩",
                    gradient: "from-purple-500 to-pink-500",
                  },
                  {
                    name: "High Five",
                    unlocked: (profile?.wonCount || 0) >= 5,
                    emoji: "✋",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    name: "Perfect 10",
                    unlocked: (profile?.wonCount || 0) >= 10,
                    emoji: "💯",
                    gradient: "from-emerald-500 to-teal-500",
                  },
                  {
                    name: "Legend",
                    unlocked: (profile?.wonCount || 0) >= 20,
                    emoji: "👑",
                    gradient: "from-red-500 to-orange-500",
                  },
                ].map((badge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                    whileHover={{ scale: badge.unlocked ? 1.1 : 1 }}
                    className={`relative text-center p-4 rounded-xl border ${
                      badge.unlocked
                        ? "border-white/20 bg-white/5"
                        : "border-white/5 bg-white/[0.02] opacity-40"
                    }`}
                  >
                    {badge.unlocked && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${badge.gradient} rounded-xl blur-md opacity-30`}
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

      {/* Edit Modal - Universal */}
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
                      disabled={updateMutation.isPending}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updateMutation.isPending ? (
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

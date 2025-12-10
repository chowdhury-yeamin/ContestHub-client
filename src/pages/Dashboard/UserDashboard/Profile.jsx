import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserProfile, useUpdateProfile } from "../../../hooks/useUsers";
import { useAuth } from "../../../contexts/AuthContext";
import { motion } from "framer-motion";
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

  // Reset form when profile or user changes
  useEffect(() => {
    reset({
      name: profile?.name || user?.name || user?.displayName || "",
      photoURL: profile?.photoURL || user?.photoURL || "",
      bio: profile?.bio || "",
      address: profile?.address || "",
    });
  }, [profile, user, reset]);

  const onSubmit = async (formData) => {
    // Merge with existing profile/user to avoid overwriting with empty fields
    const updatedData = {
      name: formData.name || profile?.name || user?.name || user?.displayName,
      photoURL: formData.photoURL || profile?.photoURL || user?.photoURL || "",
      bio: formData.bio ?? profile?.bio ?? "",
      address: formData.address ?? profile?.address ?? "",
    };

    try {
      await updateMutation.mutateAsync(updatedData);
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
      });

      // Reset form with updated data
      reset(updatedData);
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "Something went wrong. Please try again.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // Prepare chart data
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
          <FaUser className="text-6xl text-indigo-500" />
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
          👤
        </motion.div>
        <div>
          <h2 className="text-3xl font-black text-white">My Profile</h2>
          <p className="text-slate-400">
            Manage your account and track progress
          </p>
        </div>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${userStatus.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
        />
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Profile Picture */}
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${userStatus.gradient} rounded-full blur-lg opacity-75`}
                />
                <img
                  src={
                    profile?.photoURL ||
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile?.name || user?.name || user?.displayName || "User"
                    )}&background=6366F1&color=fff&size=200`
                  }
                  alt={profile?.name || user?.name || user?.displayName}
                  className="relative w-32 h-32 rounded-full border-4 border-white/20 object-cover"
                />
                <div
                  className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${userStatus.gradient} w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-950`}
                >
                  <userStatus.icon className="text-white text-xl" />
                </div>
              </motion.div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-2">
                {user?.name || user?.displayName || profile?.name || "User"}
              </h3>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <motion.span className="text-2xl">
                  {userStatus.emoji}
                </motion.span>
                <span
                  className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-800`}
                >
                  {userStatus.title}
                </span>
              </div>

              {profile?.bio && (
                <p className="text-slate-700 mb-4 max-w-2xl">{profile.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-700">
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
                {(profile?.createdAt || user?.createdAt) && (
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
                )}
              </div>
            </div>

            {/* Edit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
            >
              <FaEdit />
              {isEditing ? "Cancel" : "Edit Profile"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
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
        {/* Win Percentage Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
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
                      fill="#8884d8"
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
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  📊
                </motion.div>
                <p className="text-slate-400">No participation data yet</p>
                <p className="text-sm text-slate-500 mt-2">
                  Start participating in contests!
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Update Profile Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-rose-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">✏️</span> Update Profile
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  disabled={!isEditing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Photo URL
                </label>
                <input
                  {...register("photoURL")}
                  type="url"
                  disabled={!isEditing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  disabled={!isEditing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50 resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  disabled={!isEditing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
                  placeholder="Your location"
                />
              </div>

              {isEditing && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </motion.button>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
    </div>
  );
};

export default Profile;

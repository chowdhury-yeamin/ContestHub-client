import { useMyContests } from "../../../hooks/useCreator";
import { useDeleteContest } from "../../../hooks/useContests";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaTrophy,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaArrowRight,
  FaPlus,
  FaFileAlt,
  FaChartLine,
  FaDollarSign,
} from "react-icons/fa";

const MyContests = () => {
  const { data: contests = [], isLoading } = useMyContests();
  const deleteMutation = useDeleteContest();
  const navigate = useNavigate();

  const handleDelete = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `
        <div style="text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🗑️</div>
          <p style="font-size: 1.2rem; color: #64748b;">Do you want to delete</p>
          <p style="font-size: 1.3rem; font-weight: bold; color: #ef4444; margin: 0.5rem 0;">"${contestName}"</p>
          <p style="color: #64748b; margin-top: 0.5rem;">This action cannot be undone!</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(contestId);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Contest has been deleted.",
          background: "#0f172a",
          color: "#fff",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete contest.",
          background: "#0f172a",
          color: "#fff",
        });
      }
    }
  };

  // Calculate stats
  const stats = {
    total: contests.length,
    confirmed: contests.filter((c) => c.status === "confirmed").length,
    pending: contests.filter((c) => c.status === "pending").length,
    rejected: contests.filter((c) => c.status === "rejected").length,
    totalParticipants: contests.reduce(
      (sum, c) => sum + c.participantsCount,
      0
    ),
    totalPrizeMoney: contests.reduce((sum, c) => sum + (c.prizeMoney || 0), 0),
  };

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        gradient: "from-emerald-500 to-teal-500",
        icon: FaCheckCircle,
        label: "Confirmed",
        emoji: "✅",
      },
      pending: {
        gradient: "from-amber-500 to-orange-500",
        icon: FaClock,
        label: "Pending",
        emoji: "⏳",
      },
      rejected: {
        gradient: "from-red-500 to-rose-500",
        icon: FaTimesCircle,
        label: "Rejected",
        emoji: "❌",
      },
    };
    return configs[status] || configs.pending;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity },
          }}
        >
          <FaTrophy className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading your contests...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-4xl"
            >
              🎯
            </motion.div>
            <div>
              <h2 className="text-3xl font-black text-white">
                My Created Contests
              </h2>
              <p className="text-slate-400">Manage and track your contests</p>
            </div>
          </div>

          <Link to="/dashboard/add-contest">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2"
            >
              <FaPlus />
              Create New Contest
            </motion.button>
          </Link>
        </div>

        {/* Stats Grid */}
        {contests.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                label: "Total",
                value: stats.total,
                icon: FaTrophy,
                gradient: "from-indigo-500 to-purple-500",
                emoji: "🎯",
              },
              {
                label: "Confirmed",
                value: stats.confirmed,
                icon: FaCheckCircle,
                gradient: "from-emerald-500 to-teal-500",
                emoji: "✅",
              },
              {
                label: "Pending",
                value: stats.pending,
                icon: FaClock,
                gradient: "from-amber-500 to-orange-500",
                emoji: "⏳",
              },
              {
                label: "Rejected",
                value: stats.rejected,
                icon: FaTimesCircle,
                gradient: "from-red-500 to-rose-500",
                emoji: "❌",
              },
              {
                label: "Participants",
                value: stats.totalParticipants,
                icon: FaUsers,
                gradient: "from-blue-500 to-cyan-500",
                emoji: "👥",
              },
              {
                label: "Prize Pool",
                value: `$${stats.totalPrizeMoney}`,
                icon: FaDollarSign,
                gradient: "from-purple-500 to-pink-500",
                emoji: "💰",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 transition-opacity rounded-xl blur-lg`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{stat.emoji}</span>
                    <stat.icon
                      className={`text-sm text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    />
                  </div>
                  <div className="text-xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {contests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-cyan-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              📝
            </motion.div>
            <h3 className="text-3xl font-black text-white mb-3">
              No Contests Yet
            </h3>
            <p className="text-lg text-slate-400 mb-2">
              You haven't created any contests yet.
            </p>
            <p className="text-slate-500 mb-8">
              Start by creating your first contest and let participants join!
            </p>
            <Link to="/dashboard/add-contest">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/50 transition-all inline-flex items-center gap-3"
              >
                <FaPlus />
                Create Your First Contest
                <FaArrowRight />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {contests.map((contest, idx) => {
            const statusConfig = getStatusConfig(contest.status);
            const isDeadlinePassed = new Date(contest.deadline) < new Date();

            return (
              <motion.div
                key={contest._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${statusConfig.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity`}
                />

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Contest Image */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-full lg:w-40 h-40 rounded-xl overflow-hidden"
                      >
                        <img
                          src={contest.image}
                          alt={contest.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ${contest.prizeMoney}
                      </div>
                    </div>

                    {/* Contest Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                            {contest.name}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <FaUsers className="text-blue-400" />
                              <span>
                                {contest.participantsCount} Participants
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt
                                className={
                                  isDeadlinePassed
                                    ? "text-red-400"
                                    : "text-emerald-400"
                                }
                              />
                              <span
                                className={
                                  isDeadlinePassed ? "text-red-400" : ""
                                }
                              >
                                {new Date(contest.deadline).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaTrophy className="text-amber-400" />
                              <span>${contest.prizeMoney}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="relative group/badge">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${statusConfig.gradient} rounded-lg blur opacity-50`}
                          />
                          <div
                            className={`relative bg-gradient-to-r ${statusConfig.gradient} bg-opacity-20 border border-opacity-30 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2`}
                          >
                            <span className="text-xl">
                              {statusConfig.emoji}
                            </span>
                            <span className="text-white">
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Link to={`/contest/${contest._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/5 border border-white/10 hover:border-indigo-500/50 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm"
                          >
                            <FaEye />
                            View
                          </motion.button>
                        </Link>

                        {contest.status === "pending" && (
                          <>
                            <Link to={`/dashboard/edit-contest/${contest._id}`}>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 text-sm"
                              >
                                <FaEdit />
                                Edit
                              </motion.button>
                            </Link>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleDelete(contest._id, contest.name)
                              }
                              disabled={deleteMutation.isPending}
                              className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-red-500/50 transition-all flex items-center gap-2 text-sm disabled:opacity-50"
                            >
                              <FaTrash />
                              Delete
                            </motion.button>
                          </>
                        )}

                        <Link to={`/dashboard/submissions/${contest._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 text-sm"
                          >
                            <FaFileAlt />
                            Submissions
                            <FaArrowRight className="text-xs" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyContests;

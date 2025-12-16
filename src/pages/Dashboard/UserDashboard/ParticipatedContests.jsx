import { useParticipatedContests } from "../../../hooks/useUsers";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaFileAlt,
  FaTrophy,
  FaArrowRight,
  FaClock,
  FaEye,
  FaChartLine,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

const ParticipatedContests = () => {
  const { data, isLoading } = useParticipatedContests();
  const participated = data?.registrations || [];
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, user } = useAuth();

  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    {
      user.role === "admin" ? navigate("/dashboard/profile") : "";
    }
    {
      user.role === "creator" ? navigate("/dashboard/profile") : "";
    }
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);
  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaTrophy className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading your contests...</p>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(participated.length / itemsPerPage);
  const paginatedData = participated.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats calculation
  const stats = {
    total: participated.length,
    submitted: participated.filter((p) => p.submissionStatus === "submitted")
      .length,
    pending: participated.filter((p) => p.submissionStatus !== "submitted")
      .length,
    totalPrizePool: participated.reduce(
      (sum, p) => sum + (p.contest?.prizeMoney || 0),
      0
    ),
  };

  return (
    <div>
      {/* Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-4xl"
          >
            🎯
          </motion.div>
          <div>
            <h2 className="text-3xl font-black text-white">
              My Participated Contests
            </h2>
            <p className="text-slate-400">Track your contest journey</p>
          </div>
        </div>

        {/* Stats Grid */}
        {participated.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Total Contests",
                value: stats.total,
                emoji: "🎯",
                gradient: "from-blue-500 to-cyan-500",
                icon: FaTrophy,
              },
              {
                label: "Submitted",
                value: stats.submitted,
                emoji: "✅",
                gradient: "from-emerald-500 to-teal-500",
                icon: FaCheckCircle,
              },
              {
                label: "Pending",
                value: stats.pending,
                emoji: "⏳",
                gradient: "from-amber-500 to-orange-500",
                icon: FaClock,
              },
              {
                label: "Prize Pool",
                value: `$${stats.totalPrizePool.toLocaleString()}`,
                emoji: "💰",
                gradient: "from-purple-500 to-pink-500",
                icon: FaChartLine,
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
                  <div className="text-2xl font-black text-white mb-1">
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
      {participated.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🎯
            </motion.div>
            <h3 className="text-3xl font-black text-white mb-3">
              No Contests Yet
            </h3>
            <p className="text-lg text-slate-400 mb-2">
              You haven't participated in any contests yet.
            </p>
            <p className="text-slate-500 mb-8">
              Browse available contests and start participating to win amazing
              prizes!
            </p>
            <Link to="/all-contests">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-indigo-500/50 transition-all inline-flex items-center gap-3"
              >
                Browse Contests
                <FaArrowRight />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Contests Grid */}
          <div className="space-y-4">
            {paginatedData.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Contest Image */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-full md:w-32 h-32 rounded-xl overflow-hidden"
                      >
                        <img
                          src={item.contest.image}
                          alt={item.contest.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ${item.contest.prizeMoney}
                      </div>
                    </div>

                    {/* Contest Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                            {item.contest.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-blue-400" />
                              <span>
                                Deadline:{" "}
                                {new Date(
                                  item.contest.deadline
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="relative group/badge">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-50" />
                          <div className="relative bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                            <FaCheckCircle />
                            {item.paymentStatus}
                          </div>
                        </div>

                        {item.submissionStatus === "submitted" ? (
                          <div className="relative group/badge">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-50" />
                            <div className="relative bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                              <FaFileAlt />
                              Submitted
                            </div>
                          </div>
                        ) : (
                          <div className="relative group/badge">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg blur opacity-50" />
                            <div className="relative bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                              <FaClock />
                              Pending
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <Link to={`/contest/${item.contest._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
                        >
                          <FaEye />
                          View Details
                          <FaArrowRight className="text-sm" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-8"
            >
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ←
                </motion.button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          currentPage === page
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 text-slate-300 hover:text-white"
                        }`}
                      >
                        {page}
                      </motion.button>
                    )
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  →
                </motion.button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ParticipatedContests;

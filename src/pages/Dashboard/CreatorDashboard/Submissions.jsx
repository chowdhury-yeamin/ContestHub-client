import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDeclareWinner } from "../../../hooks/useContests";
import { useContestSubmissions } from "../../../hooks/useCreator";
import { useMyContests } from "../../../hooks/useCreator";
import Swal from "sweetalert2";
import {
  FaTrophy,
  FaCalendarAlt,
  FaCrown,
  FaUsers,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaMedal,
  FaStar,
  FaAward,
  FaDownload,
  FaEye,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import { useState } from "react";

const Submissions = () => {
  const { id } = useParams();
  const { data, isLoading } = useContestSubmissions(id);
  const submissions = Array.isArray(data) ? data : data?.submissions || [];
  const { data: contests = [] } = useMyContests();
  const declareWinnerMutation = useDeclareWinner();
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [previewSubmission, setPreviewSubmission] = useState(null);

  const contestsArray = Array.isArray(contests) ? contests : [];
  const contest = contestsArray.find((c) => c._id === id);

  const handleDeclareWinner = async (submissionId, participantName) => {
    const result = await Swal.fire({
      title: "Declare Winner",
      html: `
        <div style="text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🏆</div>
          <p style="font-size: 1.2rem; color: #64748b;">Are you sure you want to declare</p>
          <p style="font-size: 1.5rem; font-weight: bold; color: #f59e0b; margin: 0.5rem 0;">${participantName}</p>
          <p style="font-size: 1.2rem; color: #64748b;">as the winner?</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, declare winner!",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await declareWinnerMutation.mutateAsync({
          contestId: id,
          winnerId: submissionId,
        });

        setSelectedWinner(submissionId);
        Swal.fire({
          icon: "success",
          title: "Winner Declared!",
          html: `
            <div style="text-align: center;">
              <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
              <p style="font-size: 1.3rem; color: #f59e0b; font-weight: bold;">${participantName}</p>
              <p style="color: #64748b;">has been declared as the winner!</p>
            </div>
          `,
          background: "#0f172a",
          color: "#fff",
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to declare winner. Please try again.",
          background: "#0f172a",
          color: "#fff",
        });
      }
    }
  };

  const isDeadlinePassed = contest && new Date(contest.deadline) < new Date();

  // Filter and sort submissions
  const filteredSubmissions = submissions
    .filter(
      (sub) =>
        sub.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      if (sortBy === "oldest")
        return new Date(a.submittedAt) - new Date(b.submittedAt);
      if (sortBy === "name")
        return a.participant.name.localeCompare(b.participant.name);
      return 0;
    });

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
          <FaFileAlt className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-4xl"
          >
            📤
          </motion.div>
          <div>
            <h2 className="text-3xl font-black text-white">Submitted Tasks</h2>
            <p className="text-slate-400">Review and select the winner</p>
          </div>
        </div>

        {/* Contest Info Card */}
        {contest && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-teal-600/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center"
                  >
                    <FaTrophy className="text-3xl text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">
                      {contest.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-400" />
                        <span>
                          {new Date(contest.deadline).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric", year: "numeric" }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-purple-400" />
                        <span>{submissions.length} Submissions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaTrophy className="text-amber-400" />
                        <span>${contest.prizeMoney}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 ${
                    isDeadlinePassed
                      ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300"
                      : "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-300"
                  }`}
                >
                  {isDeadlinePassed ? (
                    <>
                      <FaClock />
                      Deadline Passed
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Active
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        {submissions.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              {
                label: "Total Submissions",
                value: submissions.length,
                icon: FaFileAlt,
                gradient: "from-blue-500 to-cyan-500",
                emoji: "📄",
              },
              {
                label: "Winner Selected",
                value: selectedWinner ? "Yes" : "No",
                icon: FaTrophy,
                gradient: "from-amber-500 to-orange-500",
                emoji: "🏆",
              },
              {
                label: "Prize Money",
                value: `$${contest?.prizeMoney || 0}`,
                icon: FaMedal,
                gradient: "from-emerald-500 to-teal-500",
                emoji: "💰",
              },
              {
                label: "Status",
                value: isDeadlinePassed ? "Closed" : "Active",
                icon: FaClock,
                gradient: "from-purple-500 to-pink-500",
                emoji: isDeadlinePassed ? "🔒" : "✅",
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

      {/* Search and Filter Bar */}
      {submissions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="newest" className="bg-slate-900">
                  Newest First
                </option>
                <option value="oldest" className="bg-slate-900">
                  Oldest First
                </option>
                <option value="name" className="bg-slate-900">
                  Name (A-Z)
                </option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  Grid
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  List
                </motion.button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-white/10 text-sm text-slate-400">
              Showing{" "}
              <span className="text-white font-bold">
                {filteredSubmissions.length}
              </span>{" "}
              of{" "}
              <span className="text-white font-bold">{submissions.length}</span>{" "}
              submissions
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {submissions.length === 0 ? (
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
              📤
            </motion.div>
            <h3 className="text-3xl font-black text-white mb-3">
              No Submissions Yet
            </h3>
            <p className="text-lg text-slate-400 mb-2">
              No submissions yet for this contest.
            </p>
            <p className="text-slate-500">
              Participants will appear here once they submit their tasks.
            </p>
          </div>
        </motion.div>
      ) : filteredSubmissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative text-center py-12"
        >
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-white mb-2">
              No Results Found
            </h3>
            <p className="text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </motion.div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
              : "space-y-4"
          }
        >
          {filteredSubmissions.map((submission, idx) => {
            const isWinner = selectedWinner === submission._id;
            return (
              <motion.div
                key={submission._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                {isWinner && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-2xl blur-xl opacity-75 animate-pulse" />
                )}

                <div
                  className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 transition-all ${
                    isWinner
                      ? "border-amber-500/50 shadow-lg shadow-amber-500/20"
                      : "border-white/10 group-hover:border-white/30"
                  }`}
                >
                  {isWinner && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="absolute -top-4 -right-4 z-10"
                    >
                      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-950">
                        <div className="text-center">
                          <FaCrown className="text-2xl text-white mx-auto mb-1" />
                          <div className="text-xs font-black text-white">
                            WINNER
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Participant Info */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          {isWinner && (
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-md opacity-75" />
                          )}
                          <img
                            src={
                              submission.participant.photoURL ||
                              `https://ui-avatars.com/api/?name=${submission.participant.name}&background=6366F1&color=fff`
                            }
                            alt={submission.participant.name}
                            className="relative w-16 h-16 rounded-full border-4 border-white/20 object-cover"
                          />
                        </motion.div>
                        {isWinner && (
                          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 w-7 h-7 rounded-full flex items-center justify-center border-2 border-slate-950">
                            <FaStar className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-black mb-1 ${
                            isWinner
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"
                              : "text-white"
                          }`}
                        >
                          {submission.participant.name}
                        </h3>
                        <p className="text-slate-400 text-sm mb-1">
                          {submission.participant.email}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <FaClock />
                          <span>
                            {new Date(
                              submission.submittedAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rank Badge */}
                    <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-center">
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                        #{idx + 1}
                      </div>
                      <div className="text-2xl">
                        {idx === 0
                          ? "🥇"
                          : idx === 1
                          ? "🥈"
                          : idx === 2
                          ? "🥉"
                          : "📄"}
                      </div>
                    </div>
                  </div>

                  {/* Submission Link */}
                  <div className="relative group/link mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl blur-md opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <div className="relative bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                        <FaFileAlt className="text-blue-400" />
                        Submission:
                      </p>
                      <a
                        href={submission.submission}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 font-medium flex items-center gap-2 break-all transition-all group"
                      >
                        <span className="truncate max-w-full">
                          {submission.submission}
                        </span>
                        <FaExternalLinkAlt className="text-indigo-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPreviewSubmission(submission)}
                      className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <FaEye />
                      View Details
                    </motion.button>

                    {isDeadlinePassed && !isWinner && !selectedWinner && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          handleDeclareWinner(
                            submission._id,
                            submission.participant.name
                          )
                        }
                        disabled={declareWinnerMutation.isPending}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {declareWinnerMutation.isPending ? (
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
                            Declaring...
                          </>
                        ) : (
                          <>
                            <FaTrophy />
                            Declare Winner
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Winner Announcement */}
      <AnimatePresence>
        {selectedWinner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 via-orange-600/30 to-yellow-600/30 rounded-2xl blur-xl animate-pulse" />
            <div className="relative bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 backdrop-blur-xl rounded-2xl p-8 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">
                Winner Declared!
              </h3>
              <p className="text-slate-400">
                The contest has been successfully completed
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewSubmission(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-black text-white">
                    Submission Details
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPreviewSubmission(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
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
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Participant Info */}
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                    <img
                      src={
                        previewSubmission.participant.photoURL ||
                        `https://ui-avatars.com/api/?name=${previewSubmission.participant.name}&background=6366F1&color=fff`
                      }
                      alt={previewSubmission.participant.name}
                      className="w-20 h-20 rounded-full border-4 border-white/20 object-cover"
                    />
                    <div>
                      <h4 className="text-xl font-black text-white">
                        {previewSubmission.participant.name}
                      </h4>
                      <p className="text-slate-400">
                        {previewSubmission.participant.email}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Submitted:{" "}
                        {new Date(
                          previewSubmission.submittedAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Submission Link */}
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-sm font-semibold text-slate-300 mb-3">
                      Submission Link:
                    </p>
                    <a
                      href={previewSubmission.submission}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2 break-all transition-all"
                    >
                      <span>{previewSubmission.submission}</span>
                      <FaExternalLinkAlt className="flex-shrink-0" />
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPreviewSubmission(null)}
                      className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
                    >
                      Close
                    </motion.button>
                    {isDeadlinePassed && !selectedWinner && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          handleDeclareWinner(
                            previewSubmission._id,
                            previewSubmission.participant.name
                          );
                          setPreviewSubmission(null);
                        }}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2"
                      >
                        <FaTrophy />
                        Declare Winner
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Submissions;

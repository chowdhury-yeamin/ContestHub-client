import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "react-icons/fa";
import { useState } from "react";

const Submissions = () => {
  const { id } = useParams();
  const { data: submissions = [], isLoading } = useContestSubmissions(id);
  const { data: contests = [] } = useMyContests();
  const declareWinnerMutation = useDeclareWinner();
  const [selectedWinner, setSelectedWinner] = useState(null);

  const contest = contests.find((c) => c._id === id);

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
          <FaFileAlt className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading submissions...</p>
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center">
                    <FaTrophy className="text-3xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">
                      {contest.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-400" />
                        <span>
                          Deadline:{" "}
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
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div
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
                </div>
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
      ) : (
        <div className="space-y-4 mt-8">
          {submissions.map((submission, idx) => {
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
                {/* Winner Glow */}
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
                  {/* Winner Badge */}
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
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
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
                            className="relative w-20 h-20 rounded-full border-4 border-white/20 object-cover"
                          />
                        </motion.div>
                        {isWinner && (
                          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 w-8 h-8 rounded-full flex items-center justify-center border-2 border-slate-950">
                            <FaStar className="text-white text-sm" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-black mb-1 ${
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
                            Submitted:{" "}
                            {new Date(
                              submission.submittedAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rank Badge */}
                    <div className="flex items-center gap-2">
                      <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                          Submission #{idx + 1}
                        </div>
                        <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
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
                  </div>

                  {/* Submission Link */}
                  <div className="relative group/link">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl blur-md opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <div className="relative bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                        <FaFileAlt className="text-blue-400" />
                        Submission Link:
                      </p>
                      <a
                        href={submission.submission}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 font-medium flex items-center gap-2 break-all transition-all"
                      >
                        <span className="truncate max-w-full">
                          {submission.submission}
                        </span>
                        <FaExternalLinkAlt className="text-indigo-400 flex-shrink-0" />
                      </a>
                    </div>
                  </div>

                  {/* Declare Winner Button */}
                  {isDeadlinePassed && !isWinner && !selectedWinner && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        handleDeclareWinner(
                          submission._id,
                          submission.participant.name
                        )
                      }
                      disabled={declareWinnerMutation.isPending}
                      className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
                          Declaring Winner...
                        </>
                      ) : (
                        <>
                          <FaTrophy />
                          Declare as Winner
                          <FaCrown />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Winner Announcement */}
      {selectedWinner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative mt-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 via-orange-600/30 to-yellow-600/30 rounded-2xl blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 backdrop-blur-xl rounded-2xl p-8 text-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
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
    </div>
  );
};

export default Submissions;

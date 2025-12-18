import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useContest,
  useSubmitTask,
  useRegisterContest,
} from "../../hooks/useContests";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaUpload,
  FaStar,
  FaShieldAlt,
  FaBolt,
  FaTag,
  FaShare,
  FaChartLine,
  FaUserShield,
  FaCrown,
  FaExclamationTriangle,
} from "react-icons/fa";
import api from "../../services/api";
import { ArrowBigLeft } from "lucide-react";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: contest, isLoading, error } = useContest(id);
  const registerMutation = useRegisterContest();
  const submitMutation = useSubmitTask();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const isEnded = contest && new Date(contest.deadline) < new Date();
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [checkingRegistration, setCheckingRegistration] = useState(true);

  // Check if user can participate (only regular users can join)
  const canParticipate = user && user.role === "user";
  const isCreatorOrAdmin =
    user && (user.role === "creator" || user.role === "admin");

  useEffect(() => {
    const checkRegistration = async () => {
      if (!user || !id || !canParticipate) {
        setCheckingRegistration(false);
        return;
      }

      try {
        const { data } = await api.get("/users/me/registrations");
        const registered = data.registrations?.some(
          (reg) => reg.contest?._id?.toString() === id
        );

        setIsRegistered(registered);

        if (registered) {
          try {
            const submissionsRes = await api.get(
              `/contests/${id}/my-submission`
            );
            setHasSubmitted(!!submissionsRes.data.submission);
          } catch (error) {
            console.error("Error checking submissions:", error);
            setHasSubmitted(false);
          }
        } else {
          setHasSubmitted(false);
        }
      } catch (error) {
        console.error("Error checking registration:", error);
        setIsRegistered(false);
        setHasSubmitted(false);
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [user, id, canParticipate]);

  if (!contest || error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex justify-center items-center">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🔍
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-2">
            Contest Not Found
          </h2>
          <p className="text-slate-400 mb-6">
            The contest you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/all-contests")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse Contests
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

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
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button & Share */}
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/all-contests"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-semibold"
            >
              <ArrowBigLeft className="w-5 h-5" />
              Back to Contests
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 text-white px-4 py-2 rounded-xl font-semibold transition-all"
            >
              <FaShare />
              Share
            </motion.button>
          </div>

          {/* Contest Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-12"
          >
            <img
              src={contest.image}
              alt={contest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`absolute top-6 right-6 px-4 py-2 rounded-full font-bold text-lg shadow-lg backdrop-blur-xl ${
                contest.status === "confirmed"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                  : contest.status === "pending"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500"
                  : "bg-gradient-to-r from-red-500 to-rose-500"
              } text-white`}
            >
              {contest.status === "confirmed" ? "Active" : contest.status}
            </motion.div>

            {/* Prize Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-6 left-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg backdrop-blur-xl flex items-center gap-2"
            >
              <FaTrophy />${contest.prizeMoney} Prize
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 py-1 text-white text-sm font-semibold flex items-center gap-2">
                    <FaTag />
                    {contest.contestType || contest.type}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                  {contest.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm sm:text-base md:text-lg">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 text-white"
                  >
                    <FaUsers className="text-blue-400" />
                    <span className="font-semibold">
                      {contest.participantsCount || 0} Joined
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 text-white"
                  >
                    <FaChartLine className="text-emerald-400" />
                    <span className="font-semibold">
                      {contest.submissionsCount || 0} Submissions
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 text-white"
                  >
                    <FaCalendarAlt className="text-purple-400" />
                    <span className="font-semibold">
                      Ends {new Date(contest.deadline).toLocaleDateString()}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <FaStar className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl font-black text-white">
                      About This Contest
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                    {contest.description}
                  </p>
                </div>
              </motion.div>

              {/* Task Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <FaShieldAlt className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl font-black text-white">
                      Task Instructions
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                    {contest.taskInstruction}
                  </p>
                </div>
              </motion.div>

              {/* Contest Creator Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Hosted by</p>
                      <h3 className="text-2xl font-black text-white">
                        {contest.creatorName}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {contest.creatorEmail}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                      {contest.creatorName?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Winner Section */}
              {contest.winner && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-2xl opacity-50" />
                  <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <FaTrophy className="text-white text-3xl" />
                        <h2 className="text-3xl font-black text-white">
                          🏆 Winner Announced
                        </h2>
                      </div>
                      <div className="flex items-center gap-6">
                        <motion.img
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          src={
                            contest.winner.photoURL ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              contest.winner.name
                            )}&background=6366F1&color=fff`
                          }
                          alt={contest.winner.name}
                          className="w-20 h-20 rounded-full border-4 border-white shadow-2xl object-cover"
                        />
                        <div>
                          <h3 className="text-2xl font-black text-white mb-1">
                            {contest.winner.name}
                          </h3>
                          <p className="text-white/90 text-lg font-semibold">
                            Won ${contest.prizeMoney}! 🎉
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Deadline Countdown */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <FaClock className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Time Remaining
                    </h3>
                  </div>
                  {isEnded ? (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl font-black text-red-400"
                    >
                      Contest Ended
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                    >
                      {timeLeft}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Entry Fee & Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                      <FaDollarSign className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Entry Fee
                    </h3>
                  </div>
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-6">
                    ${contest.entryFee || 0}
                  </div>

                  {/* Role-Based Actions */}
                  <div>
                    {isCreatorOrAdmin ? (
                      <motion.div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6 text-center">
                        <div className="flex justify-center mb-3">
                          {user.role === "admin" ? (
                            <FaCrown className="text-amber-400 text-4xl" />
                          ) : (
                            <FaUserShield className="text-purple-400 text-4xl" />
                          )}
                        </div>
                        <p className="text-white font-bold text-lg mb-2">
                          {user.role === "admin"
                            ? "Admin Access"
                            : "Creator Account"}
                        </p>
                        <p className="text-slate-300 text-sm">
                          {user.role === "admin"
                            ? "Admins can view and manage contests but cannot participate"
                            : "Creators can host contests but cannot participate as contestants"}
                        </p>
                      </motion.div>
                    ) : checkingRegistration ? (
                      <div className="text-center py-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block"
                        >
                          <FaBolt className="text-3xl text-indigo-400" />
                        </motion.div>
                        <p className="text-slate-400 mt-2">
                          Checking registration...
                        </p>
                      </div>
                    ) : isRegistered ? (
                      <div className="space-y-4">
                        <motion.div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-center">
                          <FaCheckCircle className="inline-block text-3xl text-white mb-2" />
                          <p className="text-white font-bold text-lg">
                            ✅ You're Registered!
                          </p>
                        </motion.div>

                        {!isEnded && !hasSubmitted && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowSubmitModal(true)}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                          >
                            <FaUpload />
                            Submit Your Work
                          </motion.button>
                        )}

                        {hasSubmitted && (
                          <motion.div
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-center"
                          >
                            <FaCheckCircle className="inline-block text-3xl text-white mb-2" />
                            <p className="text-white font-bold text-lg">
                              📄 Task Submitted!
                            </p>
                            <p className="text-white/80 text-sm mt-1">
                              Good luck! Winner will be announced after the
                              deadline.
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ) : contest.status !== "confirmed" ? (
                      <motion.div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-xl p-6 text-center">
                        <FaExclamationTriangle className="text-red-400 text-4xl mx-auto mb-3" />
                        <p className="text-white font-bold text-lg mb-2">
                          Contest Not Active
                        </p>
                        <p className="text-slate-300 text-sm">
                          This contest is {contest.status}. Check back later or
                          browse other contests.
                        </p>
                      </motion.div>
                    ) : isEnded ? (
                      <motion.div className="bg-gradient-to-r from-slate-500/20 to-gray-500/20 border border-slate-500/30 rounded-xl p-6 text-center">
                        <FaClock className="text-slate-400 text-4xl mx-auto mb-3" />
                        <p className="text-white font-bold text-lg mb-2">
                          Registration Closed
                        </p>
                        <p className="text-slate-300 text-sm">
                          This contest has ended. Check out other active
                          contests!
                        </p>
                      </motion.div>
                    ) : (
                      <Link to={`/dashboard/payment/${contest._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
                        >
                          <FaDollarSign />
                          Register Now
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <h3 className="text-xl font-black text-white mb-6">
                    Contest Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Participants</span>
                      <span className="text-white font-bold text-lg">
                        {contest.participantsCount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Submissions</span>
                      <span className="text-white font-bold text-lg">
                        {contest.submissionsCount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Prize Pool</span>
                      <span className="text-emerald-400 font-bold text-lg">
                        ${contest.prizeMoney}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Entry Fee</span>
                      <span className="text-white font-bold text-lg">
                        ${contest.entryFee}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSubmitModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-20" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <FaUpload className="text-white text-xl" />
                </div>
                <h3 className="text-3xl font-black text-white">
                  Submit Your Work
                </h3>
              </div>

              <p className="text-slate-300 mb-6 text-lg">
                Provide a link to your submission (Google Drive, Dropbox,
                GitHub, portfolio, etc.)
              </p>

              <textarea
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-all resize-none text-lg"
                placeholder="https://drive.google.com/... or https://github.com/..."
              />

              <div className="flex gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowSubmitModal(false);
                    setSubmissionLink("");
                  }}
                  className="flex-1 bg-white/5 border border-white/10 hover:border-white/30 text-white py-4 rounded-xl font-semibold text-lg transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={submitMutation.isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {submitMutation.isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <FaBolt />
                      </motion.div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Submit
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ContestDetails;

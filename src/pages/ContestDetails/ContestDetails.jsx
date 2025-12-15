import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  FaAward,
  FaStar,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

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

  useEffect(() => {
    if (contest && !isEnded) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const deadline = new Date(contest.deadline).getTime();
        const distance = deadline - now;

        if (distance < 0) {
          setTimeLeft("Contest Ended");
          clearInterval(interval);
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [contest, isEnded]);

  const handleRegister = async () => {
    Swal.fire({
      title: "Processing Payment",
      text: "Redirecting to payment gateway...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(async () => {
      try {
        await registerMutation.mutateAsync({
          contestId: id,
          paymentData: { amount: contest.price, method: "card" },
        });

        setIsRegistered(true);
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have successfully registered for this contest",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Payment processing failed. Please try again.",
        });
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    if (!submissionLink.trim()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Submission",
        text: "Please provide a valid submission link",
      });
      return;
    }

    try {
      await submitMutation.mutateAsync({
        contestId: id,
        submissionData: { submission: submissionLink },
      });

      setHasSubmitted(true);
      setShowSubmitModal(false);
      setSubmissionLink("");

      Swal.fire({
        icon: "success",
        title: "Submission Successful!",
        text: "Your task has been submitted successfully",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit your task. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex justify-center items-center ">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaTrophy className="text-6xl text-indigo-500" />
        </motion.div>
      </div>
    );
  }

  if (!contest) {
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
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Add this check for error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            ❌
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-2">
            Contest Not Found
          </h2>
          <p className="text-slate-400 mb-6">
            The contest you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-26 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Contest Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-12"
          >
            <img
              src={contest.image}
              alt={contest.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg backdrop-blur-xl"
            >
              ${contest.prize || contest.prizeMoney} Prize
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                  {contest.title || contest.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm sm:text-base md:text-lg">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 text-white"
                  >
                    <FaUsers className="text-blue-400" />
                    <span className="font-semibold">
                      {contest.participantsCount || 0} Participants
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 text-white"
                  >
                    <FaTrophy className="text-amber-400" />
                    <span className="font-semibold">
                      ${contest.prizeMoney || contest.prize || 0}
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 text-white"
                  >
                    <FaCalendarAlt className="text-purple-400" />
                    <span className="font-semibold">
                      {new Date(
                        contest.endDate || contest.deadline
                      ).toLocaleDateString()}
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
                transition={{ delay: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <FaStar className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl font-black text-white">
                      Contest Description
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
                transition={{ delay: 0.6 }}
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

              {/* Winner Section */}
              {contest.winner && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
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
                          src={contest.winner.photoURL}
                          alt={contest.winner.name}
                          className="w-20 h-20 rounded-full border-4 border-white shadow-2xl object-cover"
                        />
                        <div>
                          <h3 className="text-2xl font-black text-white mb-1">
                            {contest.winner.name}
                          </h3>
                          <p className="text-white/90 text-lg font-semibold">
                            Congratulations on winning ${contest.prizeMoney}!
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
                transition={{ delay: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <FaClock className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Time Left
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
                transition={{ delay: 0.6 }}
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
                    ${contest.prizeMoney}
                  </div>

                  {!isRegistered ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRegister}
                      disabled={isEnded || registerMutation.isPending}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {registerMutation.isPending ? (
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
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaAward />
                          Register & Pay
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4 flex items-center gap-3"
                      >
                        <FaCheckCircle className="text-emerald-400 text-xl" />
                        <span className="text-emerald-100 font-semibold">
                          You're registered for this contest
                        </span>
                      </motion.div>

                      {!hasSubmitted && !isEnded && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowSubmitModal(true)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3"
                        >
                          <FaUpload />
                          Submit Task
                        </motion.button>
                      )}

                      {hasSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 flex items-center gap-3"
                        >
                          <FaCheckCircle className="text-blue-400 text-xl" />
                          <span className="text-blue-100 font-semibold">
                            Task submitted successfully
                          </span>
                        </motion.div>
                      )}
                    </div>
                  )}
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
                  Submit Your Task
                </h3>
              </div>

              <p className="text-slate-300 mb-6 text-lg">
                Please provide the link to your submission (e.g., Google Drive,
                Dropbox, portfolio link, etc.)
              </p>

              <textarea
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-all resize-none text-lg"
                placeholder="Enter submission link..."
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
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3"
                >
                  {submitMutation.isPending ? (
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

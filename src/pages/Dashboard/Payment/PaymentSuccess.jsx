import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaTrophy,
  FaRocket,
  FaArrowRight,
  FaHome,
  FaStar,
  FaFire,
  FaTimes,
} from "react-icons/fa";
import api from "../../../services/api";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      api
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ["user", "participatedContests"],
          });
          queryClient.invalidateQueries({ queryKey: ["contests"] });
          queryClient.invalidateQueries({ queryKey: ["contest"] });
          console.log("✅ Registration recorded and cache invalidated");
          setTimeout(() => setIsProcessing(false), 1500);
        })
        .catch((err) => {
          console.error("Payment success patch failed:", err);
          setError("Failed to complete registration");
          setIsProcessing(false);
        });
    } else {
      setIsProcessing(false);
      setError("No session ID found");
    }
  }, [sessionId, queryClient]);

  // Confetti particles
  const confettiColors = [
    "#10b981",
    "#6366f1",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden flex items-center justify-center p-4 rounded-2xl">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"
        />
      </div>

      {/* Confetti Effect */}
      {!isProcessing && !error && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x:
                  typeof window !== "undefined"
                    ? Math.random() * window.innerWidth
                    : 500,
                y: -20,
                rotate: 0,
              }}
              animate={{
                y:
                  typeof window !== "undefined" ? window.innerHeight + 20 : 800,
                rotate: Math.random() * 720,
                x:
                  (typeof window !== "undefined"
                    ? Math.random() * window.innerWidth
                    : 500) +
                  (Math.random() - 0.5) * 200,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor:
                  confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                  ],
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-8"
              >
                <div className="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Processing Your Payment...
              </h2>
              <p className="text-slate-300 text-lg">
                Please wait while we confirm your registration
              </p>
            </motion.div>
          ) : error ? (
            // Error State
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-block mb-6"
                >
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center py-3">
                    <FaTimes className="text-6xl text-red-400" />
                  </div>
                </motion.div>
                <h1 className="text-4xl font-black text-white mb-4">
                  Something Went Wrong
                </h1>
                <p className="text-xl text-slate-300 mb-8">{error}</p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/all-contests")}
                    className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FaHome />
                    Go Home
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            // Success State
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 rounded-3xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6">
                {/* Success Icon */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="inline-block relative"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl"
                    />
                    <div className="relative w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-7xl text-white" />
                    </div>
                  </motion.div>

                  {/* Floating Icons */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2 hidden md:block">
                    {[
                      { icon: FaStar, delay: 0.3, x: -80, y: -40 },
                      { icon: FaTrophy, delay: 0.4, x: 80, y: -40 },
                      { icon: FaFire, delay: 0.5, x: -100, y: 20 },
                      { icon: FaRocket, delay: 0.6, x: 100, y: 20 },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1.2, 1, 0],
                          x: item.x,
                          y: item.y,
                        }}
                        transition={{
                          duration: 2,
                          delay: item.delay,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        className="absolute"
                      >
                        <item.icon className="text-3xl text-amber-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Payment{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      Successful!
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 mb-2">
                    🎉 You're all set!
                  </p>
                  <p className="text-base md:text-lg text-slate-400">
                    Your registration has been confirmed successfully
                  </p>
                </motion.div>

                {/* Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                >
                  {[
                    {
                      icon: FaCheckCircle,
                      label: "Payment Status",
                      value: "Confirmed",
                      gradient: "from-emerald-500 to-teal-500",
                    },
                    {
                      icon: FaTrophy,
                      label: "Registration",
                      value: "Active",
                      gradient: "from-amber-500 to-orange-500",
                    },
                    {
                      icon: FaRocket,
                      label: "Next Step",
                      value: "Submit Entry",
                      gradient: "from-indigo-500 to-purple-500",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                    >
                      <div
                        className={`inline-block p-3 rounded-full bg-gradient-to-r ${item.gradient} mb-2`}
                      >
                        <item.icon className="text-2xl text-white" />
                      </div>
                      <div className="text-xs text-slate-400 mb-1">
                        {item.label}
                      </div>
                      <div className="text-lg font-bold text-white">
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/dashboard/participated" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
                    >
                      <FaTrophy />
                      View My Contests
                      <FaArrowRight />
                    </motion.button>
                  </Link>

                  <Link to="/all-contests" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <FaRocket />
                      Explore More
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Home Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-center mt-6"
                >
                  <Link
                    to="/"
                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <FaHome />
                    Back to Home
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PaymentSuccess;

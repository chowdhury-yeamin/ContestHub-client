import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTimesCircle,
  FaArrowLeft,
  FaRedo,
  FaHome,
  FaShieldAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-3xl blur-2xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl"
                />
                <div className="relative bg-gradient-to-r from-red-600 to-orange-600 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center">
                  <FaTimesCircle className="text-5xl sm:text-6xl text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Payment Cancelled
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-slate-300 text-center mb-8"
            >
              Your payment was cancelled. Don't worry, no charges were made to
              your account.
            </motion.p>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-full flex-shrink-0">
                  <FaQuestionCircle className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    What happened?
                  </h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        The payment process was interrupted or cancelled
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>No money was deducted from your account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>You can try again anytime</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
            >
              {/* Try Again Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/50 transition-all flex items-center justify-center gap-3"
              >
                <FaRedo />
                Try Again
              </motion.button>

              {/* Go to Contests Button */}
              <Link to="/all-contests">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/5 border border-white/20 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3"
                >
                  <FaHome />
                  Browse Contests
                </motion.button>
              </Link>
            </motion.div>

            {/* Secondary Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm"
            >
              <button
                onClick={() => navigate(-2)}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <FaArrowLeft />
                Back to Contest
              </button>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <Link
                to="/help"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <FaQuestionCircle />
                Need Help?
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
            <FaShieldAlt className="text-emerald-400" />
            <span className="text-slate-300 text-sm">
              All transactions are secure and encrypted
            </span>
          </div>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center text-slate-400 text-sm"
        >
          <p>
            Having trouble? Contact our{" "}
            <Link
              to="/support"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              support team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentCancelled;

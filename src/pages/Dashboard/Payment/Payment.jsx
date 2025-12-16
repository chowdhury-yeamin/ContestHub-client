import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useContest } from "../../../hooks/useContests";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaTrophy,
  FaCreditCard,
  FaShieldAlt,
  FaCheckCircle,
  FaLock,
  FaDollarSign,
  FaArrowLeft,
  FaBolt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Payment = () => {
  const { isLoading, loading } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: contest } = useContest(id);
  const { user } = useAuth();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  if (loading || isLoading || !contest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity },
            }}
          >
            <FaTrophy className="text-6xl text-indigo-500" />
          </motion.div>
          <p className="mt-4 text-slate-400 text-lg">
            Loading payment details...
          </p>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const paymentInfo = {
        contestName: contest.name,
        contestId: contest._id,
        cost: contest.entryFee,
        senderEmail: user.email,
        senderId: user?._id || user?.uid || null,
      };
      const res = await api.post("/create-checkout-session", paymentInfo);
      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to create checkout session");
        console.error("Invalid session response:", res);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(
        err?.response?.data?.error || err?.message || "Payment failed"
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden rounded-2xl">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Contest</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-full">
              <FaCreditCard className="text-5xl text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Secure{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Payment
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Complete your payment to join the contest
          </p>
        </motion.div>

        {/* Contest Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative group mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Contest Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-75" />
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="relative w-40 h-40 rounded-2xl object-cover border-4 border-white/20"
                />
              </div>

              {/* Contest Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-black text-white mb-3">
                  {contest.name}
                </h2>
                <p className="text-slate-300 mb-4 line-clamp-2">
                  {contest.description}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                    <FaTrophy className="text-amber-400" />
                    <span className="text-white font-semibold">
                      ${contest.prizeMoney} Prize
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                    <FaCheckCircle className="text-emerald-400" />
                    <span className="text-white font-semibold">
                      {contest.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-20" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            {/* Payment Summary */}
            <div className="mb-8">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <FaDollarSign className="text-emerald-400" />
                Payment Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-slate-300 text-lg">Entry Fee</span>
                  <span className="text-white font-bold text-2xl">
                    ${contest.entryFee}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="text-slate-300 text-lg font-semibold">
                    Total Amount
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-black text-3xl">
                    ${contest.entryFee}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: FaShieldAlt,
                  title: "Secure Payment",
                  desc: "256-bit SSL encryption",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: FaLock,
                  title: "Protected Data",
                  desc: "Your info is safe",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: FaBolt,
                  title: "Instant Access",
                  desc: "Join immediately",
                  gradient: "from-amber-500 to-orange-500",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-xl blur-lg`}
                  />
                  <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <feature.icon
                      className={`text-3xl mb-2 mx-auto bg-clip-text bg-gradient-to-r ${feature.gradient}`}
                    />
                    <h4 className="text-white font-bold text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 text-xs">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Payment Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-6 rounded-2xl cursor-pointer font-black text-xl shadow-2xl hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <FaBolt className="text-2xl" />
                  </motion.div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <FaCreditCard className="text-2xl" />
                  Pay ${contest.entryFee} Now
                </>
              )}
            </motion.button>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                <FaLock className="text-emerald-400" />
                Your payment is secure and encrypted
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-500/20 p-3 rounded-full">
              <FaCheckCircle className="text-blue-400 text-xl" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-2">
                What happens after payment?
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span>
                  Instant access to contest details and submission form
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span>
                  Email confirmation with contest information
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span>
                  Ability to submit your work anytime before deadline
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;

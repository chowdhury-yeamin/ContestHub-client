import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import api from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useContest } from "../../../hooks/useContests";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import toast from "react-hot-toast";

const Payment = () => {
  const { isLoading, loading } = useAuth();
  const { id } = useParams();
  const { data: contest } = useContest(id);
  const { user } = useAuth();

  if (loading || isLoading || !contest) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaTrophy className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading...</p>
      </div>
    );
  }

  const handlePayment = async () => {
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
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(
        err?.response?.data?.error || err?.message || "Payment failed"
      );
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-gray-300 text-2xl">
        <span className=" font-semibold text-gray-400">
          Pay <span className="text-white">${contest.entryFee}</span> For
        </span>{" "}
        <span className="font-bold">{contest.name}</span>
      </h1>
      <button onClick={handlePayment} className="btn btn-primary mt-1">
        Pay Now!
      </button>
    </div>
  );
};

export default Payment;

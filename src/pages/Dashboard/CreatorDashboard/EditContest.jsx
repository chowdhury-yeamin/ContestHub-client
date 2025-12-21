import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContest, useUpdateContest } from "../../../hooks/useContests";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSave,
  FaTimes,
  FaTrophy,
  FaImage,
  FaFileAlt,
  FaTasks,
  FaDollarSign,
  FaCalendarAlt,
  FaTag,
  FaEdit,
} from "react-icons/fa";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: contest, isLoading } = useContest(id);
  const updateMutation = useUpdateContest();
  const [deadline, setDeadline] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (contest) {
      console.log("Contest data loaded:", contest);
      reset({
        name: contest.name,
        image: contest.image,
        description: contest.description,
        taskInstruction: contest.taskInstruction,
        entryFee: contest.entryFee || 0,
        prizeMoney: contest.prizeMoney,
        type: contest.type || contest.contestType,
      });
      setDeadline(new Date(contest.deadline));
    }
  }, [contest, reset]);

  const contestTypes = [
    "Image Design",
    "Article Writing",
    "Business Ideas",
    "Gaming Reviews",
    "Video Content",
    "Photography",
    "Other",
  ];

  const onSubmit = async (data) => {
    if (!deadline) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select a deadline",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    try {
      console.log("Submitting form data:", data);

      const contestData = {
        name: data.name,
        image: data.image,
        description: data.description,
        taskInstruction: data.taskInstruction,
        type: data.type,
        entryFee: parseFloat(data.entryFee),
        prizeMoney: parseFloat(data.prizeMoney),
        deadline: deadline.toISOString(),
      };

      console.log("Sending contest data:", contestData);

      await updateMutation.mutateAsync({ id, data: contestData });

      Swal.fire({
        icon: "success",
        title: "Contest Updated!",
        text: "Your contest has been updated successfully",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#10b981",
      });

      navigate("/dashboard/my-contests");
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.error ||
          "Failed to update contest. Please try again.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🔍
          </motion.div>
          <h3 className="text-3xl font-black text-white mb-2">
            Contest Not Found
          </h3>
          <p className="text-slate-400 mb-6">
            The contest you're looking for doesn't exist.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard/my-contests")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to My Contests
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <FaEdit className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl font-black text-white">Edit Contest</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Update your contest information
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Contest Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                  <FaTrophy className="text-amber-400" />
                  Contest Name *
                </label>
                <input
                  {...register("name", {
                    required: "Contest name is required",
                  })}
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="Enter contest name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    ⚠️ {errors.name.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Contest Image URL */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                  <FaImage className="text-blue-400" />
                  Contest Image URL *
                </label>
                <input
                  {...register("image", { required: "Image URL is required" })}
                  type="url"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    ⚠️ {errors.image.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                  <FaFileAlt className="text-emerald-400" />
                  Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                  placeholder="Describe your contest"
                />
                {errors.description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    ⚠️ {errors.description.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Task Instructions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                  <FaTasks className="text-purple-400" />
                  Task Instructions *
                </label>
                <textarea
                  {...register("taskInstruction", {
                    required: "Task instructions are required",
                  })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                  placeholder="Provide detailed instructions for participants"
                />
                {errors.taskInstruction && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    ⚠️ {errors.taskInstruction.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Entry Fee and Prize Money */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                    <FaDollarSign className="text-green-400" />
                    Entry Fee ($) *
                  </label>
                  <input
                    {...register("entryFee", {
                      required: "Entry fee is required",
                      min: { value: 0, message: "Entry fee must be positive" },
                    })}
                    type="number"
                    step="0.01"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
                    placeholder="0.00"
                  />
                  {errors.entryFee && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-sm mt-1 flex items-center gap-1"
                    >
                      ⚠️ {errors.entryFee.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                    <FaTrophy className="text-amber-400" />
                    Prize Money ($) *
                  </label>
                  <input
                    {...register("prizeMoney", {
                      required: "Prize money is required",
                      min: {
                        value: 0,
                        message: "Prize money must be positive",
                      },
                    })}
                    type="number"
                    step="0.01"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
                    placeholder="0.00"
                  />
                  {errors.prizeMoney && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-sm mt-1 flex items-center gap-1"
                    >
                      ⚠️ {errors.prizeMoney.message}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Contest Type and Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                    <FaTag className="text-pink-400" />
                    Contest Type *
                  </label>
                  <select
                    {...register("type", {
                      required: "Contest type is required",
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  >
                    {contestTypes.map((type) => (
                      <option key={type} value={type} className="bg-slate-900">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-sm mt-1 flex items-center gap-1"
                    >
                      ⚠️ {errors.type.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                    <FaCalendarAlt className="text-cyan-400" />
                    Deadline *
                  </label>
                  <DatePicker
                    selected={deadline}
                    onChange={(date) => {
                      setDeadline(date);
                      setValue("deadline", date?.toISOString());
                    }}
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 pt-6"
              >
                <motion.button
                  type="button"
                  onClick={() => navigate("/dashboard/my-contests")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white/5 border border-white/10 hover:border-white/30 text-white py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaTimes />
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={updateMutation.isPending}
                  whileHover={{ scale: updateMutation.isPending ? 1 : 1.02 }}
                  whileTap={{ scale: updateMutation.isPending ? 1 : 0.98 }}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateMutation.isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <FaSave />
                      </motion.div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Update Contest
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <p className="text-blue-300 text-sm flex items-start gap-2">
            <span className="text-lg">ℹ️</span>
            <span>
              Only pending contests can be edited. Confirmed or rejected
              contests cannot be modified. Contact support if you need to make
              changes to a confirmed contest.
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EditContest;

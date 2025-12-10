import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaImage,
  FaDollarSign,
  FaCalendarAlt,
  FaTrophy,
  FaCheckCircle,
  FaExclamationCircle,
  FaRocket,
  FaFileAlt,
} from "react-icons/fa";
import { useCreateContest } from "../../../hooks/useContests";

const AddContest = () => {
  const navigate = useNavigate();
  const createMutation = useCreateContest();
  const [deadline, setDeadline] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const contestTypes = [
    { value: "Image Design", icon: "🎨" },
    { value: "Article Writing", icon: "✍️" },
    { value: "Business Ideas", icon: "💡" },
    { value: "Gaming Reviews", icon: "🎮" },
    { value: "Video Content", icon: "🎥" },
    { value: "Coding Challenges", icon: "💻" },
    { value: "Photography", icon: "📸" },
    { value: "Other", icon: "⭐" },
  ];

  const watchedValues = watch();
  const progress =
    (Object.keys(watchedValues).filter(
      (key) => watchedValues[key] && watchedValues[key] !== ""
    ).length /
      8) *
    100;

  const onSubmit = async (data) => {
    if (!deadline) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select a deadline",
        confirmButtonColor: "#6366F1",
      });
      return;
    }

    if (new Date(deadline) <= new Date()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Deadline must be in the future",
        confirmButtonColor: "#6366F1",
      });
      return;
    }

    try {
      const contestData = {
        name: data.name,
        description: data.description,
        image: data.image,
        type: data.contestType,
        entryFee: parseFloat(data.price),
        prizeMoney: parseFloat(data.prizeMoney),
        deadline: deadline.toISOString(),
        taskInstruction: data.taskInstruction,
      };

      await createMutation.mutateAsync(contestData);

      Swal.fire({
        icon: "success",
        title: "Contest Created!",
        text: "Your contest has been submitted for approval",
        confirmButtonColor: "#6366F1",
      });

      navigate("/dashboard/my-contests");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Creation Failed",
        text: "Failed to create contest. Please try again.",
        confirmButtonColor: "#6366F1",
      });
    }
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full">
              <FaRocket className="text-4xl text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
            Create New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Contest
            </span>
          </h1>
          <p className="text-slate-300 text-lg">
            Fill in the details to launch your contest
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">
                Completion Progress
              </span>
              <span className="text-sm font-bold text-white">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
              />
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-20" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="space-y-6">
              {/* Contest Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Contest Name *
                </label>
                <div className="relative">
                  <FaTrophy className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("name", {
                      required: "Contest name is required",
                    })}
                    type="text"
                    placeholder="e.g., Creative Logo Design Challenge"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <FaExclamationCircle />
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Image URL */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Contest Image URL *
                </label>
                <div className="relative">
                  <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("image", {
                      required: "Image URL is required",
                    })}
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
                <AnimatePresence>
                  {errors.image && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <FaExclamationCircle />
                      {errors.image.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  placeholder="Describe your contest, what you're looking for, and why participants should join..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                />
                <AnimatePresence>
                  {errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <FaExclamationCircle />
                      {errors.description.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Task Instructions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Task Instructions *
                </label>
                <textarea
                  {...register("taskInstruction", {
                    required: "Task instructions are required",
                  })}
                  rows={4}
                  placeholder="Provide clear, step-by-step instructions for participants..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                />
                <AnimatePresence>
                  {errors.taskInstruction && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <FaExclamationCircle />
                      {errors.taskInstruction.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contest Type */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Contest Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {contestTypes.map((type) => (
                    <motion.label
                      key={type.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative cursor-pointer"
                    >
                      <input
                        {...register("contestType", {
                          required: "Contest type is required",
                        })}
                        type="radio"
                        value={type.value}
                        className="peer sr-only"
                      />
                      <div className="bg-white/5 border border-white/10 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/20 rounded-xl p-4 text-center transition-all">
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="text-xs font-medium text-slate-300">
                          {type.value}
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>
                <AnimatePresence>
                  {errors.contestType && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <FaExclamationCircle />
                      {errors.contestType.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Pricing Grid */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Entry Fee */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Entry Fee ($) *
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      {...register("price", {
                        required: "Entry fee is required",
                        min: { value: 0, message: "Must be positive" },
                      })}
                      type="number"
                      step="0.01"
                      placeholder="5.00"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.price && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      >
                        <FaExclamationCircle />
                        {errors.price.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Prize Money */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Prize Money ($) *
                  </label>
                  <div className="relative">
                    <FaTrophy className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      {...register("prizeMoney", {
                        required: "Prize money is required",
                        min: { value: 0, message: "Must be positive" },
                      })}
                      type="number"
                      step="0.01"
                      placeholder="500.00"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.prizeMoney && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      >
                        <FaExclamationCircle />
                        {errors.prizeMoney.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Deadline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Deadline *
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                  <DatePicker
                    selected={deadline}
                    onChange={(date) => {
                      setDeadline(date);
                      setValue("deadline", date?.toISOString());
                    }}
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select contest deadline"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex gap-4 pt-4"
              >
                <motion.button
                  type="button"
                  onClick={() => navigate("/dashboard/my-contests")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSubmit(onSubmit)}
                  disabled={createMutation.isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {createMutation.isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        ⚡
                      </motion.div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaRocket />
                      Create Contest
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddContest;

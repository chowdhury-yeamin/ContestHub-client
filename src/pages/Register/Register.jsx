import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaRocket,
  FaTrophy,
  FaStar,
  FaUsers,
  FaCrown,
} from "react-icons/fa";

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await registerUser(
      data.name,
      data.email,
      data.password,
      "", // photoURL
      "user" // default role
    );
    setLoading(false);
    if (result.success) {
      navigate("/");
    }
  };

  const benefits = [
    {
      icon: FaTrophy,
      text: "Win Amazing Prizes",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: FaStar,
      text: "Join Exclusive Contests",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaUsers,
      text: "Connect with Creators",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaCrown,
      text: "Build Your Portfolio",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [loading, user, navigate]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8">
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
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 mb-6"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🚀
              </motion.span>
              <span className="text-sm text-slate-300 font-medium">
                Start Your Creative Journey
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Join the Best
              </span>
              <br />
              <span className="text-white">Community</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Create your free account and unlock access to hundreds of creative
              contests with amazing prizes.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-12">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <benefit.icon className="text-white text-xl" />
                  </div>
                  <span className="text-lg text-white font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-30" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src="https://ui-avatars.com/api/?name=Alice+Johnson&background=6366F1&color=fff"
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <div className="text-white font-bold">Alice Johnson</div>
                    <div className="text-sm text-slate-400">Contest Winner</div>
                  </div>
                </div>
                <p className="text-slate-300 italic">
                  "ContestHub helped me showcase my talent and win my first $500
                  prize! The platform is amazing."
                </p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30" />

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10">
              {/* Mobile Title */}
              <div className="md:hidden text-center mb-8">
                <h2 className="text-3xl font-black text-white mb-2">
                  Join ContestHub
                </h2>
                <p className="text-slate-400">Create your free account</p>
              </div>

              <div className="hidden md:block mb-8">
                <h2 className="text-3xl font-black text-white mb-2">
                  Create Account
                </h2>
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semibold hover:from-indigo-300 hover:to-purple-300 transition-all"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-slate-400" />
                    </div>
                    <input
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                      ⚠️ {errors.name.message}
                    </motion.p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-slate-400" />
                    </div>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                      ⚠️ {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-slate-400" />
                    </div>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type="password"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                      ⚠️ {errors.password.message}
                    </motion.p>
                  )}
                </div>

                {/* Sign Up Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <FaRocket />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Mobile Sign In Link */}
              <div className="md:hidden mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semibold hover:from-indigo-300 hover:to-purple-300 transition-all"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Terms Notice */}
              <p className="mt-6 text-center text-xs text-slate-500">
                By creating an account, you agree to our{" "}
                <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;

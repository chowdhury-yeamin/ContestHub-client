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
  FaImage,
} from "react-icons/fa";

const Register = () => {
  const { register: registerUser, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

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
      data.photoURL || "",
      "user"
    );
    setLoading(false);
    if (result.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [loading, user, navigate]);

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

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background animations */}
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

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <h1 className="text-5xl lg:text-6xl font-black mb-6 text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Join the Best
              </span>
              <br />
              <span>Community</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Create your free account and unlock access to hundreds of creative
              contests with amazing prizes.
            </p>

            <div className="space-y-4 mb-12">
              {benefits.map((b, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${b.color} flex items-center justify-center`}
                  >
                    <b.icon className="text-white text-xl" />
                  </div>
                  <span className="text-lg text-white font-semibold">
                    {b.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30" />

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-black text-white mb-2">
                Create Account
              </h2>
              <p className="text-slate-400 mb-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semibold"
                >
                  Sign in
                </Link>
              </p>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
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
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">
                      ⚠️ {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
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
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      ⚠️ {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
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
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      ⚠️ {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Photo URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaImage className="text-slate-400" />
                    </div>
                    <input
                      {...register("photoURL", {
                        pattern: {
                          value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                          message: "Invalid image URL",
                        },
                      })}
                      type="url"
                      placeholder="Enter your photo URL"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  {errors.photoURL && (
                    <p className="mt-2 text-sm text-red-400">
                      ⚠️ {errors.photoURL.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create Account <FaRocket />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-xs text-slate-500">
                By creating an account, you agree to our{" "}
                <Link to="/terms">
                  <span className="text-slate-400 hover:text-white cursor-pointer">
                    Terms of Service
                  </span>
                </Link>{" "}
                and{" "}
                <Link to="/privacy">
                  <span className="text-slate-400 hover:text-white cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;

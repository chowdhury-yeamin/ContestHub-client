import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";

const NotFound = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const quickLinks = [
    {
      icon: FaHome,
      text: "Home",
      path: "/",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: FaSearch,
      text: "Browse Contests",
      path: "/all-contests",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaCompass,
      text: "Dashboard",
      path: "/dashboard",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden flex items-center justify-center px-4">
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

      <div className="max-w-4xl w-full relative z-10">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 mb-8"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🤔
            </motion.span>
            <span className="text-sm text-slate-300 font-medium">
              Oops! Lost in space?
            </span>
          </motion.div>

          {/* 404 Number with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl"
            />
            <h1 className="relative text-9xl sm:text-[12rem] md:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              404
            </h1>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4"
          >
            Page Not Found
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved.
            <br className="hidden sm:block" />
            Let's get you back on track!
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition-all inline-flex items-center gap-3"
              >
                <FaHome className="text-xl" />
                <span>Back to Home</span>
                <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-slate-400 font-semibold mb-6">
              Or explore these pages:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {quickLinks.map((link, idx) => (
                <Link key={idx} to={link.path}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${link.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity`}
                    />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 transition-all">
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${link.color} flex items-center justify-center`}
                      >
                        <link.icon className="text-white text-xl" />
                      </div>
                      <h3 className="text-white font-bold text-lg">
                        {link.text}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          🎨
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 right-10 text-6xl opacity-20"
        >
          🚀
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-20 left-1/4 text-6xl opacity-20"
        >
          🏆
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 5.5, repeat: Infinity }}
          className="absolute bottom-40 right-1/4 text-6xl opacity-20"
        >
          ✨
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

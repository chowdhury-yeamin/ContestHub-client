import { motion } from "framer-motion";
import {
  FaUsers,
  FaTrophy,
  FaLightbulb,
  FaRocket,
  FaStar,
  FaChartLine,
  FaShieldAlt,
  FaHeart,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const About = () => {
  const features = [
    {
      icon: FaUsers,
      title: "Community Driven",
      description:
        "Join thousands of creative individuals competing in exciting contests worldwide",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/20",
    },
    {
      icon: FaTrophy,
      title: "Win Prizes",
      description:
        "Compete for cash prizes and recognition in various creative categories",
      gradient: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-500/20",
    },
    {
      icon: FaLightbulb,
      title: "Showcase Talent",
      description:
        "Display your skills and get noticed by potential employers and clients",
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/20",
    },
    {
      icon: FaRocket,
      title: "Grow Your Career",
      description:
        "Build your portfolio and advance your creative career through contests",
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-500/20",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: FaUsers },
    { value: "$500K+", label: "Prizes Awarded", icon: FaTrophy },
    { value: "1.2K+", label: "Contests Held", icon: FaStar },
    { value: "98%", label: "Success Rate", icon: FaChartLine },
  ];

  const values = [
    {
      icon: FaShieldAlt,
      title: "Trust & Safety",
      description:
        "We ensure fair play and secure transactions for all participants",
    },
    {
      icon: FaHeart,
      title: "Community First",
      description: "Building a supportive environment where creativity thrives",
    },
    {
      icon: FaChartLine,
      title: "Growth Focused",
      description:
        "Helping you develop skills and advance your creative career",
    },
  ];

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
              <FaTrophy className="text-5xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              ContestHub
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
            ContestHub is a premier platform connecting creative talents with
            exciting contest opportunities. Whether you're a designer, writer,
            entrepreneur, or gamer, we provide a space to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-bold">
              showcase your skills
            </span>{" "}
            and win amazing prizes.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
                  <stat.icon className="text-3xl text-indigo-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to succeed in creative competitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-8 transition-all">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${feature.iconBg} mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30" />
          <div className="relative bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16">
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <FaRocket className="text-6xl text-white" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                To empower creative individuals worldwide by providing a
                platform where talent meets opportunity, fostering innovation,
                and rewarding excellence through engaging competitions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-8 text-center transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-400">
              Start competing in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 -translate-y-1/2 opacity-30" />

            {[
              {
                step: "01",
                title: "Sign Up",
                desc: "Create your free account and complete your profile",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Browse & Join",
                desc: "Explore contests and register for the ones you like",
                icon: "🔍",
              },
              {
                step: "03",
                title: "Compete & Win",
                desc: "Submit your work and compete for amazing prizes",
                icon: "🏆",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-0 hover:opacity-40 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-2xl p-8 text-center transition-all">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50" />
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
                Join our community today and start participating in amazing
                contests!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  ""
                ) : (
                  <motion.a
                    href="/register"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3 justify-center"
                  >
                    <FaRocket />
                    Sign Up Now
                    <FaArrowRight />
                  </motion.a>
                )}
                <motion.a
                  href="/all-contests"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-xl border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center gap-3 justify-center"
                >
                  <FaTrophy />
                  Browse Contests
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

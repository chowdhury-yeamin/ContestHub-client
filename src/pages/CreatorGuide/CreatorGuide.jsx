import { motion } from "framer-motion";
import { FaRocket, FaUserCircle, FaPlusCircle, FaCog, FaTrophy, FaLightbulb, FaHeadset, FaCheckCircle, FaArrowRight, FaChartLine, FaUsers, FaDollarSign, FaClock, FaImage, FaEdit, FaStar } from "react-icons/fa";

const CreatorGuide = () => {
  const steps = [
    {
      icon: FaUserCircle,
      title: "1. Account Setup",
      content: "To create contests, you need a Creator account. Sign up or upgrade your existing account to a Creator role via the dashboard. Ensure your profile picture, display name, and bio are complete to build credibility.",
      gradient: "from-blue-500 to-cyan-500",
      details: ["Complete profile info", "Upload profile picture", "Write compelling bio", "Verify email address"]
    },
    {
      icon: FaPlusCircle,
      title: "2. Adding a Contest",
      content: "Navigate to the Creator Dashboard → Add Contest. Fill in all required contest details to attract participants.",
      gradient: "from-purple-500 to-pink-500",
      details: ["Contest Name & Description", "Contest Type (Design, Writing, etc.)", "Entry Fee & Prize Money", "Submission Guidelines & Tasks", "Deadline (use calendar)", "Upload contest banner"]
    },
    {
      icon: FaCog,
      title: "3. Managing Contests",
      content: "Go to My Contests page in your dashboard. Here you can track and manage all aspects of your contests.",
      gradient: "from-amber-500 to-orange-500",
      details: ["Edit pending contests", "View submissions", "Track participants", "Monitor prize status"]
    },
    {
      icon: FaTrophy,
      title: "4. Declaring Winners",
      content: "After the contest deadline, review all submissions. Select a winner and declare it via the Submissions page. The winner will be showcased publicly.",
      gradient: "from-emerald-500 to-teal-500",
      details: ["Review submissions", "Select winner", "Declare publicly", "Award prize money"]
    },
    {
      icon: FaLightbulb,
      title: "5. Best Practices",
      content: "Follow these guidelines to create successful contests that attract quality participants.",
      gradient: "from-indigo-500 to-purple-500",
      details: ["Clear descriptions", "Realistic deadlines", "Easy guidelines", "Polite communication", "Social promotion"]
    },
    {
      icon: FaHeadset,
      title: "6. Support",
      content: "If you encounter any issues or have questions, contact our support team at ",
      email: "support@contesthub.com",
      gradient: "from-pink-500 to-rose-500",
      details: []
    },
  ];

  const features = [
    { icon: FaChartLine, label: "Analytics", desc: "Track performance" },
    { icon: FaUsers, label: "Audience", desc: "Build community" },
    { icon: FaDollarSign, label: "Revenue", desc: "Monetize talent" },
    { icon: FaClock, label: "Flexible", desc: "Set your schedule" },
  ];

  const quickTips = [
    { icon: "🎯", tip: "Define clear contest objectives" },
    { icon: "💰", tip: "Set competitive prize amounts" },
    { icon: "📅", tip: "Give adequate submission time" },
    { icon: "📸", tip: "Use eye-catching banners" },
    { icon: "📢", tip: "Promote on social media" },
    { icon: "💬", tip: "Engage with participants" },
  ];

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75"
              />
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
                <FaRocket className="text-5xl text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Guide</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Step-by-step guide to creating and managing successful contests
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3 flex items-center gap-3"
              >
                <feature.icon className="text-indigo-400 text-xl" />
                <div className="text-left">
                  <div className="text-white font-bold text-sm">{feature.label}</div>
                  <div className="text-slate-400 text-xs">{feature.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Tips Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Quick Success Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-xl p-4 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{tip.icon}</div>
                    <p className="text-slate-300 font-medium text-sm">{tip.tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step-by-Step Guide */}
        <div className="space-y-8 mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute left-7 top-24 w-0.5 h-full bg-gradient-to-b from-white/20 to-transparent" />
              )}

              <motion.div
                whileHover={{ scale: 1.01, x: 10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 sm:p-8 transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${step.gradient} flex items-center justify-center group-hover:scale-110 transition-transform relative z-10`}>
                        <step.icon className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        {step.title}
                      </h2>
                      <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-4">
                        {step.content}
                        {step.email && (
                          <a
                            href={`mailto:${step.email}`}
                            className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
                          >
                            {step.email}
                          </a>
                        )}
                      </p>

                      {/* Details List */}
                      {step.details.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                          {step.details.map((detail, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-2 text-slate-400 text-sm"
                            >
                              <FaCheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            What Makes a Great Contest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FaStar, title: "Clear Theme", desc: "Well-defined objectives and requirements", color: "from-amber-500 to-orange-500" },
              { icon: FaDollarSign, title: "Fair Prizes", desc: "Competitive rewards for participants", color: "from-emerald-500 to-teal-500" },
              { icon: FaImage, title: "Visual Appeal", desc: "Attractive banners and descriptions", color: "from-purple-500 to-pink-500" },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity`} />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 text-center transition-all">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${metric.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <metric.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{metric.title}</h3>
                  <p className="text-slate-400 text-sm">{metric.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pro Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-20" />
          <div className="relative bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl"
              >
                <FaLightbulb className="text-white text-2xl" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Creator Tip</h3>
                <p className="text-slate-300 leading-relaxed">
                  The most successful contests have clear objectives, fair judging criteria, and active creator engagement. 
                  Respond to participant questions promptly, promote your contest on social media, and showcase previous 
                  winners to build credibility. Remember: quality over quantity always wins!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50" />
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-center text-white">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <FaRocket className="text-5xl sm:text-6xl" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                Ready to Create Your First Contest?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-white/90">
                Join thousands of creators building engaged communities through exciting contests!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/dashboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3 justify-center"
                >
                  <FaPlusCircle />
                  Create Contest
                  <FaArrowRight />
                </motion.a>
                <motion.a
                  href="/help"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-xl border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all inline-flex items-center gap-3 justify-center"
                >
                  <FaHeadset />
                  Get Help
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">More Resources</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Contest Rules", href: "/rules" },
              { label: "Help Center", href: "/help" },
              { label: "Community Forum", href: "/community" },
              { label: "Contact Support", href: "/contact" },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 text-slate-300 hover:text-white px-6 py-2 rounded-xl transition-all"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorGuide;
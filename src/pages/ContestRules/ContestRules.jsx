import { motion } from "framer-motion";
import { FaBook, FaUserCheck, FaClipboardCheck, FaClock, FaTrophy, FaCopyright, FaCreditCard, FaHandshake, FaSync, FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaMedal } from "react-icons/fa";

const ContestRules = () => {
  const sections = [
    {
      icon: FaUserCheck,
      title: "1. Eligibility",
      content: "All participants must be registered users of ContestHub and meet the minimum age requirement for the contest. Each participant may submit only the allowed number of entries per contest.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaClipboardCheck,
      title: "2. Entry Guidelines",
      content: "Submissions must follow the contest theme and instructions provided. Plagiarized content, offensive material, or incomplete entries will be disqualified.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FaClock,
      title: "3. Submission Deadlines",
      content: "All entries must be submitted before the contest deadline. Late submissions will not be accepted under any circumstances.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: FaTrophy,
      title: "4. Judging Criteria",
      content: "Contests are judged based on creativity, originality, adherence to guidelines, and overall quality. Judges' decisions are final and binding.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: FaMedal,
      title: "5. Winner Announcement",
      content: "Winners will be announced on the ContestHub platform as per the contest timeline. Winners will be contacted via email, and prizes must be claimed within the stipulated period.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: FaCopyright,
      title: "6. Intellectual Property",
      content: "Participants retain ownership of their submissions but grant ContestHub a non-exclusive license to display, promote, and use the submissions for contest-related purposes.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: FaCreditCard,
      title: "7. Payment & Entry Fees",
      content: "Some contests may require an entry fee. Payments must be completed through the ContestHub platform. Failure to pay may result in disqualification.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: FaHandshake,
      title: "8. Code of Conduct",
      content: "Participants must act respectfully towards creators, other participants, and judges. Harassment, spamming, or any unethical behavior may result in immediate disqualification.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: FaSync,
      title: "9. Changes to Rules",
      content: "ContestHub reserves the right to update or modify contest rules at any time. Updates will be communicated on the contest page.",
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      icon: FaEnvelope,
      title: "10. Contact",
      content: "For questions regarding contest rules, please reach out to us at ",
      email: "support@contesthub.com",
      gradient: "from-violet-500 to-purple-500"
    },
  ];

  const highlights = [
    { icon: FaCheckCircle, text: "Fair Judging", color: "text-emerald-400" },
    { icon: FaCheckCircle, text: "Clear Guidelines", color: "text-blue-400" },
    { icon: FaCheckCircle, text: "Transparent Process", color: "text-purple-400" },
  ];

  const quickTips = [
    { icon: "✅", title: "Do", items: ["Follow contest theme", "Submit before deadline", "Read all guidelines", "Be original & creative"] },
    { icon: "❌", title: "Don't", items: ["Plagiarize content", "Miss deadlines", "Ignore instructions", "Use offensive material"] },
  ];

  const judgingCriteria = [
    { label: "Creativity", score: "30%", icon: "🎨", color: "from-pink-500 to-rose-500" },
    { label: "Originality", score: "30%", icon: "💡", color: "from-amber-500 to-orange-500" },
    { label: "Quality", score: "25%", icon: "⭐", color: "from-indigo-500 to-purple-500" },
    { label: "Guidelines", score: "15%", icon: "📋", color: "from-emerald-500 to-teal-500" },
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
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75"
              />
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
                <FaBook className="text-5xl text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            Contest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Rules</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Guidelines to ensure fair and fun participation in every contest
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3"
              >
                <item.icon className={`${item.color} text-xl`} />
                <span className="text-slate-300 font-bold">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2"
          >
            <FaSync className="text-slate-400" />
            <span className="text-slate-400 text-sm">Last updated: December 2024</span>
          </motion.div>
        </motion.div>

        {/* Judging Criteria Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            How We Judge
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {judgingCriteria.map((criteria, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${criteria.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity`} />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 text-center transition-all">
                  <div className="text-4xl mb-3">{criteria.icon}</div>
                  <h3 className="font-bold text-white text-lg mb-2">{criteria.label}</h3>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    {criteria.score}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Quick Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${idx === 0 ? 'from-emerald-600 to-teal-600' : 'from-red-600 to-orange-600'} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity`} />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{tip.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{tip.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {tip.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rules Sections */}
        <div className="space-y-6 mb-16">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 sm:p-8 transition-all">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${section.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <section.icon className="text-white text-xl sm:text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                      {section.content}
                      {section.email && (
                        <a
                          href={`mailto:${section.email}`}
                          className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
                        >
                          {section.email}
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur-xl opacity-30" />
          <div className="relative bg-gradient-to-r from-amber-600/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl"
              >
                <FaExclamationTriangle className="text-white text-2xl" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Important Reminder</h3>
                <p className="text-slate-300 leading-relaxed">
                  By participating in any contest on ContestHub, you acknowledge that you have read, understood, and agree to abide by these rules. 
                  Violation of any rules may result in disqualification without refund. Contest creators reserve the right to make final decisions 
                  on all contest-related matters. Play fair, be creative, and have fun!
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
                <FaTrophy className="text-5xl sm:text-6xl" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                Ready to Compete?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-white/90">
                Now that you know the rules, start participating in exciting contests and win amazing prizes!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/all-contests"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3 justify-center"
                >
                  <FaTrophy />
                  Browse Contests
                </motion.a>
                <motion.a
                  href="/help"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-xl border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all inline-flex items-center gap-3 justify-center"
                >
                  <FaBook />
                  Help Center
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
          <p className="text-slate-400 mb-4">Related Documents</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Help Center", href: "/help" },
              { label: "Contact Us", href: "/contact" },
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

export default ContestRules;
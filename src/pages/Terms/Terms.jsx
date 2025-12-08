import { motion } from "framer-motion";
import { use } from "react";
import {
  FaFileContract,
  FaShieldAlt,
  FaUserCheck,
  FaTrophy,
  FaCreditCard,
  FaCopyright,
  FaExclamationTriangle,
  FaGavel,
  FaSync,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const Terms = () => {
  const sections = [
    {
      icon: FaFileContract,
      title: "1. Introduction",
      content:
        "Welcome to ContestHub! By accessing or using our platform, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our services.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaUserCheck,
      title: "2. Eligibility",
      content:
        "Users must be at least 13 years old to register and participate in contests. By creating an account, you represent and warrant that you meet this age requirement.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaShieldAlt,
      title: "3. Account Responsibilities",
      content:
        "Users are responsible for maintaining the confidentiality of their account credentials. Any activity conducted through your account is your responsibility.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: FaTrophy,
      title: "4. Contest Participation",
      content:
        "All contests have specific rules and deadlines. Participants must comply with contest requirements, and any submission that violates rules may be disqualified.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: FaCreditCard,
      title: "5. Payments",
      content:
        "Contest entry fees and prizes are handled through our integrated payment system. Refunds are only available under certain conditions as specified in each contest.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: FaCopyright,
      title: "6. Intellectual Property",
      content:
        "Users retain ownership of their submissions but grant ContestHub a license to display, share, and promote submissions within the platform.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: FaExclamationTriangle,
      title: "7. Prohibited Activities",
      content:
        "Users must not engage in fraud, harassment, spamming, or any illegal activities. Violation may result in account suspension or termination.",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: FaGavel,
      title: "8. Limitation of Liability",
      content:
        "ContestHub is not liable for any damages or losses resulting from the use of the platform, participation in contests, or inability to access the service.",
      gradient: "from-slate-500 to-gray-500",
    },
    {
      icon: FaSync,
      title: "9. Changes to Terms",
      content:
        "We may update these terms from time to time. Users will be notified of significant changes, and continued use constitutes acceptance of the updated terms.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: FaEnvelope,
      title: "10. Contact",
      content: "For any questions regarding these terms, please contact us at ",
      email: "support@contesthub.com",
      gradient: "from-teal-500 to-emerald-500",
    },
  ];

  const highlights = [
    {
      icon: FaCheckCircle,
      text: "User-friendly terms",
      color: "text-emerald-400",
    },
    { icon: FaCheckCircle, text: "Fair & transparent", color: "text-blue-400" },
    { icon: FaCheckCircle, text: "Regular updates", color: "text-purple-400" },
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
              <FaFileContract className="text-5xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            Terms &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Conditions
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Please read these terms carefully before using our platform
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2"
              >
                <item.icon className={`${item.color} text-xl`} />
                <span className="text-slate-300 font-medium">{item.text}</span>
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
            <span className="text-slate-400 text-sm">
              Last updated: December 2024
            </span>
          </motion.div>
        </motion.div>

        {/* Terms Sections */}
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
              <div
                className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
              />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 sm:p-8 transition-all">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div
                    className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${section.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
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
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl"
              >
                <FaExclamationTriangle className="text-white text-2xl" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Important Notice
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  By using ContestHub, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and
                  Conditions. These terms constitute a legally binding agreement
                  between you and ContestHub. If you have any questions or
                  concerns, please contact our support team before using the
                  platform.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Acceptance CTA */}
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
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <FaCheckCircle className="text-5xl sm:text-6xl" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-white/90">
                By creating an account, you agree to these terms and conditions
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  ""
                ) : (
                  <motion.a
                    href="/register"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-indigo-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3 justify-center"
                  >
                    <FaCheckCircle />I Agree - Sign Up
                  </motion.a>
                )}
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-xl border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all inline-flex items-center gap-3 justify-center"
                >
                  <FaEnvelope />
                  Have Questions?
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
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Cookie Policy", href: "/cookies" },
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

export default Terms;

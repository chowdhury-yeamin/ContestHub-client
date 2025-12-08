import { motion } from "framer-motion";
import { FaShieldAlt, FaDatabase, FaLock, FaCookie, FaUserShield, FaShareAlt, FaLink, FaChild, FaSync, FaEnvelope, FaCheckCircle, FaEye, FaFingerprint } from "react-icons/fa";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: FaDatabase,
      title: "1. Information We Collect",
      content: "We collect information you provide directly when creating an account, participating in contests, or contacting us. This may include your name, email, profile photo, contest submissions, and payment information.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaEye,
      title: "2. How We Use Your Information",
      content: "Your information is used to provide and improve our services, process payments, manage contests, communicate updates, and personalize your experience on ContestHub.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FaShareAlt,
      title: "3. Sharing Your Information",
      content: "We do not sell your personal information. We may share information with service providers for payment processing, hosting, analytics, or legal requirements.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: FaCookie,
      title: "4. Cookies and Tracking",
      content: "We use cookies and similar technologies to enhance your experience, understand site usage, and show relevant content. You can control cookies through your browser settings.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: FaLock,
      title: "5. Security",
      content: "We implement reasonable security measures to protect your data. However, no online platform is completely secure. We cannot guarantee absolute protection against unauthorized access.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: FaUserShield,
      title: "6. Your Rights",
      content: "You may access, update, or delete your account information by contacting us. You may also opt out of marketing communications at any time.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: FaLink,
      title: "7. Third-Party Services",
      content: "Our platform may include links to third-party services or advertisements. We are not responsible for the privacy practices of these services. Please review their policies separately.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: FaChild,
      title: "8. Children's Privacy",
      content: "ContestHub is not intended for children under 13. We do not knowingly collect information from children. If we learn that we have, we will take steps to delete it.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: FaSync,
      title: "9. Changes to Privacy Policy",
      content: "We may update this Privacy Policy from time to time. Updates will be posted on this page, and your continued use of the platform constitutes acceptance of the revised policy.",
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      icon: FaEnvelope,
      title: "10. Contact Us",
      content: "For any questions regarding this Privacy Policy, please contact us at ",
      email: "support@contesthub.com",
      gradient: "from-violet-500 to-purple-500"
    },
  ];

  const highlights = [
    { icon: FaShieldAlt, text: "GDPR Compliant", color: "text-emerald-400" },
    { icon: FaFingerprint, text: "Data Protection", color: "text-blue-400" },
    { icon: FaCheckCircle, text: "Transparent", color: "text-purple-400" },
  ];

  const dataTypes = [
    { label: "Personal Info", items: ["Name", "Email", "Phone"], icon: "👤" },
    { label: "Account Data", items: ["Username", "Password", "Preferences"], icon: "🔐" },
    { label: "Contest Data", items: ["Submissions", "Results", "Prizes"], icon: "🏆" },
    { label: "Payment Info", items: ["Billing", "Transactions", "History"], icon: "💳" },
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
                <FaShieldAlt className="text-5xl text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Policy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Learn how we collect, use, and protect your personal information
          </p>

          {/* Compliance Badges */}
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
            <span className="text-slate-400 text-sm">Effective Date: December 2024</span>
          </motion.div>
        </motion.div>

        {/* Data Types We Collect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Data We Collect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 text-center transition-all">
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="font-bold text-white mb-3">{type.label}</h3>
                  <div className="space-y-1">
                    {type.items.map((item, i) => (
                      <div key={i} className="text-sm text-slate-400 flex items-center justify-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-indigo-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Sections */}
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

        {/* Your Privacy Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Your Privacy Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "👁️", title: "Access", desc: "View your personal data" },
              { icon: "✏️", title: "Rectification", desc: "Correct inaccurate data" },
              { icon: "🗑️", title: "Erasure", desc: "Request data deletion" },
              { icon: "📦", title: "Portability", desc: "Export your data" },
              { icon: "🚫", title: "Object", desc: "Opt-out of processing" },
              { icon: "⚙️", title: "Restriction", desc: "Limit data usage" },
            ].map((right, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-xl p-4 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{right.icon}</div>
                    <div>
                      <h3 className="font-bold text-white">{right.title}</h3>
                      <p className="text-sm text-slate-400">{right.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-xl opacity-30" />
          <div className="relative bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl"
              >
                <FaLock className="text-white text-2xl" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Commitment to Security</h3>
                <p className="text-slate-300 leading-relaxed">
                  We use industry-standard encryption (SSL/TLS) to protect your data in transit and at rest. 
                  Our systems are regularly audited, and we maintain strict access controls to ensure your 
                  information remains secure. While we strive for maximum security, we encourage you to use 
                  strong passwords and enable two-factor authentication.
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
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <FaShieldAlt className="text-5xl sm:text-6xl" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-white/90">
                We're transparent about our data practices. Contact us anytime for clarification.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3 justify-center"
                >
                  <FaEnvelope />
                  Contact Privacy Team
                </motion.a>
                <motion.a
                  href="/help"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-xl border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all inline-flex items-center gap-3 justify-center"
                >
                  <FaShieldAlt />
                  Privacy FAQs
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
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Data Processing", href: "/data-processing" },
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

export default PrivacyPolicy;
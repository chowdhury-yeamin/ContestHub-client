import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaHeadset,
  FaSearch,
  FaBook,
  FaCreditCard,
  FaCog,
  FaUserCircle,
  FaQuestionCircle,
  FaLightbulb,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

const faqsData = [
  {
    category: "Account",
    icon: FaUserCircle,
    gradient: "from-blue-500 to-cyan-500",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Click on the Sign Up button at the top-right corner and fill in the required details. You'll receive a verification email to activate your account.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Go to the login page, click on 'Forgot Password', and follow the instructions. We'll send you a secure link to reset your password.",
      },
      {
        question: "Can I change my username?",
        answer:
          "Yes, you can change your username in your profile settings. Go to Dashboard > Settings > Profile to update your information.",
      },
    ],
  },
  {
    category: "Contests",
    icon: FaBook,
    gradient: "from-purple-500 to-pink-500",
    questions: [
      {
        question: "How do I participate in a contest?",
        answer:
          "Register and pay the entry fee for the contest, then submit your task before the deadline. Make sure to read the contest rules carefully before participating.",
      },
      {
        question: "How is the winner selected?",
        answer:
          "The contest creator evaluates submissions and declares the winner after the deadline. Winners are notified via email and announced on the platform.",
      },
      {
        question: "Can I participate in multiple contests?",
        answer:
          "Absolutely! You can participate in as many contests as you like. Each contest has its own entry fee and requirements.",
      },
    ],
  },
  {
    category: "Payments",
    icon: FaCreditCard,
    gradient: "from-amber-500 to-orange-500",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept credit/debit cards, PayPal, and Stripe payments. All transactions are secure and encrypted for your safety.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refunds are only available before submission if the contest allows cancellation. Check the contest's refund policy before entering.",
      },
      {
        question: "How do I receive my prize money?",
        answer:
          "Prize money is transferred directly to your registered payment method within 5-7 business days after winner announcement.",
      },
    ],
  },
  {
    category: "Technical",
    icon: FaCog,
    gradient: "from-emerald-500 to-teal-500",
    questions: [
      {
        question: "The website is not loading, what should I do?",
        answer:
          "Clear your cache, check your internet connection, or try using a different browser. If the issue persists, contact our support team.",
      },
      {
        question: "How do I report a bug?",
        answer:
          "Contact support through the form at the bottom of this page with details of the issue. Include screenshots if possible to help us resolve it faster.",
      },
      {
        question: "Is there a mobile app?",
        answer:
          "Currently, we're mobile-optimized web platform. A dedicated mobile app is in development and will be available soon!",
      },
    ],
  },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqsData
    .filter(
      (cat) => activeCategory === "all" || cat.category === activeCategory
    )
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(search.toLowerCase()) ||
          q.answer.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  const totalQuestions = faqsData.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );

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
              <FaQuestionCircle className="text-5xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            Help{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Center
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to your questions or contact our support team
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-3"
            >
              <div className="text-2xl font-bold text-white">
                {totalQuestions}+
              </div>
              <div className="text-sm text-slate-400">Articles</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-3"
            >
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-slate-400">Support</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-3"
            >
              <div className="text-2xl font-bold text-white">&lt;1hr</div>
              <div className="text-sm text-slate-400">Response</div>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-30" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-center gap-2">
                <FaSearch className="text-slate-400 ml-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for help articles, guides, or FAQs..."
                  className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none px-2 py-3"
                />
                {search && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearch("")}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Clear
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory("all")}
              className={`relative px-6 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === "all"
                  ? "text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {activeCategory === "all" && (
                <motion.div
                  layoutId="categoryIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">All Topics</span>
            </motion.button>

            {faqsData.map((cat, idx) => (
              <motion.button
                key={cat.category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.category)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === cat.category
                    ? "text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {activeCategory === cat.category && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <cat.icon />
                  {cat.category}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto mb-16">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🔍
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No results found
              </h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your search or browse all categories
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Reset Search
              </motion.button>
            </motion.div>
          ) : (
            filteredFaqs.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`bg-gradient-to-r ${category.gradient} p-3 rounded-xl`}
                  >
                    <category.icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {category.category}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {category.questions.length} articles
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.questions.map((faq, index) => {
                    const key = `${catIndex}-${index}`;
                    const isOpen = openIndex === key;
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        className="relative group"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity`}
                        />
                        <div
                          onClick={() => toggleOpen(key)}
                          className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-xl p-6 cursor-pointer transition-all"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="font-bold text-lg text-white flex-1">
                              {faq.question}
                            </h3>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-slate-400 text-xl flex-shrink-0"
                            >
                              <FaChevronDown />
                            </motion.div>
                          </div>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  height: 0,
                                  marginTop: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                  marginTop: 16,
                                }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-slate-300 leading-relaxed overflow-hidden"
                              >
                                {faq.answer}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Quick Help Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: FaLightbulb,
              title: "Getting Started",
              desc: "New to ContestHub? Check our beginner's guide",
              gradient: "from-amber-500 to-orange-500",
            },
            {
              icon: FaRocket,
              title: "Pro Tips",
              desc: "Learn advanced strategies to win contests",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: FaCheckCircle,
              title: "Best Practices",
              desc: "Follow guidelines for successful participation",
              gradient: "from-emerald-500 to-teal-500",
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}
              />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 text-center transition-all">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${card.gradient} mb-4`}
                >
                  <card.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-sm">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50" />
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <FaHeadset className="text-6xl" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
              Our support team is here to help you 24/7. Get in touch and we'll
              respond as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:chowdhuryyeamin07@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3 justify-center"
              >
                <FaEnvelope />
                Email Support
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-xl border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center gap-3 justify-center"
              >
                <FaHeadset />
                Contact Form
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;

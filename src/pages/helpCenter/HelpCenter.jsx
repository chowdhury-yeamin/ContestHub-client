import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaEnvelope, FaHeadset } from "react-icons/fa";

const faqsData = [
  {
    category: "Account",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click on the Sign Up button at the top-right corner and fill in the required details."
      },
      {
        question: "How do I reset my password?",
        answer: "Go to the login page, click on 'Forgot Password', and follow the instructions."
      },
    ]
  },
  {
    category: "Contests",
    questions: [
      {
        question: "How do I participate in a contest?",
        answer: "Register and pay the entry fee for the contest, then submit your task before the deadline."
      },
      {
        question: "How is the winner selected?",
        answer: "The contest creator evaluates submissions and declares the winner after the deadline."
      },
    ]
  },
  {
    category: "Payments",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept credit/debit cards, PayPal, and Stripe payments."
      },
      {
        question: "Can I get a refund?",
        answer: "Refunds are only available before submission if the contest allows cancellation."
      },
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        question: "The website is not loading, what should I do?",
        answer: "Clear your cache, check your internet connection, or try using a different browser."
      },
      {
        question: "How do I report a bug?",
        answer: "Contact support through the form at the bottom of this page with details of the issue."
      },
    ]
  },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqsData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.answer.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">Help Center</h1>
        <p className="text-lg sm:text-xl text-gray-500">
          Find answers to your questions or contact support.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search for help..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        />
      </div>

      {/* FAQ Sections */}
      {filteredFaqs.map((category, catIndex) => (
        <div key={catIndex} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.category}</h2>
          <div className="space-y-3">
            {category.questions.map((faq, index) => {
              const key = `${catIndex}-${index}`;
              const isOpen = openIndex === key;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleOpen(key)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">{faq.question}</h3>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-600"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Contact Support */}
      <div className="bg-blue-50 rounded-lg p-6 text-center mt-12 shadow-md">
        <FaHeadset className="text-4xl text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Need further help?</h2>
        <p className="text-gray-600 mb-4">
          Contact our support team and we’ll assist you as soon as possible.
        </p>
        <a
          href="mailto:support@contesthub.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition-colors"
        >
          <FaEnvelope /> Contact Support
        </a>
      </div>
    </div>
  );
};

export default HelpCenter;

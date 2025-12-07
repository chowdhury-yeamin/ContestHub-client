import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaTrophy,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRocket,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Mock logo - replace with your actual logo
  const logo =
    "https://via.placeholder.com/150x50/6366F1/ffffff?text=ContestHub";

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.div whileHover={{ scale: 1.05 }} className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                  <FaTrophy className="text-3xl text-white" />
                </div>
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  ContestHub
                </h1>
              </div>
            </motion.div>

            <p className="text-slate-300 mb-6 leading-relaxed">
              Where creativity meets opportunity. Join thousands of talented
              individuals competing for amazing prizes.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center"
              >
                <div className="text-2xl font-bold text-indigo-400">1.2K+</div>
                <div className="text-xs text-slate-400">Contests</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center"
              >
                <div className="text-2xl font-bold text-purple-400">$500K+</div>
                <div className="text-xs text-slate-400">Prizes</div>
              </motion.div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FaStar className="text-yellow-400" />
              <span>Trusted by 50,000+ creators</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
              Quick Links
            </h2>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "All Contests", path: "/all-contests" },
                { name: "Leaderboard", path: "/leaderboard" },
                { name: "How It Works", path: "/about" },
                { name: "Winners Gallery", path: "/leaderboard" },
                { name: "Pricing", path: "/all-contests" },
              ].map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }} className="group">
                  <a
                    href={link.path}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-indigo-400 transition-colors duration-300"
                      whileHover={{ scale: 1.5 }}
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              Resources
            </h2>
            <ul className="space-y-3">
              {[
                { name: "Help Center", path: "/help-center" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Contest Rules", path: "/rules" },
                { name: "Creator Guide", path: "/creator-guide" },
                { name: "Contact Us", path: "/contact" },
              ].map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }} className="group">
                  <a
                    href={link.path}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors duration-300"
                      whileHover={{ scale: 1.5 }}
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-orange-500 rounded-full" />
              Stay Connected
            </h2>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-slate-300 text-sm mb-4">
                Get the latest contests and updates delivered to your inbox.
              </p>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-slate-400 transition-all duration-300"
                />
                <motion.button
                  onClick={handleSubscribe}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  {isSubscribed ? "✓ Done!" : <FaRocket />}
                </motion.button>
              </div>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-2 flex items-center gap-2"
                >
                  <FaHeart className="animate-pulse" />
                  Thanks for subscribing!
                </motion.p>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <motion.a
                href="mailto:hello@contesthub.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 text-sm"
              >
                <div className="bg-indigo-600/20 p-2 rounded-lg">
                  <FaEnvelope className="text-indigo-400" />
                </div>
                chowdhuryyeamin07@gmail.com
              </motion.a>
              <motion.a
                href="tel:+1234567890"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 text-sm"
              >
                <div className="bg-purple-600/20 p-2 rounded-lg">
                  <FaPhone className="text-purple-400" />
                </div>
                +8801701101422
              </motion.a>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-slate-300 text-sm"
              >
                <div className="bg-pink-600/20 p-2 rounded-lg">
                  <FaMapMarkerAlt className="text-pink-400" />
                </div>
                Sylhet, Bangladesh
              </motion.div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm text-slate-400 mb-3">
                Follow us on social media
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: FaFacebookF,
                    color: "from-blue-600 to-blue-500",
                    link: "https://facebook.com",
                  },
                  {
                    icon: FaTwitter,
                    color: "from-sky-600 to-sky-500",
                    link: "https://twitter.com",
                  },
                  {
                    icon: FaLinkedinIn,
                    color: "from-blue-700 to-blue-600",
                    link: "https://linkedin.com",
                  },
                  {
                    icon: FaInstagram,
                    color: "from-pink-600 to-purple-600",
                    link: "https://instagram.com",
                  },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`bg-gradient-to-br ${social.color} p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <social.icon className="text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-slate-400 text-sm text-center md:text-left">
            © 2025 <span className="text-white font-semibold">ContestHub</span>.
            All rights reserved. Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block"
            >
              <FaHeart className="inline text-red-500" />
            </motion.span>{" "}
            for creators worldwide.
          </div>

          <div className="flex items-center gap-6 text-sm">
            <motion.a
              href="/privacy"
              whileHover={{ y: -2 }}
              className="text-slate-400 hover:text-white transition-colors duration-300"
            >
              Privacy
            </motion.a>
            <motion.a
              href="/terms"
              whileHover={{ y: -2 }}
              className="text-slate-400 hover:text-white transition-colors duration-300"
            >
              Terms
            </motion.a>
            <motion.a
              href="/cookies"
              whileHover={{ y: -2 }}
              className="text-slate-400 hover:text-white transition-colors duration-300"
            >
              Cookies
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 z-50"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↑
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    </footer>
  );
};

export default Footer;

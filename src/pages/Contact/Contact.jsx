import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us. We will get back to you soon.",
        confirmButtonColor: "#6366F1",
      });
      reset();
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "chowdhuryyeamin07@gmail.com",
      link: "mailto:chowdhuryyeamin07@gmail.com",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+8801701101422",
      link: "tel:+8801701101422",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      value: "Boteswar, Sylhet, Bangladesh",
      link: "#",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      value: "Mon - Fri: 9AM - 6PM EST",
      link: "#",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const socialLinks = [
    {
      icon: FaTwitter,
      link: "https://twitter.com",
      color: "from-sky-400 to-blue-500",
    },
    {
      icon: FaLinkedinIn,
      link: "https://linkedin.com",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: FaFacebookF,
      link: "https://facebook.com",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: FaInstagram,
      link: "https://instagram.com",
      color: "from-pink-500 to-purple-600",
    },
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
              <FaEnvelope className="text-5xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Touch
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.link}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`relative group cursor-pointer ${
                    idx >= 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${info.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity`}
                  />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 transition-all">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${info.gradient} mb-4`}
                    >
                      <info.icon className="text-xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {info.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-20" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <p className="text-slate-400 mb-6">
                  Stay connected on social media
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center shadow-lg hover:shadow-xl transition-all`}
                    >
                      <social.icon className="text-white text-lg" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Response Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-20" />
              <div className="relative bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full"
                  >
                    <FaCheckCircle className="text-2xl text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Quick Response Time
                    </h4>
                    <p className="text-emerald-300 text-sm">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-20" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                Send us a Message
              </h2>

              <div className="space-y-5">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    type="text"
                    placeholder="Message subject"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.subject.message}
                    </motion.p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  onClick={handleSubmit(onSubmit)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <FaPaperPlane className="text-xl" />
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20" />
          <div className="relative bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              💬
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-4">
              We're Here to Help
            </h3>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our dedicated support team is ready to answer your questions and
              help you succeed on ContestHub. Don't hesitate to reach out!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

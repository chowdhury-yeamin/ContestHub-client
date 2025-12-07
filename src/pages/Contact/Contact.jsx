import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // TODO: Replace with actual API call - POST /contact
  const onSubmit = async (data) => {
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon.",
    });
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-base-content mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-muted">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-2xl text-primary-custom" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted">support@contesthub.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhone className="text-2xl text-primary-custom" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-2xl text-primary-custom" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-muted">
                      123 Creative Street, Design City, DC 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Name *</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Email *</span>
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
                  className="input input-bordered w-full"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Subject *</span>
                </label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Message subject"
                />
                {errors.subject && (
                  <p className="text-error text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Message *</span>
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  className="textarea textarea-bordered w-full"
                  rows={6}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="text-error text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="bg-accent-custom hover:bg-accent-custom/90 text-white border-0 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

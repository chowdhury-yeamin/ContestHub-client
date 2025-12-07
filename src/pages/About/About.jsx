import { motion } from "framer-motion";
import { FaUsers, FaTrophy, FaLightbulb, FaRocket } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: FaUsers,
      title: "Community Driven",
      description:
        "Join thousands of creative individuals competing in exciting contests",
    },
    {
      icon: FaTrophy,
      title: "Win Prizes",
      description:
        "Compete for cash prizes and recognition in various creative categories",
    },
    {
      icon: FaLightbulb,
      title: "Showcase Talent",
      description:
        "Display your skills and get noticed by potential employers and clients",
    },
    {
      icon: FaRocket,
      title: "Grow Your Career",
      description:
        "Build your portfolio and advance your creative career through contests",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* About page with color scheme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-base-content mb-4">
          About ContestHub
        </h1>
        <p className="text-xl text-muted max-w-3xl mx-auto">
          ContestHub is a premier platform connecting creative talents with
          exciting contest opportunities. Whether you're a designer, writer,
          entrepreneur, or gamer, we provide a space to showcase your skills and
          win amazing prizes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body">
              {/* Primary color for icons */}
              <feature.icon className="text-4xl text-primary-custom mb-4" />
              <h3 className="card-title">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card bg-gradient-to-r from-primary-custom to-primary-custom/80 text-white shadow-xl"
      >
        <div className="card-body text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Join our community today and start participating in amazing
            contests!
          </p>
          <div className="card-actions justify-center">
            <a
              href="/register"
              className="bg-accent-custom hover:bg-accent-custom/90 text-white border-0 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

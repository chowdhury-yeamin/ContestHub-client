import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContests } from "../../hooks/useContests";
import { useAuth } from "../../contexts/AuthContext";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaSearch,
  FaTrophy,
  FaUsers,
  FaFire,
  FaCrown,
  FaArrowRight,
  FaRocket,
} from "react-icons/fa";
import { useWinners } from "../../hooks/useWinners";
import {
  CheckCircle,
  Search,
  Upload,
  Trophy,
  ShieldCheck,
  Zap,
  BadgeCheck,
} from "lucide-react";
import BrandsSwiper from "./BrandsSwiper";

const Home = () => {
  const { data: contests = [], isLoading } = useContests();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const { data: winnersData = [] } = useWinners();

  const contestsArray = Array.isArray(contests) ? contests : [];
  const winnersArray = Array.isArray(winnersData) ? winnersData : [];

 
  const stats = useMemo(() => {
    const totalContests = contestsArray.length;
    const totalParticipants = contestsArray.reduce(
      (acc, c) => acc + (c.participantsCount || 0),
      0
    );
    const totalPrizes = contestsArray.reduce(
      (acc, c) => acc + (c.prizeMoney || 0),
      0
    );
    const totalWinners = winnersArray.length;

    return {
      totalContests,
      totalParticipants,
      totalWinners,
      totalPrizes,
    };
  }, [contestsArray.length, winnersArray.length]);

  const popularContests = contestsArray
    .filter((c) => c.status === "confirmed")
    .sort((a, b) => (b.participantsCount || 0) - (a.participantsCount || 0))
    .slice(0, 6);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType.trim()) {
      navigate(`/all-contests?type=${encodeURIComponent(searchType)}`);
    } else {
      navigate("/all-contests");
    }
  };

  const handleContestClick = (contestId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/contest/${contestId}`);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/all-contests?type=${encodeURIComponent(categoryName)}`);
  };

  const contestCategories = [
    {
      name: "Image Design",
      icon: "🎨",
      description: "Logo, graphics, and visual design contests",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      name: "Article Writing",
      icon: "✍️",
      description: "Writing competitions for creative minds",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Business Ideas",
      icon: "💡",
      description: "Pitch your innovative ideas",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Gaming Reviews",
      icon: "🎮",
      description: "Share insights and reviews on games",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Photography",
      icon: "📸",
      description: "Capture and showcase your moments",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const steps = [
    {
      icon: <Search className="w-10 h-10" />,
      title: "Browse Contests",
      desc: "Explore active contests and pick the one that fits your skills.",
    },
    {
      icon: <Upload className="w-10 h-10" />,
      title: "Join",
      desc: "Enter instantly — no unnecessary steps or friction.",
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Submit",
      desc: "Upload your best work with confidence and clarity.",
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Win Prizes",
      desc: "Stand out, collect rewards, and build your reputation.",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Fast Payouts",
      desc: "Winners get paid without delays or excuses.",
    },
    {
      icon: <BadgeCheck className="w-10 h-10" />,
      title: "Trusted by Creators",
      desc: "A growing community that relies on transparent contests.",
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Easy Submissions",
      desc: "Join and submit your work in minutes, not hours.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Secure & Verified",
      desc: "Every contest is verified to prevent fraud and fake hosts.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 mb-6"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🎯
              </motion.span>
              <span className="text-sm text-slate-300 font-medium">
                Join {stats.totalParticipants.toLocaleString()}+ creators
                worldwide
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Discover
              </span>
              <br />
              <span className="text-white">Amazing Contests</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Join creative contests, showcase your talent, and win{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-bold">
                amazing prizes
              </span>
            </motion.p>

            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      placeholder="Search contests by type, category, or keyword..."
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <FaSearch /> <span>Search</span>
                  </motion.button>
                </div>
              </div>
            </motion.form>
          </div>
        </motion.section>

        {/* Key Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                label: "Active Contests",
                value: stats.totalContests,
                icon: FaFire,
                gradient: "from-orange-500 to-red-500",
              },
              {
                label: "Participants",
                value: stats.totalParticipants.toLocaleString(),
                icon: FaUsers,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                label: "Winners",
                value: stats.totalWinners.toLocaleString(),
                icon: FaCrown,
                gradient: "from-yellow-500 to-amber-500",
              },
              {
                label: "Prize Pool",
                value: `$${stats.totalPrizes.toLocaleString()}`,
                icon: FaTrophy,
                gradient: "from-emerald-500 to-teal-500",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 transition-opacity rounded-2xl blur-xl`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} mb-3`}
                  >
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contest Categories */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-black text-white mb-4"
            >
              Browse by Category
            </motion.h2>
            <p className="text-xl text-slate-400">
              Find the perfect contest that matches your skills
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {contestCategories.map((cat, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className="relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-2xl p-6 text-center transition-all">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="text-5xl mb-3"
                  >
                    {cat.icon}
                  </motion.div>
                  <h3 className="font-bold text-white text-lg mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Popular Contests */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">
                Popular Contests
              </h2>
              <p className="text-lg text-slate-400">
                Most participated contests this month
              </p>
            </div>
            <Link to="/all-contests">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                View All <FaArrowRight />
              </motion.button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaTrophy className="text-6xl text-indigo-500" />
              </motion.div>
            </div>
          ) : popularContests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularContests.map((contest, idx) => (
                <motion.div
                  key={contest._id}
                  onClick={() => handleContestClick(contest._id)}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl overflow-hidden transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={
                          contest.image || "https://via.placeholder.com/400x300"
                        }
                        alt={contest.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ${(contest.prizeMoney || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        {contest.name}
                      </h3>
                      <p className="text-slate-400 mb-4 line-clamp-2 text-sm">
                        {contest.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <FaUsers className="text-blue-400" />
                          <span className="font-medium">
                            {contest.participantsCount || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <FaTrophy className="text-amber-400" />
                          <span className="font-medium">
                            ${contest.prizeMoney || 0}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-indigo-500/50 transition-all"
                      >
                        View Details
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🎯
              </motion.div>
              <h3 className="text-2xl font-black text-white mb-2">
                No Contests Available
              </h3>
              <p className="text-slate-400">
                Check back soon for exciting new contests!
              </p>
            </div>
          )}
        </motion.section>

        {/* Recent Winners Section */}
        {winnersArray.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Recent Winners
              </h2>
              <p className="text-xl text-slate-400">
                Celebrating our talented champions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {winnersArray.slice(0, 3).map((winner, idx) => (
                <motion.div
                  key={winner._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-amber-500/50 rounded-2xl p-6 text-center transition-all">
                    <div className="relative inline-block mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-md opacity-75"
                      />
                      <img
                        src={
                          winner.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            winner.name
                          )}&background=6366F1&color=fff&size=200`
                        }
                        alt={winner.name}
                        className="relative w-24 h-24 rounded-full border-4 border-white/20 object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 w-10 h-10 rounded-full flex items-center justify-center">
                        <FaTrophy className="text-white text-lg" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-1">
                      {winner.name}
                    </h3>
                    <p className="text-slate-400 text-sm mb-3">
                      {winner.contestName || "Contest Winner"}
                    </p>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                      ${winner.prizeMoney || 0}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-black text-white mb-4"
            >
              How It Works
            </motion.h2>
            <p className="text-xl text-slate-400">
              A simple process built for creators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-8 text-center transition-all">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="text-indigo-400 mb-4 flex justify-center"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-black text-white mb-4"
            >
              Why Choose Us?
            </motion.h2>
            <p className="text-xl text-slate-400">
              What makes our platform stand out
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-8 text-center transition-all">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="text-indigo-400 mb-4 flex justify-center"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Trusted by Creators Worldwide */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-black text-white mb-4"
            >
              Trusted by Creators Worldwide
            </motion.h2>
          </div>
          <BrandsSwiper />
        </motion.section>

        {/* Creator CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50" />
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Become a Contest Creator
              </h2>
              <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
                Create contests easily, manage participants, and declare
                winners. Start building your community today!
              </p>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3"
                >
                  <FaRocket />
                  Start Creating Contests
                  <FaArrowRight />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaTrophy,
  FaMedal,
  FaAward,
  FaCrown,
  FaStar,
  FaFire,
  FaSearch,
  FaFilter,
  FaChartLine,
  FaUsers,
  FaDollarSign,
  FaGem,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaFilterCircleXmark } from "react-icons/fa6";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  // Fetch all users
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leaderboard");
        const data = await response.json();
        setLeaderboard(data.leaderboard);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Filter and sort leaderboard
  const filteredLeaderboard = leaderboard
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (filter === "wins") return b.wins - a.wins;
      if (filter === "prizes") return b.totalPrizes - a.totalPrizes;
      return b.wins - a.wins;
    });

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaCrown className="text-6xl drop-shadow-2xl" />;
    if (rank === 2) return <FaMedal className="text-5xl drop-shadow-xl" />;
    if (rank === 3) return <FaAward className="text-5xl drop-shadow-xl" />;
    return null;
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return "from-yellow-400 via-yellow-500 to-amber-500";
    if (rank === 2) return "from-slate-300 via-slate-400 to-slate-500";
    if (rank === 3) return "from-amber-500 via-orange-500 to-orange-600";
    return "from-slate-600 to-slate-700";
  };

  const totalWins = leaderboard.reduce((acc, user) => acc + user.wins, 0);
  const totalPrizes = leaderboard.reduce(
    (acc, user) => acc + (user.totalPrizes || 0),
    0
  );

  const stats = [
    {
      label: "Total Champions",
      value: leaderboard.length,
      icon: FaUsers,
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Total Wins",
      value: totalWins,
      icon: FaTrophy,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Prize Pool",
      value: `$${totalPrizes.toLocaleString()}`,
      icon: FaDollarSign,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Active Legends",
      value: leaderboard.filter((u) => u.wins > 0).length,
      icon: FaFire,
      color: "from-red-500 to-rose-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaTrophy className="text-6xl text-amber-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden pt-24 pb-16">
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
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
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
              🏆
            </motion.span>
            <span className="text-sm text-slate-300 font-medium">
              Celebrating Our Champions
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400">
              Hall of
            </span>
            <br />
            <span className="text-white">Champions</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Where legends are made and victories are celebrated
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-30 transition-opacity rounded-2xl blur-xl`}
              />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} mb-2`}
                >
                  <stat.icon className="text-white text-lg" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter/Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
        >
          {/* Filter Select */}
          <div className="relative w-full sm:w-64">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select h-14 w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            >
              <option value="all">Default (Wins)</option>
              <option value="wins">Most Wins</option>
              <option value="prizes">Highest Prizes</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
            <input
              type="text"
              placeholder="Search champions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="relative w-full sm:w-80 pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Podium Top 3 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-16"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl blur-2xl opacity-30" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row justify-center items-end gap-8 sm:gap-12">
                {/* 2nd Place */}
                {filteredLeaderboard[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col items-center order-2 sm:order-1"
                  >
                    <div className="relative mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-4 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full blur-lg opacity-50"
                      />
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-slate-300 to-slate-500 p-1">
                        <img
                          src={filteredLeaderboard[1].photoURL}
                          alt={filteredLeaderboard[1].name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="text-slate-300">{getRankIcon(2)}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                        {filteredLeaderboard[1].name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FaTrophy className="text-slate-300" />
                        <span className="text-2xl font-black text-slate-300">
                          {filteredLeaderboard[1].wins}
                        </span>
                        <span className="text-slate-400">wins</span>
                      </div>
                      <p className="text-sm text-amber-400 font-semibold">
                        $
                        {filteredLeaderboard[1].totalPrizes?.toLocaleString() ||
                          0}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 1st Place */}
                {filteredLeaderboard[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col items-center order-1 sm:order-2 sm:scale-110"
                  >
                    <div className="relative mb-8">
                      <motion.div
                        animate={{
                          rotate: 360,
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-full blur-2xl opacity-75"
                      />
                      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-1">
                        <img
                          src={filteredLeaderboard[0].photoURL}
                          alt={filteredLeaderboard[0].name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <motion.div
                          animate={{
                            y: [0, -5, 0],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-yellow-400"
                        >
                          {getRankIcon(1)}
                        </motion.div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                        {filteredLeaderboard[0].name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FaTrophy className="text-yellow-400" />
                        <span className="text-3xl font-black text-yellow-400">
                          {filteredLeaderboard[0].wins}
                        </span>
                        <span className="text-slate-300">wins</span>
                      </div>
                      <p className="text-lg text-amber-400 font-bold">
                        $
                        {filteredLeaderboard[0].totalPrizes?.toLocaleString() ||
                          0}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 3rd Place */}
                {filteredLeaderboard[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="flex flex-col items-center order-3"
                  >
                    <div className="relative mb-6">
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur-lg opacity-50"
                      />
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 p-1">
                        <img
                          src={filteredLeaderboard[2].photoURL}
                          alt={filteredLeaderboard[2].name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="text-amber-500">{getRankIcon(3)}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                        {filteredLeaderboard[2].name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FaTrophy className="text-amber-500" />
                        <span className="text-2xl font-black text-amber-500">
                          {filteredLeaderboard[2].wins}
                        </span>
                        <span className="text-slate-400">wins</span>
                      </div>
                      <p className="text-sm text-amber-400 font-semibold">
                        $
                        {filteredLeaderboard[2].totalPrizes?.toLocaleString() ||
                          0}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-white/10">
              <h2 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                <FaChartLine className="text-indigo-400" />
                Complete Rankings
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 sm:px-6 text-slate-300 font-semibold text-sm">
                      RANK
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-slate-300 font-semibold text-sm">
                      CHAMPION
                    </th>
                    <th className="text-center py-4 px-4 sm:px-6 text-slate-300 font-semibold text-sm">
                      WINS
                    </th>
                    <th className="text-right py-4 px-4 sm:px-6 text-slate-300 font-semibold text-sm hidden sm:table-cell">
                      TOTAL PRIZES
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaderboard.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-white ${
                            index < 3
                              ? `bg-gradient-to-r ${getRankBadgeColor(
                                  index + 1
                                )}`
                              : "bg-white/10"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-semibold">
                            {user.name}
                          </span>
                          {index < 3 && (
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {index === 0 && (
                                <FaCrown className="text-yellow-400" />
                              )}
                              {index === 1 && (
                                <FaMedal className="text-slate-300" />
                              )}
                              {index === 2 && (
                                <FaAward className="text-amber-500" />
                              )}
                            </motion.div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <FaTrophy className="text-amber-400 text-sm" />
                          <span className="text-white font-bold text-lg">
                            {user.wins}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right hidden sm:table-cell">
                        <span className="text-emerald-400 font-bold text-lg">
                          ${user.totalPrizes?.toLocaleString() || 0}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 }}
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
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Ready to Join the Legends?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
                Compete in exciting contests, showcase your talent, and climb
                the leaderboard to become the next champion!
              </p>
              <Link to="/all-contests">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3"
                >
                  <FaFire />
                  Join the Competition
                  <FaTrophy />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;

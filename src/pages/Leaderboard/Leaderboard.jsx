import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaMedal, FaAward, FaCrown, FaStar, FaFire } from "react-icons/fa";
import { Link } from "react-router";

// Mock data for demonstration
const mockLeaderboard = [
  { _id: "1", name: "Alex Rivera", photoURL: "https://ui-avatars.com/api/?name=Alex+Rivera&background=6366F1&color=fff&size=200", wins: 47, totalPrizes: 15000, rank: 1 },
  { _id: "2", name: "Sophia Chen", photoURL: "https://ui-avatars.com/api/?name=Sophia+Chen&background=8B5CF6&color=fff&size=200", wins: 42, totalPrizes: 13200, rank: 2 },
  { _id: "3", name: "Marcus Johnson", photoURL: "https://ui-avatars.com/api/?name=Marcus+Johnson&background=F59E0B&color=fff&size=200", wins: 38, totalPrizes: 11800, rank: 3 },
  { _id: "4", name: "Emma Williams", photoURL: "https://ui-avatars.com/api/?name=Emma+Williams&background=10B981&color=fff&size=200", wins: 35, totalPrizes: 9500, rank: 4 },
  { _id: "5", name: "James Brown", photoURL: "https://ui-avatars.com/api/?name=James+Brown&background=3B82F6&color=fff&size=200", wins: 32, totalPrizes: 8900, rank: 5 },
  { _id: "6", name: "Olivia Davis", photoURL: "https://ui-avatars.com/api/?name=Olivia+Davis&background=EC4899&color=fff&size=200", wins: 29, totalPrizes: 7800, rank: 6 },
  { _id: "7", name: "Liam Garcia", photoURL: "https://ui-avatars.com/api/?name=Liam+Garcia&background=8B5CF6&color=fff&size=200", wins: 26, totalPrizes: 7200, rank: 7 },
  { _id: "8", name: "Ava Martinez", photoURL: "https://ui-avatars.com/api/?name=Ava+Martinez&background=06B6D4&color=fff&size=200", wins: 23, totalPrizes: 6500, rank: 8 },
  { _id: "9", name: "Noah Wilson", photoURL: "https://ui-avatars.com/api/?name=Noah+Wilson&background=F59E0B&color=fff&size=200", wins: 21, totalPrizes: 5900, rank: 9 },
  { _id: "10", name: "Isabella Taylor", photoURL: "https://ui-avatars.com/api/?name=Isabella+Taylor&background=10B981&color=fff&size=200", wins: 19, totalPrizes: 5300, rank: 10 }
];

const Leaderboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const isLoading = false;
  const leaderboard = mockLeaderboard;

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaCrown className="text-yellow-400 text-6xl drop-shadow-2xl animate-pulse" />;
    if (rank === 2) return <FaMedal className="text-slate-300 text-5xl drop-shadow-xl" />;
    if (rank === 3) return <FaAward className="text-amber-600 text-5xl drop-shadow-xl" />;
    return null;
  };

  const getPodiumHeight = (rank) => {
    if (rank === 1) return "h-64";
    if (rank === 2) return "h-52";
    if (rank === 3) return "h-44";
    return "h-32";
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return "from-yellow-400 via-yellow-500 to-amber-500";
    if (rank === 2) return "from-slate-300 via-slate-400 to-slate-500";
    if (rank === 3) return "from-amber-500 via-orange-500 to-orange-600";
    return "from-slate-600 to-slate-700";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center  items-center min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaTrophy className="text-yellow-400 text-6xl" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden pt-13">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {/* Page Header with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-4 rounded-full">
              <FaTrophy className="text-5xl sm:text-6xl text-white drop-shadow-2xl" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 mb-4 tracking-tight">
            Hall of Champions
          </h1>
          
          <p className="text-lg sm:text-2xl text-slate-300 font-light max-w-2xl mx-auto">
            Where legends are made and victories are celebrated
          </p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8"
          >
            {[
              { label: "Total Winners", value: "1,234", icon: FaStar },
              { label: "Prizes Awarded", value: "$500K+", icon: FaTrophy },
              { label: "Active Champions", value: leaderboard.length, icon: FaFire }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 min-w-[140px]"
              >
                <stat.icon className="text-3xl text-amber-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Podium Top 3 - Enhanced */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col sm:flex-row justify-center items-end gap-4 sm:gap-8 mb-16 sm:mb-24 px-4"
        >
          {/* 2nd Place */}
          {leaderboard[1] && (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="flex flex-col items-center w-full sm:w-auto order-2 sm:order-1"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-300 to-slate-500 rounded-3xl blur-xl opacity-75 animate-pulse" />
                <div className="relative bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white/50">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    {getRankIcon(2)}
                  </div>
                  
                  <div className="mt-8 relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full blur-md"
                    />
                    <img
                      src={leaderboard[1].photoURL}
                      alt={leaderboard[1].name}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl relative z-10 mx-auto"
                    />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-4 text-center">{leaderboard[1].name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <FaTrophy className="text-yellow-600" />
                    <p className="text-lg sm:text-xl font-bold text-slate-800">{leaderboard[1].wins} Wins</p>
                  </div>
                  <div className="mt-3 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-sm text-slate-700 font-semibold">${leaderboard[1].totalPrizes.toLocaleString()} earned</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 bg-gradient-to-r from-slate-300 to-slate-500 text-white px-8 py-3 rounded-full font-black text-xl shadow-lg"
              >
                2nd Place
              </motion.div>
            </motion.div>
          )}

          {/* 1st Place - CHAMPION */}
          {leaderboard[0] && (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -15 }}
              className="flex flex-col items-center w-full sm:w-auto order-1 sm:order-2 mb-8 sm:mb-0"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glowing effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl blur-2xl opacity-75 animate-pulse" />
                
                <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-yellow-300">
                  {/* Sparkle effects */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-4 text-4xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute -top-4 -left-4 text-4xl"
                  >
                    ✨
                  </motion.div>
                  
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    {getRankIcon(1)}
                  </div>
                  
                  <div className="mt-12 relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full blur-lg"
                    />
                    <div className="absolute -inset-2 bg-white/30 rounded-full animate-ping" />
                    <img
                      src={leaderboard[0].photoURL}
                      alt={leaderboard[0].name}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-2xl relative z-10 mx-auto"
                    />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-6 text-center drop-shadow-lg">{leaderboard[0].name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <FaTrophy className="text-white text-xl" />
                    <p className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">{leaderboard[0].wins} Wins</p>
                  </div>
                  <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3">
                    <p className="text-base sm:text-lg text-amber-700 font-black">${leaderboard[0].totalPrizes.toLocaleString()} earned</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.5)",
                    "0 0 40px rgba(251, 191, 36, 0.8)",
                    "0 0 20px rgba(251, 191, 36, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white px-10 py-4 rounded-full font-black text-2xl shadow-2xl"
              >
                🏆 CHAMPION
              </motion.div>
            </motion.div>
          )}

          {/* 3rd Place */}
          {leaderboard[2] && (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="flex flex-col items-center w-full sm:w-auto order-3"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl blur-xl opacity-75 animate-pulse" />
                <div className="relative bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    {getRankIcon(3)}
                  </div>
                  
                  <div className="mt-8 relative">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full blur-md"
                    />
                    <img
                      src={leaderboard[2].photoURL}
                      alt={leaderboard[2].name}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl relative z-10 mx-auto"
                    />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-4 text-center drop-shadow-lg">{leaderboard[2].name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <FaTrophy className="text-yellow-300" />
                    <p className="text-lg sm:text-xl font-bold text-white">{leaderboard[2].wins} Wins</p>
                  </div>
                  <div className="mt-3 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-sm text-amber-900 font-semibold">${leaderboard[2].totalPrizes.toLocaleString()} earned</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full font-black text-xl shadow-lg"
              >
                3rd Place
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Full Leaderboard Table - Glassmorphism Design */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-8 shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
            Complete Rankings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold text-sm sm:text-base">Rank</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold text-sm sm:text-base">Player</th>
                  <th className="text-center py-4 px-4 text-slate-300 font-semibold text-sm sm:text-base">Wins</th>
                  <th className="text-right py-4 px-4 text-slate-300 font-semibold text-sm sm:text-base hidden sm:table-cell">Total Prizes</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      scale: 1.02
                    }}
                    className="border-b border-white/5 transition-all duration-300 cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      {index < 3 ? (
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankBadgeColor(index + 1)} flex items-center justify-center font-black text-white shadow-lg`}
                        >
                          {index + 1}
                        </motion.div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center font-bold text-slate-300">
                          {index + 1}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative">
                          <img
                            src={user.photoURL}
                            alt={user.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/30 shadow-lg"
                          />
                          {index < 3 && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="absolute -top-1 -right-1 text-lg"
                            >
                              {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                            </motion.div>
                          )}
                        </div>
                        <span className="font-semibold text-white text-sm sm:text-base">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-bold text-white text-xs sm:text-sm ${
                          index < 3
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg"
                            : "bg-slate-700/50"
                        }`}
                      >
                        <FaTrophy className={index < 3 ? "text-yellow-300" : "text-slate-400"} />
                        {user.wins}
                      </motion.span>
                    </td>
                    <td className="py-4 px-4 text-right hidden sm:table-cell">
                      <span className="font-bold text-green-400 text-sm sm:text-base">
                        ${user.totalPrizes.toLocaleString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link to="/all-contests" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
              Join the Competition 🚀
            </Link>
          </motion.div>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Compete with the best and earn your place in the hall of fame
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
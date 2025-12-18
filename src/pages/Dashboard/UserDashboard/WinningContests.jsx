import { useWinningContests } from "../../../hooks/useUsers";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaMedal,
  FaCrown,
  FaStar,
  FaFire,
  FaGem,
  FaCalendarAlt,
  FaAward,
  FaChartLine,
} from "react-icons/fa";

const WinningContests = () => {
  const { data: winnings = [], isLoading } = useWinningContests();

  // Calculate stats
  const totalWinnings = winnings.reduce(
    (sum, w) => sum + w.contest.prizeMoney,
    0
  );
  const averageWin =
    winnings.length > 0 ? Math.round(totalWinnings / winnings.length) : 0;

  //  rank emoji based on position
  const getRankEmoji = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "🏆";
  };

  //  gradient based on rank
  const getRankGradient = (index) => {
    if (index === 0) return "from-yellow-400 via-amber-500 to-orange-500";
    if (index === 1) return "from-slate-300 via-slate-400 to-slate-500";
    if (index === 2) return "from-orange-400 via-amber-600 to-yellow-700";
    return "from-purple-500 via-pink-500 to-rose-500";
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity },
          }}
        >
          <FaTrophy className="text-6xl text-amber-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading your victories...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            className="text-4xl"
          >
            🏆
          </motion.div>
          <div>
            <h2 className="text-3xl font-black text-white">
              My Winning Contests
            </h2>
            <p className="text-slate-400">Celebrate your achievements</p>
          </div>
        </div>

        {/* Stats Overview */}
        {winnings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Wins",
                value: winnings.length,
                icon: FaTrophy,
                gradient: "from-amber-500 to-orange-500",
                emoji: "🏆",
              },
              {
                label: "Total Earned",
                value: `$${totalWinnings.toLocaleString()}`,
                icon: FaGem,
                gradient: "from-emerald-500 to-teal-500",
                emoji: "💰",
              },
              {
                label: "Average Win",
                value: `$${averageWin.toLocaleString()}`,
                icon: FaChartLine,
                gradient: "from-blue-500 to-cyan-500",
                emoji: "📊",
              },
              {
                label: "Success Rate",
                value: "100%",
                icon: FaStar,
                gradient: "from-purple-500 to-pink-500",
                emoji: "⭐",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 transition-opacity rounded-xl blur-lg`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.emoji}</span>
                    <stat.icon
                      className={`text-lg text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    />
                  </div>
                  <div className="text-2xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {winnings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-orange-600/10 to-red-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🏆
            </motion.div>
            <h3 className="text-3xl font-black text-white mb-3">
              No Victories Yet
            </h3>
            <p className="text-lg text-slate-400 mb-2">
              You haven't won any contests yet.
            </p>
            <p className="text-slate-500 mb-8">
              Keep participating and showcasing your talent to win amazing
              prizes!
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <FaStar className="text-amber-500" />
              <span>Your first victory is just around the corner!</span>
              <FaStar className="text-amber-500" />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {winnings.map((win, index) => (
            <motion.div
              key={win._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${getRankGradient(
                  index
                )} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
              />

              {/* Card */}
              <div
                className={`relative bg-gradient-to-br ${getRankGradient(
                  index
                )} rounded-2xl p-1`}
              >
                <div className="bg-slate-950/90 backdrop-blur-xl rounded-2xl p-6 h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="text-5xl"
                    >
                      {getRankEmoji(index)}
                    </motion.div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`bg-gradient-to-r ${getRankGradient(
                          index
                        )} text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg`}
                      >
                        Rank #{index + 1}
                      </div>
                      {index < 3 && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <FaCrown
                            className={`text-2xl text-transparent bg-clip-text bg-gradient-to-r ${getRankGradient(
                              index
                            )}`}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Contest Name */}
                  <h3
                    className={`text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${getRankGradient(
                      index
                    )} mb-4`}
                  >
                    {win.contest.name}
                  </h3>

                  {/* Prize Amount */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                      Prize Money
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">
                        ${win.contest.prizeMoney.toLocaleString()}
                      </span>
                      <FaGem
                        className={`text-xl text-transparent bg-clip-text bg-gradient-to-r ${getRankGradient(
                          index
                        )}`}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-slate-400 pt-4 border-t border-white/10">
                    <FaCalendarAlt
                      className={`text-transparent bg-clip-text bg-gradient-to-r ${getRankGradient(
                        index
                      )}`}
                    />
                    <span>
                      Won on{" "}
                      {new Date(win.wonAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Achievement Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    className="absolute -top-7 -right-5"
                  >
                    <div
                      className={`bg-gradient-to-r ${getRankGradient(
                        index
                      )} w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-950`}
                    >
                      <FaAward className="text-2xl text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Hall of Fame Section */}
      {winnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block text-5xl mb-3"
              >
                👑
              </motion.div>
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">
                Hall of Fame
              </h3>
              <p className="text-slate-400">Your greatest achievements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-3xl font-black text-white mb-1">
                  {winnings.length}
                </div>
                <div className="text-sm text-slate-400">Total Victories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-1">
                  ${totalWinnings.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">Total Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                  {winnings.length >= 5 ? "Legend" : "Rising Star"}
                </div>
                <div className="text-sm text-slate-400">Your Status</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WinningContests;

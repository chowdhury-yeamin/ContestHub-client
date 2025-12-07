import { useLeaderboard } from "../../hooks/useUsers";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";

const Leaderboard = () => {
  const { data: leaderboard = [], isLoading } = useLeaderboard();

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaTrophy className="text-yellow-500 text-3xl" />;
    if (rank === 2) return <FaMedal className="text-gray-400 text-3xl" />;
    if (rank === 3) return <FaAward className="text-orange-500 text-3xl" />;
    return (
      <span className="text-2xl font-bold text-base-content/50">#{rank}</span>
    );
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-400 to-orange-500";
    if (rank === 2) return "from-gray-300 to-gray-500";
    if (rank === 3) return "from-orange-400 to-red-500";
    return "from-base-200 to-base-300";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content mb-4">
          Leaderboard
        </h1>
        <p className="text-lg sm:text-xl text-muted">
          Top performers ranked by contest wins
        </p>
      </div>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`card bg-gradient-to-br ${getRankColor(
              2
            )} text-white shadow-2xl transform md:scale-90`}
          >
            <div className="card-body text-center">
              <div className="flex justify-center mb-4">{getRankIcon(2)}</div>
              <img
                src={leaderboard[1].photoURL}
                alt={leaderboard[1].name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white mb-4"
              />
              <h3 className="text-2xl font-bold">{leaderboard[1].name}</h3>
              <p className="text-3xl font-bold mt-2">
                {leaderboard[1].wins} Wins
              </p>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`card bg-gradient-to-br ${getRankColor(
              1
            )} text-white shadow-2xl`}
          >
            <div className="card-body text-center">
              <div className="flex justify-center mb-4">{getRankIcon(1)}</div>
              <img
                src={leaderboard[0].photoURL}
                alt={leaderboard[0].name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white mb-4"
              />
              <h3 className="text-3xl font-bold">{leaderboard[0].name}</h3>
              <p className="text-4xl font-bold mt-2">
                {leaderboard[0].wins} Wins
              </p>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`card bg-gradient-to-br ${getRankColor(
              3
            )} text-white shadow-2xl transform md:scale-90`}
          >
            <div className="card-body text-center">
              <div className="flex justify-center mb-4">{getRankIcon(3)}</div>
              <img
                src={leaderboard[2].photoURL}
                alt={leaderboard[2].name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white mb-4"
              />
              <h3 className="text-2xl font-bold">{leaderboard[2].name}</h3>
              <p className="text-3xl font-bold mt-2">
                {leaderboard[2].wins} Wins
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6">Full Rankings</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Wins</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={index < 3 ? "bg-base-200" : ""}
                  >
                    <td>
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-4">
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <span className="font-bold">{user.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-primary-custom text-white badge-lg">
                        {user.wins} Wins
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

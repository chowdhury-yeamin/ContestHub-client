import { useWinningContests } from "../../../hooks/useUsers";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal } from "react-icons/fa";

const WinningContests = () => {
  const { data: winnings = [], isLoading } = useWinningContests();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Winning contests with accent color */}
        <h2 className="card-title mb-6 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          My Winning Contests
        </h2>

        {winnings.length === 0 ? (
          <div className="text-center py-12">
            <FaMedal className="text-6xl mx-auto mb-4 text-base-content/30" />
            <p className="text-xl text-muted">
              You haven't won any contests yet.
            </p>
            <p className="text-muted mt-2">
              Keep participating to win amazing prizes!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {winnings.map((win, index) => (
              <motion.div
                key={win._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-xl"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <FaTrophy className="text-4xl" />
                    <span className="badge badge-lg bg-white/20 text-white border-0">
                      #{index + 1}
                    </span>
                  </div>
                  <h3 className="card-title text-white">{win.contest.name}</h3>
                  <div className="mt-4">
                    <p className="text-3xl font-bold">
                      ${win.contest.prizeMoney}
                    </p>
                    <p className="text-white/80 text-sm mt-2">
                      Won on {new Date(win.wonAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        {winnings.length > 0 && (
          <div className="stats stats-vertical md:stats-horizontal shadow-lg mt-6">
            <div className="stat">
              <div className="stat-title">Total Wins</div>
              <div className="stat-value text-primary-custom">
                {winnings.length}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Prize Money</div>
              <div className="stat-value text-accent-custom">
                ${winnings.reduce((sum, w) => sum + w.contest.prizeMoney, 0)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinningContests;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContests } from "../../hooks/useContests";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { FaSearch, FaTrophy, FaUsers, FaCalendarAlt } from "react-icons/fa";

const Home = () => {
  const { data: contests = [], isLoading } = useContests();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("");

  // Get popular contests (sorted by participants count)
  const popularContests = contests
    .filter((c) => c.status === "confirmed")
    .sort((a, b) => b.participantsCount - a.participantsCount)
    .slice(0, 5);

  // Get recent winners (mock data - replace with API call)
  const recentWinners = [
    {
      name: "Alice Johnson",
      contest: "Logo Design Contest",
      prize: 500,
      photoURL:
        "https://ui-avatars.com/api/?name=Alice+Johnson&background=random",
    },
    {
      name: "Bob Smith",
      contest: "Article Writing Challenge",
      prize: 300,
      photoURL:
        "https://ui-avatars.com/api/?name=Alice+Johnson&background=random",
    },
    {
      name: "Charlie Brown",
      contest: "Business Idea Pitch",
      prize: 1000,
      photoURL:
        "https://ui-avatars.com/api/?name=Alice+Johnson&background=random",
    },
  ];

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner Section with primary color */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-primary-custom rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 my-4 sm:my-6 md:my-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Discover Amazing Contests
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 px-4">
            Join creative contests, showcase your talent, and win amazing prizes
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                placeholder="Search by contest type..."
                className="flex-1 input input-bordered input-lg bg-white/95 text-base-content"
              />
              <button
                type="submit"
                className="bg-accent-custom hover:bg-accent-custom/90 text-white border-0 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
      </motion.section>

      {/* Popular Contests Section */}
      <section className="my-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-base-content">
            Popular Contests
          </h2>
          <Link
            to="/all-contests"
            className="border-2 border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Show All
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularContests.map((contest) => (
              <motion.div
                key={contest._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <figure>
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{contest.name}</h3>
                  <p className="text-muted text-sm">
                    {contest.description.length > 100
                      ? contest.description.slice(0, 100) + "..."
                      : contest.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted mt-2">
                    <span className="flex items-center gap-1">
                      <FaUsers /> {contest.participantsCount}
                    </span>
                    <span className="flex items-center gap-1 text-accent-custom font-semibold">
                      <FaTrophy /> ${contest.prizeMoney}
                    </span>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleContestClick(contest._id)}
                      className="bg-primary-custom hover:bg-primary-custom/90 text-white border-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Winner Advertisement Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="my-8 sm:my-12 md:my-16 bg-gradient-to-br from-accent-custom via-accent-custom/90 to-accent-custom/80 rounded-3xl p-6 sm:p-8 md:p-12 text-white"
      >
        <div className="text-center mb-8">
          <FaTrophy className="text-6xl mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Celebrating Our Winners
          </h2>
          <p className="text-lg sm:text-xl text-white/90">
            Join thousands of participants and become the next champion!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {recentWinners.map((winner, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center"
            >
              <img
                src={winner.photoURL}
                alt={winner.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white"
              />
              <h3 className="font-bold text-xl mb-2">{winner.name}</h3>
              <p className="text-white/90 mb-2">{winner.contest}</p>
              <p className="text-2xl font-bold">${winner.prize}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="stats stats-vertical md:stats-horizontal shadow-lg bg-white/20 backdrop-blur-md">
            <div className="stat">
              <div className="stat-title text-white/80">Total Winners</div>
              <div className="stat-value text-white">1,234</div>
            </div>
            <div className="stat">
              <div className="stat-title text-white/80">Total Prizes</div>
              <div className="stat-value text-white">$500K+</div>
            </div>
            <div className="stat">
              <div className="stat-title text-white/80">Active Contests</div>
              <div className="stat-value text-white">
                {contests.filter((c) => c.status === "confirmed").length}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Extra Section - How It Works */}
      <section className="my-8 sm:my-12 md:my-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-base-content px-4">
          How ContestHub Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary-custom/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">1️⃣</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Browse Contests</h3>
            <p className="text-muted">
              Explore a wide variety of creative contests across different
              categories
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <div className="bg-primary-custom/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">2️⃣</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Register & Participate
            </h3>
            <p className="text-muted">
              Join contests by paying the entry fee and submit your creative
              work
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-primary-custom/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">3️⃣</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Win Prizes</h3>
            <p className="text-muted">
              Get recognized for your talent and win amazing cash prizes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

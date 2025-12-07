import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContests } from "../../hooks/useContests";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaTrophy, FaSearch, FaFire, FaClock, FaFilter, FaStar, FaCalendarAlt } from "react-icons/fa";

const AllContests = () => {
  const { data: contests = [], isLoading } = useContests();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("type") || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Update active tab when URL params change
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setActiveTab(typeParam);
    }
  }, [searchParams]);

  const contestTypes = ["all", ...new Set(contests.map((c) => c.contestType))];

  // Filter and sort contests
  let filteredContests = contests.filter((c) => c.status === "confirmed");

  // Apply category filter
  if (activeTab !== "all") {
    filteredContests = filteredContests.filter((c) => c.contestType === activeTab);
  }

  // Apply search filter
  if (searchQuery.trim()) {
    filteredContests = filteredContests.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.contestType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply sorting
  filteredContests = [...filteredContests].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.participantsCount - a.participantsCount;
      case "prize-high":
        return b.prizeMoney - a.prizeMoney;
      case "prize-low":
        return a.prizeMoney - b.prizeMoney;
      case "newest":
        return new Date(b.deadline || 0) - new Date(a.deadline || 0);
      default:
        return 0;
    }
  });

  const handleContestClick = (contestId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/contest/${contestId}`);
    }
  };

  const handleTabChange = (type) => {
    setActiveTab(type);
    if (type === "all") {
      navigate("/all-contests");
    } else {
      navigate(`/all-contests?type=${encodeURIComponent(type)}`);
    }
  };

  const clearFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSortBy("popular");
    navigate("/all-contests");
  };

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
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
              <FaTrophy className="text-5xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Contests</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover amazing opportunities to showcase your talent and win incredible prizes
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-center gap-2">
              <FaSearch className="text-slate-400 ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contests by name, description, or type..."
                className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none px-2 py-3"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  showFilters
                    ? "bg-white text-indigo-600"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <FaFilter />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <FaStar className="text-amber-400" />
                  Sort By
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "popular", label: "Most Popular", icon: FaFire },
                    { value: "prize-high", label: "Highest Prize", icon: FaTrophy },
                    { value: "prize-low", label: "Lowest Prize", icon: FaTrophy },
                    { value: "newest", label: "Newest", icon: FaClock },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSortBy(option.value)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 justify-center ${
                        sortBy === option.value
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      <option.icon className="text-sm" />
                      <span className="text-sm">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {contestTypes.map((type, idx) => (
              <motion.button
                key={type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabChange(type)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === type
                    ? "text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {activeTab === type && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {type === "all" && <FaStar className="text-amber-400" />}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <p className="text-slate-400 text-lg">
            Found <span className="text-white font-bold">{filteredContests.length}</span> contest{filteredContests.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Contests Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <FaTrophy className="text-6xl text-indigo-500" />
            </motion.div>
            <p className="text-slate-400 text-lg">Loading amazing contests...</p>
          </div>
        ) : filteredContests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🔍
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-3">
              No contests found
            </h3>
            <p className="text-xl text-slate-400 mb-6">
              Try adjusting your filters or search query
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all"
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredContests.map((contest, idx) => (
                <motion.div
                  key={contest._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative cursor-pointer"
                  onClick={() => handleContestClick(contest._id)}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />

                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl overflow-hidden transition-all">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={contest.image}
                        alt={contest.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      
                      {/* Type Badge */}
                      <motion.div
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                      >
                        {contest.contestType}
                      </motion.div>

                      {/* Prize Badge */}
                      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">
                        <FaTrophy className="text-amber-400" />
                        ${contest.prizeMoney.toLocaleString()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                        {contest.name}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {contest.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <div className="bg-blue-500/20 p-2 rounded-lg">
                            <FaUsers className="text-blue-400" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Participants</div>
                            <div className="font-bold text-white">{contest.participantsCount}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                          <div className="bg-amber-500/20 p-2 rounded-lg">
                            <FaCalendarAlt className="text-amber-400" />
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-500">Deadline</div>
                            <div className="font-bold text-white text-sm">
                              {contest.deadline ? new Date(contest.deadline).toLocaleDateString() : "TBA"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-indigo-500/50 transition-all"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load More (if needed) */}
        {filteredContests.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-slate-400">
              Showing all {filteredContests.length} contest{filteredContests.length !== 1 ? "s" : ""}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllContests;
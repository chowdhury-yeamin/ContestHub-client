import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContests } from "../../hooks/useContests";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { FaUsers, FaTrophy } from "react-icons/fa";

const AllContests = () => {
  const { data: contests = [], isLoading } = useContests();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("type") || "all");

  // Get unique contest types
  const contestTypes = ["all", ...new Set(contests.map((c) => c.contestType))];

  // Filter contests
  const filteredContests =
    activeTab === "all"
      ? contests.filter((c) => c.status === "confirmed")
      : contests.filter(
          (c) => c.status === "confirmed" && c.contestType === activeTab
        );

  const handleContestClick = (contestId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/contest/${contestId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* All contests page with color scheme */}
      <h1 className="text-4xl font-bold text-base-content mb-8">
        All Contests
      </h1>

      {/* Tabs with color scheme */}
      <div className="tabs tabs-boxed mb-8 flex-wrap bg-base-200">
        {contestTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`tab ${
              activeTab === type
                ? "tab-active bg-primary-custom text-white"
                : "hover:text-primary-custom"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Contests Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : filteredContests.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-muted mb-2">
            No contests found in this category.
          </p>
          <p className="text-sm text-muted">Try selecting a different category or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => (
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
                  <span className="flex items-center gap-1">
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
    </div>
  );
};

export default AllContests;

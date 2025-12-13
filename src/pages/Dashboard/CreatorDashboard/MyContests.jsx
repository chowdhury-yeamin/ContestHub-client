import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaTrophy,
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaPlus,
  FaSearch,
  FaDollarSign,
} from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { useMyContests } from "../../../hooks/useCreator";
import { useDeleteContest } from "../../../hooks/useContests";
import Swal from "sweetalert2";

const MyContests = () => {
  const { data: contests = [], isLoading, refetch } = useMyContests();
  const deleteMutation = useDeleteContest();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const contestsArray = Array.isArray(contests?.contests)
    ? contests.contests
    : [];

  // Filter contests
  let filteredContests = contestsArray;
  if (filterStatus !== "all") {
    filteredContests = filteredContests.filter(
      (c) => c.status === filterStatus
    );
  }
  if (searchQuery.trim()) {
    filteredContests = filteredContests.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleDelete = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${contestName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(contestId);
        Swal.fire("Deleted!", "Contest has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete contest.", "error");
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: "bg-gradient-to-r from-emerald-500 to-teal-500",
      pending: "bg-gradient-to-r from-amber-500 to-orange-500",
      rejected: "bg-gradient-to-r from-red-500 to-pink-500",
    };
    const icons = {
      confirmed: "✓",
      pending: "⏳",
      rejected: "✕",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${styles[status]}`}
      >
        {icons[status]} {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaTrophy className="text-6xl text-indigo-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                  <FaTrophy className="text-3xl text-white" />
                </div>
                My Contests
              </h1>
              <p className="text-slate-400 text-lg">
                Manage and track your created contests
              </p>
            </div>

            <Link
              to="/dashboard/add-contest"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2 justify-center group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform" />
              Create New Contest
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Contests</p>
                <p className="text-3xl font-bold text-white">
                  {contestsArray.length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl">
                <FaTrophy className="text-2xl text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Active</p>
                <p className="text-3xl font-bold text-white">
                  {contestsArray.filter((c) => c.status === "confirmed").length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-3 rounded-xl">
                <Sparkles className="text-2xl text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">
                  Total Participants
                </p>
                <p className="text-3xl font-bold text-white">
                  {contestsArray.reduce(
                    (sum, c) => sum + (c.participantsCount || 0),
                    0
                  )}
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-3 rounded-xl">
                <FaUsers className="text-2xl text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contests..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="md:col-span-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="all" className="bg-slate-900">
                  All Status
                </option>
                <option value="confirmed" className="bg-slate-900">
                  Confirmed
                </option>
                <option value="pending" className="bg-slate-900">
                  Pending
                </option>
                <option value="rejected" className="bg-slate-900">
                  Rejected
                </option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="md:col-span-2 flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  viewMode === "table"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredContests.length === 0 && (
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
              📝
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-3">
              {searchQuery || filterStatus !== "all"
                ? "No contests match your filters"
                : "No contests yet"}
            </h3>
            <p className="text-xl text-slate-400 mb-6">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Start by creating your first contest"}
            </p>
            <Link
              to="/dashboard/add-contest"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all"
            >
              <FaPlus />
              Create Your First Contest
            </Link>
          </motion.div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && filteredContests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map((contest, idx) => (
              <motion.div
                key={contest._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl overflow-hidden transition-all">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <img
                      src={
                        contest.image || "https://via.placeholder.com/400x300"
                      }
                      alt={contest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                    <div className="absolute top-4 right-4">
                      {getStatusBadge(contest.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                      {contest.name}
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center gap-2 text-blue-400 mb-1">
                          <FaUsers className="text-sm" />
                          <span className="text-xs text-slate-400">
                            Participants
                          </span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {contest.participantsCount || 0}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                          <FaDollarSign className="text-sm" />
                          <span className="text-xs text-slate-400">Prize</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          ${contest.prizeMoney || 0}
                        </p>
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-2 text-slate-300 mb-4 pb-4 border-b border-white/10">
                      <FaCalendarAlt className="text-amber-400" />
                      <span className="text-sm">
                        {new Date(contest.deadline).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mb-3">
                      <Link
                        to={`/contest/${contest._id}`}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <FaEye />
                        View
                      </Link>
                      {contest.status === "pending" && (
                        <>
                          <Link
                            to={`/dashboard/edit-contest/${contest._id}`}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg transition-all"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(contest._id, contest.name)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg transition-all"
                            title="Delete"
                            disabled={deleteMutation.isLoading}
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Submissions Button */}
                    <Link
                      to={`/dashboard/submissions/${contest._id}`}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      View Submissions ({contest.submissionsCount || 0})
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && filteredContests.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Contest
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Participants
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Prize
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Deadline
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContests.map((contest, idx) => (
                    <motion.tr
                      key={contest._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              contest.image ||
                              "https://via.placeholder.com/400x300"
                            }
                            alt={contest.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="font-semibold text-white">
                            {contest.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(contest.status)}
                      </td>
                      <td className="px-6 py-4 text-white font-semibold">
                        {contest.participantsCount || 0}
                      </td>
                      <td className="px-6 py-4 text-white font-semibold">
                        ${contest.prizeMoney || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {new Date(contest.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/contest/${contest._id}`}
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          {contest.status === "pending" && (
                            <>
                              <Link
                                to={`/dashboard/edit-contest/${contest._id}`}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-all"
                                title="Edit"
                              >
                                <FaEdit />
                              </Link>
                              <button
                                onClick={() =>
                                  handleDelete(contest._id, contest.name)
                                }
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all"
                                title="Delete"
                                disabled={deleteMutation.isLoading}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                          <Link
                            to={`/dashboard/submissions/${contest._id}`}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-3 py-2 rounded-lg transition-all text-sm font-semibold"
                          >
                            Submissions
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContests;

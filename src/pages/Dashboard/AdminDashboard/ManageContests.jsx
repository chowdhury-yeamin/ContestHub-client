import {
  useAdminContests,
  useApproveContest,
  useRejectContest,
  useAdminDeleteContest,
} from "../../../hooks/useAdmin";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaCheck,
  FaTimes,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";

const ManageContests = () => {
  const { data: contests = [], isLoading } = useAdminContests();
  const approveMutation = useApproveContest();
  const rejectMutation = useRejectContest();
  const deleteMutation = useAdminDeleteContest();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const itemsPerPage = 10;

  // Filter contests by status
  const filteredContests = contests.filter((contest) =>
    filterStatus === "all" ? true : contest.status === filterStatus
  );

  const paginatedContests = filteredContests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);

  const handleApprove = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Approve Contest",
      text: `Approve "${contestName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve!",
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await approveMutation.mutateAsync(contestId);
        Swal.fire({
          title: "Approved!",
          text: "Contest has been approved.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#10b981",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to approve contest.",
          icon: "error",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  const handleReject = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Reject Contest",
      text: `Reject "${contestName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject!",
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await rejectMutation.mutateAsync(contestId);
        Swal.fire({
          title: "Rejected!",
          text: "Contest has been rejected.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to reject contest.",
          icon: "error",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  const handleDelete = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Delete Contest",
      text: `Delete "${contestName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(contestId);
        Swal.fire({
          title: "Deleted!",
          text: "Contest has been deleted.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#10b981",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete contest.",
          icon: "error",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "from-green-500 to-emerald-500";
      case "rejected":
        return "from-red-500 to-rose-500";
      default:
        return "from-yellow-500 to-orange-500";
    }
  };

  const stats = [
    {
      label: "Total Contests",
      value: contests.length,
      icon: FaTrophy,
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Pending",
      value: contests.filter((c) => c.status === "pending").length,
      icon: FaHourglassHalf,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Approved",
      value: contests.filter((c) => c.status === "confirmed").length,
      icon: FaCheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Rejected",
      value: contests.filter((c) => c.status === "rejected").length,
      icon: FaTimesCircle,
      color: "from-red-500 to-rose-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
          <FaTrophy className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white">Manage Contests</h2>
          <p className="text-slate-400">Review and moderate all contests</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
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
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {["all", "pending", "confirmed", "rejected"].map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFilterStatus(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              filterStatus === status
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                : "bg-white/5 hover:bg-white/10 border border-white/20 text-white"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Contests Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur-xl opacity-20" />
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
          {filteredContests.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-xl text-slate-300">
                No {filterStatus !== "all" ? filterStatus : ""} contests found.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                        CONTEST
                      </th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                        CREATOR
                      </th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                        STATUS
                      </th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                        STATS
                      </th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                        CREATED
                      </th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedContests.map((contest, idx) => {
                      const statusColor = getStatusColor(contest.status);

                      return (
                        <motion.tr
                          key={contest._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
                                <img
                                  src={contest.image}
                                  alt={contest.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              </div>
                              <div>
                                <div className="text-white font-semibold">
                                  {contest.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <div className="text-white font-medium">
                                {contest.creatorName}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${statusColor} bg-opacity-20 border border-white/20`}
                            >
                              <span className="text-white font-semibold text-sm capitalize">
                                {contest.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-slate-300 text-sm">
                                <FaUsers className="text-slate-500 text-sm" />
                                <span>({contest.participantsCount})Joined</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-300 text-sm">
                                <FaDollarSign className="text-slate-500 text-xs" />
                                <span>{contest.prizeMoney}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                              <FaCalendarAlt className="text-slate-500 text-xs" />
                              <span>
                                {new Date(
                                  contest.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              {contest.status === "pending" && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleApprove(contest._id, contest.name)
                                    }
                                    disabled={approveMutation.isPending}
                                    className="w-9 h-9 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-400 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Approve"
                                  >
                                    <FaCheck />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleReject(contest._id, contest.name)
                                    }
                                    disabled={rejectMutation.isPending}
                                    className="w-9 h-9 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Reject"
                                  >
                                    <FaTimes />
                                  </motion.button>
                                </>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  handleDelete(contest._id, contest.name)
                                }
                                disabled={deleteMutation.isPending}
                                className="w-9 h-9 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Delete"
                              >
                                <FaTrash />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-6 px-6 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-purple-500/50 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft />
                  </motion.button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <motion.button
                          key={page}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                            currentPage === page
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-500/50 shadow-lg shadow-purple-500/30"
                              : "bg-white/5 hover:bg-white/10 border border-white/20 hover:border-purple-500/50 text-white"
                          }`}
                        >
                          {page}
                        </motion.button>
                      )
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-purple-500/50 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <FaChevronRight />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageContests;

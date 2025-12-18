import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import {
  FaCrown,
  FaFileAlt,
  FaSearch,
  FaEye,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  useAllCreatorSubmissions,
  useDeclareWinner,
} from "../../../hooks/useContests";

const Submissions = () => {
  const { data, isLoading } = useAllCreatorSubmissions();
  const declareWinnerMutation = useDeclareWinner();

  const submissions = Array.isArray(data) ? data : data?.submissions || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterContest, setFilterContest] = useState("all");
  const [previewSubmission, setPreviewSubmission] = useState(null);

  /* ---------------- DERIVED DATA ---------------- */

const uniqueContests = useMemo(() => {
    const map = new Map();

    submissions.forEach((s) => {
      const contestId =
        typeof s.contest === "object" ? s.contest?._id : s.contest;

      if (contestId && s.contestName && !map.has(contestId)) {
        map.set(contestId, {
          id: contestId.toString(),
          name: s.contestName,
        });
      }
    });

    return Array.from(map.values());
  }, [submissions]);

  // Track contests that already have a winner
  const contestHasWinner = useMemo(() => {
    const map = {};
    submissions.forEach((s) => {
      const contestId =
        typeof s.contest === "object" ? s.contest?._id : s.contest;

      if (s.isWinner && contestId) {
        map[contestId.toString()] = true;
      }
    });
    return map;
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((s) => {
        const q = searchTerm.toLowerCase();

        const contestId =
          typeof s.contest === "object" ? s.contest?._id : s.contest;

        const matchesSearch =
          s.participant?.name?.toLowerCase().includes(q) ||
          s.participant?.email?.toLowerCase().includes(q) ||
          s.contestName?.toLowerCase().includes(q);

        const matchesContest =
          filterContest === "all" || contestId?.toString() === filterContest;

        return matchesSearch && matchesContest;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.submittedAt) - new Date(a.submittedAt);
        }
        if (sortBy === "oldest") {
          return new Date(a.submittedAt) - new Date(b.submittedAt);
        }
        if (sortBy === "name") {
          return a.participant?.name?.localeCompare(b.participant?.name);
        }
        return 0;
      });
  }, [submissions, searchTerm, sortBy, filterContest]);

  /* ---------------- ACTIONS ---------------- */

  const handleDeclareWinner = async (submission) => {
    if (!submission?._id) return;

    const contestId =
      typeof submission.contest === "object"
        ? submission.contest?._id
        : submission.contest;

    if (contestHasWinner[contestId?.toString()]) {
      Swal.fire({
        icon: "error",
        title: "Winner Already Declared",
        text: "This contest already has a winner.",
        background: "#0f172a",
        color: "#fff",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Declare Winner?",
      html: `
        <p style="color:#94a3b8">Participant</p>
        <h3 style="color:#f59e0b">${submission.participant.name}</h3>
        <p style="color:#94a3b8">Contest</p>
        <h4 style="color:#6366f1">${submission.contestName}</h4>
      `,
      showCancelButton: true,
      confirmButtonText: "Declare Winner",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      background: "#0f172a",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await declareWinnerMutation.mutateAsync({
        submissionId: submission._id,
      });

      Swal.fire({
        icon: "success",
        title: "Winner Declared",
        timer: 2000,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.response?.data?.error || "Something went wrong",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-20">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity }}>
          <FaFileAlt className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading submissions...</p>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-white">Submitted Tasks</h2>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search participant / contest"
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>

        <select
          value={filterContest}
          onChange={(e) => setFilterContest(e.target.value)}
          className="px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-white"
        >
          <option value="all">All Contests</option>
          {uniqueContests.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-white"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSubmissions.map((s) => {
          const contestId =
            typeof s.contest === "object" ? s.contest?._id : s.contest;

          const hasWinner = contestHasWinner[contestId?.toString()];
          const deadlinePassed = new Date(s.contestDeadline) < new Date();

          return (
            <div
              key={s._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold">{s.participant?.name}</h3>
              <p className="text-slate-400">{s.contestName}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setPreviewSubmission(s)}
                  className="flex-1 bg-indigo-600/20 text-indigo-400 py-2 rounded-lg"
                >
                  <FaEye className="inline mr-2" />
                  View
                </button>

                {deadlinePassed && !hasWinner && !s.isWinner && (
                  <button
                    onClick={() => handleDeclareWinner(s)}
                    className="flex-1 bg-amber-600 text-white py-2 rounded-lg"
                  >
                    Declare Winner
                  </button>
                )}
              </div>

              {s.isWinner && (
                <div className="mt-4 flex items-center justify-center text-amber-400 text-xl font-bold">
                  <FaCrown className="mr-2" /> Winner
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewSubmission && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewSubmission(null)}
          >
            <motion.div
              className="bg-slate-900 p-6 rounded-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-xl font-bold mb-4">
                Submission Details
              </h3>

              <p className="text-slate-300">
                <FaUser className="inline mr-2" />
                {previewSubmission.participant?.name}
              </p>

              <p className="text-slate-300">
                <FaEnvelope className="inline mr-2" />
                {previewSubmission.participant?.email}
              </p>

              <p className="text-slate-300 mt-2">
                <FaCalendarAlt className="inline mr-2" />
                {new Date(previewSubmission.submittedAt).toLocaleString()}
              </p>

              <button
                onClick={() => setPreviewSubmission(null)}
                className="mt-6 w-full bg-slate-700 text-white py-2 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Submissions;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import {
  FaTrophy,
  FaCrown,
  FaFileAlt,
  FaClock,
  FaExternalLinkAlt,
  FaMedal,
  FaStar,
  FaEye,
  FaSearch,
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
  const [viewMode, setViewMode] = useState("grid");
  const [filterContest, setFilterContest] = useState("all");
  const [previewSubmission, setPreviewSubmission] = useState(null);

  /* ----------------------------------
     Derived Data
  ---------------------------------- */

  const uniqueContests = useMemo(() => {
    const map = new Map();
    submissions.forEach((sub) => {
      if (sub.contestName && !map.has(sub.contestName)) {
        map.set(sub.contestName, {
          id: sub.contest,
          name: sub.contestName,
        });
      }
    });
    return Array.from(map.values());
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((sub) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
          sub.participant.name.toLowerCase().includes(search) ||
          sub.participant.email.toLowerCase().includes(search) ||
          sub.contestName?.toLowerCase().includes(search);

        const matchesContest =
          filterContest === "all" || sub.contest?.toString() === filterContest;

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
          return a.participant.name.localeCompare(b.participant.name);
        }
        if (sortBy === "contest") {
          return (a.contestName || "").localeCompare(b.contestName || "");
        }
        return 0;
      });
  }, [submissions, searchTerm, sortBy, filterContest]);

  const stats = useMemo(() => {
    const totalSubmissions = submissions.length;
    const totalWinners = submissions.filter((s) => s.isWinner).length;
    const totalContests = uniqueContests.length;
    const totalPrizeMoney = submissions.reduce(
      (sum, s) => sum + (s.isWinner ? s.contestPrizeMoney || 0 : 0),
      0
    );

    return {
      totalSubmissions,
      totalWinners,
      totalContests,
      totalPrizeMoney,
    };
  }, [submissions, uniqueContests]);

  /* ----------------------------------
     Actions
  ---------------------------------- */

  const handleDeclareWinner = async (
    submissionId,
    participantName,
    contestName
  ) => {
    const result = await Swal.fire({
      title: "Declare Winner",
      html: `
        <div style="text-align:center">
          <div style="font-size:4rem">🏆</div>
          <p style="color:#94a3b8">Declare</p>
          <p style="font-size:1.5rem;font-weight:700;color:#f59e0b">
            ${participantName}
          </p>
          <p style="color:#94a3b8">as winner of</p>
          <p style="font-weight:700;color:#6366f1">
            ${contestName}
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      background: "#0f172a",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await declareWinnerMutation.mutateAsync({
        winnerId: submissionId,
      });

      Swal.fire({
        icon: "success",
        title: "Winner Declared!",
        background: "#0f172a",
        color: "#fff",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.response?.data?.error || "Failed to declare winner.",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  /* ----------------------------------
     Loading
  ---------------------------------- */

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaFileAlt className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-white">All Submitted Tasks</h2>
        <p className="text-slate-400">
          Review submissions from all your contests
        </p>
      </div>

      {/* Search & Filters */}
      {submissions.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-neutral-900 border border-white/10
    rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-neutral-800 transition duration-300 ease-in-out"
            >
              <option value="newest" className="bg-neutral-900 text-white">
                Newest
              </option>
              <option value="oldest" className="bg-neutral-900  text-white">
                Oldest
              </option>
              <option value="name" className="bg-neutral-900 text-white">
                Name
              </option>
              <option value="contest" className="bg-neutral-900 text-white">
                Contest
              </option>
            </select>
          </div>
        </div>
      )}
      {/* Submissions */}

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
            : "space-y-4"
        }
      >
        {filteredSubmissions.map((submission) => {
          const isWinner = submission.isWinner;
          const isDeadlinePassed =
            new Date(submission.contestDeadline) < new Date();

          return (
            <div
              key={submission._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white font-black">
                {submission.participant.name}
              </h3>

              <p className="text-slate-400 text-sm">
                {submission.participant.email}
              </p>

              <a
                href={submission.submission}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-indigo-400"
              >
                {submission.submission}
                <FaExternalLinkAlt />
              </a>

              {isDeadlinePassed && !isWinner && (
                <button
                  onClick={() =>
                    handleDeclareWinner(
                      submission._id,
                      submission.participant.name,
                      submission.contestName
                    )
                  }
                  disabled={declareWinnerMutation.isPending}
                  className="mt-4 w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-bold"
                >
                  Declare Winner
                </button>
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
            onClick={() => setPreviewSubmission(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Submissions;

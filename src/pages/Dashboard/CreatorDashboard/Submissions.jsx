import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FaCrown,
  FaFileAlt,
  FaSearch,
  FaEye,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaDownload,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileArchive,
  FaFileCode,
} from "react-icons/fa";
import {
  useAllCreatorSubmissions,
  useDeclareWinner,
} from "../../../hooks/useContests";

const Submissions = () => {
  const { data, isLoading, error, isError } = useAllCreatorSubmissions();
  const declareWinnerMutation = useDeclareWinner();

  const submissions = Array.isArray(data) ? data : data?.submissions || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterContest, setFilterContest] = useState("all");
  const [previewSubmission, setPreviewSubmission] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log("Submissions data:", submissions);
    console.log("Data length:", submissions.length);
    console.log("Loading:", isLoading);
    console.log("Error:", error);
  }, [submissions, isLoading, error]);

  /* ---------------- HELPER FUNCTIONS ---------------- */

  // Get file icon based on file extension
  const getFileIcon = (filename) => {
    if (!filename) return <FaFileAlt />;

    const ext = filename.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext)) {
      return <FaFileImage className="text-blue-400" />;
    }
    if (ext === "pdf") {
      return <FaFilePdf className="text-red-400" />;
    }
    if (["doc", "docx"].includes(ext)) {
      return <FaFileWord className="text-blue-600" />;
    }
    if (["zip", "rar", "7z"].includes(ext)) {
      return <FaFileArchive className="text-yellow-400" />;
    }
    if (["js", "jsx", "ts", "tsx", "html", "css", "py", "java"].includes(ext)) {
      return <FaFileCode className="text-green-400" />;
    }

    return <FaFileAlt className="text-slate-400" />;
  };

  // Get file download URL
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    // Adjust this based on your file storage setup
    return `/uploads/${filePath}`;
  };

  /* ---------------- DERIVED DATA ---------------- */

  const uniqueContests = useMemo(() => {
    const map = new Map();

    submissions.forEach((s) => {
      const contestId =
        typeof s.contest === "object" ? s.contest?._id : s.contest;
      const contestIdStr = contestId?.toString();

      if (contestIdStr && s.contestName && !map.has(contestIdStr)) {
        map.set(contestIdStr, {
          id: contestIdStr,
          name: s.contestName,
        });
      }
    });

    const contests = Array.from(map.values());
    console.log("Unique contests:", contests);
    return contests;
  }, [submissions]);

  const contestHasWinner = useMemo(() => {
    const map = {};
    submissions.forEach((s) => {
      const contestId =
        typeof s.contest === "object" ? s.contest?._id : s.contest;
      const contestIdStr = contestId?.toString();

      if (s.isWinner && contestIdStr) {
        map[contestIdStr] = true;
      }
    });
    console.log("Contest winners map:", map);
    return map;
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    const filtered = submissions
      .filter((s) => {
        const q = searchTerm.toLowerCase();

        const contestId =
          typeof s.contest === "object" ? s.contest?._id : s.contest;
        const contestIdStr = contestId?.toString();

        const matchesSearch =
          s.participant?.name?.toLowerCase().includes(q) ||
          s.participant?.email?.toLowerCase().includes(q) ||
          s.contestName?.toLowerCase().includes(q);

        const matchesContest =
          filterContest === "all" || contestIdStr === filterContest;

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

    console.log("Filtered submissions:", filtered.length);
    return filtered;
  }, [submissions, searchTerm, sortBy, filterContest]);

  /* ---------------- ACTIONS ---------------- */

  const handleDeclareWinner = async (submission) => {
    if (!submission?._id) {
      console.error("No submission ID found");
      return;
    }

    const contestId =
      typeof submission.contest === "object"
        ? submission.contest?._id
        : submission.contest;
    const contestIdStr = contestId?.toString();

    console.log("Declaring winner for:", {
      submission,
      contestId: contestIdStr,
    });

    if (contestHasWinner[contestIdStr]) {
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
        <h3 style="color:#f59e0b">${
          submission.participant?.name || "Unknown"
        }</h3>
        <p style="color:#94a3b8">Contest</p>
        <h4 style="color:#6366f1">${submission.contestName || "Unknown"}</h4>
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
      console.error("Error declaring winner:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.response?.data?.error || "Something went wrong",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  const handleDownload = (submission) => {
    if (!submission.filePath) return;

    const fileUrl = getFileUrl(submission.filePath);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = submission.fileOriginalName || submission.filePath;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ---------------- ERROR STATE ---------------- */

  if (isError) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Failed to Load Submissions
        </h3>
        <p className="text-slate-400 mb-4">
          {error?.message || "An error occurred while fetching submissions"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <FaFileAlt className="text-6xl text-indigo-500" />
        </motion.div>
        <p className="mt-4 text-slate-400">Loading submissions...</p>
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <FaFileAlt className="text-6xl text-slate-600 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          No Submissions Yet
        </h3>
        <p className="text-slate-400">
          Submissions will appear here once users start submitting to your
          contests
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-white">Submitted Tasks</h2>
        <span className="text-slate-400">
          {filteredSubmissions.length} submission
          {filteredSubmissions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search participant / contest"
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500"
          />
        </div>

        <select
          value={filterContest}
          onChange={(e) => setFilterContest(e.target.value)}
          className="px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-white"
        >
          <option value="all">All Contests ({submissions.length})</option>
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
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">By Name</option>
        </select>
      </div>

      {/* Submissions */}
      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-slate-400">No submissions match your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSubmissions.map((s) => {
            const contestId =
              typeof s.contest === "object" ? s.contest?._id : s.contest;
            const contestIdStr = contestId?.toString();

            const hasWinner = contestHasWinner[contestIdStr];
            const deadlinePassed = s.contestDeadline
              ? new Date(s.contestDeadline) < new Date()
              : false;

            return (
              <div
                key={s._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {s.participant?.name || "Unknown Participant"}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {s.contestName || "Unknown Contest"}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {new Date(s.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {s.isWinner && (
                    <div className="flex items-center text-amber-400 text-sm font-bold">
                      <FaCrown className="mr-1" /> Winner
                    </div>
                  )}
                </div>

                {/* Submission Content Preview */}
                <div className="bg-black/20 rounded-lg p-4 mb-4 border border-white/5">
                  <p className="text-xs text-slate-500 mb-2">Submitted Work:</p>

                  {/* Text Submission */}
                  {s.submission && (
                    <p className="text-slate-300 text-sm mb-2 line-clamp-3">
                      {s.submission}
                    </p>
                  )}

                  {/* File Submission */}
                  {s.filePath && (
                    <div className="flex items-center gap-2 mt-2 bg-white/5 p-2 rounded">
                      <span className="text-2xl">
                        {getFileIcon(s.fileOriginalName)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {s.fileOriginalName || "Uploaded file"}
                        </p>
                        <p className="text-slate-500 text-xs">
                          Click to download
                        </p>
                      </div>
                    </div>
                  )}

                  {!s.submission && !s.filePath && (
                    <p className="text-slate-500 text-sm italic">
                      No content provided
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setPreviewSubmission(s)}
                    className="flex-1 bg-indigo-600/20 text-indigo-400 py-2 rounded-lg hover:bg-indigo-600/30 transition-colors flex items-center justify-center"
                  >
                    <FaEye className="mr-2" />
                    View Full
                  </button>

                  {s.filePath && (
                    <button
                      onClick={() => handleDownload(s)}
                      className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600/30 transition-colors"
                    >
                      <FaDownload />
                    </button>
                  )}

                  {deadlinePassed && !hasWinner && !s.isWinner && (
                    <button
                      onClick={() => handleDeclareWinner(s)}
                      className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center"
                    >
                      <FaCrown className="mr-2" />
                      Declare Winner
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal - Enhanced */}
      <AnimatePresence>
        {previewSubmission && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewSubmission(null)}
          >
            <motion.div
              className="bg-slate-900 p-6 rounded-xl w-full max-w-2xl border border-white/10 my-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-2xl font-bold">
                  Submission Details
                </h3>
                {previewSubmission.isWinner && (
                  <div className="flex items-center text-amber-400 font-bold">
                    <FaCrown className="mr-2" /> Winner
                  </div>
                )}
              </div>

              {/* Participant Info */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h4 className="text-white font-semibold mb-3">
                  Participant Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-300">
                    <FaUser className="mr-3 text-indigo-400" />
                    <div>
                      <p className="text-xs text-slate-500">Name</p>
                      <p className="font-medium">
                        {previewSubmission.participant?.name || "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-slate-300">
                    <FaEnvelope className="mr-3 text-indigo-400" />
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="font-medium">
                        {previewSubmission.participant?.email || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-slate-300">
                    <FaCalendarAlt className="mr-3 text-indigo-400" />
                    <div>
                      <p className="text-xs text-slate-500">Submitted</p>
                      <p className="font-medium">
                        {new Date(
                          previewSubmission.submittedAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission Content */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h4 className="text-white font-semibold mb-3">
                  Submitted Work
                </h4>

                {/* Text Content */}
                {previewSubmission.submission && (
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">
                      Text Submission:
                    </p>
                    <div className="bg-black/30 rounded p-4 max-h-64 overflow-y-auto">
                      <p className="text-slate-200 whitespace-pre-wrap">
                        {previewSubmission.submission}
                      </p>
                    </div>
                  </div>
                )}

                {/* File Attachment */}
                {previewSubmission.filePath && (
                  <div>
                    <p className="text-xs text-slate-500 mb-2">
                      File Attachment:
                    </p>
                    <div className="flex items-center gap-3 bg-black/30 p-4 rounded">
                      <span className="text-4xl">
                        {getFileIcon(previewSubmission.fileOriginalName)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                          {previewSubmission.fileOriginalName ||
                            "Uploaded file"}
                        </p>
                        <p className="text-slate-400 text-sm">
                          Click download button to save
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownload(previewSubmission)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FaDownload />
                        Download
                      </button>
                    </div>
                  </div>
                )}

                {!previewSubmission.submission &&
                  !previewSubmission.filePath && (
                    <p className="text-slate-500 italic">No content provided</p>
                  )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setPreviewSubmission(null)}
                  className="flex-1 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>

                {previewSubmission.contestDeadline &&
                  new Date(previewSubmission.contestDeadline) < new Date() &&
                  !contestHasWinner[
                    (typeof previewSubmission.contest === "object"
                      ? previewSubmission.contest?._id
                      : previewSubmission.contest
                    )?.toString()
                  ] &&
                  !previewSubmission.isWinner && (
                    <button
                      onClick={() => {
                        setPreviewSubmission(null);
                        handleDeclareWinner(previewSubmission);
                      }}
                      className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCrown />
                      Declare Winner
                    </button>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Submissions;

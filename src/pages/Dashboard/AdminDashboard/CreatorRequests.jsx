import {
  useAdminCreatorRequests,
  useProcessCreatorRequest,
} from "../../../hooks/useCreatorRequests";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaUser, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";

const CreatorRequests = () => {
  const { data: requests = [], isLoading } = useAdminCreatorRequests();
  const processMutation = useProcessCreatorRequest();

  const handleProcess = async (requestId, userName, status) => {
    const result = await Swal.fire({
      title: `${status === "approved" ? "Approve" : "Reject"} Request`,
      text: `${
        status === "approved" ? "Approve" : "Reject"
      } ${userName}'s creator request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${
        status === "approved" ? "approve" : "reject"
      }!`,
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await processMutation.mutateAsync({ requestId, status });
        Swal.fire({
          title: "Success!",
          text: `Request ${status} successfully.`,
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#10b981",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to process request.",
          icon: "error",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const processedRequests = requests.filter((r) => r.status !== "pending");

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-white">Creator Requests</h2>

      {/* Pending Requests */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">
          Pending Requests ({pendingRequests.length})
        </h3>
        <div className="grid gap-4">
          {pendingRequests.map((request) => (
            <motion.div
              key={request._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      request.userPhoto ||
                      `https://ui-avatars.com/api/?name=${request.userName}`
                    }
                    alt={request.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-white font-bold">{request.userName}</h4>
                    <p className="text-slate-400 text-sm">
                      {request.userEmail}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleProcess(request._id, request.userName, "approved")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    disabled={processMutation.isLoading}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    onClick={() =>
                      handleProcess(request._id, request.userName, "rejected")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    disabled={processMutation.isLoading}
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {pendingRequests.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No pending requests
            </div>
          )}
        </div>
      </div>

      {/* Processed Requests */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">
          Processed Requests
        </h3>
        <div className="grid gap-4">
          {processedRequests.slice(0, 10).map((request) => (
            <div
              key={request._id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    request.userPhoto ||
                    `https://ui-avatars.com/api/?name=${request.userName}`
                  }
                  alt={request.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-white font-semibold">{request.userName}</p>
                  <p className="text-slate-500 text-xs">{request.userEmail}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  request.status === "approved"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {request.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorRequests;

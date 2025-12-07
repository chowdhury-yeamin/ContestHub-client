import { useMyContests } from "../../../hooks/useCreator";
import { useDeleteContest } from "../../../hooks/useContests";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const MyContests = () => {
  const { data: contests = [], isLoading } = useMyContests();
  const deleteMutation = useDeleteContest();
  const navigate = useNavigate();

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
      } catch (error) {
        Swal.fire("Error!", "Failed to delete contest.", "error");
      }
    }
  };

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
        <h2 className="card-title mb-6">My Created Contests</h2>

        {contests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted">
              You haven't created any contests yet.
            </p>
            <Link
              to="/dashboard/add-contest"
              className="bg-accent-custom hover:bg-accent-custom/90 text-white border-0 mt-4 px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Create Your First Contest
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Contest</th>
                  <th>Status</th>
                  <th>Participants</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest) => (
                  <tr key={contest._id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <img
                          src={contest.image}
                          alt={contest.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold">{contest.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          contest.status === "confirmed"
                            ? "badge-success"
                            : contest.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {contest.status}
                      </span>
                    </td>
                    <td>{contest.participantsCount}</td>
                    <td>{new Date(contest.deadline).toLocaleDateString()}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/contest/${contest._id}`}
                          className="btn btn-sm btn-ghost hover:bg-primary-custom/10 hover:text-primary-custom"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>
                        {contest.status === "pending" && (
                          <>
                            <Link
                              to={`/dashboard/edit-contest/${contest._id}`}
                              className="btn btn-sm bg-primary-custom hover:bg-primary-custom/90 text-white border-0"
                              title="Edit"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() =>
                                handleDelete(contest._id, contest.name)
                              }
                              className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-0"
                              title="Delete"
                              disabled={deleteMutation.isPending}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                        <Link
                          to={`/dashboard/submissions/${contest._id}`}
                          className="btn btn-sm bg-accent-custom hover:bg-accent-custom/90 text-white border-0"
                        >
                          See Submissions
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContests;

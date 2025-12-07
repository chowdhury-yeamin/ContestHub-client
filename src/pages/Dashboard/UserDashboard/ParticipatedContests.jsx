import { useParticipatedContests } from "../../../hooks/useUsers";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaCheckCircle, FaFileAlt } from "react-icons/fa";
import { useState } from "react";

const ParticipatedContests = () => {
  const { data: participated = [], isLoading } = useParticipatedContests();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination
  const totalPages = Math.ceil(participated.length / itemsPerPage);
  const paginatedData = participated.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <h2 className="card-title mb-6">My Participated Contests</h2>

        {participated.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted">
              You haven't participated in any contests yet.
            </p>
            <Link
              to="/all-contests"
              className="bg-primary-custom hover:bg-primary-custom/90 text-white border-0 mt-4 px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Browse Contests
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Contest</th>
                    <th>Deadline</th>
                    <th>Payment Status</th>
                    <th>Submission Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center gap-4">
                          <img
                            src={item.contest.image}
                            alt={item.contest.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-bold">{item.contest.name}</div>
                            <div className="text-sm text-muted">
                              Prize: ${item.contest.prizeMoney}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt />
                          {new Date(item.contest.deadline).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success">
                          <FaCheckCircle className="mr-1" />
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td>
                        {item.submissionStatus === "submitted" ? (
                          <span className="badge badge-info">
                            <FaFileAlt className="mr-1" />
                            Submitted
                          </span>
                        ) : (
                          <span className="badge badge-warning">Pending</span>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/contest/${item.contest._id}`}
                          className="btn btn-sm bg-primary-custom hover:bg-primary-custom/90 text-white border-0"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <div className="join">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="join-item btn"
                  >
                    «
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`join-item btn ${
                          currentPage === page ? "btn-active" : ""
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="join-item btn"
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ParticipatedContests;

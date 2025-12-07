import { useAdminContests, useApproveContest, useRejectContest, useAdminDeleteContest } from '../../../hooks/useAdmin';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const ManageContests = () => {
  const { data: contests = [], isLoading } = useAdminContests();
  const approveMutation = useApproveContest();
  const rejectMutation = useRejectContest();
  const deleteMutation = useAdminDeleteContest();

  const handleApprove = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: 'Approve Contest',
      text: `Approve "${contestName}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, approve!',
    });

    if (result.isConfirmed) {
      try {
        await approveMutation.mutateAsync(contestId);
        Swal.fire('Approved!', 'Contest has been approved.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to approve contest.', 'error');
      }
    }
  };

  const handleReject = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: 'Reject Contest',
      text: `Reject "${contestName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reject!',
    });

    if (result.isConfirmed) {
      try {
        await rejectMutation.mutateAsync(contestId);
        Swal.fire('Rejected!', 'Contest has been rejected.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to reject contest.', 'error');
      }
    }
  };

  const handleDelete = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: 'Delete Contest',
      text: `Delete "${contestName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(contestId);
        Swal.fire('Deleted!', 'Contest has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete contest.', 'error');
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
        <h2 className="card-title mb-6">Manage Contests</h2>
        
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Contest Name</th>
                <th>Creator</th>
                <th>Status</th>
                <th>Participants</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest._id}>
                  <td className="font-bold">{contest.name}</td>
                  <td>
                    <div>
                      <div>{contest.creator.name}</div>
                      <div className="text-sm text-muted">{contest.creator.email}</div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        contest.status === 'confirmed'
                          ? 'badge-success'
                          : contest.status === 'rejected'
                          ? 'badge-error'
                          : 'badge-warning'
                      }`}
                    >
                      {contest.status}
                    </span>
                  </td>
                  <td>{contest.participantsCount}</td>
                  <td>{new Date(contest.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      {contest.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(contest._id, contest.name)}
                            className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-0"
                            disabled={approveMutation.isPending}
                            title="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleReject(contest._id, contest.name)}
                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-0"
                            disabled={rejectMutation.isPending}
                            title="Reject"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(contest._id, contest.name)}
                        className="btn btn-sm btn-error"
                        disabled={deleteMutation.isPending}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageContests;


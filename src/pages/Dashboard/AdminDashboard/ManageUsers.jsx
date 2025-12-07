import { useAllUsers, useChangeUserRole } from "../../../hooks/useAdmin";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
  const { data: users = [], isLoading } = useAllUsers();
  const changeRoleMutation = useChangeUserRole();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleRoleChange = async (userId, currentRole, newRole) => {
    const result = await Swal.fire({
      title: "Change User Role",
      text: `Change role from ${currentRole} to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        await changeRoleMutation.mutateAsync({ userId, newRole });
        Swal.fire("Changed!", "User role has been updated.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to change user role.", "error");
      }
    }
  };

  const getRoleOptions = (currentRole) => {
    const roles = ["user", "creator", "admin"];
    return roles.filter((r) => r !== currentRole);
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
        <h2 className="card-title mb-6">Manage Users</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Change Role</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user._id}>
                  <td className="font-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-error"
                          : user.role === "creator"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {getRoleOptions(user.role).map((role) => (
                        <button
                          key={role}
                          onClick={() =>
                            handleRoleChange(user._id, user.role, role)
                          }
                          className="btn btn-sm btn-outline border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white"
                          disabled={changeRoleMutation.isPending}
                        >
                          → {role}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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
                className="join-item btn border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white disabled:opacity-50"
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`join-item btn ${
                      currentPage === page
                        ? "bg-primary-custom text-white border-primary-custom"
                        : "border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white"
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
                className="join-item btn border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white disabled:opacity-50"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

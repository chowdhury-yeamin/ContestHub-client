import { useAllUsers, useChangeUserRole } from "../../../hooks/useAdmin";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCrown,
  FaUserShield,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaEnvelope,
  FaExchangeAlt,
} from "react-icons/fa";

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
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, change it!",
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await changeRoleMutation.mutateAsync({ userId, newRole });
        Swal.fire({
          title: "Changed!",
          text: "User role has been updated.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#6366F1",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to change user role.",
          icon: "error",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#6366F1",
        });
      }
    }
  };

  const getRoleOptions = (currentRole) => {
    const roles = ["user", "creator", "admin"];
    return roles.filter((r) => r !== currentRole);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return FaCrown;
      case "creator":
        return FaUserShield;
      default:
        return FaUser;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "from-red-500 to-rose-500";
      case "creator":
        return "from-amber-500 to-orange-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: FaUsers,
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Admins",
      value: users.filter((u) => u.role === "admin").length,
      icon: FaCrown,
      color: "from-red-500 to-rose-500",
    },
    {
      label: "Creators",
      value: users.filter((u) => u.role === "creator").length,
      icon: FaUserShield,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Regular Users",
      value: users.filter((u) => u.role === "user").length,
      icon: FaUser,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaUsers className="text-6xl text-indigo-500" />
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
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
          <FaUsers className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white">Manage Users</h2>
          <p className="text-slate-400">Control user roles and permissions</p>
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

      {/* Users Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20" />
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                    USER
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                    EMAIL
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                    ROLE
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                    ACTIONS
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm">
                    JOINED
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, idx) => {
                  const RoleIcon = getRoleIcon(user.role);
                  const roleColor = getRoleColor(user.role);

                  return (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-semibold">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-slate-300">
                          <FaEnvelope className="text-slate-500 text-sm" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${roleColor} bg-opacity-20 border border-white/20`}
                        >
                          <RoleIcon className="text-white text-sm" />
                          <span className="text-white font-semibold text-sm capitalize">
                            {user.role}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          {getRoleOptions(user.role).map((role) => (
                            <motion.button
                              key={role}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleRoleChange(user._id, user.role, role)
                              }
                              disabled={changeRoleMutation.isPending}
                              className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-indigo-500/50 rounded-lg text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FaExchangeAlt className="text-xs" />
                              <span className="capitalize">{role}</span>
                            </motion.button>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <FaCalendarAlt className="text-slate-500 text-xs" />
                          <span>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
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
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-indigo-500/50 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border border-indigo-500/50 shadow-lg shadow-indigo-500/30"
                          : "bg-white/5 hover:bg-white/10 border border-white/20 hover:border-indigo-500/50 text-white"
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
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-indigo-500/50 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;

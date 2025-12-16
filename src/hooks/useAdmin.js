import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import toast from "react-hot-toast";

/* ============================================================
   USERS — GET ALL
============================================================ */
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const response = await api.get("/admin/users");

      // Handle both response formats: direct array or {users: [...]}
      if (Array.isArray(response.data)) {
        return response.data;
      }

      // If response has a users property, use that
      if (response.data && Array.isArray(response.data.users)) {
        return response.data.users;
      }

      // Fallback to empty array if data is unexpected
      console.error("❌ Unexpected API response format:", response.data);
      return [];
    },
  });
};

/* ============================================================
   USERS — CHANGE ROLE
============================================================ */
export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, newRole }) => {
      const response = await api.put(`/admin/users/${userId}/role`, {
        role: newRole,
      });

      if (!response.data) {
        throw new Error("Invalid API response on role update");
      }

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "users"]);
      toast.success("User role updated");
    },
    onError: (error) => {
      console.error("❌ Role update failed:", error);
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to update role"
      );
    },
  });
};

/* ============================================================
   CONTESTS — GET ALL
============================================================ */
export const useAdminContests = () => {
  return useQuery({
    queryKey: ["admin", "contests"],
    queryFn: async () => {
      const response = await api.get("/admin/contests");

      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (response.data && Array.isArray(response.data.contests)) {
        return response.data.contests;
      }

      console.error("❌ Unexpected API response format:", response.data);
      return [];
    },
  });
};

/* ============================================================
   CONTESTS — APPROVE
============================================================ */
export const useApproveContest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (contestId) => {
      const response = await api.put(`/admin/contests/${contestId}/status`, {
        status: "confirmed",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contests"] });
      queryClient.invalidateQueries({ queryKey: ["contests"] });
      toast.success("Contest approved");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to approve contest"
      );
    },
  });
};

/* ============================================================
   CONTESTS — REJECT
============================================================ */
export const useRejectContest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (contestId) => {
      const response = await api.put(`/admin/contests/${contestId}/status`, {
        status: "rejected",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contests"] });
      toast.success("Contest rejected");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to reject contest"
      );
    },
  });
};

/* ============================================================
   CONTESTS — DELETE
============================================================ */
export const useAdminDeleteContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contestId) => {
      const response = await api.delete(`/contests/${contestId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "contests"]);
      queryClient.invalidateQueries(["contests"]);
      toast.success("Contest deleted");
    },
    onError: (error) => {
      console.error("❌ Failed to delete contest:", error);
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to delete contest"
      );
    },
  });
};

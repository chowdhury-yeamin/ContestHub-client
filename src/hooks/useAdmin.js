import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

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
    },

    onError: (error) => {
      console.error("❌ Role update failed:", error);
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
      const response = await api.delete(`/admin/contests/${contestId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "contests"]);
      queryClient.invalidateQueries(["contests"]);
    },
  });
};

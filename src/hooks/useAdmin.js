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

      // Force correct shape
      if (!Array.isArray(response.data)) {
        console.error("❌ API response is not an array:", response.data);
        return [];
      }

      return response.data;
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
      return response.data;
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

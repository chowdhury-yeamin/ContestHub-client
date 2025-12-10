import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

/* ============================================================
   USERS — GET ALL
   GET /admin/users
============================================================ */
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const response = await api.get("/admin/users");
      return response.data;
    },
  });
};

/* ============================================================
   USERS — CHANGE ROLE
   PUT /admin/users/:id/role
============================================================ */
export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, newRole }) => {
      const response = await api.put(`/admin/users/${userId}/role`, {
        role: newRole,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

/* ============================================================
   CONTESTS — GET ALL
   GET /admin/contests
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
   PUT /admin/contests/:id/approve
============================================================ */
export const useApproveContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contestId) => {
      const response = await api.put(`/admin/contests/${contestId}/approve`);
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
   PUT /admin/contests/:id/reject
============================================================ */
export const useRejectContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contestId) => {
      const response = await api.put(`/admin/contests/${contestId}/reject`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contests"] });
    },
  });
};

/* ============================================================
   CONTESTS — DELETE
   DELETE /admin/contests/:id
============================================================ */
export const useAdminDeleteContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contestId) => {
      const response = await api.delete(`/admin/contests/${contestId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contests"] });
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
};

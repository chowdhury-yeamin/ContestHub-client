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
      const { data } = await api.get("/admin/users");
      return data;
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
      const { data } = await api.put(`/admin/users/${userId}/role`, {
        role: newRole,
      });
      return data;
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
      const { data } = await api.get("/admin/contests");
      return data;
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
      const { data } = await api.put(`/admin/contests/${contestId}/approve`);
      return data;
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
      const { data } = await api.put(`/admin/contests/${contestId}/reject`);
      return data;
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
      const { data } = await api.delete(`/admin/contests/${contestId}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contests"] });
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
};

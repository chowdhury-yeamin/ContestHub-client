import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

/* ============================================================
   GET ALL CONTESTS
   GET /contests
============================================================ */
export const useContests = () => {
  return useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await api.get("/contests");
      return data;
    },
  });
};

/* ============================================================
   SEARCH CONTESTS
   GET /contests/search?type=...
============================================================ */
export const useSearchContests = (searchType) => {
  return useQuery({
    queryKey: ["contests", "search", searchType],
    queryFn: async () => {
      const { data } = await api.get(`/contests/search?type=${searchType}`);
      return data;
    },
    enabled: !!searchType,
  });
};

/* ============================================================
   GET SINGLE CONTEST
   GET /contests/:id
============================================================ */
export const useContest = (id) => {
  return useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const { data } = await api.get(`/contests/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

/* ============================================================
   CREATE CONTEST
   POST /contests
============================================================ */
export const useCreateContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contestData) => {
      const { data } = await api.post("/contests", contestData);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
};

/* ============================================================
   UPDATE CONTEST
   PUT /contests/:id
============================================================ */
export const useUpdateContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/contests/${id}`, data);
      return res.data;
    },

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["contest", id] });
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
};

/* ============================================================
   DELETE CONTEST
   DELETE /contests/:id
============================================================ */
export const useDeleteContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/contests/${id}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
};

/* ============================================================
   REGISTER FOR CONTEST
   POST /contests/:id/register
============================================================ */
export const useRegisterContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contestId, paymentData }) => {
      const { data } = await api.post(
        `/contests/${contestId}/register`,
        paymentData
      );
      return data;
    },

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["contest", vars.contestId] });
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
};

/* ============================================================
   SUBMIT CONTEST WORK
   POST /contests/:id/submit
============================================================ */
export const useSubmitTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contestId, submissionData }) => {
      const { data } = await api.post(
        `/contests/${contestId}/submit`,
        submissionData
      );
      return data;
    },

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["contest", vars.contestId] });
    },
  });
};

/* ============================================================
   DECLARE WINNER
   POST /contests/:id/declare-winner
============================================================ */
export const useDeclareWinner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contestId, winnerId }) => {
      const { data } = await api.post(
        `/contests/${contestId}/declare-winner`,
        { winnerId }
      );
      return data;
    },

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["contest", vars.contestId] });
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// ==================== Fetch all contests ====================
export const useContests = () => {
  return useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await api.get("/contests");
      if (data && Array.isArray(data.contests)) return data.contests;
      if (Array.isArray(data)) return data;
      return [];
    },
  });
};

// ==================== Fetch single contest ====================
export const useContest = (id) => {
  return useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const { data } = await api.get(`/contests/${id}`);
      return data.contest;
    },
  });
};

// ==================== Submit task ====================
export const useSubmitTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ contestId, submissionData }) => {
      const formData = new FormData();
      for (const key in submissionData) {
        formData.append(key, submissionData[key]);
      }
      const { data } = await api.post(
        `/contests/${contestId}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contest"] });
    },
  });
};

// ==================== Register contest ====================
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contest"] });
    },
  });
};

// ==================== Create a new contest ====================
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

// ==================== Delete a contest ====================
export const useDeleteContest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (contestId) => {
      const { data } = await api.delete(`/contests/${contestId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
};

// ==================== Declare a submission winner ====================
export const useDeclareWinner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ submissionId, isWinner = true, score = null }) => {
      const { data } = await api.post(`/submissions/${submissionId}/winner`, {
        isWinner,
        score,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["contest"] });
    },
  });
};

// ==================== Update a contest ====================
export const useUpdateContest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ contestId, updateData }) => {
      const { data } = await api.put(`/contests/${contestId}`, updateData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contests"] });
      queryClient.invalidateQueries({ queryKey: ["contest"] });
    },
  });
};

// ==================== All Creator Submissions ====================
export const useAllCreatorSubmissions = () => {
  return useQuery({
    queryKey: ["creator", "all-submissions"],
    queryFn: async () => {
      const response = await api.get("/creator/all-submissions");

      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data && Array.isArray(response.data.submissions)) {
        return response.data.submissions;
      }

      return [];
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const useMyContests = () => {
  return useQuery({
    queryKey: ["creator", "contests"],
    queryFn: async () => {
      const response = await api.get("/contests/creator/my-contests");
      return response.data;
    },
  });
};

export const useContestSubmissions = (contestId) => {
  return useQuery({
    queryKey: ["creator", "submissions", contestId],
    queryFn: async () => {
      const response = await api.get(`/contests/${contestId}/submissions`);

      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data && Array.isArray(response.data.submissions)) {
        return response.data.submissions;
      }

      return [];
    },
    enabled: !!contestId,
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const useWinners = () => {
  return useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      try {
        const res = await api.get("/winners");

        if (res.data && Array.isArray(res.data.winners)) {
          return res.data.winners;
        }

        if (Array.isArray(res.data)) {
          return res.data;
        }

        console.warn("Unexpected winners response structure:", res.data);
        return [];
      } catch (error) {
        console.error("Error fetching winners:", error);
        return [];
      }
    },
    retry: 2,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });
};

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      try {
        const res = await api.get("/leaderboard");

        if (res.data && Array.isArray(res.data.leaderboard)) {
          return res.data.leaderboard;
        }

        if (Array.isArray(res.data)) {
          return res.data;
        }

        console.warn("Unexpected leaderboard response structure:", res.data);
        return [];
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
      }
    },
    retry: 2,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });
};

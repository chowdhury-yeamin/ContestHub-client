import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// GET /api/users/me
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data.user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// GET /api/users/me/registrations
export const useParticipatedContests = () => {
  return useQuery({
    queryKey: ["user", "participated"],
    queryFn: async () => {
      const { data } = await api.get("/users/me/registrations");
      return data.contests || [];
    },
  });
};

// GET /api/users/me/wins
export const useWinningContests = () => {
  return useQuery({
    queryKey: ["user", "winnings"],
    queryFn: async () => {
      const { data } = await api.get("/users/me/wins");
      return data.contests || [];
    },
  });
};

// GET /api/leaderboard
export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data } = await api.get("/leaderboard");
      return data.leaderboard || [];
    },
  });
};

// PUT /api/users/me
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      const { data } = await api.put("/users/me", profileData);
      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};

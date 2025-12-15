import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

/* =========================
   USER PROFILE
   GET /api/users/me
========================= */
export const useUserProfile = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["user", "profile"],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.user;
    },
    staleTime: 1000 * 60 * 5,
  });
};

/* =========================
   PARTICIPATED CONTESTS
   GET /api/users/me/registrations
========================= */
export const useParticipatedContests = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["user", "participatedContests"],
    enabled: !!token, 
    queryFn: async () => {
      const res = await api.get("/users/me/registrations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Handle both response formats
      if (Array.isArray(res.data)) {
        return { registrations: res.data };
      }
      
      return {
        registrations: res.data.registrations || []
      };
    },
  });
};

/* =========================
   WINNING CONTESTS
   GET /api/users/me/wins
========================= */
export const useWinningContests = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["user", "winnings"],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await api.get("/users/me/wins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.contests || [];
    },
  });
};

/* =========================
   LEADERBOARD (PUBLIC)
   GET /api/leaderboard
========================= */
export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data } = await api.get("/leaderboard");
      return data.leaderboard || [];
    },
  });
};

/* =========================
   UPDATE PROFILE
   PUT /api/users/me
========================= */
export const useUpdateProfile = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      const { data } = await api.put("/users/me", profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};

/* =========================
   USER STATS (Role-based)
   GET /api/stats
========================= */
export const useUserStats = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["user", "stats"],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await api.get("/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

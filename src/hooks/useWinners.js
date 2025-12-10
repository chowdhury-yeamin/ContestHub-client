import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const useWinners = () => {
  return useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await api.get("/leaderboard");
      return res.data;
    },
  });
};

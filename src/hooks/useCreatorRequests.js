import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// Submit creator request
export const useSubmitCreatorRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/creator-requests");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creator-request-status"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// Get user's request status
export const useCreatorRequestStatus = () => {
  return useQuery({
    queryKey: ["creator-request-status"],
    queryFn: async () => {
      const { data } = await api.get("/creator-requests/my-status");
      return data.request;
    },
  });
};

// Admin: Get all requests
export const useAdminCreatorRequests = () => {
  return useQuery({
    queryKey: ["admin", "creator-requests"],
    queryFn: async () => {
      const { data } = await api.get("/admin/creator-requests");
      return data.requests || [];
    },
  });
};

// Admin: Approve/Reject request
export const useProcessCreatorRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status }) => {
      const { data } = await api.put(`/admin/creator-requests/${requestId}`, {
        status,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "creator-requests"],
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// TODO: Replace with actual API call - GET /admin/users
export const useAllUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      // const response = await api.get('/admin/users');
      // return response.data;
      
      return [
        { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', createdAt: new Date().toISOString() },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'creator', createdAt: new Date().toISOString() },
        { _id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin', createdAt: new Date().toISOString() },
      ];
    },
  });
};

// TODO: Replace with actual API call - PUT /admin/users/:id/role
export const useChangeUserRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, newRole }) => {
      // const response = await api.put(`/admin/users/${userId}/role`, { role: newRole });
      // return response.data;
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

// TODO: Replace with actual API call - GET /admin/contests
export const useAdminContests = () => {
  return useQuery({
    queryKey: ['admin', 'contests'],
    queryFn: async () => {
      // const response = await api.get('/admin/contests');
      // return response.data;
      
      return [
        {
          _id: '1',
          name: 'Logo Design Contest',
          creator: { name: 'Tech Corp', email: 'creator@example.com' },
          status: 'pending',
          createdAt: new Date().toISOString(),
          participantsCount: 0
        },
        {
          _id: '2',
          name: 'Article Writing Challenge',
          creator: { name: 'Media Hub', email: 'media@example.com' },
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          participantsCount: 32
        },
      ];
    },
  });
};

// TODO: Replace with actual API call - PUT /admin/contests/:id/approve
export const useApproveContest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contestId) => {
      // const response = await api.put(`/admin/contests/${contestId}/approve`);
      // return response.data;
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'contests'] });
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
  });
};

// TODO: Replace with actual API call - PUT /admin/contests/:id/reject
export const useRejectContest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contestId) => {
      // const response = await api.put(`/admin/contests/${contestId}/reject`);
      // return response.data;
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'contests'] });
    },
  });
};

// TODO: Replace with actual API call - DELETE /admin/contests/:id
export const useAdminDeleteContest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contestId) => {
      // const response = await api.delete(`/admin/contests/${contestId}`);
      // return response.data;
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'contests'] });
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
  });
};


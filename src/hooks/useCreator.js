import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// TODO: Replace with actual API call - GET /contests/creator/my-contests
export const useMyContests = () => {
  return useQuery({
    queryKey: ['creator', 'contests'],
    queryFn: async () => {
      // const response = await api.get('/contests/creator/my-contests');
      // return response.data;
      
      return [
        {
          _id: '1',
          name: 'Logo Design Contest',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
          status: 'confirmed',
          participantsCount: 45,
          createdAt: new Date().toISOString(),
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '2',
          name: 'UI/UX Design Challenge',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
          status: 'pending',
          participantsCount: 0,
          createdAt: new Date().toISOString(),
          deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString()
        },
      ];
    },
  });
};

// TODO: Replace with actual API call - GET /contests/:id/submissions
export const useContestSubmissions = (contestId) => {
  return useQuery({
    queryKey: ['creator', 'submissions', contestId],
    queryFn: async () => {
      // const response = await api.get(`/contests/${contestId}/submissions`);
      // return response.data;
      
      return [
        {
          _id: '1',
          participant: {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            photoURL: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
          },
          submission: 'https://example.com/submission1.pdf',
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '2',
          participant: {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            photoURL: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
          },
          submission: 'https://example.com/submission2.pdf',
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
      ];
    },
    enabled: !!contestId,
  });
};


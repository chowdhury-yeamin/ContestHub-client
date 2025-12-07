import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// TODO: Replace with actual API call - GET /contests
export const useContests = () => {
  return useQuery({
    queryKey: ['contests'],
    queryFn: async () => {
      // const response = await api.get('/contests');
      // return response.data;
      
      return [
        {
          _id: '1',
          name: 'Logo Design Contest',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
          description: 'Create an innovative logo for a tech startup. The design should be modern, memorable, and scalable.',
          price: 5,
          prizeMoney: 500,
          participantsCount: 45,
          contestType: 'Image Design',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'Tech Corp', email: 'creator@example.com' },
          winner: null
        },
        {
          _id: '2',
          name: 'Article Writing Challenge',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
          description: 'Write a comprehensive article about sustainable technology. Minimum 1500 words.',
          price: 3,
          prizeMoney: 300,
          participantsCount: 32,
          contestType: 'Article Writing',
          deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'Media Hub', email: 'media@example.com' },
          winner: null
        },
        {
          _id: '3',
          name: 'Business Idea Pitch',
          image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
          description: 'Pitch your innovative business idea. Include market analysis and revenue model.',
          price: 10,
          prizeMoney: 1000,
          participantsCount: 28,
          contestType: 'Business Ideas',
          deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'Venture Capital', email: 'vc@example.com' },
          winner: null
        },
        {
          _id: '4',
          name: 'Gaming Review Contest',
          image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800',
          description: 'Write a detailed review of the latest game release. Include gameplay, graphics, and overall rating.',
          price: 4,
          prizeMoney: 400,
          participantsCount: 38,
          contestType: 'Gaming Reviews',
          deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'GameZone', email: 'game@example.com' },
          winner: null
        },
        {
          _id: '5',
          name: 'UI/UX Design Challenge',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
          description: 'Design a mobile app interface for a fitness tracking application.',
          price: 7,
          prizeMoney: 700,
          participantsCount: 52,
          contestType: 'Image Design',
          deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'Design Studio', email: 'design@example.com' },
          winner: null
        }
      ];
    },
  });
};

// TODO: Replace with actual API call - GET /contests/search?type=...
export const useSearchContests = (searchType) => {
  return useQuery({
    queryKey: ['contests', 'search', searchType],
    queryFn: async () => {
      // const response = await api.get(`/contests/search?type=${searchType}`);
      // return response.data;
      const allContests = [
        {
          _id: '1',
          name: 'Logo Design Contest',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
          description: 'Create an innovative logo for a tech startup. The design should be modern, memorable, and scalable.',
          price: 5,
          prizeMoney: 500,
          participantsCount: 45,
          contestType: 'Image Design',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'Tech Corp', email: 'creator@example.com' },
          winner: null
        },
        {
          _id: '2',
          name: 'Article Writing Challenge',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
          description: 'Write a comprehensive article about sustainable technology. Minimum 1500 words.',
          price: 3,
          prizeMoney: 300,
          participantsCount: 32,
          contestType: 'Article Writing',
          deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'Media Hub', email: 'media@example.com' },
          winner: null
        },
        {
          _id: '3',
          name: 'Business Idea Pitch',
          image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
          description: 'Pitch your innovative business idea. Include market analysis and revenue model.',
          price: 10,
          prizeMoney: 1000,
          participantsCount: 28,
          contestType: 'Business Ideas',
          deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'Venture Capital', email: 'vc@example.com' },
          winner: null
        },
        {
          _id: '4',
          name: 'Gaming Review Contest',
          image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800',
          description: 'Write a detailed review of the latest game release. Include gameplay, graphics, and overall rating.',
          price: 4,
          prizeMoney: 400,
          participantsCount: 38,
          contestType: 'Gaming Reviews',
          deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'GameZone', email: 'game@example.com' },
          winner: null
        },
        {
          _id: '5',
          name: 'UI/UX Design Challenge',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
          description: 'Design a mobile app interface for a fitness tracking application.',
          price: 7,
          prizeMoney: 700,
          participantsCount: 52,
          contestType: 'Image Design',
          deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          creator: { name: 'Design Studio', email: 'design@example.com' },
          winner: null
        }
      ];
      
      if (!searchType) return allContests;
      return allContests.filter(c => c.contestType.toLowerCase().includes(searchType.toLowerCase()));
    },
    enabled: !!searchType,
  });
};

// TODO: Replace with actual API call - GET /contests/:id
export const useContest = (id) => {
  return useQuery({
    queryKey: ['contest', id],
    queryFn: async () => {
      // const response = await api.get(`/contests/${id}`);
      // return response.data;
      
      return {
        _id: id,
        name: 'Logo Design Contest',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        description: 'Create an innovative logo for a tech startup. The design should be modern, memorable, and scalable. We are looking for a logo that represents innovation, technology, and forward-thinking. The logo will be used across all marketing materials, website, and product packaging.',
        taskInstruction: '1. Design a logo that is unique and memorable\n2. Ensure the logo works in both color and black & white\n3. Provide vector format (SVG or AI)\n4. Include a brief explanation of your design concept',
        price: 5,
        prizeMoney: 500,
        participantsCount: 45,
        contestType: 'Image Design',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'confirmed',
        creator: { name: 'Tech Corp', email: 'creator@example.com' },
        winner: null,
        submissions: []
      };
    },
    enabled: !!id,
  });
};

// TODO: Replace with actual API call - POST /contests
export const useCreateContest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contestData) => {
      // const response = await api.post('/contests', contestData);
      // return response.data;
      
      return { ...contestData, _id: Date.now().toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
  });
};

// TODO: Replace with actual API call - PUT /contests/:id
export const useUpdateContest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      // const response = await api.put(`/contests/${id}`, data);
      // return response.data;
      
      return { ...data, _id: id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
  });
};

// TODO: Replace with actual API call - DELETE /contests/:id
export const useDeleteContest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      // const response = await api.delete(`/contests/${id}`);
      // return response.data;
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
  });
};

// TODO: Replace with actual API call - POST /contests/:id/register
export const useRegisterContest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ contestId, paymentData }) => {
      // const response = await api.post(`/contests/${contestId}/register`, paymentData);
      // return response.data;
      
      return { success: true, transactionId: Date.now().toString() };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contest', variables.contestId] });
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
  });
};

// TODO: Replace with actual API call - POST /contests/:id/submit
export const useSubmitTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ contestId, submissionData }) => {
      // const response = await api.post(`/contests/${contestId}/submit`, submissionData);
      // return response.data;
      
      return { success: true, submissionId: Date.now().toString() };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contest', variables.contestId] });
    },
  });
};

// TODO: Replace with actual API call - POST /contests/:id/declare-winner
export const useDeclareWinner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ contestId, winnerId }) => {
      // const response = await api.post(`/contests/${contestId}/declare-winner`, { winnerId });
      // return response.data;
      
      return { success: true };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contest', variables.contestId] });
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
  });
};


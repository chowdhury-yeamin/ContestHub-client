import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// TODO: Replace with actual API call - GET /users/profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      // const response = await api.get('/users/profile');
      // return response.data;
      
      return {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        photoURL: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
        role: 'user',
        bio: 'Creative designer and contest enthusiast',
        address: '123 Main St, City, Country',
        participatedCount: 5,
        wonCount: 2
      };
    },
  });
};

// TODO: Replace with actual API call - GET /users/participated
export const useParticipatedContests = () => {
  return useQuery({
    queryKey: ['user', 'participated'],
    queryFn: async () => {
      // const response = await api.get('/users/participated');
      // return response.data;
      
      return [
        {
          _id: '1',
          contest: {
            _id: '1',
            name: 'Logo Design Contest',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            prizeMoney: 500
          },
          paymentStatus: 'completed',
          submissionStatus: 'submitted',
          registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
    },
  });
};

// TODO: Replace with actual API call - GET /users/winnings
export const useWinningContests = () => {
  return useQuery({
    queryKey: ['user', 'winnings'],
    queryFn: async () => {
      // const response = await api.get('/users/winnings');
      // return response.data;
      
      return [
        {
          _id: '1',
          contest: {
            _id: '1',
            name: 'Logo Design Contest',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
            prizeMoney: 500
          },
          wonAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
    },
  });
};

// TODO: Replace with actual API call - GET /users/leaderboard
export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      // const response = await api.get('/users/leaderboard');
      // return response.data;
      
      return [
        { _id: '1', name: 'Alice Johnson', photoURL: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random', wins: 15, rank: 1 },
        { _id: '2', name: 'Bob Smith', photoURL: 'https://ui-avatars.com/api/?name=Bob+Smith&background=random', wins: 12, rank: 2 },
        { _id: '3', name: 'Charlie Brown', photoURL: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=random', wins: 10, rank: 3 },
        { _id: '4', name: 'Diana Prince', photoURL: 'https://ui-avatars.com/api/?name=Diana+Prince&background=random', wins: 8, rank: 4 },
        { _id: '5', name: 'Eve Wilson', photoURL: 'https://ui-avatars.com/api/?name=Eve+Wilson&background=random', wins: 7, rank: 5 },
      ];
    },
  });
};

// TODO: Replace with actual API call - PUT /users/profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profileData) => {
      // const response = await api.put('/users/profile', profileData);
      // return response.data;
      
      return { ...profileData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
};


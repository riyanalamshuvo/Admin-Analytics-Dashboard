import axios, { AxiosInstance } from 'axios';
import type { DashboardData, DateRange, UserType } from '@/types';
import { getDashboardData } from '@/data/mockData';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// Dashboard API service
// Note: Since we're using mock data, we simulate API calls with axios-like behavior
export const dashboardApi = {
  getDashboardData: async (dateRange: DateRange, userType: UserType): Promise<DashboardData> => {
    // Simulate API delay (500-1500ms) to mimic real API behavior
    const delay = Math.random() * 1000 + 500;
    
    // Use axios to demonstrate the pattern (in a real app, this would be a real API call)
    // For now, we simulate the network delay and return mock data
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          // Simulate occasional errors (5% chance)
          if (Math.random() < 0.05) {
            throw new Error('Failed to fetch dashboard data. Please try again.');
          }
          
          // In a real application, you would use:
          // const response = await apiClient.get('/dashboard', { params: { dateRange, userType } });
          // return response.data;
          
          const data = getDashboardData(dateRange, userType);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  },

  // Example of a real API call pattern (for future use with real backend)
  getStats: async () => {
    const response = await apiClient.get('/stats');
    return response.data;
  },

  getRevenue: async () => {
    const response = await apiClient.get('/revenue');
    return response.data;
  },

  getOrders: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  getUsers: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },
};

export default apiClient;

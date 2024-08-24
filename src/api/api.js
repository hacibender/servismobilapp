// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://rest-j2kjfrifbq-ez.a.run.app',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Get refresh token
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        // Refresh access token
        const refreshResponse = await axios.post(
          'https://rest-j2kjfrifbq-ez.a.run.app/auth/refresh-token',
          { refreshToken }
        );

        // Update config with new token
        const newAccessToken = refreshResponse.data.accessToken;
        originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;

        // Store the new tokens
        await AsyncStorage.setItem('accessToken', newAccessToken);

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Handle refresh token error (e.g., logout)
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post('/auth/reset-password', { token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await api.post('/auth/refresh-token', { refreshToken });
        return response.data;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

// User Me function
export const userMe = async () => {
    try {
        const response = await api.get('/user/me');
        return response.data;
    } catch (error) {
        console.error('Error getting User Me data', error);
        throw error;
    }
};

// Define API functions for each resource
const createResourceAPI = (resourceName) => {
    return {
        getAll: async () => {
            try {
                const response = await api.get(`/${resourceName}`);
                return response.data;
            } catch (error) {
                console.error(`Error getting ${resourceName}:`, error);
                throw error;
            }
        },
        getById: async (id) => {
            try {
                const response = await api.get(`/${resourceName}/${id}`);
                return response.data;
            } catch (error) {
                console.error(`Error getting ${resourceName} by ID:`, error);
                throw error;
            }
        },
        create: async (data) => {
            try {
                const response = await api.post(`/${resourceName}`, data);
                return response.data;
            } catch (error) {
                console.error(`Error creating ${resourceName}:`, error);
                throw error;
            }
        },
        update: async (id, data) => {
            try {
                const response = await api.put(`/${resourceName}/${id}`, data);
                return response.data;
            } catch (error) {
                console.error(`Error updating ${resourceName}:`, error);
                throw error;
            }
        },
        delete: async (id) => {
            try {
                const response = await api.delete(`/${resourceName}/${id}`);
                return response.data;
            } catch (error) {
                console.error(`Error deleting ${resourceName}:`, error);
                throw error;
            }
        },
    };
};

// Create API instances for each resource
export const userAPI = createResourceAPI('user');
export const schoolAPI = createResourceAPI('school');
export const schoolbusAPI = createResourceAPI('schoolbus');
export const parentAPI = createResourceAPI('parent');
export const driverAPI = createResourceAPI('driver');
export const routeAPI = createResourceAPI('route');
export const studentAPI = createResourceAPI('student'); 
export const reportAPI = createResourceAPI('report');
export const tripAPI = createResourceAPI('trip'); 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleTokenRefresh } from './helpers/authHelper';

const api = axios.create({
    baseURL: 'https://rest-j2kjfrifbq-ez.a.run.app/api-docs/',
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

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await handleTokenRefresh();
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                return api(originalRequest);
            } catch (error) {
                // Yenileme başarısız olursa kullanıcıyı logout yap
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('refreshToken');
                // Gerekirse kullanıcıyı login ekranına yönlendirebilirsin
            }
        }
        return Promise.reject(error);
    }
);

// Login isteği
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data; // Response'da accessToken ve refreshToken olacak
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Şifreyi unuttum isteği
export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
};

// Şifreyi sıfırlama isteği
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post('/auth/reset-password', { token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

// Access token yenileme isteği
export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await api.post('/auth/refresh-token', { refreshToken });
        return response.data;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};


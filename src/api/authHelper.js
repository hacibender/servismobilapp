import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken } from './api';

export const handleTokenRefresh = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken);
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        return accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

//Authcontext.js
import React, { createContext, useState, useEffect } from 'react';
import { login, userMe } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: true,
    isAuth: false,
    roles: [], // Initialize roles as an empty array
  });

  const authenticate = async (email, password) => {
    setAuthState({ ...authState, isLoading: true });
    try {
      const response = await login(email, password);
      console.log('response :>> ', response);

      if (response.accessToken && response.refreshToken) {
        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('refreshToken', response.refreshToken);

        const userResponse = await userMe(); // Fetch user data
        console.log('userResponse :>> ', userResponse);
        setAuthState({
          ...authState,
          user: userResponse,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          isLoading: false,
          isAuth: true,
          roles: userResponse.roles || [], // Ensure roles is an array or an empty array if not available
        });
      } else {
        // Handle invalid response format
        console.error('Invalid login response format:', response);
        setAuthState({ ...authState, isLoading: false, isAuth: false });
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setAuthState({ ...authState, isLoading: false, isAuth: false });
      throw error;
    }
  };

  const logout = async () => {
    setAuthState({
      ...authState,
      isLoading: false,
      isAuth: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      roles: [],
    });
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
          const userResponse = await userMe();
          setAuthState({
            ...authState,
            user: userResponse,
            accessToken,
            refreshToken,
            isLoading: false,
            isAuth: true,
            roles: userResponse.roles || [], // Ensure roles is an array
          });
        } else {
          // Not authenticated, update state
          setAuthState({ ...authState, isLoading: false, isAuth: false });
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setAuthState({ ...authState, isLoading: false, isAuth: false });
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login: authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
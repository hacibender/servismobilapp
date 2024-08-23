import React, { useState, useEffect, createContext, useContext } from 'react';
import { login, userMe } from '../api/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuth: false,
    roles: [], 
  });

  const authenticate = async (email, password) => {
    try {
      const response = await login(email, password);
      console.log('Login response:', response); 

      if (response.accessToken && response.refreshToken) {
        setAuthData({
          ...authData,
          user: response.user, 
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          isAuth: true,
          roles: response.user.roles, 
        });

        
      } else {
        console.error('Invalid login response format:', response);
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error; 
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (authData.isAuth) {
        try {
          const userData = await userMe(); 
          console.log('User data:', userData); 
          setAuthData({ ...authData, user: userData });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData(); 
  }, [authData.isAuth]); 

  return (
    <AuthContext.Provider value={{ authData, login: authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
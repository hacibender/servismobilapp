import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import httpClient from "./httpClient";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // Start with loading = true
  const [authData, setAuthData] = useState(null);

  const register = async (userData, successCb) => {};
  const logout = async (email, password) => {};
  const verifyAccount = useCallback(async (token) => {}, []);

  const login = async (email, password) => {
    try {
      const res = await httpClient.post('/auth/login', { email, password });
      setAuthData({
        isAuth: true,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        roles: res.data.roles,
      });
      await AsyncStorage.setItem("access-token", res.data.accessToken);
      await AsyncStorage.setItem("refresh-token", res.data.refreshToken);
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  const checkAuth = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem("access-token");
      if (accessToken) {
        const res = await httpClient.get('/auth/authorization');
        setAuthData({
          isAuth: true,
          accessToken, 
          roles: res.data.roles,
        });
      } else {
        setAuthData({ isAuth: false }); 
      }
    } catch (err) {
      console.error("Authorization check error:", err);
      setAuthData({ isAuth: false }); // Assume not authenticated on error
      await AsyncStorage.clear(); 
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      await checkAuth();
    };
    bootstrapAsync();
  }, [checkAuth]); 

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading, // Include loading state in context
        login,
        logout,
        register,
        verifyAccount,
        refreshToken, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


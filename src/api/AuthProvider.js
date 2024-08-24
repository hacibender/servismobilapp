import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../api/api'; // Assuming your api functions are in '../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authData, setAuthData] = useState({
    isAuth: false,
    refreshToken: undefined,
    accessToken: undefined,
    roles: [],
  });
  const navigation = useNavigation();

  const register = async (userData, successCb) => {};
  const verifyAccount = useCallback(async (token) => {}, []);

  const login = async (email, password) => {
    try {
      const res = await api.login(email, password);
      setAuthData({
        isAuth: true,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        roles: res.roles,
      });
      await AsyncStorage.setItem('access-token', res.accessToken);
      await AsyncStorage.setItem('refresh-token', res.refreshToken);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const logout = async () => {
    try {
      // Perform any API logout call if needed

      // Clear AsyncStorage
      await AsyncStorage.removeItem('access-token');
      await AsyncStorage.removeItem('refresh-token');

      // Update authData
      setAuthData({
        isAuth: false,
        refreshToken: undefined,
        accessToken: undefined,
        roles: [],
      });

      // Navigate to login screen (optional)
      navigation.navigate('Auth'); // Assuming 'Auth' is the name of your AuthStack
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const checkAuth = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access-token');
      if (accessToken) {
        const res = await api.userMe(); // Use your userMe function
        setAuthData({
          isAuth: true,
          accessToken,
          roles: res.roles || [], // Make sure roles is defined
        });
      } else {
        setAuthData({ isAuth: false });
      }
    } catch (err) {
      console.error('Authorization check error:', err);
      setAuthData({ isAuth: false });
      await AsyncStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     await checkAuth();
  //   };
  //   bootstrapAsync();
  // }, [checkAuth]);

  const refreshToken = () => {
    api
      .refreshAccessToken(authData.refreshToken)
      .then((res) => {
        setAuthData({
          ...authData,
          isAuth: true,
          accessToken: res.accessToken,
        });
        AsyncStorage.setItem('access-token', res.accessToken);
      })
      .catch((err) => {
        setAuthData({
          isAuth: false,
          refreshToken: undefined,
          accessToken: undefined,
        });
        AsyncStorage.clear();
      });
  };
  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        login,
        logout, // Make sure logout is passed here
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
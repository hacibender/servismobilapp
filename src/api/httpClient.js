import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpClient = axios.create({
  baseURL: "https://rest-j2kjfrifbq-ez.a.run.app", 
});

httpClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("access-token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
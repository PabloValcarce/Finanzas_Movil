import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL:  'http://192.168.1.41:5000' 

});

api.interceptors.request.use(async (config) => {
  try {
    const access_token = await AsyncStorage.getItem('access_token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  } catch (error) {
  }
  return config;
});

export default api;

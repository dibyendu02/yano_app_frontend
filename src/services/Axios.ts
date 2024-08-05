import axios from 'axios';
import {Constants} from '../constants/Constants';

const axiosInstance = axios.create({
  baseURL: Constants.BASE_URL,
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': 'multipart/form-data',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async config => {
  let newConfig = {...config};
  return newConfig;
});

axiosInstance.interceptors.response.use(
  response => response,
  error =>
    Promise.reject(
      (error?.message || '').includes('timeout') ||
        (error?.message || '').includes('Network Error')
        ? 'Please check your internet connection'
        : error,
    ),
);

export default axiosInstance;

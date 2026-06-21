import axios, { AxiosInstance } from "axios";
import store from "../redux/store";
import { clearAuthPerson } from "../redux/auth/authSlice";
import {showErrorToast} from "../utils/toast"



const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL.replace("{cloud_name}",import.meta.env.VITE_CLOUDINARY_NAME)

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const cloudinaryAxiosInstance = axios.create({
  baseURL: `${CLOUDINARY_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials:false
})


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
  
     if(error.response && error.response.data.status===403) {
      
      store.dispatch(clearAuthPerson());
      showErrorToast(error.response.data.message);
      window.location.href = '/sign-in';
     }
    if (error.response && error.response.data.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/auth/refresh-token', {}, { withCredentials: true });
        const { newAccessToken } = response.data.data
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log('Refresh token failed', err)
        store.dispatch(clearAuthPerson());
        window.location.href = '/sign-in';
        showErrorToast("Your session has expired. Please sign-in again.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

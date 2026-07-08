import axios, { AxiosInstance } from "axios";
import store from "../redux/store";
import { clearAuthPerson } from "../redux/auth/authSlice";
import { showErrorToast } from "../utils/toast";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,   // sends cookies automatically on every request
});

export const cloudinaryAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CLOUDINARY_URL?.replace(
    "{cloud_name}",
    import.meta.env.VITE_CLOUDINARY_NAME
  ),
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: false,
});

// request interceptor — no more Authorization header injection
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // blocked user
    if (error.response?.data?.status === 403) {
      store.dispatch(clearAuthPerson());
      showErrorToast(error.response.data.message);
      window.location.href = "/sign-in";
      return Promise.reject(error);
    }

    // access token expired — try refresh
    if (error.response?.data?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // cookie sent automatically — no body needed
        await axiosInstance.post("/auth/refresh-token");
        // new accessToken now in cookie — just retry
        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(clearAuthPerson());
        showErrorToast("Session expired. Please sign in again.");
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
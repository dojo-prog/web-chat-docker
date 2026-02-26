import axios from "axios";
import useAuthStore from "../stores/auth.store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000/api",
  withCredentials: true,
});

// Interceptors
let isRefreshing = false;
let queue: (() => void)[] = [];

const resolveQueue = () => {
  queue.forEach((cb) => cb());
  queue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        // IMPORTANT: use plain axios (no interceptors)
        await axios.post(
          `${axiosInstance.defaults.baseURL}/v1/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        resolveQueue();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

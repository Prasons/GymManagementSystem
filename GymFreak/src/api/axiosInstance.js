import axios from "axios";
import { getAccessToken, getRefreshToken, saveTokens } from "../utils/auth.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Backend base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        const { data } = await axios.post(
          "http://localhost:8080/api/refresh-token",
          {
            refreshToken,
          }
        );
        // Save the new access token
        saveTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

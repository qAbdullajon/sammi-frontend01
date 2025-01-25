import { $axios, API_URL } from "@/http";
import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const { data } = await $axios.get("/auth/refresh");
        localStorage.setItem("accessToken", data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return $api.request(originalRequest);
      } catch (err) {
        console.log("Not authorized:", err);
      }
    }

    throw error;
  }
);

export default $api;

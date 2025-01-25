import axios from "axios";
import $axios, { API_URL } from ".";

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

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const { data } = await $axios.get("/auth/refresh");
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return $api.request(originalRequest);
      } catch (err) {
        console.log(err);
        console.log("Not authorized:");
      }
    }

    console.log(error);
    throw error;
  }
);

export default $api;

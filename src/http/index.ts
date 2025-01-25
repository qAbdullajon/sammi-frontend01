import axios from "axios";

const API_URL = "https://sammi-backend01.onrender.com";
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export { $axios, API_URL };

import axios from "axios";

const API_URL = "https://sammi-backend01.onrender.com";
axios.defaults.withCredentials = true;

const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export { $axios, API_URL };

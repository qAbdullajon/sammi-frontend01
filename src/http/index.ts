import axios from "axios";

export const API_URL = `https://sammi-backend01.onrender.com`;
// test

const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;

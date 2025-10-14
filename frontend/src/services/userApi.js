import axios from "axios";
import { store }from "../store";

const userApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/auth",
  withCredentials: true,
});

// helper to detect mobile devices
const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

// attach token for mobile only
userApi.interceptors.request.use((config) => {
  if (isMobile) {
    const token = store.getState().user.token;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default userApi;

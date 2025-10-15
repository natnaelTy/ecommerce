import axios from "axios";

// helper to detect mobile/in-app browsers
const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

// create axios instance
const userApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/auth",
  withCredentials: true, 
  headers: { "Content-Type": "application/json" },
});

// attach token header if on mobile 
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (isMobile && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default userApi;

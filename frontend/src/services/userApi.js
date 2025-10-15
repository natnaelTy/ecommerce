import axios from "axios";


const userApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/auth",
  withCredentials: false, 
  headers: { "Content-Type": "application/json" },
});

// attach Authorization header from localStorage for every request
userApi.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Failed to get auth token from localStorage", e);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

//  set/clear token in localStorage
export function setLocalAuthToken(token) {
  try {
    if (token) localStorage.setItem("authToken", token);
    else localStorage.removeItem("authToken");
  } catch (e) {
    console.error("Failed to set auth token in localStorage", e);
  }
}

export default userApi;

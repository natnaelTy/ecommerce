import axios from "axios";

// Axios instance
const userApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/auth",
  withCredentials: true,
});

userApi.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});


export default userApi;

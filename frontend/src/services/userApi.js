import axios from "axios";

const userApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/auth",
  withCredentials: true,
});

const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

userApi.interceptors.request.use((config) => {
  if (isMobile) {
    const { default: store } = require("../store/index.js");
    const token = store.getState().user.token;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default userApi;

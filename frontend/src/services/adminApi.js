import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/admin",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default adminApi;

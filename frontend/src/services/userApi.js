import axios from "axios";

// Axios instance
const userApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/auth",
  withCredentials: true,
});


export default userApi;

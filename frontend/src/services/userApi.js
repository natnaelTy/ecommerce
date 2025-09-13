import axios from "axios";

// Axios instance
const userApi = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});




export default userApi;

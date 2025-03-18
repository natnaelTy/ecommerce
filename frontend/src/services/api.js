import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // Ensure cookies are sent with requests
});

export const nPoint = "http://localhost:5000/";

export default api;

import axios from "axios";


const adminApi = axios.create({
  baseURL: "http://localhost:5000/api/auth/admin",
  })

export default adminApi;
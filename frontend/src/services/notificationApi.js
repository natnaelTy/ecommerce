import axios from "axios";

const notificationApi = axios.create({
  baseURL: "http://localhost:5000/api/notifications",
  withCredentials: true,
});

export default notificationApi;

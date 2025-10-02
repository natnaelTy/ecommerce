import axios from "axios";

const notificationApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/notifications",
  withCredentials: true,
});

export default notificationApi;

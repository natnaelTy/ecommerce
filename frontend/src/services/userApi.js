import axios from "axios";

const userApi = axios.create({ baseURL: "https://ecommerce-ib95q.sevalla.app/api/auth" });

userApi.defaults.withCredentials = true;

export default userApi;
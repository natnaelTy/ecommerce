import axios from "axios";


const productApi = axios.create({
  baseURL: "https://ecommerce-ib95q.sevalla.app/api/products",
  withCredentials: true,
});

export const nPoint = "https://ecommerce-ib95q.sevalla.app/";

export default productApi;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import productReducer from "./product/productSlice.js";


const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  }
 
});

export default store;

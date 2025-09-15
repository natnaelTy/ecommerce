import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import productReducer from "./product/productSlice.js";
import adminReducer from "./adminside/adminSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    admin: adminReducer,
  }
 
});

export default store;

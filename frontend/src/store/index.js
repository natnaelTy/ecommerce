import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice.js";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const reducer = combineReducers({
//   user: userReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//   reducer: persistedReducer,

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, 
//     })
// });

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  }
 
});

export default store;

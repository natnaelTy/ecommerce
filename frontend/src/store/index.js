import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import loginReducer from "./user/userLoginSlice.js";


 const store = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default store;




import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   userLogin: null,
   loading: false,
   error: null
}

export const loginSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers:{
        createLoginStart(state){
          state.loading = true,
          state.error = null
        },
        createLoginUser:(state, action) => {
            state.error = null,
            state.loading = false,
            state.userLogin = action.payload
        },
        createLoginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = falsse;
        }
    }
});


export const { createLoginFailure, createLoginUser, createLoginStart } = loginSlice.actions;
export default loginSlice.reducer;
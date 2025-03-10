import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUserStart(state) {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false
    },
    createUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true,
      state.error = null;
      state.loading = false
    },
    createUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false
    },
    
    // login
    createLoginStart(state){
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false
    },
    createLoginUser:(state, action) => {
        state.error = null;
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    createLoginFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false,
        state.isAuthenticated = false
    }
  },

});

export const {createLoginFailure, createLoginStart, createLoginUser, createUser, createUserFailure, createUserStart} = userSlice.actions;
export default userSlice.reducer;

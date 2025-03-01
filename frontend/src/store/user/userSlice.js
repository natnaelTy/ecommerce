import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 users: null, 
 error: null, 
 loading: false
}

console.log(initialState);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    createUser: (state, action) => {
      state.users = action.payload;
      state.error = null;
      state.loading = false,
      console.log(action);
    },
    createUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // login
    createLoginStart(state){
      state.loading = true;
      state.error = null;
    },
    createLoginUser:(state, action) => {
        state.error = null;
        state.loading = false;
        state.users = action.payload;
    },
    createLoginFailure: (state, action) => {
        state.error = action.payload;
        state.loading = falsse;
    }
  },
});


export const { createUser, createLoginStart, createLoginFailure, createLoginUser, createUserFailure, createUserStart } = userSlice.actions;
export default userSlice.reducer;

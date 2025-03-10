import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUser = createAsyncThunk("user/fetchUser", async () => {

  const response = axios.get("http://localhost:5000/auth/verify");
  return response.data.user;
})

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, 
    error: null, 
    loading: false
  },
  reducers: {
    createUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    createUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload;
      state.error = null;
      state.loading = false;
    },
    createUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    // login
    createLoginStart(state){
      state.loading = true;
      state.error = null;
    },
    createLoginUser:(state, action) => {
        state.error = null;
        state.loading = false;
        state.user = action.payload;
    },
    createLoginFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true,
      state.error = null
    })
  .addCase(fetchUser.fulfilled, (state, action) => {
    state.loading = false,
    state.user = action.payload?.data?.user;
    state.error = null
    console.log(action.payload?.data?.user)
  })
  .addCase(fetchUser.rejected, (state, action) => {
    state.loading = false,
    state.error = action.error.message;
  })
  }
});

export const {createLoginFailure, createLoginStart, createLoginUser, createUser, createUserFailure, createUserStart} = userSlice.actions;
export default userSlice.reducer;

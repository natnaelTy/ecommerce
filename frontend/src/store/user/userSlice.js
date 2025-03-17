import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// create user
export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ email, fullName, user_password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", {
        email,
        fullName,
        user_password,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// get user
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/verify");
      return response.data.decoded;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create new user
    builder
      .addCase(createUser.pending, (state) => {
        state.error = null;
        state.isAuthenticated = false;
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.error = null;
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthenticated = false;
      })
      // get user
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export default userSlice.reducer;

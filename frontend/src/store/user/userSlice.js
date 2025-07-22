import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// create user (signup)
export const createUser = createAsyncThunk(
  "user/createUser",
  async (validatedUser, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", validatedUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// verify email
export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (code, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verifyEmail", { code });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Email verification failed");
    }
  }
);

// login user
export const loginUser = createAsyncThunk("user/loginUser", async (validatedUser, {rejectWithValue}) => {
    try{
      const response = await api.post("/auth/login", validatedUser);
      if (response.status === 200) {
        window.location.href = "/";
      }
    }catch(error){
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

// forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/forgotPassword",  email );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send reset code");
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/resetPassword/:${token}`, { token, newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Password reset failed");
    }
  }
);



// get user
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      console.log(response.data);
      return response.data.user;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  return null;
});


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
      //login user
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuthenticated = false;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
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
      })
      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
      })
  },
});

export default userSlice.reducer;

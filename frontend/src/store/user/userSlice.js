import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/userApi";
import notificationApi from "../../services/notificationApi";


// read token from localStorage 
const savedToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: !!savedToken,
  token: savedToken,
  notifications: [],
};


export const createUser = createAsyncThunk(
  "user/createUser",
  async (validatedUser, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/signup", validatedUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// ...existing thunks (login, fetchUser, etc.) ...

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (validatedUser, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/login", validatedUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// get user
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get("/me");
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Not authenticated");
    }
  }
);

// logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await userApi.post("/logout");
    localStorage.removeItem("authToken");
  } catch (e) {
    console.error("Logout failed:", e);
  }
  return null;
});

// ...existing code (other thunks) ...

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
        state.user = action.payload.user || action.payload;
        const token = action.payload?.accessToken || action.payload?.token;
        if (token) {
          state.token = token;
          try {
            localStorage.setItem("authToken", token);
          } catch (e) {}
          state.isAuthenticated = true;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthenticated = false;
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuthenticated = false;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;
        const token = action.payload?.accessToken || action.payload?.token;
        if (token) {
          state.token = token;
          try {
            localStorage.setItem("authToken", token);
          } catch (e) {}
        }
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
        state.token = null;
        try {
          localStorage.removeItem("authToken");
        } catch (e) {}
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
        state.token = null;
        try {
          localStorage.removeItem("authToken");
        } catch (e) {}
      })
      // update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notif = state.notifications.find((n) => n.id === action.payload);
        if (notif) notif.isRead = true;
        state.loading = false;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

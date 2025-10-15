import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/userApi";
import notificationApi from "../../services/notificationApi";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  notifications: [],
};

// create user (signup)
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

// verify email
export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (code, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/verifyEmail", { code });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Email verification failed"
      );
    }
  }
);

// login user
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

// forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/forgotPassword", email);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset code"
      );
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await userApi.post(`/resetPassword/:${token}`, {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);

// update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userApi.put("/update-profile", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// change password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await userApi.put("/change-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password"
      );
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
      return rejectWithValue(
        error.response?.data?.message || "Not authenticated"
      );
    }
  }
);

// logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await userApi.post("/logout");
  return null;
});

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
  "user/fetchNotifications",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await notificationApi.get(`/${userId}`);
      return res.data.notifications;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch notifications"
      );
    }
  }
);

// Mark as read
export const markNotificationAsRead = createAsyncThunk(
  "user/markNotificationAsRead",
  async (id, { rejectWithValue }) => {
    try {
      await notificationApi.patch(`/${id}/read`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update notification"
      );
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
        state.user = action.payload.user;
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
        state.user = action.payload.user;
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
        state.user = action.payload.user;
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

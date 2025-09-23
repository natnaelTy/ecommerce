import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../services/adminApi";

// login admin
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/auth/login", adminData);
      return response.data.admin;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get admin profile
export const getAdminProfile = createAsyncThunk(
  "adminAuth/getAdminProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/auth/profile");
      return response.data.admin;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch admin profile");
    }
  }
);

// update admin profile
export const updateAdminProfile = createAsyncThunk(
  "adminAuth/updateAdminProfile",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await adminApi.put("/auth/edit-profile", adminData);
      return response.data.admin;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update admin profile");
    }
  }
);

// logout admin
export const logoutAdmin = createAsyncThunk(
  "admin/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/auth/logout");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login admin
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get admin profile
      .addCase(getAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.admin = null;
        state.error = action.payload;
      })
      // update admin profile
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // logout admin
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.admin = null;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminAuthSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../services/adminApi";

// login admin
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/login", adminData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// fetch all users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/users");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// fetch all products
export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/products");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);





const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    users: [],
    products: [],
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
      // fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;

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

// fetch all orders
export const fetchOrders = createAsyncThunk(
  "admin/fetchOrders", async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/orders");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// fetch all payments
export const fetchPayments = createAsyncThunk(
  "admin/fetchPayments", async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/payments");
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
    orders: [],
    payments: [],
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
      })
      // fetch all orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch all payments
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;

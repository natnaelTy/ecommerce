import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../services/adminApi";
import axios from "axios";
import notificationApi from "../../services/notificationApi";

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

// add new product
export const addNewProduct = createAsyncThunk(
  "admin/addNewProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/products/addProduct", productData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// edit product
export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await adminApi.put(`/products/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to edit product"
      );
    }
  }
);

// delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.delete(`/products/${id}`);
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
  "admin/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/orders");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// confirm order
export const confirmOrder = createAsyncThunk(
  "admin/confirmOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/orders/${orderId}/confirm`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to confirm order"
      );
    }
  }
);

// fetch all payments
export const fetchPayments = createAsyncThunk(
  "admin/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/payment/payments"
      );
      return response.data.allPayments;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update payment status
export const updatePayment = createAsyncThunk(
  "admin/updatePayment",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/payment/updatePayment/${orderId}`,
        { status }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

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

// get all conact messages
export const fetchMessages = createAsyncThunk(
  "admin/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/messages");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Mark message as read
export const markMessageAsRead = createAsyncThunk(
  "user/markMessageAsRead",
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.patch(`/messages/${id}/read`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update message"
      );
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
    notifications: [],
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      // add new product
      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // edit product
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p.id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
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
      // confirm order
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(confirmOrder.rejected, (state, action) => {
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
      })
      // update payment status
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.map((payment) =>
          payment.id === action.payload.id ? action.payload : payment
        );
      })
      .addCase(updatePayment.rejected, (state, action) => {
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
      })
      // fetch all contact messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // mark message as read
      .addCase(markMessageAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        const message = state.messages.find((m) => m.id === action.payload);
        if (message) message.isRead = true;
        state.loading = false;
      })
      .addCase(markMessageAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// fetch all products from products route end point
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products");
      const data = await response.data.products;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// fetch new arrival products
export const fetchNewArrivalProducts = createAsyncThunk(
  "/newarrival/fetchNewArrivalProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/newarrival");
      const data = await response.data.newarrival;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleAddToWishlist = createAsyncThunk(
  "product/handleAddToWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/wishlist", { userId, productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

// remove from wishlist
export const removeWishlist = createAsyncThunk(
  "product/removeFromWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await api.delete("/wishlist", {
        data: { userId, productId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);
// Fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "product/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/wishlist/${userId}`);
      console.log(response.data.wishlist);
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "product/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart", { userId, productId, quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

// Fetch cart
export const fetchCart = createAsyncThunk(
  "product/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cart/${userId}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, items }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/cart/${userId}`, { userId, items });
      console.log(response.data)
      return response.data; // return updated cart from backend
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// send checkout data to backend
export const checkoutOrder = createAsyncThunk(
  "orders/checkoutOrder",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await api.post("/checkout", checkoutData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

// Checkout → create order
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async ({ userId, items, method }, thunkAPI) => {
    try {
      const res = await api.post(`/checkout`, {
        userId,
        items,
        method,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Get user orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, thunkAPI) => {
    try {
      const res = await api.get(`/orders/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update payment status
export const updatePayment = createAsyncThunk(
  "orders/updatePayment",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const res = await api.post(`/payment/${orderId}`, { status });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    productItems: [],
    newArrivalProducts: [],
    wishlistItems: [],
    cart: [],
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.productItems = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // new arrival products
      .addCase(fetchNewArrivalProducts.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivalProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.newArrivalProducts = action.payload;
      })
      .addCase(fetchNewArrivalProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add to wishlist
      .addCase(handleAddToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleAddToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlistItems.push(action.payload);
      })
      .addCase(handleAddToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlistItems = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart.push(action.payload.cartItem);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Checkout
      .addCase(checkoutOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
        state.error = null;
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Payment
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPayment = action.payload.payment;
        // update order in state
        const orderIndex = state.orders.findIndex(
          (o) => o.id === updatedPayment.orderId
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex].payment = updatedPayment;
          state.orders[orderIndex].status =
            updatedPayment.status === "paid"
              ? "paid"
              : state.orders[orderIndex].status;
        }
        state.error = null;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increaseQuantity, decreaseQuantity } = productSlice.actions;
export default productSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// fetch all products from products route end point
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/products?page=${page}&limit=${limit}&search=${search}`
      );
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

// get related products based on category
export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelated",
  async ({ productId, limit }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${productId}/related`, {
        params: { limit },
      });
      console.log(data.items);
      return { productId, items: data.items };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch related products"
      );
    }
  }
);

// get recomended for user
export const fetchRecommendedProducts = createAsyncThunk(
  "recommended/fetchRecommendedProducts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/recommended/${userId}`);
      console.log("Recommended products:", response.data.recommendedProducts);
      return response.data.recommendedProducts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recommended products"
      );
    }
  }
);

// Add to wishlist
export const handleAddToWishlist = createAsyncThunk(
  "product/handleAddToWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/wishlist", { userId, productId });
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

// remove from wishlist
export const removeFromWishlist = createAsyncThunk(
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
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "product/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await api.delete("/cart", {
        data: { userId, productId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
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
      console.log(response.data);
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
    page: 1,
    totalPages: 0,
    newArrivalProducts: [],
    wishlistItems: [],
    cart: [],
    orders: [],
    related: [],
    recommended: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all products
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productItems = action.payload;
        state.page = action.payload;
        state.totalPages = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      // related products
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, items } = action.payload;
        state.related[productId] = items;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // recommended products
      .addCase(fetchRecommendedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.recommended = action.payload;
      })
      .addCase(fetchRecommendedProducts.rejected, (state, action) => {
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
        state.cart.push(action.payload);
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

export const { increaseQuantity, decreaseQuantity, setSearchTerm, searchTerm } =
  productSlice.actions;
export default productSlice.reducer;

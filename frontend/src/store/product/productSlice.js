import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// fetch all products from products route end point
export const fetchProduct = createAsyncThunk('product/fetchProduct', async (_, {rejectWithValue}) => {
    try{
        const response = await api.get("/products");
        const data = await response.data.product;
        return data
    }catch(error){
      return rejectWithValue(error.message);
    }
})

// fetch new arrival products
export const fetchNewArrivalProducts = createAsyncThunk("/newarrival/fetchNewArrivalProducts", async (_, {rejectWithValue}) => {
    try{
      const response = await api.get("/newarrival");
      const data = await response.data.newArrival;
      return data;
    }catch(error){
       return rejectWithValue(error.message);
    }
})

const productSlice = createSlice({
    name: "product",
    initialState: {
    productItems: [],
    newArrivalProducts: [],
    loading: false,
    error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
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
    }
});


export default productSlice.reducer;
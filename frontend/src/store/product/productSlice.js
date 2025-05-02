import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// initializing states
const initialState = {
   productItems: [],
   loading: false,
   error: null,
}
// fetch products from products route end point
export const fetchProduct = createAsyncThunk('product/fetchProduct', async (_, {rejectWithValue}) => {
    try{
        const response = await api.get("/products");
        const data = await response.data;
        console.log(data)
        return data
    }catch(error){
      return rejectWithValue(error.message);
    }
})
const productSlice = createSlice({
    name: "product",
    initialState,
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
    }
});

export default productSlice.reducer;
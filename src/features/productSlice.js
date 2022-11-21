import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import storeAPI from "../APi/storeAPI";
///products/

const initialState = [];

export const productsFetch = createAsyncThunk(
    'products/productsFetch',
    async () => {
        const response = await axios.get(`https://fakestoreapi.com/products`)
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
          .addCase(productsFetch.pending, (state, action) => {
              console.log('Pending')
          })
          .addCase(productsFetch.fulfilled, (state, { payload }) => {
              console.log('Fetched');
              return payload;
          })
          .addCase(productsFetch.rejected, (state, action) => {
              console.log('Rejected');
          })
    }
});

export default productSlice.reducer;
export const getAllProducts = (state) => state.products;
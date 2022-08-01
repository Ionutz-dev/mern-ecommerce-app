import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async productId => {
    const response = await axios.get(`/api/products/${productId}`);

    return response.data;
  }
);

const productDetailsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    productDetails: {},
    error: '',
  },
  reducers: {
    resetProductDetails(state, action) {
      state.productDetails = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { resetProductDetails } = productDetailsSlice.actions;

export default productDetailsSlice;

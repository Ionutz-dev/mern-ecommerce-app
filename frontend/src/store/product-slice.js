import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async productId => {
    const { data } = await axios.get(`/api/products/${productId}`);

    return data;
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get('/api/products');

    return data;
  }
);

const productsListSlice = createSlice({
  name: 'productsList',
  initialState: {
    loading: false,
    productsList: [],
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

const productDetailsSlice = createSlice({
  name: 'productDetails',
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

export { productsListSlice, productDetailsSlice };

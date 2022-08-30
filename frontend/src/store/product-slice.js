import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { logoutUser } from './user-slice';

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async ({ keyword = '', pageNumber = '' }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      return data;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logoutUser());
      }

      return rejectWithValue(message);
    }
  }
);

const productsListSlice = createSlice({
  name: 'productsList',
  initialState: {
    loading: false,
    productsList: [],
    pages: '',
    page: '',
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(listProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(listProducts.fulfilled, (state, action) => {
      state.productsList = action.payload.products;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
      state.loading = false;
    });
    builder.addCase(listProducts.rejected, (state, action) => {
      console.log(action);
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const listProductDetails = createAsyncThunk(
  'products/listProductDetails',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);

      return data;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logoutUser());
      }

      return rejectWithValue(message);
    }
  }
);

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
    builder.addCase(listProductDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(listProductDetails.fulfilled, (state, action) => {
      state.productDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(listProductDetails.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { resetProductDetails } = productDetailsSlice.actions;

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userInfo')).token
          }`,
        },
      });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logoutUser());
      }

      return rejectWithValue(message);
    }
  }
);

const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState: {
    loading: false,
    error: '',
    success: false,
  },
  extraReducers: builder => {
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        '/api/products',
        {},
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('userInfo')).token
            }`,
          },
        }
      );

      return data;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logoutUser());
      }

      return rejectWithValue(message);
    }
  }
);

const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState: {
    product: {},
    loading: false,
    error: '',
    success: false,
  },
  reducers: {
    productCreateReset(state, action) {
      state.product = {};
      state.loading = false;
      state.error = '';
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { productCreateReset } = productCreateSlice.actions;

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('userInfo')).token
            }`,
          },
        }
      );

      return data;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logoutUser());
      }

      return rejectWithValue(message);
    }
  }
);

const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState: {
    product: {},
    loading: false,
    error: '',
    success: false,
  },
  reducers: {
    productUpdateReset(state, action) {
      state.product = {};
      state.loading = false;
      state.error = '';
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { productUpdateReset } = productUpdateSlice.actions;

export const createProductReview = createAsyncThunk(
  'products/createProductReview',
  async ({ productId, review }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('userInfo')).token
            }`,
          },
        }
      );

      return data;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logoutUser());
      }

      return rejectWithValue(message);
    }
  }
);

const productReviewCreateSlice = createSlice({
  name: 'productReviewCreate',
  initialState: {
    loading: false,
    error: '',
    success: false,
  },
  reducers: {
    productReviewCreateReset(state, action) {
      state.loading = false;
      state.error = '';
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(createProductReview.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProductReview.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
    });
    builder.addCase(createProductReview.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { productReviewCreateReset } = productReviewCreateSlice.actions;

export const listTopProducts = createAsyncThunk(
  'products/listTopProducts',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get('/api/products/top');

      return data;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      return rejectWithValue(message);
    }
  }
);

const productsTopRatedSlice = createSlice({
  name: 'productsTopRatedSlice',
  initialState: {
    products: [],
    loading: false,
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(createProductReview.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProductReview.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(createProductReview.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export {
  productsListSlice,
  productDetailsSlice,
  productDeleteSlice,
  productCreateSlice,
  productUpdateSlice,
  productReviewCreateSlice,
  productsTopRatedSlice,
};

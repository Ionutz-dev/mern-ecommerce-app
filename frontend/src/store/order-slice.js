import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { logoutUser } from './user-slice';
import { clearCartItems } from './cart-slice';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/orders', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userInfo')).token
          }`,
        },
      });

      dispatch(clearCartItems());
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

const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState: {
    orderDetails: {},
    loading: false,
    success: false,
    error: '',
  },
  reducers: {
    createOrderReset(state, action) {
      state.orderDetails = {};
      state.loading = false;
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { createOrderReset } = createOrderSlice.actions;

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userInfo')).token
          }`,
        },
      });

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

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    order: {},
    loading: true,
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async ({ orderId, paymentResult }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        {
          headers: {
            'Content-Type': 'application/json',
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

      rejectWithValue(message);
    }
  }
);

const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: {
    success: false,
    loading: false,
    error: '',
  },
  reducers: {
    orderPayReset(state, action) {
      state.success = false;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(payOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(payOrder.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
    });
    builder.addCase(payOrder.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { orderPayReset } = orderPaySlice.actions;

export const listMyOrders = createAsyncThunk(
  'order/ordersMyList',
  async (ordersData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userInfo')).token
          }`,
        },
      });

      return data;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logoutUser());
      }

      rejectWithValue(message);
    }
  }
);

const ordersMyListSlice = createSlice({
  name: 'ordersMyList',
  initialState: {
    orders: [],
    loading: false,
    error: '',
  },
  reducers: {
    ordersMyListReset(state, action) {
      state.orders = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(listMyOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(listMyOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(listMyOrders.rejected, (state, action) => {
      console.log(action);
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { ordersMyListReset } = ordersMyListSlice.actions;

export {
  createOrderSlice,
  orderDetailsSlice,
  orderPaySlice,
  ordersMyListSlice,
};

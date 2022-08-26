import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    paymentMethod: '',
    shippingAddress: {},
  },
  reducers: {
    addCartItem(state, action) {
      const { product: newItem, qty, message } = action.payload;

      const existingItem = state.cartItems.find(
        item => item._id === newItem._id
      );

      if (!existingItem) {
        state.cartItems.push({
          _id: newItem._id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          countInStock: newItem.countInStock,
          qty,
        });
      } else {
        if (message === 'fromCartScreen') existingItem.qty = qty;
        else existingItem.qty += qty;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item._id === id);

      if (existingItem.qty === 1) {
        state.cartItems = state.cartItems.filter(item => item._id !== id);
      } else {
        existingItem.qty--;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod(state, action) {
      console.log(action.payload);
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
    clearCartItems(state, action) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify([]));
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  clearCartItems,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice;

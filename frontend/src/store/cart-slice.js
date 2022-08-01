import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    changed: false,
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
    },
    removeCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item._id === id);

      if (existingItem.qty === 1) {
        state.cartItems = state.cartItems.filter(item => item._id !== id);
      } else {
        existingItem.qty--;
      }
    },
    clearCartItems(state, action) {
      state.cartItems = [];
    },
  },
});

export const { addCartItem, removeCartItem, clearCartItems } =
  cartSlice.actions;

export default cartSlice;

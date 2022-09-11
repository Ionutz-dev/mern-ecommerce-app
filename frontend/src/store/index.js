import { configureStore } from '@reduxjs/toolkit';

import {
  productsListSlice,
  productDetailsSlice,
  productDeleteSlice,
  productCreateSlice,
  productUpdateSlice,
  productReviewCreateSlice,
  productsTopRatedSlice,
} from './product-slice';
import cartSlice from './cart-slice';
import {
  userRegisterSlice,
  userLoginSlice,
  userDetailsSlice,
  userUpdateProfileSlice,
  userListSlice,
  userDeleteSlice,
  userUpdateSlice,
} from './user-slice';
import {
  createOrderSlice,
  orderDetailsSlice,
  orderDeliverSlice,
  orderPaySlice,
  ordersListSlice,
  ordersMyListSlice,
} from './order-slice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    productsList: productsListSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userLogin: userLoginSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdateProfile: userUpdateProfileSlice.reducer,
    createOrder: createOrderSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    orderPay: orderPaySlice.reducer,
    orderDeliver: orderDeliverSlice.reducer,
    ordersMyList: ordersMyListSlice.reducer,
    userList: userListSlice.reducer,
    userDelete: userDeleteSlice.reducer,
    userUpdate: userUpdateSlice.reducer,
    productDelete: productDeleteSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    productReviewCreate: productReviewCreateSlice.reducer,
    productsTopRated: productsTopRatedSlice.reducer,
    ordersList: ordersListSlice.reducer,
  },
  preloadedState: initialState,
});

export default store;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (info, { rejectWithValue }) => {
    const { name, email, password } = info;

    try {
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err) {
      let message = 'Please fill in all fields';
      if (err.response.data.message === 'User already existent')
        message = 'User already existent';
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (info, { rejectWithValue }) => {
    const { email, password } = info;

    try {
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
);

export const logoutUser = () => dispatch => {
  localStorage.setItem('userInfo', JSON.stringify({}));
  localStorage.setItem('cartItems', JSON.stringify([]));
  localStorage.setItem('shippingAddress', JSON.stringify({}));
  localStorage.setItem('paymentMethod', JSON.stringify(''));
  dispatch(userLogout());
  document.location.href = '/login';
};

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userInfo')).token
          }`,
        },
      });

      return data;
    } catch (err) {
      console.log(err);
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

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put('/api/users/profile', user, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userInfo')).token
          }`,
        },
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(setLoginInfo(data));
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

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    loading: false,
    userInfo: {},
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    loading: false,
    userInfo: {},
    error: '',
  },
  reducers: {
    userLogout(state, action) {
      state.userInfo = {};
    },
    setLoginInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { userLogout, setLoginInfo } = userLoginSlice.actions;

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    loading: false,
    user: {},
    error: '',
  },
  reducers: {
    userDetailsReset(state, action) {
      state.user = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { userDetailsReset } = userDetailsSlice.actions;

const userUpdateProfileSlice = createSlice({
  name: 'userUpdate',
  initialState: {
    loading: false,
    userInfo: {},
    error: '',
    success: false,
  },
  reducers: {
    userUpdateProfileReset(state, action) {
      state.userInfo = {};
      // state.success = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = '';
      state.success = true;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    });
  },
});

export const { userUpdateProfileReset } = userUpdateProfileSlice.actions;

export {
  userRegisterSlice,
  userLoginSlice,
  userDetailsSlice,
  userUpdateProfileSlice,
};

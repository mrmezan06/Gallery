import { createSlice } from '@reduxjs/toolkit';

const data = localStorage.getItem('user');
let user = null;
if (data !== 'undefined') {
  user = JSON.parse(data);
} else {
  user = null;
}

const initialState = {
  user: user ? user : undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserToken = (state) => state.auth.user?.accessToken;

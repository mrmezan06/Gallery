import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.category = action.payload?.categories;
    },
    getAllByUser: (state, action) => {
      state.category = action.payload?.categories;
    },
    create: (state, action) => {
      state.category = action.payload?.category;
    },
  },
});

export const { getAll, getAllByUser, create } = categorySlice.actions;

export default categorySlice.reducer;

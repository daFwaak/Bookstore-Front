import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
    removeFromCart: (state, action) => {
      const payload = action.payload;

      if (!payload || !payload._id) return;

      state.items = state.items.filter(item => item._id !== payload._id);
      state.totalAmount -= (payload.price || 0) * (payload.quantity || 1);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

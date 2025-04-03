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
      state.items = state.items.filter(item => item._id !== action.payload._id);
      state.totalAmount -= action.payload.price * action.payload.quantity;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
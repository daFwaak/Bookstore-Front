import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../../app/local"; 

const initialState = {
  user: getCookie() || null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserToLocal: (state, action) => {
      state.user = action.payload;
      setCookie(action.payload); 
    },
    removeUserFromLocal: (state) => {
      state.user = null;
      removeCookie(); 
    },
  },
});

export const { setUserToLocal, removeUserFromLocal } = userSlice.actions;
export default userSlice.reducer;

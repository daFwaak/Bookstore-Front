
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { userSlice } from "../features/auth/userSlice";
import { bookApi } from "../features/book/bookApi";
import { orderApi } from "../features/order/orderApi";
import { cartApi } from "../features/cart/cartApi";
import { cartSlice } from "../features/cart/cartSlice";


export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      bookApi.middleware,
      orderApi.middleware,
      cartApi.middleware,
    ]),
});

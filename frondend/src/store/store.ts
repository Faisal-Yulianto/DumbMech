import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import CartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    profiles: profileReducer,
    user: userReducer,
    product: productReducer,
    Category: categoryReducer,
    cart: CartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


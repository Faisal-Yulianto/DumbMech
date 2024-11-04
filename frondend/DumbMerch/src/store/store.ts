import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    profiles: profileReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

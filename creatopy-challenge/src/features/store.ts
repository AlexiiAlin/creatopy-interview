import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import itemsReducer from '../features/items/itemsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    // other reducers...
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

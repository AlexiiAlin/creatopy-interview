import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  loggedIn: boolean;
  user: User | null;
}

interface User {
  id: number;
  email: string;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

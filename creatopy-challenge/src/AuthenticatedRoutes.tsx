import React from 'react';
import { Navigate } from "react-router-dom";
import { useLocalStorage } from './hooks/useLocalStorage';
import { loginSuccess } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';

// @ts-ignore
export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [cachedUser] = useLocalStorage('user', '');
  if (!cachedUser) {
    return <Navigate to="/login" />;
  }
  dispatch(loginSuccess(cachedUser));

  return children;
};

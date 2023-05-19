import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Items from './pages/ItemsPage';
import { Stack } from '@mui/material';
import Navigation from './components/Navigation';
import { ProtectedRoute } from './AuthenticatedRoutes';

const AppRouter: React.FC = () => {
  return (
    <Stack>
      <Navigation/>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/items" element={
          <ProtectedRoute>
            <Items/>
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Items/>
          </ProtectedRoute>
        } />
      </Routes>
    </Stack>
  );
};

export default AppRouter;

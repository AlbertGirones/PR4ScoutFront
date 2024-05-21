import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = () => {
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
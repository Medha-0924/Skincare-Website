import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const userToken = localStorage.getItem('userToken');
  const username = localStorage.getItem('username');
  
  if (!userToken || username !== 'yash') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;


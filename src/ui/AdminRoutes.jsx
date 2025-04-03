import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const AdminRoutes = () => {
  const { user } = useSelector((state) => state.userSlice);
  return !user ? <Navigate to="/login" /> : user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes

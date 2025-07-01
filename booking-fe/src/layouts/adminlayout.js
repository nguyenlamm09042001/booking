import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/layout/adminheader';

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;

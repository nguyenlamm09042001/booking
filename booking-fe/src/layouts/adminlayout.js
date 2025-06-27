import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <>
      {/* Nếu admin có navbar riêng, import ở đây */}
      <Outlet />
    </>
  );
}

export default AdminLayout;

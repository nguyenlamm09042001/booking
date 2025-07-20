import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffHeader from '../components/layout/staffheader';

const StaffLayout = () => {
  return (
    <div>
      <StaffHeader />
      <Outlet />
    </div>
  );
};

export default StaffLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import BusinessHeader from '../components/layout/businessheader';

const BusinessLayout = () => {
  return (
    <div>
      <BusinessHeader />
      <Outlet />
    </div>
  );
};

export default BusinessLayout;

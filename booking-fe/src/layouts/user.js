import React from 'react';
import Header from '../components/layout/header';
import { Outlet } from 'react-router-dom';

function CustomerLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default CustomerLayout;

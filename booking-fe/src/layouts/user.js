import React from 'react';
import Header from '../components/layout/header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/footer';

function UserLayout() {
  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;

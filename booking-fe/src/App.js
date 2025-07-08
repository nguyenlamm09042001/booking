import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Services from './pages/services';
import BookingForm from './pages/bookingform';
import Appointment from './pages/appointment';
import Profile from './pages/profile';

import AdminDashboard from './pages/admin/dashboard';
import AdminBusiness from './pages/admin/business';
import AdminFeeback from './pages/admin/feedback';
import AdminService from './pages/admin/service';
import AdminUser from './pages/admin/user';

import BusinessDashboard from './pages/business/dashboard';
import BusinessService from './pages/business/service';
import BusinessBooking from './pages/business/booking';
import BusinessFeedback from './pages/business/feedback';

import UserLayout from './layouts/user';
import AdminLayout from './layouts/admin';
import BusinessLayout from './layouts/business';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="business" element={<AdminBusiness />} />
          <Route path="feedback" element={<AdminFeeback />} />
          <Route path="service" element={<AdminService />} />
          <Route path="user" element={<AdminUser />} />
        </Route>

        <Route path="/business" element={<BusinessLayout />}>
          <Route path="dashboard" element={<BusinessDashboard />} />
          <Route path="service" element={<BusinessService />} />
          <Route path="booking" element={<BusinessBooking />} />
          <Route path="feedback" element={<BusinessFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

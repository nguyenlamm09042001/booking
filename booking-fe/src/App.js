import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Services from './pages/services';
import BookingForm from './pages/bookingform';
import AdminDashboard from './pages/admin/dashboard';
import AdminBusiness from './pages/admin/business';
import AdminFeeback from './pages/admin/feedback';
import AdminService from './pages/admin/service';
import AdminUser from './pages/admin/user';
import CustomerLayout from './layouts/userlayout';
import AdminLayout from './layouts/adminlayout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout khách hàng */}
        <Route element={<CustomerLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking/:id" element={<BookingForm />} />
        </Route>

        {/* Layout admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="business" element={<AdminBusiness />} />
          <Route path="feedback" element={<AdminFeeback />} />
          <Route path="service" element={<AdminService />} />
          <Route path="user" element={<AdminUser />} />

        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;

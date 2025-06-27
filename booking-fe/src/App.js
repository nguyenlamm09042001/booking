import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Services from './pages/services';
import BookingForm from './pages/bookingform';
import AdminDashboard from './pages/admin/admindashboard';
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
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

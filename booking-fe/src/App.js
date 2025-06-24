import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Header from './components/layout/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './pages/services';
import BookingForm from './pages/bookingform';

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        {/* Thêm các route khác ở đây */}
        <Route path="/services" element={<Services />} />

        {/* Book dịch vụ */}
        <Route path="/booking/:id" element={<BookingForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import '../../assets/styles/business.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../axios';

export default function BusinessHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      await api.post('/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="business-header">
      <div className="business-header-left">
        <h1>🏢 Business Panel</h1>
      </div>
      <nav className="business-nav">
        <Link to="/business/dashboard">🏠 Dashboard</Link>
        <Link to="/business/services">🛠 Dịch vụ</Link>
        <Link to="/business/bookings">📅 Lịch hẹn</Link>
        <Link to="/business/feedback">💬 Feedback</Link>
        <button onClick={handleLogout} className="business-logout-button">
          🚪 Đăng xuất
        </button>
      </nav>
    </header>
  );
}

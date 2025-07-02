import React from 'react';
import '../../assets/styles/admin.css';
import axios from 'axios';
import api from '../../axios';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminHeader() {
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
    <header className="admin-header">
      <div className="admin-header-left">
        <h1>✨ Admin Panel</h1>
      </div>
      <nav className="admin-nav">
        <Link to="/admin/dashboard">🏠 Dashboard</Link>
        <Link to="/admin/business">🏢 Doanh nghiệp</Link>
        <Link to="/admin/user">👤 Người dùng</Link>
        <Link to="/admin/service">🛠 Dịch vụ</Link>
        <Link to="/admin/feedback">💬 Feedback</Link>
        <button onClick={handleLogout} className="logout-button">
          🚪 Đăng xuất
        </button>
      </nav>
    </header>
  );
}

import React from 'react';
import '../../assets/styles/admin.css';
import axios from 'axios';
import api from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      await api.post('/logout');

      // setUser(null); // xóa dòng này nếu không có useState user ở đây
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="admin-header">
      <h1>Admin Panel</h1>
      <nav className="admin-nav">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/business">Doanh nghiệp</a>
        <a href="/admin/user">Người dùng</a>
        <a href="/admin/service">Dịch vụ</a>
        <a href="/admin/feedback">Feedback</a>
        <button onClick={handleLogout} className="logout-button">
          Đăng xuất
        </button>
      </nav>
    </header>
  );
}

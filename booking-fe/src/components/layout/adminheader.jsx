import React from 'react';
import '../../assets/styles/admin.css';
import axios from 'axios';
import api from '../../axios';
import { useNavigate, Link } from 'react-router-dom';
import { successAlert, errorAlert, confirmAlert } from '../../utils/swal'; 

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // ✅ Confirm trước khi logout
    const confirm = await confirmAlert('🚪 Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?');
    if (!confirm) return;

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      await api.post('/logout');

      // ✅ Hiển thị success alert trước khi redirect
      successAlert('✅ Đăng xuất thành công!').then(() => {
        navigate('/login');
      });

    } catch (error) {
      console.error('Logout failed:', error);
      errorAlert('❌ Đăng xuất thất bại. Vui lòng thử lại.');
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

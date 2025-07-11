import React from 'react';
import '../../assets/styles/business.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../axios';
import { successAlert, errorAlert, confirmAlert } from '../../utils/swal'; // 💡 Thêm confirmAlert

export default function BusinessHeader() {
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
    <header className="business-header">
      <div className="business-header-left">
        <h1>🏢 Business Panel</h1>
      </div>
      <nav className="business-nav">
        <Link to="/business/dashboard">🏠 Dashboard</Link>
        <Link to="/business/income">💰 Doanh thu</Link>
        <Link to="/business/service">🛠 Dịch vụ</Link>
        <Link to="/business/booking">📅 Lịch hẹn</Link>
        <Link to="/business/feedback">💬 Feedback</Link>
        <button onClick={handleLogout} className="business-logout-button">
          🚪 Đăng xuất
        </button>
      </nav>
    </header>
  );
}

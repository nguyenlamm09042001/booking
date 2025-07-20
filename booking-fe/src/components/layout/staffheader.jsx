import React from 'react';
import '../../assets/styles/staff.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../axios';
import { successAlert, errorAlert, confirmAlert } from '../../utils/swal';

export default function StaffHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = await confirmAlert('🚪 Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?');
    if (!confirm) return;

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      await api.post('/logout');

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
        <h1>🧑‍💼 Staff Panel</h1>
      </div>
      <nav className="business-nav">
        <Link to="/staff/dashboard">🏠 Dashboard</Link>
        <Link to="/staff/schedule">📅 Lịch làm việc</Link>
        <Link to="/staff/tasks">🧾 Công việc</Link>
        <button onClick={handleLogout} className="business-logout-button">
          🚪 Đăng xuất
        </button>
      </nav>
    </header>
  );
}

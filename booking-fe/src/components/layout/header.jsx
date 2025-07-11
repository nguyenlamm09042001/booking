import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/header.css';
import api from '../../axios';
import { successAlert, confirmAlert } from '../../utils/swal';

export default function Header() {
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Load nhanh từ localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    // 2. Sync với backend để đảm bảo user thật
    const fetchUser = async () => {
      try {
        const res = await api.get('/user');
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (err) {
        console.log('Not authenticated');
        setUser(null);
        localStorage.removeItem('user');
      }
    };

    fetchUser();
  }, []);

  // ⛔ Auto ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-actions')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleLogout = async () => {
    const confirm = await confirmAlert('🚪 Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?');
    if (!confirm) return;
    
    try {
      await api.post('/logout');
      localStorage.removeItem('user');
      setUser(null);
      successAlert('✅ Đăng xuất thành công!')
      .then(() => {
        navigate('/login');
      });
    
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const role = user?.role;

  return (
    <header className="app-header">
      <Link to="/" className="brand">BookingApp</Link>

      <nav className="nav-container">
        <div className="search-container">
          {!showSearch && (
            <button onClick={toggleSearch} className="search-icon">
              🔍
            </button>
          )}
          {showSearch && (
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
              onBlur={() => setShowSearch(false)}
            />
          )}
        </div>

        {user ? (
          <>
            {/* Hiển thị menu theo role */}
            {role === 'business' && (
              <Link to="/business/dashboard" className="nav-link">Dashboard Business</Link>
            )}

            {role !== 'business' && (
              <Link to="/appointments" className="nav-link">Lịch hẹn</Link>
            )}

            <div className="user-actions">
              <span
                className="user-info"
                title={user.name || user.email}
                onClick={() => setShowDropdown((prev) => !prev)}
                style={{ cursor: 'pointer' }}
              >
                Xin chào, {user.name || user.email} ⏷
              </span>

              {showDropdown && (
                <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                  <Link to="/profile" className="profile-icon" title="Thông tin">
                    Thông tin
                  </Link>
                  <button onClick={handleLogout} className="logout-button">
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="login-icon" title="Đăng nhập">
            Đăng nhập
          </Link>
        )}
      </nav>
    </header>
  );
}

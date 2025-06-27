import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/header.css';
import api from '../../axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // cần import riêng axios gốc

export default function Header({ onLogout }) {
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Not authenticated');
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
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
    try {
      // 👉 gọi đúng route (không qua /api)
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
  
      // 👉 gọi API logout qua axios có baseURL /api
      await api.post('/logout');
  
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
          <div className="user-actions">
            <span
              className="user-info"
              title={user.displayName || user.email}
              onClick={() => setShowDropdown((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            >
              Xin chào, {user.displayName || user.email} ⏷
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
        ) : (
          <Link to="/login" className="login-icon" title="Đăng nhập">
            Đăng nhập
          </Link>
        )}
      </nav>
    </header>
  );
}

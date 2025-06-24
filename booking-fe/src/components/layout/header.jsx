import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/header.css';
import api from '../../axios'; 

export default function Header({ onLogout }) {
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Trạng thái cho dropdown

  useEffect(() => {
    // Gọi API để kiểm tra trạng thái đăng nhập
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      credentials: 'include', // Gửi cookie cùng request
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not authenticated');
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleLogout = () => {
    api.get('/sanctum/csrf-cookie') // Gọi trước để đảm bảo token
      .then(() => {
        return api.post('/api/logout');
      })
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
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
              onBlur={() => setShowSearch(false)} // Ẩn ô tìm kiếm khi mất focus
            />
          )}
        </div>
        {user ? (
          <div
            className="user-actions"
            onMouseEnter={() => setShowDropdown(true)} // Hiển thị dropdown khi di chuột vào
            onMouseLeave={() => setShowDropdown(false)} // Ẩn dropdown khi rời chuột
          >
            <span className="user-info" title={user.displayName || user.email}>
              Xin chào, {user.displayName || user.email}
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
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
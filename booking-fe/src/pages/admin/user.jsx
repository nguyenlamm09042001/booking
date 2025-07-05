import React, { useEffect, useState } from 'react';
import '../../assets/styles/admin.css';
import api from '../../axios';

export default function AdminUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 👉 Gọi API lấy danh sách người dùng
    api.get('admin/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <h1>Người dùng</h1>
      <p className="admin-subtitle">Quản lý tài khoản người dùng hệ thống</p>

      {/* 📊 Tổng quan người dùng */}
      <div className="admin-section">
        <h2>📊 Tổng quan người dùng</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Tổng người dùng</p>
          </div>
    
        </div>
      </div>

      {/* 🔔 Thông báo người dùng */}
      <div className="admin-section">
        <h2>🔔 Thông báo người dùng</h2>
        <ul>
          <li>Đã thêm phân quyền admin vào 01/07/2025.</li>
          <li>Sắp có tính năng reset password cho admin.</li>
        </ul>
      </div>

      {/* 👥 Danh sách người dùng */}
      <div className="admin-section">
        <h2>👥 Danh sách người dùng</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Vai trò</th>
              <th>Ngày đăng ký</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.role}</td>
                  <td>{u.registered_at}</td>
                  <td>{u.status}</td>
                  <td>
                    <button className="btn-view">Xem</button>
                    <button className="btn-approve">Kích hoạt</button>
                    <button className="btn-cancel">Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📝 Cập nhật gần đây */}
      <div className="admin-section">
        <h2>📝 Cập nhật gần đây</h2>
        <ul>
          <li>2025-06-30 – Thêm vai trò admin cho người dùng.</li>
          <li>2025-06-28 – Cập nhật UI trang Người dùng.</li>
        </ul>
      </div>
    </div>
  );
}

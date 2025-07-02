import React, { useEffect, useState } from 'react';
import '../../assets/styles/admin.css';
import api from '../../axios';

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [topOwners, setTopOwners] = useState([]);

  useEffect(() => {
    // 👉 Gọi API lấy danh sách doanh nghiệp
    api.get('/businesses')
      .then(res => setBusinesses(res.data))
      .catch(err => console.error(err));

    // 👉 Gọi API lấy top chủ sở hữu (nếu có)
    api.get('/businesses/top-owners')
      .then(res => setTopOwners(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <h1>Doanh nghiệp</h1>
      <p className="admin-subtitle">Quản lý danh sách doanh nghiệp đăng ký trên hệ thống</p>

      {/* 📊 Tổng quan doanh nghiệp */}
      <div className="admin-section">
        <h2>📊 Tổng quan doanh nghiệp</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{businesses.length}</h3>
            <p>Tổng doanh nghiệp</p>
          </div>
          <div className="stat-card">
            <h3>{businesses.filter(b => b.status === 'active').length}</h3>
            <p>Đang hoạt động</p>
          </div>
          <div className="stat-card">
            <h3>{businesses.filter(b => b.status === 'pending').length}</h3>
            <p>Chờ duyệt</p>
          </div>
        </div>
      </div>

      {/* 🔔 Thông báo doanh nghiệp */}
      <div className="admin-section">
        <h2>🔔 Thông báo doanh nghiệp</h2>
        <ul>
          <li>Hệ thống sẽ bảo trì 01/07/2025 lúc 02:00 AM.</li>
          <li>Sắp ra mắt tính năng lọc doanh nghiệp theo khu vực.</li>
        </ul>
      </div>

      {/* 🏢 Danh sách doanh nghiệp */}
      <div className="admin-section">
        <h2>🏢 Danh sách doanh nghiệp</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên doanh nghiệp</th>
              <th>Chủ sở hữu</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Số dịch vụ</th>
              <th>Trạng thái</th>
              <th>Ngày đăng ký</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {businesses.length > 0 ? (
              businesses.map((b, index) => (
                <tr key={b.id}>
                  <td>{index + 1}</td>
                  <td>{b.name}</td>
                  <td>{b.owner_name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.address}</td>
                  <td>{b.service_count}</td>
                  <td>{b.status}</td>
                  <td>{b.registered_at}</td>
                  <td>
                    <button className="btn-view">Xem</button>
                    <button className="btn-approve">Duyệt</button>
                    <button className="btn-cancel">Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📝 Cập nhật gần đây */}
      <div className="admin-section">
        <h2>📝 Cập nhật gần đây</h2>
        <ul>
          <li>2025-06-30 – Thêm trường Địa chỉ doanh nghiệp.</li>
          <li>2025-06-28 – Cập nhật UI trang Doanh nghiệp.</li>
        </ul>
      </div>

      {/* 👥 Top chủ sở hữu */}
      <div className="admin-section">
        <h2>👥 Top chủ sở hữu</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên chủ sở hữu</th>
              <th>Số doanh nghiệp</th>
            </tr>
          </thead>
          <tbody>
            {topOwners.length > 0 ? (
              topOwners.map((o, index) => (
                <tr key={o.id}>
                  <td>{index + 1}</td>
                  <td>{o.name}</td>
                  <td>{o.business_count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

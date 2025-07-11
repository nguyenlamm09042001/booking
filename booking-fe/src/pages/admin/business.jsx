import React, { useEffect, useState } from 'react';
import '../../assets/styles/admin.css';
import api from '../../axios';

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    // 👉 Gọi API lấy danh sách doanh nghiệp
    api.get('/admin/businesses')
      .then(res => setBusinesses(res.data))
      .catch(err => console.error('Lỗi load businesses:', err));


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
            <h3>{businesses.filter(b => b.status === 'Đang hoạt động').length}</h3>
            <p>Đang hoạt động</p>
          </div>
          <div className="stat-card">
            <h3>{businesses.filter(b => b.status === 'Đang chờ duyệt').length}</h3>
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
                  <td>{b.name || 'Chưa cập nhật'}</td>
                  <td>{b.user?.name || 'Chưa cập nhật'}</td>
                  <td>{b.user?.email || 'Chưa cập nhật'}</td>
                  <td>{b.phone || 'Chưa cập nhật'}</td>
                  <td>{b.location || 'Chưa cập nhật'}</td>
                  <td>{b.services ? b.services.length : 0}</td>
                  <td>{b.status || 'Chưa cập nhật'}</td>
                  <td>{b.created_at ? new Date(b.created_at).toLocaleDateString() : 'Chưa cập nhật'}</td>
                  <td>
                    <button className="btn-view">Xem</button>
                    {b.status === 'pending' && (
                      <button className="btn-approve">Duyệt</button>
                    )}
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

    
    </div>
  );
}

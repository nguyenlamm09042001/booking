import React, { useEffect, useState } from 'react';
import '../../assets/styles/admin.css';
import api from '../../axios';

const AdminService = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // 👉 Gọi API lấy danh sách dịch vụ
    api.get('/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <h1>Dịch vụ</h1>
      <p className="admin-subtitle">Quản lý danh sách dịch vụ trên hệ thống</p>

      {/* 📊 Tổng quan dịch vụ */}
      <div className="admin-section">
        <h2>📊 Tổng quan dịch vụ</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{services.length}</h3>
            <p>Tổng dịch vụ</p>
          </div>
          <div className="stat-card">
            <h3>{services.filter(s => s.status === 'active').length}</h3>
            <p>Đang hoạt động</p>
          </div>
          <div className="stat-card">
            <h3>{services.filter(s => s.status === 'pending').length}</h3>
            <p>Chờ duyệt</p>
          </div>
        </div>
      </div>

      {/* 🔔 Thông báo dịch vụ */}
      <div className="admin-section">
        <h2>🔔 Thông báo dịch vụ</h2>
        <ul>
          <li>Đã thêm phân loại dịch vụ vào 01/07/2025.</li>
          <li>Sắp có tính năng lọc dịch vụ theo doanh nghiệp.</li>
        </ul>
      </div>

      {/* 🛠️ Danh sách dịch vụ */}
      <div className="admin-section">
        <h2>🛠️ Danh sách dịch vụ</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên dịch vụ</th>
              <th>Doanh nghiệp</th>
              <th>Giá</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.business_name}</td>
                  <td>{s.price} đ</td>
                  <td>{s.duration} phút</td>
                  <td>{s.status}</td>
                  <td>{s.created_at}</td>
                  <td>
                    <button className="btn-view">Xem</button>
                    <button className="btn-approve">Duyệt</button>
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
          <li>2025-06-30 – Thêm trường Thời gian dịch vụ.</li>
          <li>2025-06-28 – Cập nhật UI trang Dịch vụ.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminService;

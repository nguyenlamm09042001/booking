import React from 'react';
import '../../assets/styles/admin.css';

export default function AdminDashboard() {
  // Data mẫu
  const notifications = [
    { id: 1, content: 'Hệ thống sẽ bảo trì vào 01/07/2025 lúc 02:00 AM.' },
    { id: 2, content: 'Tính năng mới: Quản lý voucher giảm giá.' },
  ];

  const activeAdmins = [
    { id: 1, name: 'Admin Kim', email: 'kim@bookingapp.com' },
    { id: 2, name: 'Admin Lam', email: 'lam@bookingapp.com' },
  ];

  const revenue = 50000000; // demo doanh thu
  const pendingBusinesses = [
    { id: 1, name: 'Salon Tóc Xinh', owner: 'Nguyễn Văn C' },
    { id: 2, name: 'Spa Thiên Kim', owner: 'Trần Thị D' },
  ];

  const activeServicesCount = 35; // demo số dịch vụ đang hoạt động

  const systemUpdates = [
    { id: 1, title: 'Ra mắt tính năng quản lý banner quảng cáo', date: '2025-06-25' },
    { id: 2, title: 'Cập nhật giao diện trang business', date: '2025-06-20' },
  ];

  return (
    <div className="admin-container">
      {/* ========== Admin Header ========== */}

      <p className="admin-subtitle">Tổng quan hệ thống Booking App</p>

      {/* ========== Section Tổng Quan ========== */}
      <section className="admin-section">
        <h2>📊 Tổng quan</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{revenue.toLocaleString()} đ</h3>
            <p>Doanh thu tháng này</p>
          </div>
          <div className="stat-card">
            <h3>{activeAdmins.length}</h3>
            <p>Admin đang hoạt động</p>
          </div>
          <div className="stat-card">
            <h3>{pendingBusinesses.length}</h3>
            <p>Doanh nghiệp chờ duyệt</p>
          </div>
          <div className="stat-card">
            <h3>{activeServicesCount}</h3>
            <p>Dịch vụ đang hoạt động</p>
          </div>
        </div>
      </section>

      {/* ========== Section Thông báo ========== */}
      <section className="admin-section">
        <h2>🔔 Thông báo hệ thống</h2>
        <ul className="admin-list">
          {notifications.map((n) => (
            <li key={n.id}>{n.content}</li>
          ))}
        </ul>
      </section>

      {/* ========== Section Doanh nghiệp chờ duyệt ========== */}
      <section className="admin-section">
        <h2>🕒 Doanh nghiệp chờ duyệt</h2>
        {pendingBusinesses.length === 0 ? (
          <p>Không có doanh nghiệp nào đang chờ duyệt.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên doanh nghiệp</th>
                <th>Chủ sở hữu</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pendingBusinesses.map((b, index) => (
                <tr key={b.id}>
                  <td>{index + 1}</td>
                  <td>{b.name}</td>
                  <td>{b.owner}</td>
                  <td>
                    <button className="btn-view">Xem</button>
                    <button className="btn-approve">Duyệt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ========== Section Cập nhật hệ thống ========== */}
      <section className="admin-section">
        <h2>📰 Cập nhật hệ thống</h2>
        <ul className="admin-list">
          {systemUpdates.map((u) => (
            <li key={u.id}>{u.date} - {u.title}</li>
          ))}
        </ul>
      </section>

      {/* ========== Section Admin đang hoạt động ========== */}
      <section className="admin-section">
        <h2>👤 Admin đang hoạt động</h2>
        <ul className="admin-list">
          {activeAdmins.map((a) => (
            <li key={a.id}>{a.name} ({a.email})</li>
          ))}
        </ul>
      </section>

    </div>
  );
}

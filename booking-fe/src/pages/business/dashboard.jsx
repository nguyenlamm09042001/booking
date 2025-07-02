import React from 'react';
import '../../assets/styles/business.css';

export default function BusinessDashboard() {
  return (
    <div className="business-container">
      <main className="business-main">
        {/* 🔥 Banner chào mừng */}
        <div className="business-banner">
          🎉 Chúc bạn một ngày làm việc hiệu quả!
        </div>

        <h2>👋 Chào mừng đến Business Dashboard</h2>
        <p>Đây là nơi quản lý dịch vụ, lịch hẹn và phản hồi của doanh nghiệp bạn.</p>

        {/* 🔥 Thống kê nhanh */}
        <div className="business-stats">
          <div className="stat-card stat-blue">
            <h3>12</h3>
            <p>🛠 Dịch vụ</p>
          </div>
          <div className="stat-card stat-green">
            <h3>8</h3>
            <p>📅 Lịch hẹn hôm nay</p>
          </div>
          <div className="stat-card stat-yellow">
            <h3>5</h3>
            <p>💬 Feedback mới</p>
          </div>
        </div>

        {/* 🔥 Bảng dịch vụ mới nhất */}
        <section className="business-section">
          <h2>Dịch vụ mới nhất</h2>
          <table className="business-table">
            <thead>
              <tr>
                <th>Tên dịch vụ</th>
                <th>Giá</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cắt tóc nam</td>
                <td>100.000đ</td>
                <td>01/07/2025</td>
              </tr>
              <tr>
                <td>Gội đầu dưỡng sinh</td>
                <td>150.000đ</td>
                <td>30/06/2025</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 🔥 Bảng lịch hẹn hôm nay */}
        <section className="business-section">
          <h2>Lịch hẹn hôm nay</h2>
          <table className="business-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Dịch vụ</th>
                <th>Giờ hẹn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nguyễn Văn A</td>
                <td>Cắt tóc nam</td>
                <td>09:00</td>
              </tr>
              <tr>
                <td>Trần Thị B</td>
                <td>Gội đầu dưỡng sinh</td>
                <td>10:30</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

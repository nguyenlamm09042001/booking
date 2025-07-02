import React, { useEffect, useState } from 'react';
import '../../assets/styles/admin.css';
import api from '../../axios';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // 👉 Gọi API lấy danh sách feedback
    api.get('/feedbacks')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <h1>Feedback</h1>
      <p className="admin-subtitle">Quản lý phản hồi của người dùng và doanh nghiệp</p>

      {/* 📊 Tổng quan feedback */}
      <div className="admin-section">
        <h2>📊 Tổng quan phản hồi</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{feedbacks.length}</h3>
            <p>Tổng phản hồi</p>
          </div>
          <div className="stat-card">
            <h3>{feedbacks.filter(f => f.type === 'user').length}</h3>
            <p>Phản hồi từ người dùng</p>
          </div>
          <div className="stat-card">
            <h3>{feedbacks.filter(f => f.type === 'business').length}</h3>
            <p>Phản hồi từ doanh nghiệp</p>
          </div>
        </div>
      </div>

      {/* 🔔 Thông báo feedback */}
      <div className="admin-section">
        <h2>🔔 Thông báo phản hồi</h2>
        <ul>
          <li>Đã thêm tính năng phân loại phản hồi vào 01/07/2025.</li>
          <li>Sắp có tính năng trả lời phản hồi trực tiếp.</li>
        </ul>
      </div>

      {/* 💬 Danh sách feedback */}
      <div className="admin-section">
        <h2>💬 Danh sách phản hồi</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Người gửi</th>
              <th>Email</th>
              <th>Loại</th>
              <th>Nội dung</th>
              <th>Ngày gửi</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((f, index) => (
                <tr key={f.id}>
                  <td>{index + 1}</td>
                  <td>{f.sender_name}</td>
                  <td>{f.email}</td>
                  <td>{f.type}</td>
                  <td>{f.content}</td>
                  <td>{f.created_at}</td>
                  <td>{f.status}</td>
                  <td>
                    <button className="btn-view">Xem</button>
                    <button className="btn-approve">Đánh dấu đã xử lý</button>
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
          <li>2025-06-30 – Thêm trường Loại phản hồi.</li>
          <li>2025-06-28 – Cập nhật UI trang Feedback.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminFeedback;

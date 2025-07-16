import React, { useEffect, useState } from 'react';
import '../../assets/styles/admin.css';
import api from '../../axios';
import { successAlert, errorAlert, confirmAlert } from '../../utils/swal';

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const handleViewBusiness = (business) => {
    setSelectedBusiness(business);
  };

  const handleApproveBusiness = async (id) => {
    const confirm = await confirmAlert("Duyệt doanh nghiệp", "Bạn có chắc chắn muốn duyệt doanh nghiệp này?");
    if (!confirm) return;

    try {
      await api.put(`/admin/businesses/${id}/approve`);
      setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: 'Đang hoạt động' } : b));
      successAlert("✅ Doanh nghiệp đã được duyệt!");
    } catch (err) {
      console.error(err);
      errorAlert("❌ Duyệt doanh nghiệp thất bại!");
    }
  };

  const handlePauseBusiness = async (id) => {
    const confirm = await confirmAlert("Tạm ngừng doanh nghiệp", "Bạn có muốn tạm ngừng doanh nghiệp này?");
    if (!confirm) return;

    try {
      await api.put(`/admin/businesses/${id}/pause`);
      setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: 'Đã tạm ngừng' } : b));
      successAlert("⏸ Doanh nghiệp đã tạm ngừng!");
    } catch (err) {
      console.error(err);
      errorAlert("❌ Tạm ngừng doanh nghiệp thất bại!");
    }
  };

  const handleResumeBusiness = async (id) => {
    const confirm = await confirmAlert("Hoạt động lại", "Bạn muốn cho doanh nghiệp này hoạt động lại?");
    if (!confirm) return;

    try {
      await api.put(`/admin/businesses/${id}/resume`);
      setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: 'Đang hoạt động' } : b));
      successAlert("▶️ Doanh nghiệp đã hoạt động lại!");
    } catch (err) {
      console.error(err);
      errorAlert("❌ Khôi phục doanh nghiệp thất bại!");
    }
  };

  const handleDeleteBusiness = async (id) => {
    const confirm = await confirmAlert("Xoá doanh nghiệp", "Bạn chắc chắn muốn xoá doanh nghiệp này?");
    if (!confirm) return;

    try {
      await api.delete(`/admin/businesses/${id}`);
      setBusinesses(prev => prev.filter(b => b.id !== id));
      successAlert("🗑 Doanh nghiệp đã bị xoá!");
    } catch (err) {
      console.error(err);
      errorAlert("❌ Xoá doanh nghiệp thất bại!");
    }
  };

  useEffect(() => {
    api.get('/admin/businesses')
      .then(res => setBusinesses(res.data))
      .catch(err => console.error('Lỗi load businesses:', err));
  }, []);

  return (
    <div className="admin-container">
      <h1>Doanh nghiệp</h1>
      <p className="admin-subtitle">Quản lý danh sách doanh nghiệp đăng ký trên hệ thống</p>

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

      <div className="admin-section">
        <h2>🔔 Thông báo doanh nghiệp</h2>
        <ul>
          <li>Hệ thống sẽ bảo trì 01/07/2025 lúc 02:00 AM.</li>
          <li>Sắp ra mắt tính năng lọc doanh nghiệp theo khu vực.</li>
        </ul>
      </div>

      <div className="admin-section">
        <h2>🏢 Danh sách doanh nghiệp</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên doanh nghiệp</th>
              <th>Số dịch vụ</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {businesses.length > 0 ? (
              businesses.map((b, index) => (
                <tr key={b.id}>
                  <td>{index + 1}</td>
                  <td>{b.name || 'Chưa cập nhật'}</td>
                  <td>{b.services ? b.services.length : 0}</td>
                  <td>
                    <span className={`status-tag ${b.status === 'Đang hoạt động' ? 'active' : b.status === 'Đã tạm ngừng' ? 'paused' : 'pending'}`}>
                      {b.status || 'Chưa cập nhật'}
                    </span>
                  </td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewBusiness(b)}>👁 Xem</button>
                    {b.status === 'Đang chờ duyệt' && (
                      <button className="action-button approve" onClick={() => handleApproveBusiness(b.id)}>✅ Duyệt</button>
                    )}
                    {b.status === 'Đang hoạt động' && (
                      <button className="action-button pause" onClick={() => handlePauseBusiness(b.id)}>⏸ Tạm ngừng</button>
                    )}
                    {b.status === 'Đã tạm ngừng' && (
                      <button className="action-button resume" onClick={() => handleResumeBusiness(b.id)}>▶️ Hoạt động lại</button>
                    )}
                    <button className="action-button delete" onClick={() => handleDeleteBusiness(b.id)}>🗑 Xoá</button>
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

      {/* 🔍 Modal chi tiết doanh nghiệp */}
      {selectedBusiness && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedBusiness(null)}>×</button>
            <h2>Chi tiết doanh nghiệp</h2>
            <p><strong>Tên:</strong> {selectedBusiness.name}</p>
            <p><strong>Chủ sở hữu:</strong> {selectedBusiness.user?.name || 'Chưa cập nhật'}</p>
            <p><strong>Email:</strong> {selectedBusiness.user?.email || 'Chưa cập nhật'}</p>
            <p><strong>SĐT:</strong> {selectedBusiness.phone || 'Chưa cập nhật'}</p>
            <p><strong>Địa chỉ:</strong> {selectedBusiness.location || 'Chưa cập nhật'}</p>
            <p><strong>Số dịch vụ:</strong> {selectedBusiness.services?.length || 0}</p>
            <p><strong>Trạng thái:</strong> {selectedBusiness.status}</p>
            <p><strong>Ngày tạo:</strong> {new Date(selectedBusiness.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}

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

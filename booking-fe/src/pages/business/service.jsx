import React, { useState } from 'react';
import '../../assets/styles/business.css';

export default function BusinessServices() {
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    console.log('Service added:', newService);
    // TODO: Call API to create service here
    setShowModal(false);
    setNewService({ name: '', price: '', description: '' });
  };

  return (
    <div className="business-container">
      <main className="business-main">
        <h2>🛠 Quản lý dịch vụ</h2>
        <p>Danh sách các dịch vụ mà doanh nghiệp bạn đang cung cấp.</p>

        {/* 🔥 Bảng danh sách dịch vụ */}
        <section className="business-section">
          <h2>Danh sách dịch vụ</h2>
          <table className="business-table">
            <thead>
              <tr>
                <th>Tên dịch vụ</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cắt tóc nam</td>
                <td>100.000đ</td>
                <td>Cắt tạo kiểu nam, gội đầu</td>
                <td>01/07/2025</td>
                <td>
                  <button className="action-button edit">✏️ Sửa</button>
                  <button className="action-button delete">🗑 Xóa</button>
                </td>
              </tr>
              {/* Map các dịch vụ khác tại đây */}
            </tbody>
          </table>
        </section>

        {/* 🔥 Button thêm dịch vụ mới */}
        <div className="add-service-button-container">
          <button className="add-service-button" onClick={() => setShowModal(true)}>
            ➕ Thêm dịch vụ mới
          </button>
        </div>

        {/* 🔥 Modal form thêm dịch vụ */}
        {showModal && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              // Đóng modal nếu bấm vào overlay, không phải nội dung modal
              if (e.target.classList.contains('modal-overlay')) {
                setShowModal(false);
              }
            }}
          >
            <div className="modal-content">
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
              <h2>➕ Thêm dịch vụ mới</h2>
              <form onSubmit={handleAddService}>
                <label>Tên dịch vụ</label>
                <input
                  type="text"
                  name="name"
                  value={newService.name}
                  onChange={handleInputChange}
                  required
                />

                <label>Giá</label>
                <input
                  type="text"
                  name="price"
                  value={newService.price}
                  onChange={handleInputChange}
                  required
                />

                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={newService.description}
                  onChange={handleInputChange}
                  required
                ></textarea>

                <div className="modal-actions">
                  <button type="submit" className="add-service-button">Lưu</button>
                  <button type="button" className="action-button delete" onClick={() => setShowModal(false)}>
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

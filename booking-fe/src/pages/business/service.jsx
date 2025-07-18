import React, { useState, useEffect, useCallback } from "react";
import "../../assets/styles/business.css";
import api from "../../axios";
import { successAlert, errorAlert, confirmAlert } from "../../utils/swal";
import { NumericFormat } from "react-number-format";

export default function BusinessServices() {
  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const businessId = user.business_id;

  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const fetchServices = useCallback(async () => {
    try {
      const res = await api.get(`/businesses/${businessId}/services`);
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [businessId]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/businesses/${businessId}/services`, newService);
      successAlert("Dịch vụ đã được thêm thành công!");
      fetchServices();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      errorAlert("Thêm dịch vụ thất bại");
    }
  };

  const handleEditService = (service) => {
    setNewService({
      name: service.name,
      price: service.price,
      description: service.description,
      duration: service.duration,
    });
    setEditServiceId(service.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/businesses/${businessId}/services/${editServiceId}`,
        newService
      );
      successAlert("Dịch vụ đã được cập nhật thành công!");
      fetchServices();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      errorAlert("Cập nhật thất bại");
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const confirmDelete = await confirmAlert(
        "Bạn chắc chắn muốn xoá dịch vụ này?"
      );

      if (!confirmDelete) return;
      await api.delete(`/businesses/${businessId}/services/${serviceId}`);
      successAlert("Dịch vụ đã được xoá!");
      fetchServices();
    } catch (err) {
      console.error(err);
      errorAlert("Xoá thất bại");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditServiceId(null);
    setNewService({ name: "", price: "", description: "", duration: "" });
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
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{Number(service.price).toLocaleString()}đ</td>
                  <td>{service.description}</td>
                  <td>{new Date(service.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={() => handleEditService(service)}
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      🗑 Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 🔥 Button thêm dịch vụ mới */}
        <div className="add-service-button-container">
          <button
            className="add-service-button"
            onClick={() => {
              setNewService({
                name: "",
                price: "",
                description: "",
                duration: "",
              });
              setIsEditing(false);
              setEditServiceId(null);
              setShowModal(true);
            }}
          >
            ➕ Thêm dịch vụ mới
          </button>
        </div>

        {/* 🔥 Modal form thêm/sửa dịch vụ */}
        {showModal && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target.classList.contains("modal-overlay")) {
                handleCloseModal();
              }
            }}
          >
            <div className="modal-content">
              <button className="close-button" onClick={handleCloseModal}>
                ×
              </button>
              <form
                onSubmit={isEditing ? handleUpdateService : handleAddService}
              >
                <h2>{isEditing ? "✏️ Sửa dịch vụ" : "➕ Thêm dịch vụ mới"}</h2>

                <label>Tên dịch vụ</label>
                <input
                  type="text"
                  name="name"
                  value={newService.name}
                  onChange={handleInputChange}
                  required
                />

                <label>Giá (vnđ)</label>
                <NumericFormat
                  thousandSeparator={true}
                  value={newService.price}
                  onValueChange={(values) => {
                    const { value } = values; // raw number
                    setNewService({ ...newService, price: value });
                  }}
                  className="your-input-class"
                  required
                />

                <label>Thời lượng (phút)</label>
                <input
                  type="number"
                  name="duration"
                  value={newService.duration}
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
                  <button type="submit" className="add-service-button">
                    {isEditing ? "Cập nhật" : "Lưu"}
                  </button>
                  <button
                    type="button"
                    className="action-button delete"
                    onClick={handleCloseModal}
                  >
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

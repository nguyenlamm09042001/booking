import React, { useState, useEffect, useCallback } from "react";
import api from "../../axios";
import "../../assets/styles/business.css";
import { successAlert, errorAlert, confirmAlert } from "../../utils/swal";

export default function AssignStaff() {
  const [tab, setTab] = useState("staff");

  const [staffs, setStaffs] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editStaffId, setEditStaffId] = useState(null);

  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    date: "",
    time_start: "",
    staff_id: "",
    service_id: "",
  });

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_id: "",
    password: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const businessId = user?.business_id;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchData = useCallback(async () => {
    try {
      const [resStaffs, resAppointments, resServices] = await Promise.all([
        api.get(`/businesses/${businessId}/staffs`),
        api.get(`/businesses/${businessId}/assignments`),
        api.get(`/businesses/${businessId}/services`),
      ]);
      setStaffs(resStaffs.data);
      setAppointments(resAppointments.data);
      setServices(resServices.data);
    } catch (err) {
      console.error(err);
      errorAlert("Lỗi khi tải dữ liệu");
    }
  }, [businessId]);

  useEffect(() => {
    if (businessId) fetchData();
  }, [fetchData]);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    const confirm = await confirmAlert("Bạn chắc chắn muốn tạo nhân viên này?");
    if (!confirm) return;

    const payload = { ...form, business_id: businessId };
    try {
      await api.post(`/businesses/${businessId}/staffs`, payload);
      successAlert("Tạo nhân viên thành công!");
      fetchData();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      errorAlert("Tạo nhân viên thất bại");
    }
  };

  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    const confirm = await confirmAlert(
      "Bạn chắc chắn muốn cập nhật nhân viên?"
    );
    if (!confirm) return;

    try {
      await api.put(`/businesses/${businessId}/staffs/${editStaffId}`, form);
      successAlert("Cập nhật nhân viên thành công!");
      fetchData();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      errorAlert("Cập nhật thất bại");
    }
  };

  const handleDeleteStaff = async (id) => {
    const confirm = await confirmAlert("Bạn chắc chắn muốn xoá nhân viên này?");
    if (!confirm) return;

    try {
      await api.delete(`/businesses/${businessId}/staffs/${id}`);
      successAlert("Đã xoá nhân viên");
      fetchData();
    } catch (err) {
      console.error(err);
      errorAlert("Xoá thất bại");
    }
  };

  const handleEditStaff = (staff) => {
    setForm({
      name: staff.name,
      email: staff.email || "",
      phone: staff.phone || "",
      service_id: staff.service_id || "",
    });
    setEditStaffId(staff.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setForm({ name: "", email: "", phone: "", service_id: "" });
    setIsEditing(false);
    setEditStaffId(null);
    setShowModal(false);
  };

  const handleEditAppointment = (appointment) => {
    setAppointmentForm({
      date: appointment.date,
      time_start: appointment.time_start,
      staff_id: appointment.staff_id,
      service_id: appointment.service_id,
    });
    setEditAppointmentId(appointment.id);
    setShowAppointmentModal(true);
  };

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();

    const confirm = await confirmAlert(
      "Bạn chắc chắn muốn cập nhật lịch hẹn này?"
    );
    if (!confirm) return;

    try {
      await api.put(
        `/businesses/assignments/${editAppointmentId}`,
        appointmentForm
      );
      successAlert("Cập nhật lịch hẹn thành công!");
      fetchData();
      setShowAppointmentModal(false);
    } catch (err) {
      console.error(err);
      errorAlert("Cập nhật thất bại");
    }
  };

  // const handleDeleteAppointment = async (id) => {
  //   const confirm = await confirmAlert("Bạn chắc chắn muốn xoá lịch hẹn này?");
  //   if (!confirm) return;

  //   try {
  //     await api.delete(`/businesses/assignments/${id}`);
  //     successAlert("Đã xoá lịch hẹn");
  //     fetchData();
  //   } catch (err) {
  //     console.error(err);
  //     errorAlert("Xoá lịch hẹn thất bại");
  //   }
  // };

  return (
    <div className="business-container">
      <main className="business-main">
        <div className="tabs">
          <button
            className={`tab-button ${tab === "staff" ? "active-tab" : ""}`}
            onClick={() => setTab("staff")}
          >
            👥 Quản lý nhân viên
          </button>
          <button
            className={`tab-button ${tab === "assign" ? "active-tab" : ""}`}
            onClick={() => setTab("assign")}
          >
            🛠 Phân công dịch vụ
          </button>
        </div>

        {/* Quản lý nhân viên */}
        {tab === "staff" && (
          <section className="business-section">
            <h2>Danh sách nhân viên</h2>
            <table className="business-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Ngày tạo</th>
                  <th>Phụ trách dịch vụ</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => (
                  <tr key={staff.id}>
                    <td>{index + 1}</td>
                    <td>{staff.name}</td>
                    <td>{staff.email || "—"}</td>
                    <td>{staff.phone || "—"}</td>
                    <td>{new Date(staff.created_at).toLocaleDateString()}</td>
                    <td>{staff.service_name}</td>
                    <td>
                      <button
                        className="action-button edit"
                        onClick={() => handleEditStaff(staff)}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => handleDeleteStaff(staff.id)}
                      >
                        🗑 Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="add-service-button-container">
              <button
                className="add-service-button"
                onClick={() => {
                  setForm({ name: "", email: "", phone: "", service_id: "" });
                  setIsEditing(false);
                  setShowModal(true);
                }}
              >
                ➕ Thêm nhân viên mới
              </button>
            </div>
          </section>
        )}

        {/* Phân công dịch vụ */}
        {tab === "assign" && (
          <section className="business-section">
            <h2>Danh sách lịch hẹn</h2>
            <table className="business-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Nhân viên</th>
                  <th>Dịch vụ</th>
                  <th>Khách</th>
                  <th>SĐT</th>
                  <th>Thời gian</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, index) => (
                  <tr key={a.id}>
                    <td>{index + 1}</td>
                    <td>{a.staff_name || "—"}</td>
                    <td>{a.service_name || "—"}</td>
                    <td>{a.user_name || "—"}</td>
                    <td>{a.user_phone || "—"}</td>
                    <td>
                      {a.date} {a.time_start?.slice(0, 5)}
                    </td>
                    <td>
                      <button
                        className="action-button edit"
                        onClick={() => handleEditAppointment(a)}
                      >
                        ✏️ Sửa
                      </button>
                      {/* <button
                      className="action-button delete"
                      onClick={() => handleDeleteAppointment(a.id)}
                    >
                      🗑 Xoá
                    </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Modal thêm/sửa nhân viên */}
        {showModal && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target.classList.contains("modal-overlay"))
                handleCloseModal();
            }}
          >
            <div className="modal-content">
              <button className="close-button" onClick={handleCloseModal}>
                ×
              </button>
              <form
                onSubmit={isEditing ? handleUpdateStaff : handleCreateStaff}
              >
                <h2>
                  {isEditing ? "✏️ Sửa nhân viên" : "➕ Thêm nhân viên mới"}
                </h2>

                <label>Họ tên</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />

                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                />

                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                />

                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  required={!isEditing}
                />

                <label>Dịch vụ phụ trách</label>
                <select
                  name="service_id"
                  value={form.service_id}
                  onChange={handleInputChange}
                >
                  <option value="">-- Không chọn --</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <div className="modal-actions">
                  <button type="submit" className="add-service-button">
                    {isEditing ? "Cập nhật" : "Lưu"}
                  </button>
                  <button
                    type="button"
                    className="action-button delete"
                    onClick={handleCloseModal}
                  >
                    Huỷ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAppointmentModal && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target.classList.contains("modal-overlay")) {
                setShowAppointmentModal(false);
              }
            }}
          >
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => setShowAppointmentModal(false)}
              >
                ×
              </button>
              <form onSubmit={handleUpdateAppointment}>
                <h2>✏️ Sửa lịch hẹn</h2>

                <label>Ngày</label>
                <input
                  type="date"
                  value={appointmentForm.date}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      date: e.target.value,
                    })
                  }
                  required
                />

                <label>Giờ bắt đầu</label>
                <input
                  type="time"
                  value={appointmentForm.time_start}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      time_start: e.target.value,
                    })
                  }
                  required
                />

                <label>Nhân viên</label>
                <select
                  value={appointmentForm.staff_id}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      staff_id: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">-- Chọn nhân viên --</option>
                  {staffs.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <label>Dịch vụ</label>
                <select
                  value={appointmentForm.service_id}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      service_id: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">-- Chọn dịch vụ --</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <div className="modal-actions">
                  <button type="submit" className="add-service-button">
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    className="action-button delete"
                    onClick={() => setShowAppointmentModal(false)}
                  >
                    Huỷ
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

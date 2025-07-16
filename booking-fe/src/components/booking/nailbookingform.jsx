import React, { useState } from "react";
import "../../assets/styles/bookingform.css";
import api from "../../axios";
import { successAlert, errorAlert } from "../../utils/swal";

const today = new Date().toISOString().split("T")[0];
const user = JSON.parse(localStorage.getItem("user"));
const userName = user ? user.name : "";
const userPhone = user ? user.phone : "";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
];

export default function NailBookingForm({ services }) {
  // ✅ Lọc dịch vụ làm nail
  const nailServices = services.filter((s) => s.type === "nail");

  // ✅ Gọi useState TRƯỚC mọi điều kiện
  const [form, setForm] = useState({
    name: userName,
    phone: userPhone,
    style: nailServices[0]?.name || "",
    date: today,
    time: "",
  });

  // ✅ Nếu không có dịch vụ thì render báo lỗi
  if (nailServices.length === 0) {
    return <p className="text-danger">⛔ Không tìm thấy dịch vụ nail nào.</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (slot) => {
    setForm({ ...form, time: slot });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/appointments", {
        name: form.name,
        phone: form.phone,
        style: form.style,
        date: form.date,
        time: form.time,
      });
      successAlert("💅 Đặt lịch nail thành công!");
      console.log(res.data);

      setForm({
        name: "",
        phone: "",
        style: nailServices[0]?.name || "",
        date: today,
        time: "",
      });
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        errorAlert(`❌ ${error.response.data.message}`);
      } else {
        errorAlert("❌ Có lỗi xảy ra khi đặt lịch.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Họ tên *"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Số điện thoại *"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <select
          name="style"
          className="form-select"
          value={form.style}
          onChange={handleChange}
          required
        >
          {nailServices.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <input
          type="date"
          name="date"
          className="form-control"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Chọn khung giờ</label>
        <div className="d-flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <button
              type="button"
              key={slot}
              onClick={() => handleTimeSelect(slot)}
              className={`btn btn-sm ${
                form.time === slot ? "btn-primary" : "btn-outline-secondary"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn w-100 booking-submit-btn">
        💾 Xác nhận đặt lịch
      </button>
    </form>
  );
}

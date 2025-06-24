import React, { useState } from 'react';
import '../../assets/styles/bookingform.css';

const today = new Date().toISOString().split('T')[0];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00',
];

export default function SpaBookingForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    style: 'Cắt',
    date: today,
    time: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (slot) => {
    setForm({ ...form, time: slot });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đặt lịch: ${form.name} - ${form.phone} - ${form.style} lúc ${form.time}, ngày ${form.date}`);
    // API gọi ở đây nếu cần
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Họ tên + SĐT */}
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

      {/* Kiểu tóc */}
      <div className="mb-3">
        <select
          name="style"
          className="form-select"
          value={form.style}
          onChange={handleChange}
        >
          <option value="Cắt">✂️ Cắt</option>
          <option value="Uốn">💇‍♀️ Uốn</option>
          <option value="Nhuộm">🎨 Nhuộm</option>
          <option value="Gội đầu">🧴 Gội đầu</option>
        </select>
      </div>

      {/* Ngày */}
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

      {/* Khung giờ */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Chọn khung giờ</label>
        <div className="d-flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <button
              type="button"
              key={slot}
              onClick={() => handleTimeSelect(slot)}
              className={`btn btn-sm ${
                form.time === slot ? 'btn-primary' : 'btn-outline-secondary'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Xác nhận */}
      <button className="btn w-100 booking-submit-btn">
  💾 Xác nhận đặt lịch
</button>
    </form>
  

);

}




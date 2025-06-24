import React from 'react';

export default function CarBookingForm() {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Họ tên</label>
        <input className="form-control" placeholder="Nhập họ tên" />
      </div>

      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input className="form-control" placeholder="09..." />
      </div>

      <div className="mb-3">
        <label className="form-label">Thời gian nhận xe</label>
        <input type="datetime-local" className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Thời gian trả xe</label>
        <input type="datetime-local" className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Địa điểm nhận xe</label>
        <input className="form-control" placeholder="Ví dụ: Quận 1, HCM" />
      </div>

      <button className="btn btn-primary">Xác nhận đặt xe</button>
    </form>
  );
}

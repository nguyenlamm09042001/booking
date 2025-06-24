import React from 'react';

export default function HotelBookingForm() {
  return (
    <form>
      <div className="mb-3">
        <label>Ngày nhận phòng</label>
        <input type="date" className="form-control" />
      </div>
      <div className="mb-3">
        <label>Ngày trả phòng</label>
        <input type="date" className="form-control" />
      </div>
      <div className="mb-3">
        <label>Số người</label>
        <input type="number" className="form-control" />
      </div>
      <button className="btn btn-primary">Đặt phòng</button>
    </form>
  );
}

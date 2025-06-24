import React from 'react';

export default function SearchBar() {
  return (
    <div className="search-bar-wrapper bg-white shadow rounded p-3 mx-auto" style={{ marginTop: '-40px', maxWidth: '960px', position: 'relative', zIndex: '5' }}>
      <div className="row g-2">
        <div className="col-md">
          <input type="text" className="form-control" placeholder="Bạn muốn đặt gì?" />
        </div>
        <div className="col-md">
          <input type="date" className="form-control" />
        </div>
        <div className="col-md">
          <select className="form-select">
            <option>2 người lớn · 1 trẻ em · 1 phòng</option>
            <option>1 người</option>
            <option>4 người · 2 phòng</option>
          </select>
        </div>
        <div className="col-md-auto">
          <button className="btn btn-primary w-100">Tìm</button>
        </div>
      </div>
    </div>
  );
}

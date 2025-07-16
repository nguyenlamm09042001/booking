import React from "react";

export default function ServiceCard({ business }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{business.name}</h5>
        <p className="card-text">{business.description}</p>
        {business.distance && (
          <p className="text-muted">
            📍 Cách bạn khoảng {business.distance.toFixed(1)} km
          </p>
        )}
        <button className="btn btn-primary">Đặt lịch</button>
      </div>
    </div>
  );
}

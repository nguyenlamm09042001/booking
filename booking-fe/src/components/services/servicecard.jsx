import React from "react";

export default function ServiceCard({ service }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        <div className="display-3 mb-2">{service.icon}</div>
        <h5 className="card-title">{service.name}</h5>
        <p className="card-text">{service.description}</p>
        <button className="btn btn-outline-primary btn-sm">Đặt lịch</button>
      </div>
    </div>
  );
}

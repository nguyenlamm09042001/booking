import React from "react";
import { Link } from "react-router-dom";

export default function Section({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mb-5">
      <h4 className="mb-3">{title}</h4>
      <div className="row">
        {items.map((s) => (
          <div className="col-md-4 mb-4" key={s.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={s.image}
                alt={s.name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{s.name}</h5>
                <p className="card-text text-muted small mb-1">
                  {s.location} · {s.open}
                </p>
                <p className="card-text small">{s.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div>
                    <span className="text-warning fw-bold">★ {s.rating}</span>
                    <span className="text-muted ms-1 small">({s.reviews})</span>
                  </div>
                  <Link
                    to={`/booking/${s.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Đặt lịch
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axios";
import "../assets/styles/services.css";

export default function Services() {
  const [servicesData, setServicesData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedType = queryParams.get("type");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/businesses/services")
      .then((res) => setServicesData(res.data))
      .catch((err) => console.error("Lỗi lấy dữ liệu services:", err));
  }, []);

  // 👉 Lọc theo ?type nếu có
  const filteredServices = selectedType
    ? servicesData.filter((s) => s.type === selectedType)
    : servicesData;

    const handleBooking = (businessId, type) => {
      navigate(`/booking/${businessId}?type=${type}`);
    };
    

  return (
    <div className="container my-5">
      <h2>💼 Danh sách dịch vụ</h2>
      <div>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <img
                src={service.business?.image || "https://via.placeholder.com/150"}
                alt={service.business?.name}
              />
              <h3>{service.business?.name}</h3>
              <p>📍 {service.business?.location || "Chưa cập nhật địa chỉ"}</p>
              <p>📞 {service.business?.phone || "Chưa có số điện thoại"}</p>
              <p>💈 Dịch vụ: {service.name}</p>
              <p>💰 Giá: {Number(service.price).toLocaleString()} VND</p>
              <button
                onClick={() => handleBooking(service.business.id, service.type)}
                className="booking-button"
              >
                📅 Đặt lịch
              </button>

            </div>
          ))
        ) : (
          <p>
            ⚠️ Không có dịch vụ nào thuộc loại{" "}
            <strong>{selectedType}</strong>
          </p>
        )}
      </div>

      {!selectedType && (
        <>
          <h2>🎯 Dịch vụ theo loại hình</h2>
          {["hair", "nail", "spa", "massage"].map((type) => {
            const group = servicesData.filter((s) => s.type === type);
            if (group.length === 0) return null;

            return (
              <div key={type}>
                <h3>• {type.toUpperCase()}</h3>
                <div className="service-group">
                  {group.map((service) => (
                    <div key={service.id} className="service-card">
                      <img
                        src={
                          service.business?.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt={service.business?.name}
                      />
                      <h4>{service.business?.name}</h4>
                      <p>{service.business?.location}</p>
                      <p>{service.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

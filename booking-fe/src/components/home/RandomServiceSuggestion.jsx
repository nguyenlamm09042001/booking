import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../axios";
import "../../assets/styles/randomservicesuggestion.css"; 

export default function RandomServiceSuggestion() {
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    setService(null);

    try {
      const res = await api.get("/user/random-service");
      setTimeout(() => {
        setService(res.data);
        setLoading(false);
      }, 1000); // slot effect
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="random-box">
      <h3 className="random-title">🎲 Gợi ý bất ngờ hôm nay</h3>
      <button
        onClick={handleClick}
        className="random-button"
        disabled={loading}
      >
        {loading ? "⏳ Đang chọn..." : "Thử vận may nào!"}
      </button>

      {loading && (
        <div className="loading">Đang chọn dịch vụ phù hợp với bạn...</div>
      )}

      {service && (
        <div className="result-card">
          <h4 className="result-title">{service.name}</h4>
          <p className="result-desc">{service.description}</p>
          <p className="result-address">📍 {service.address}</p>
<button
  className="detail-button"
  onClick={() => navigate(`/services?type=${service.type}`)}
>
  → Xem chi tiết / Đặt lịch
</button>
        </div>
      )}
    </div>
  );
}

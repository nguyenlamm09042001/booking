import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../axios'; // axios riêng của bé
import { useNavigate } from 'react-router-dom';
import '../assets/styles/services.css';
export default function Services() {
  const [servicesData, setServicesData] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedType = queryParams.get('type'); 
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/businesses')
      .then(res => setServicesData(res.data))
      .catch(err => console.error('Lỗi lấy dữ liệu businesses:', err));
  }, []);

  // 👉 Lọc theo ?type nếu có
  const filteredBusinesses = selectedType
    ? servicesData.filter(b => b.type === selectedType)
    : servicesData;

    const handleBooking = (businessId) => {
      navigate(`/booking/${businessId}`);
    };

    
  return (
    <div className="container my-5">
      <h2>💼 Danh sách các cơ sở</h2>
      <div>
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <div key={business.id}>
              <img
                src={business.image || 'https://via.placeholder.com/150'}
                alt={business.name}
              />
              <h3>{business.name}</h3>
              <p>📍 {business.location}</p>
              <p>📞 {business.phone}</p>
              <p>✉️ {business.email}</p>
              <button
  onClick={() => handleBooking(business.id)}
  className="booking-button"
>
  📅 Đặt lịch
</button>


            
            </div>
          ))
        ) : (
          <p>⚠️ Không có cơ sở nào thuộc loại <strong>{selectedType}</strong></p>
        )}
      </div>

      {!selectedType && (
        <>
          <h2>🎯 Doanh nghiệp theo loại hình</h2>
          {['hair', 'nail', 'spa', 'massage'].map((type) => {
            const group = servicesData.filter(b => b.type === type);
            if (group.length === 0) return null;

            return (
              <div key={type}>
                <h3>• {type.toUpperCase()}</h3>
                <div>
                  {group.map((b) => (
                    <div key={b.id}>
                      <img
                        src={b.image || 'https://via.placeholder.com/150'}
                        alt={b.name}
                      />
                      <h4>{b.name}</h4>
                      <p>{b.location}</p>
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

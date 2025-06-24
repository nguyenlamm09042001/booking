import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { icon: '💅', label: 'Làm đẹp', type: 'beauty' },
  { icon: '🚗', label: 'Di chuyển', type: 'transport' },
  { icon: '🏨', label: 'Lưu trú', type: 'hotel' },
  { icon: '🛒', label: 'Mua sắm', type: 'shopping' },
  { icon: '🎬', label: 'Giải trí', type: 'entertainment' },
  { icon: '🍜', label: 'Ăn uống', type: 'food' }
];

export default function ServiceCategories() {
  const navigate = useNavigate();

  const handleClick = (type) => {
    navigate(`/services?type=${type}`);
  };

  return (
    <section className="my-5">
      <h2 className="text-center mb-4">Khám phá theo nhóm dịch vụ</h2>
      <div className="row text-center">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="col-6 col-md-4 col-lg-2 mb-3"
            onClick={() => handleClick(cat.type)}
            style={{ cursor: 'pointer' }}
          >
            <div className="border rounded py-3 h-100 shadow-sm hover-shadow">
              <div className="display-4">{cat.icon}</div>
              <p className="mt-2">{cat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

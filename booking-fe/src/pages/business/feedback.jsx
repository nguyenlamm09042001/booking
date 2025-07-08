import React, { useState, useEffect } from 'react';
import '../../assets/styles/business.css';
import api from '../../axios'; // file axios config

export default function BusinessFeedback() {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  // Giả sử businessId lấy từ localStorage hoặc props
  const businessId = 1;

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await api.get(`/businesses/${businessId}`);
        setBusiness(res.data);
      } catch (err) {
        console.error('Lỗi khi fetch business:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [businessId]);

  return (
    <div className="business-container">
      <main className="business-main">
        <h2>💬 Quản lý Feedback</h2>
        <p>Xem phản hồi từ khách hàng để cải thiện chất lượng dịch vụ.</p>

        <section className="business-section">
          <h2>Feedback của business</h2>
          {loading ? (
            <p>Đang tải...</p>
          ) : business && business.feedback ? (
            <table className="business-table">
              <thead>
                <tr>
                  <th>Tên Business</th>
                  <th>Feedback</th>
                  <th>Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{business.name}</td>
                  <td>{business.feedback}</td>
                  <td>
                    {business.rating
                      ? '⭐️'.repeat(business.rating) +
                        '☆'.repeat(5 - business.rating)
                      : 'Chưa có'}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Chưa có feedback nào.</p>
          )}
        </section>
      </main>
    </div>
  );
}

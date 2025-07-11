import React, { useState, useEffect } from "react";
import "../../assets/styles/business.css";
import api from "../../axios"; // file axios config

export default function BusinessFeedback() {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const businessId = user ? user.business_id || user.id : null;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get(`/businesses/${businessId}/feedbacks`);
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Lỗi khi fetch feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
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
          ) : feedbacks.length > 0 ? (
            <table className="business-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên khách hàng</th>
                  <th>Feedback</th>
                  <th>Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => (
                  <tr key={fb.id}>
                    <td>{fb.id}</td>
                    <td>{fb.user ? fb.user.name : fb.user_name}</td>
                    <td>{fb.comment}</td>
                    <td>
                      {fb.rating
                        ? "⭐️".repeat(fb.rating) + "☆".repeat(5 - fb.rating)
                        : "Chưa có"}
                    </td>
                  </tr>
                ))}
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

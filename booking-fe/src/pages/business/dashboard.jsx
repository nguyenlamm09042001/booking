import React, { useEffect, useState } from "react";
import "../../assets/styles/business.css";
import api from "../../axios";

export default function BusinessDashboard() {
  const [totalServices, setTotalServices] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [totalTodayAppointments, setTotalTodayAppointments] = useState(0);
  const [todayFeedbacks, setTodayFeedbacks] = useState([]);
  const [totalTodayFeedbacks, setTotalTodayFeedbacks] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const businessId = user ? user.business_id || user.id : null;

  useEffect(() => {
    if (!businessId) return;

    // 🔥 Lấy tổng dịch vụ
    api
      .get(`/businesses/${businessId}/services/total`)
      .then((res) => {
        setTotalServices(res.data.total_services);
      })
      .catch((err) => {
        console.error("Lỗi lấy tổng dịch vụ:", err);
      });

    // 🔥 Lấy lịch hẹn hôm nay
    api
      .get(`/businesses/${businessId}/appointments/today`)
      .then((res) => {
        setTodayAppointments(res.data.appointments);
        setTotalTodayAppointments(res.data.total);
      })
      .catch((err) => {
        console.error("Lỗi lấy lịch hẹn hôm nay:", err);
      });

    // 🔥 Lấy feedbacks hôm nay
    api
      .get(`/businesses/${businessId}/feedbacks/today`)
      .then((res) => {
        setTodayFeedbacks(res.data.feedbacks);
        setTotalTodayFeedbacks(res.data.total);
      })
      .catch((err) => {
        console.error("Lỗi lấy feedback hôm nay:", err);
      });

    // 🔥 Lấy doanh thu tháng
    api
      .get(`/businesses/${businessId}/income/month`)
      .then((res) => {
        setMonthlyIncome(res.data.total);
      })
      .catch((err) => {
        console.error("Lỗi lấy doanh thu tháng:", err);
      });

  }, [businessId]);

  return (
    <div className="business-container">
      <main className="business-main">
        {/* 🔥 Banner chào mừng */}
        <div className="business-banner">
          🎉 Chúc bạn một ngày làm việc hiệu quả!
        </div>

        <h2>👋 Chào mừng đến Business Dashboard</h2>
        <p>
          Đây là nơi quản lý dịch vụ, lịch hẹn, phản hồi và doanh thu của doanh
          nghiệp bạn.
        </p>

        {/* 🔥 Thống kê nhanh */}
        <div className="business-stats">
          <div className="stat-card stat-purple">
          <h3>{Number(monthlyIncome).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</h3>
          <p>💰 Doanh thu tháng này</p>
          </div>
          <div className="stat-card stat-blue">
            <h3>{totalServices}</h3>
            <p>🛠 Dịch vụ</p>
          </div>
          <div className="stat-card stat-green">
            <h3>{totalTodayAppointments}</h3>
            <p>📅 Lịch hẹn hôm nay</p>
          </div>
          <div className="stat-card stat-yellow">
            <h3>{totalTodayFeedbacks}</h3>
            <p>💬 Feedback mới</p>
          </div>
        </div>

        {/* 🔥 Bảng dịch vụ mới nhất */}
        <section className="business-section">
          <h2>Dịch vụ mới nhất</h2>
          <table className="business-table">
            <thead>
              <tr>
                <th>Tên dịch vụ</th>
                <th>Giá</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cắt tóc nam</td>
                <td>100.000đ</td>
                <td>01/07/2025</td>
              </tr>
              <tr>
                <td>Gội đầu dưỡng sinh</td>
                <td>150.000đ</td>
                <td>30/06/2025</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 🔥 Bảng lịch hẹn hôm nay */}
        <section className="business-section">
          <h2>Lịch hẹn hôm nay</h2>
          <table className="business-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Dịch vụ</th>
                <th>Giờ hẹn</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.user?.name || "Chưa có tên"}</td>
                  <td>{appointment.service?.name || "Chưa có dịch vụ"}</td>
                  <td>{appointment.time_start || "Chưa có giờ"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 🔥 Bảng feedback hôm nay */}
        <section className="business-section">
          <h2>Feedback hôm nay</h2>
          <table className="business-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Rating</th>
                <th>Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {todayFeedbacks.length > 0 ? (
                todayFeedbacks.map((fb) => (
                  <tr key={fb.id}>
                    <td>{fb.user?.name || "Chưa có tên"}</td>
                    <td>{fb.rating? '⭐️'.repeat(fb.rating) + '☆'.repeat(5 - fb.rating): 'Chưa có rating'}</td>                    
                    <td>{fb.comment || "Chưa có feedback"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Chưa có feedback hôm nay</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

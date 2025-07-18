import React, { useEffect, useState } from "react";
import "../../assets/styles/business.css";
import api from "../../axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { warningAlert } from "../../utils/swal";

export default function BusinessIncome() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [incomeDetails, setIncomeDetails] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filterType, setFilterType] = useState("day");
  const [filter, setFilter] = useState({
    date: '',
    month: '',
    year: '',
    start_date: '',
    end_date: ''
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const businessId = user.business_id;

  useEffect(() => {
    // 🛠 Gọi API mặc định khi load trang (hôm nay)
    const today = new Date().toISOString().split('T')[0];
    setFilter(prev => ({ ...prev, date: today }));
    api.get(`/businesses/${businessId}/income/filter`, {
      params: { date: today }
    })
      .then((res) => {
        setMonthlyIncome(res.data.total);
        setIncomeDetails(res.data.appointments);
        renderChart(res.data.appointments);
      })
      .catch((err) => {
        console.error("Lỗi load doanh thu mặc định:", err);
      });
  }, [businessId]);

  const handleFilter = (e) => {
    e.preventDefault();

    // 🔎 Validate filter
    if (filterType === "day" && !filter.date) {
        warningAlert("Vui lòng chọn ngày.");
      return;
    }
    if (filterType === "month" && (!filter.month || !filter.year)) {
        warningAlert("Vui lòng nhập tháng và năm.");
      return;
    }
    if (filterType === "range" && (!filter.start_date || !filter.end_date)) {
        warningAlert("Vui lòng nhập khoảng thời gian.");
      return;
    }

    console.log("Filter params:", filter);

    api.get(`/businesses/${businessId}/income/filter`, { params: filter })
      .then((res) => {
        setMonthlyIncome(res.data.total);
        setIncomeDetails(res.data.appointments);
        renderChart(res.data.appointments);
      })
      .catch((err) => {
        console.error("Lỗi lọc doanh thu:", err);
      });
  };

  const renderChart = (appointments) => {
    const data = appointments.map(app => ({
      date: app.date,
      income: app.service?.price || 0
    }));
    setChartData(data);
  };

  return (
    <div className="business-container">
      <main className="business-main">
        <div className="business-banner">
          💰 Doanh thu
        </div>

        <h2>🔎 Bộ lọc doanh thu</h2>

        <form onSubmit={handleFilter} className="filter-form">
          <label>Kiểu lọc:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
            <option value="day">Theo ngày</option>
            <option value="month">Theo tháng</option>
            <option value="range">Khoảng thời gian</option>
          </select>

          {filterType === "day" && (
            <>
              <label>Ngày:</label>
              <input type="date" value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                className="filter-input" />
            </>
          )}

          {filterType === "month" && (
            <>
              <label>Tháng:</label>
              <input type="number" min="1" max="12" value={filter.month}
                onChange={(e) => setFilter({ ...filter, month: e.target.value })}
                className="filter-input" />

              <label>Năm:</label>
              <input type="number" value={filter.year}
                onChange={(e) => setFilter({ ...filter, year: e.target.value })}
                className="filter-input" />
            </>
          )}

          {filterType === "range" && (
            <>
              <label>Từ ngày:</label>
              <input type="date" value={filter.start_date}
                onChange={(e) => setFilter({ ...filter, start_date: e.target.value })}
                className="filter-input" />

              <label>Đến ngày:</label>
              <input type="date" value={filter.end_date}
                onChange={(e) => setFilter({ ...filter, end_date: e.target.value })}
                className="filter-input" />
            </>
          )}

          <button type="submit" className="filter-button">Lọc</button>
        </form>

        <div className="business-stats">
          <div className="stat-card stat-purple">
            <h3>{Number(monthlyIncome).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
            <p>💰 Tổng doanh thu</p>
          </div>
        </div>

        <section className="business-section">
          <h2>📊 Biểu đồ doanh thu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                labelFormatter={(label) => `Ngày: ${label}`} />
              <Bar dataKey="income" fill="#6c5ce7" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="business-section">
          <h2>📄 Chi tiết doanh thu</h2>
          <table className="business-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Dịch vụ</th>
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {incomeDetails.length > 0 ? (
                incomeDetails.map((item) => (
                  <tr key={item.id}>
                    <td>{item.user?.name || "Chưa có tên"}</td>
                    <td>{item.service?.name || "Chưa có dịch vụ"}</td>
                    <td>{item.date || "Chưa có ngày"}</td>
                    <td>{item.time_start || "Chưa có giờ"}</td>
                    <td>{Number(item.service?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Chưa có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

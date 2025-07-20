import React, { useEffect, useState } from 'react';
import '../../assets/styles/staff.css';
import api from '../../axios';

export default function StaffDashboard() {
  const [staffName, setStaffName] = useState('');
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setStaffName(user.name || 'Nhân viên');
      fetchTodayData(user.id);
    }
  }, []);

  const fetchTodayData = async (staffId) => {
    try {
      const resSchedule = await api.get(`/staffs/${staffId}/today-schedule`);
      const resTasks = await api.get(`/staffs/${staffId}/tasks`);
      setTodaySchedule(resSchedule.data || []);
      setTasks(resTasks.data || []);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu hôm nay:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>👋 Xin chào, {staffName}!</h2>

      <section className="dashboard-section">
        <h3>📅 Lịch làm việc hôm nay</h3>
        {todaySchedule.length === 0 ? (
          <p>Không có lịch hẹn nào hôm nay.</p>
        ) : (
          <ul>
            {todaySchedule.map((item) => (
              <li key={item.id}>
                🕒 {item.time_start} – {item.service_name} cho khách {item.customer_name}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-section">
        <h3>🧾 Công việc cần làm</h3>
        {tasks.length === 0 ? (
          <p>Không có công việc nào được giao.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                ✅ {task.title} – {task.status === 'done' ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

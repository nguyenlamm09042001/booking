import React, { useEffect, useState } from "react";
import api from "../axios";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 1: Gọi csrf-cookie trước
    api
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(() => {
        // Step 2: Gọi API lấy lịch hẹn user
        return api.get("/users/appointments");
      })
      .then((res) => {
        console.log("Appointments data:", res.data.appointments);
        setAppointments(res.data.appointments);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải lịch hẹn...</p>;

  return (
    <div className="container mt-4">
      <h2>Lịch hẹn của bạn</h2>

      {appointments.length === 0 ? (
        <p>Bạn chưa có lịch hẹn nào.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Dịch vụ</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={appt.id}>
                <td>{index + 1}</td>
                <td>{appt.notes}</td>
                <td>{appt.date}</td>
                <td>{appt.time_start}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Appointment;

import React, { useEffect, useState } from "react";
import api from "../axios";
import { successAlert, confirmAlert } from "../utils/swal";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(() => api.get("/users/appointments"))
      .then((res) => {
        setAppointments(res.data.appointments);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  const handleSendFeedback = async (appointment) => {
    if (!rating || rating < 1 || rating > 5) {
      await confirmAlert("Lỗi", "⚠️ Số sao phải từ 1 đến 5");
      return;
    }

    const confirmed = await confirmAlert(
      "Xác nhận gửi đánh giá",
      "Bạn có chắc muốn gửi đánh giá này không?"
    );

    if (!confirmed) return;

    api
      .post("/users/feedbacks", {
        business_id: appointment.business_id,
        rating,
        comment,
      })
      .then(() => {
        successAlert("✅ Gửi đánh giá thành công!");
        setSelectedId(null);
        setRating(5);
        setComment("");

        // Optional: Làm mới danh sách lịch hẹn
        setLoading(true);
        api.get("/users/appointments").then((res) => {
          setAppointments(res.data.appointments);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("Lỗi khi gửi feedback:", err);
        confirmAlert("Lỗi", "❌ Gửi đánh giá thất bại.");
      });
  };

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
              <th>Hành động</th>
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
                <td>
                  {selectedId === appt.id ? (
                    <div className="mt-2">
                      <label className="form-label fw-bold">Chọn số sao:</label>
                      <select
                        className="form-select mb-2"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="5">⭐️⭐️⭐️⭐️⭐️ – Rất tốt</option>
                        <option value="4">⭐️⭐️⭐️⭐️ – Tốt</option>
                        <option value="3">⭐️⭐️⭐️ – Bình thường</option>
                        <option value="2">⭐️⭐️ – Tệ</option>
                        <option value="1">⭐️ – Rất tệ</option>
                      </select>

                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Viết đánh giá..."
                        className="form-control mb-2"
                      />
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleSendFeedback(appt)}
                      >
                        Gửi
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedId(null)}
                      >
                        Hủy
                      </button>
                    </div>
                  ) : appt.status === "Thành công" && appt.feedback ? (
                    <div>
                      <div className="text-warning">⭐ {appt.feedback.rating}/5</div>
                      <div className="fst-italic">{appt.feedback.comment}</div>
                    </div>
                  ) : appt.status === "Thành công" ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedId(appt.id)}
                    >
                      Đánh giá
                    </button>
                  ) : (
                    <span className="text-muted">Chưa thể đánh giá</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Appointment;

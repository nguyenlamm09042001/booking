import React, { useState } from 'react';
import '../../assets/styles/business.css';

export default function BusinessFeedback() {
  const [feedbacks] = useState([
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      service: 'Cắt tóc nam',
      date: '2025-07-02',
      rating: 5,
      comment: 'Rất hài lòng, cắt nhanh đẹp!',
    },
    {
      id: 2,
      customer: 'Trần Thị B',
      service: 'Gội đầu dưỡng sinh',
      date: '2025-07-01',
      rating: 4,
      comment: 'Gội đầu thư giãn, nhân viên dễ thương.',
    },
    {
      id: 3,
      customer: 'Lê Văn C',
      service: 'Massage đầu',
      date: '2025-06-30',
      rating: 3,
      comment: 'Ổn nhưng chỗ ngồi hơi nhỏ.',
    },
  ]);

  return (
    <div className="business-container">
      <main className="business-main">
        <h2>💬 Quản lý Feedback</h2>
        <p>Xem phản hồi từ khách hàng để cải thiện chất lượng dịch vụ.</p>

        <section className="business-section">
          <h2>Danh sách Feedback</h2>
          {feedbacks.length > 0 ? (
            <table className="business-table">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Dịch vụ</th>
                  <th>Ngày</th>
                  <th>Đánh giá</th>
                  <th>Bình luận</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(f => (
                  <tr key={f.id}>
                    <td>{f.customer}</td>
                    <td>{f.service}</td>
                    <td>{f.date.split('-').reverse().join('/')}</td>
                    <td>
                      {'⭐️'.repeat(f.rating)}
                      {'☆'.repeat(5 - f.rating)}
                    </td>
                    <td>{f.comment}</td>
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

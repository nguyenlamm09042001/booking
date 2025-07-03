import React, { useState } from 'react';
import '../../assets/styles/business.css';

export default function BookingManagement() {
  const [selectedDate, setSelectedDate] = useState('2025-07-03');
  const [selectedService, setSelectedService] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      service: 'Cắt tóc nam',
      date: '2025-07-03',
      time: '09:00',
      status: 'Đã xác nhận',
      phone: '0909123456',
      note: 'Khách quen, cắt nhanh',
    },
    {
      id: 2,
      customer: 'Trần Thị B',
      service: 'Gội đầu dưỡng sinh',
      date: '2025-07-03',
      time: '10:30',
      status: 'Chờ xác nhận',
      phone: '0912345678',
      note: 'Muốn thêm massage vai',
    },
    {
      id: 3,
      customer: 'Lê Văn C',
      service: 'Massage đầu',
      date: '2025-07-04',
      time: '14:00',
      status: 'Chờ xác nhận',
      phone: '0987654321',
      note: '',
    },
  ];

  // Filter by date, service, status
  const filteredBookings = bookings.filter(b =>
    b.date === selectedDate &&
    (selectedService === 'Tất cả' || b.service === selectedService) &&
    (selectedStatus === 'Tất cả' || b.status === selectedStatus)
  );

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="business-container">
      <main className="business-main">
        <h2>📅 Quản lý lịch đặt</h2>
        <p>Xem và quản lý lịch đặt của khách hàng theo ngày.</p>

        {/* 🔥 Filter tổng */}
        <div className="booking-filters">
          <div className="filter-group">
            <label>Chọn ngày:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Dịch vụ:</label>
            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
              <option>Tất cả</option>
              <option>Cắt tóc nam</option>
              <option>Gội đầu dưỡng sinh</option>
              <option>Massage đầu</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Trạng thái:</label>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option>Tất cả</option>
              <option>Đã xác nhận</option>
              <option>Chờ xác nhận</option>
            </select>
          </div>
        </div>

        {/* 🔥 Bảng booking */}
        <section className="business-section">
          <h2>Lịch đặt ngày {selectedDate.split('-').reverse().join('/')}</h2>
          {currentBookings.length > 0 ? (
            <table className="business-table">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Dịch vụ</th>
                  <th>Ngày</th>
                  <th>Giờ</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.customer}</td>
                    <td>{b.service}</td>
                    <td>{b.date.split('-').reverse().join('/')}</td>
                    <td>{b.time}</td>
                    <td>
                      <span className={`status-badge ${b.status === 'Đã xác nhận' ? 'status-confirmed' : 'status-pending'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-button edit" onClick={() => handleOpenModal(b)}>👁 Xem</button>
                      <button className="action-button edit">✅ Xác nhận</button>
                      <button className="action-button delete">🗑 Hủy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có booking cho ngày này.</p>
          )}
        </section>

        {/* 🔥 Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <span>{currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        )}

        {/* 🔥 Modal chi tiết booking */}
        {showModal && selectedBooking && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={handleCloseModal}>×</button>
              <h2>Chi tiết booking</h2>
              <p><strong>Khách hàng:</strong> {selectedBooking.customer}</p>
              <p><strong>Số điện thoại:</strong> {selectedBooking.phone}</p>
              <p><strong>Dịch vụ:</strong> {selectedBooking.service}</p>
              <p><strong>Ngày:</strong> {selectedBooking.date.split('-').reverse().join('/')}</p>
              <p><strong>Giờ:</strong> {selectedBooking.time}</p>
              <p><strong>Trạng thái:</strong> {selectedBooking.status}</p>
              <p><strong>Ghi chú:</strong> {selectedBooking.note || 'Không có'}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

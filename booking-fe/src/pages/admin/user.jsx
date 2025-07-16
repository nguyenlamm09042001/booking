import React, { useEffect, useState, useRef } from 'react';
import '../../assets/styles/admin.css';
import api from '../../axios';
import { successAlert, errorAlert, confirmAlert } from '../../utils/swal';

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tableRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get('admin/users')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error(err);
        errorAlert('Lỗi lấy danh sách người dùng');
      });
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (tableRef.current) {
      setTimeout(() => {
        tableRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [currentPage]);

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const renderActions = (user) => {
    const status = user.status;

    const handleStatusChange = async (newStatus) => {
      try {
        const confirm = await confirmAlert(`Bạn có chắc muốn chuyển trạng thái sang "${newStatus}" không?`);
        if (!confirm) return;

        await api.patch(`admin/users/${user.id}/status`, { status: newStatus });
        successAlert(`Đã cập nhật trạng thái thành "${newStatus}"`);
        fetchUsers(); // refresh danh sách
      } catch (err) {
        console.error("Lỗi cập nhật:", err);
        errorAlert("Cập nhật trạng thái thất bại");
      }
    };

    const actions = [];

    actions.push(
      <button key="view" className="btn-view">Xem</button>
    );

    if (status === "Chờ duyệt" || status === "Đã khóa" || status === "Vô hiệu hóa") {
      actions.push(
        <button key="activate" className="btn-approve" onClick={() => handleStatusChange("Bình thường")}>
          Kích hoạt
        </button>
      );
    }

    if (status === "Bình thường") {
      actions.push(
        <button key="lock" className="btn-cancel" onClick={() => handleStatusChange("Đã khóa")}>
          Đã khoá
        </button>
      );
      actions.push(
        <button key="disable" className="btn-cancel" onClick={() => handleStatusChange("Vô hiệu hóa")}>
          Vô hiệu hóa
        </button>
      );
    }

    if (status === "Vô hiệu hóa") {
      actions.push(
        <button key="delete" className="btn-cancel" onClick={() => handleStatusChange("Đã xoá")}>
          Xoá
        </button>
      );
    }

    return actions;
  };

  return (
    <div className="admin-container">
      <h1>Người dùng</h1>
      <p className="admin-subtitle">Quản lý tài khoản người dùng hệ thống</p>

      {/* 📊 Tổng quan người dùng */}
      <div className="admin-section">
        <h2>📊 Tổng quan người dùng</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Tổng người dùng</p>
          </div>
        </div>
      </div>

      {/* 🔔 Thông báo người dùng */}
      <div className="admin-section">
        <h2>🔔 Thông báo người dùng</h2>
        <ul>
          <li>Đã thêm phân quyền admin vào 01/07/2025.</li>
          <li>Sắp có tính năng reset password cho admin.</li>
        </ul>
      </div>

      {/* 👥 Danh sách người dùng */}
      <div className="admin-section" ref={tableRef}>
        <h2>👥 Danh sách người dùng</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Ngày đăng ký</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              <>
                {paginatedUsers.map((u, index) => (
                  <tr key={u.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.registered_at}</td>
                    <td>
                      <span className={`status-tag ${u.status.replace(/\s/g, '-')}`}>{u.status}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {renderActions(u)}
                      </div>
                    </td>
                  </tr>
                ))}

                {Array.from({ length: itemsPerPage - paginatedUsers.length }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td colSpan="8" style={{ height: '50px', backgroundColor: '#f9f9f9' }}></td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="8">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 🔁 Phân trang */}
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={handlePrev} className="btn-prev">◀ Trước</button>
          )}
          <span>Trang {currentPage} / {totalPages}</span>
          {currentPage < totalPages && (
            <button onClick={handleNext} className="btn-next">Tiếp ▶</button>
          )}
        </div>
      </div>

      {/* 📝 Cập nhật gần đây */}
      <div className="admin-section">
        <h2>📝 Cập nhật gần đây</h2>
        <ul>
          <li>2025-06-30 – Thêm vai trò admin cho người dùng.</li>
          <li>2025-06-28 – Cập nhật UI trang Người dùng.</li>
        </ul>
      </div>
    </div>
  );
}

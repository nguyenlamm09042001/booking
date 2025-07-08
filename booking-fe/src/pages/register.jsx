import React, { useState } from 'react';
import api from '../axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // thêm role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp!');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mật khẩu không khớp!',
      });
      return;
    }

    if (!formData.role) {
      setError('Vui lòng chọn loại tài khoản!');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vui lòng chọn loại tài khoản!',
      });
      return;
    }

    const startTime = Date.now();

    try {
      const response = await api.post('/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: formData.role, // gửi role lên API
      });

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 500 - elapsed);

      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: response.data.message || 'Đăng ký thành công!',
          confirmButtonText: 'Đăng nhập ngay',
        }).then(() => {
          navigate('/login');
        });
      }, remaining);

    } catch (error) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 500 - elapsed);

      setTimeout(() => {
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          const errorMsg = Object.values(errors).flat().join(' ');
          setError(errorMsg);
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: errorMsg,
          });
        } else {
          const err = 'Đã xảy ra lỗi, vui lòng thử lại.';
          setError(err);
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: err,
          });
        }
      }, remaining);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Đăng ký</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên người dùng</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên người dùng"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          {/* Thêm chọn role */}
          <div className="mb-3">
            <label className="form-label">Bạn là:</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Chọn loại tài khoản</option>
              <option value="user">Khách hàng</option>
              <option value="business">Doanh nghiệp</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
        </form>
        <div className="text-center mt-3">
          <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;

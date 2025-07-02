import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firbase/firebase';
import api from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      // B1: Lấy CSRF token
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });
    
      // B2: Gửi yêu cầu login
      const res = await api.post('/login', {
        email,
        password
      });
    
      console.log('Đăng nhập thành công:', res.data);
      setSuccessMessage('Đăng nhập thành công!');
      setError('');
    
      const role = res.data.role;

      const dashboards = {
        admin: '/admin/dashboard',
        staff: '/staff/dashboard',
        business: '/business/dashboard',
      };
      
      navigate(dashboards[role] || '/');
    
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      setSuccessMessage('Đăng nhập bằng Google thành công!');
      setError('');
      navigate('/');
    } catch (error) {
      console.error('Đăng nhập bằng Google thất bại:', error);
      setError('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
      setSuccessMessage('');
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      setSuccessMessage('Đăng nhập bằng Facebook thành công!');
      setError('');
      navigate('/');
    } catch (error) {
      console.error('Đăng nhập bằng Facebook thất bại:', error);
      setError('Đăng nhập bằng Facebook thất bại. Vui lòng thử lại.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Đăng nhập</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Tài khoản (Email)</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
        </form>
        <div className="text-center mt-3">
          <p>Hoặc đăng nhập bằng:</p>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-danger w-100 mb-2 d-flex align-items-center justify-content-center"
          >
            <FontAwesomeIcon icon={faGoogle} className="me-2" />
            Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
          >
            <FontAwesomeIcon icon={faFacebook} className="me-2" />
            Facebook
          </button>
        </div>
        <div className="text-center mt-3">
          <p>Bạn chưa có tài khoản? <a href="/register">Đăng ký</a></p>
        </div>
      </div>
    </div>
  );
}

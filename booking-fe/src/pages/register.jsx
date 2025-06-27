import React, { useState } from 'react';
import api from '../axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp!');
            return;
        }

        try {
            const response = await api.post('/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword, 
            },{
                maxRedirects: 0
            });

         
            const successMessage = response.data.message || 'Đăng ký thành công!';
            alert(successMessage);

          
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
                setError(Object.values(errors).flat().join(' '));
            } else {
                setError('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Đăng ký</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Tên người dùng</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Nhập tên người dùng"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu"
                            required
                        />
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
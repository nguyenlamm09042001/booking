import React, { useEffect, useState } from 'react';
import api from '../axios';
import { confirmAlert, successAlert, errorAlert } from '../utils/swal';

function Profile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    api.get('/user')
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
      });
  }, []);

  
  

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    api.put('/user/profile-information', user)
      .then(() => {
        successAlert('Cập nhật thông tin thành công');
      })
      .catch(err => {
        console.error(err);

        errorAlert('Cập nhật thất bại!');
      });
  };
  
  
  

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    api.put('/user/password', {
      current_password: passwords.current_password,
      password: passwords.new_password,
      password_confirmation: passwords.confirm_password
    })
    .then(() => {
      successAlert('Đổi mật khẩu thành công');
    })
    .catch(err => {
      console.error(err);
      errorAlert('Lỗi khi đổi mật khẩu');
    });
  };
  
  const handleDeleteAccount = () => {
    confirmAlert('Xác nhận xoá', 'Bạn có chắc muốn xoá tài khoản không?')
      .then((result) => {
        if (result.isConfirmed) {
          api.delete('/user')
            .then(() => {
              successAlert('Xoá tài khoản thành công').then(() => {
                window.location.href = '/login';
              });
            })
            .catch(err => {
              console.error(err);
              errorAlert('Xoá tài khoản thất bại');
            });
        }
      });
  };
  


  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Thông tin tài khoản</h2>

      {/* Profile Information */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Cập nhật thông tin cá nhân</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input
                type="text"
                className="form-control"
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
          </form>
        </div>
      </div>

      {/* Update Password */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Đổi mật khẩu</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-3">
              <label className="form-label">Mật khẩu hiện tại</label>
              <input
                type="password"
                className="form-control"
                value={passwords.current_password}
                onChange={e => setPasswords({ ...passwords, current_password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                value={passwords.new_password}
                onChange={e => setPasswords({ ...passwords, new_password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                value={passwords.confirm_password}
                onChange={e => setPasswords({ ...passwords, confirm_password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>
          </form>
        </div>
      </div>

      {/* Delete Account */}
      <div className="card shadow-sm">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">Xoá tài khoản</h5>
        </div>
        <div className="card-body">
          <p className="mb-3">Thao tác này không thể hoàn tác. Hãy chắc chắn trước khi xoá tài khoản của bạn.</p>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Xoá tài khoản
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

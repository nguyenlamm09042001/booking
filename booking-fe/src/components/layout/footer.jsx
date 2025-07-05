import React from 'react';
import '../../assets/styles/footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>BookingApp</h4>
          <p>Đặt xe, khách sạn, làm tóc dễ dàng – tiện lợi – nhanh chóng.</p>
        </div>

        <div className="footer-section">
          <h4>Dịch vụ</h4>
          <ul>
            <li>Làm tóc</li>
            <li>Làm móng</li>
            <li>Đi spa</li>
            <li>Thuê xe</li>
            <li>Đặt khách sạn</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Hỗ trợ</h4>
          <ul>
            <li>Trung tâm trợ giúp</li>
            <li>Liên hệ</li>
            <li>Điều khoản sử dụng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Kết nối</h4>
          <div className="footer-socials">
            <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 BookingApp. All rights reserved.</p>
      </div>
    </footer>
  );
}

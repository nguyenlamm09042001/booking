import React from 'react';
import heroBg from '../../assets/images/hero-bg.jpg';

export default function Hero() {
  return (
    <section
      className="hero-section d-flex align-items-center justify-content-center text-white text-center"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '360px',
        position: 'relative'
      }}
    >
      <div className="bg-dark bg-opacity-50 p-4 rounded">
        <h1 className="fw-bold display-5">Giảm giá 10% cho một số dịch vụ</h1>
        <p>Đặt xe, khách sạn, làm tóc dễ dàng – tiện lợi – nhanh chóng</p>
      </div>
    </section>
  );
}

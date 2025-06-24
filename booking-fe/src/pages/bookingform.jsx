import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";

import HairBookingForm from "../components/booking/hairbookingform";
import HotelBookingForm from "../components/booking/hotelbookingform";
import CarBookingForm from "../components/booking/carbookingform";

function renderForm(type) {
  switch (type) {
    case 'hair': return <HairBookingForm />;
    case 'car': return <CarBookingForm />;
    case 'hotel': return <HotelBookingForm />;
    default: return <p>Chưa hỗ trợ form cho loại doanh nghiệp này.</p>;
  }
}

export default function BookingForm() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/businesses/${id}`)
      .then(res => {
        setBusiness(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi lấy business:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mt-5">Đang tải dữ liệu...</div>;
  if (!business) return <div className="container mt-5">Không tìm thấy cơ sở</div>;

  return (
    <div className="container my-5 px-3 px-md-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row g-5 align-items-start">

            <div className="d-flex justify-content-center">
              <div className="col-md-6">
                <div className="p-0 border rounded-4 shadow-sm bg-white h-100 overflow-hidden">

                  {/* ẢNH */}
                  <img
                    src={business.image || 'https://via.placeholder.com/400x200'}
                    alt={business.name}
                    className="w-100"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '1rem',
                      borderTopRightRadius: '1rem'
                    }}
                  />

                  {/* THÂN FORM */}
                  <div className="p-4">
                    <span className="badge bg-warning text-dark mb-3">🔥 Ưu đãi hôm nay</span>
                    <h4 className="fw-semibold mb-2">Đặt lịch: {business.name}</h4>
                    <p className="text-muted small mb-4">💡 Điền thông tin để giữ chỗ và nhận ưu đãi.</p>

                    {renderForm(business.type)}

                    <div className="alert alert-info mt-4 small">
                      🎁 Tặng kèm <strong>gội dưỡng cao cấp</strong> khi đặt lịch hôm nay.
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

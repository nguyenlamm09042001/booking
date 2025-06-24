import React from "react";
import { useNavigate } from "react-router-dom";

const quickOptions = [
  {
    image: require("../../assets/images/hair.jpeg"),
    label: "Làm tóc",
    type: "hair",
  },
  {
    image: require("../../assets/images/nail.jpeg"),
    label: "Làm móng",
    type: "nail",
  },
  {
    image: require("../../assets/images/spa.jpeg"),
    label: "Đi spa",
    type: "spa",
  },
  {
    image: require("../../assets/images/car.jpeg"),
    label: "Thuê xe",
    type: "car",
  },
  {
    image: require("../../assets/images/hotel.jpeg"),
    label: "Đặt khách sạn",
    type: "hotel",
  },
  {
    image: require("../../assets/images/cinema.jpeg"),
    label: "Xem phim",
    type: "cinema",
  },
];

export default function QuickPurpose() {
  const navigate = useNavigate();

  const handleClick = (type) => {
    navigate(`/services?type=${type}`);
  };

  return (
    <section className="my-5">
      <h2 className="text-center mb-4">Bạn đang muốn làm gì hôm nay?</h2>
      <div className="row text-center">
        {quickOptions.map((opt, index) => (
          <div
            key={index}
            className="col-6 col-md-4 col-lg-2 mb-3"
            onClick={() => handleClick(opt.type)}
            style={{ cursor: "pointer" }}
          >
            <div className="border rounded py-3 px-2 h-100 shadow-sm hover-shadow transition">
              <img
                src={opt.image}
                alt={opt.label}
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />{" "}
              <p className="mt-2">{opt.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

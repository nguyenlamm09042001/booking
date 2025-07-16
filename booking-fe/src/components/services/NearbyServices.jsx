import React, { useEffect, useState } from "react";
import api from "../../axios";
import ServiceCard from "./servicecard";

export default function NearbyServices() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [manualAddress, setManualAddress] = useState("");
  const [nearby, setNearby] = useState([]);

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Lấy vị trí tự động
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.warn("Không thể lấy vị trí:", err.message);
        setLocationDenied(true);
      }
    );
  }, []);

  // Nhập địa chỉ thủ công → dùng OpenCage
  const handleManualLocation = async () => {
    if (!manualAddress) return;
    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          manualAddress
        )}&key=a0581dd3f88f4c13ab42af5095e94a22`
      );
      const data = await res.json();
      const { lat, lng } = data.results[0].geometry;
      setUserLocation({ lat, lng });
      setLocationDenied(false); // Ẩn input khi đã có tọa độ
    } catch (err) {
      console.error("Lỗi khi lấy tọa độ từ địa chỉ:", err);
    }
  };

  // Lọc dịch vụ theo vị trí
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/user/nearby");
        const all = res.data;

        if (!userLocation) return;

        const filtered = all
          .map((biz) => {
            if (!biz.latitude || !biz.longitude) return null;

            const d = getDistance(
              userLocation.lat,
              userLocation.lng,
              parseFloat(biz.latitude),
              parseFloat(biz.longitude)
            );

            return d <= 200 ? { ...biz, distance: d } : null;
          })
          .filter(Boolean);

        setNearby(filtered);
      } catch (err) {
        console.error("Lỗi fetch businesses:", err);
      }
    };

    fetchData();
  }, [userLocation]);

  return (
    <section className="my-5">
      <h2 className="text-center mb-4">📍 Dịch vụ gần bạn</h2>

      {locationDenied && (
        <div className="text-center mb-4">
          <p>Không thể lấy vị trí tự động. Vui lòng nhập địa chỉ của bạn:</p>
          <input
            type="text"
            placeholder="VD: 123 Quang Trung, Gò Vấp..."
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            style={{ padding: "8px", width: "60%", maxWidth: 400 }}
          />
          <button
            onClick={handleManualLocation}
            className="btn btn-primary ms-2"
          >
            Xác nhận vị trí
          </button>
        </div>
      )}

      <div className="row">
        {nearby.length > 0 ? (
          nearby.map((business) => (
            <div className="col-md-4 mb-3" key={business.id}>
              <ServiceCard business={business} />
            </div>
          ))
        ) : (
          <p className="text-center">Không tìm thấy dịch vụ gần bạn.</p>
        )}
      </div>
    </section>
  );
}

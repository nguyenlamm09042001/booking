import React from "react";
import services from "../../data/services.json"; // nếu bé có file JSON dịch vụ
import ServiceCard from "./servicecard"; // nếu đã có ServiceCard

export default function ServiceList() {
  // Chỉ hiển thị 6 dịch vụ đầu tiên
  const featured = services.slice(0, 6);

  return (
    <section className="my-5">
      <h2 className="text-center mb-4">Dịch vụ nổi bật</h2>
      <div className="row">
        {featured.map(service => (
          <div className="col-md-4 mb-3" key={service.id}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}

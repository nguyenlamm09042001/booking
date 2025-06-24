import React from 'react';

const feedbacks = [
  {
    name: 'Mai Trâm',
    comment: 'Đặt xe cực tiện, không cần gọi Grab!',
    emoji: '🚗'
  },
  {
    name: 'Huyền My',
    comment: 'Spa nhẹ nhàng, mình book 5 phút là xong!',
    emoji: '💆‍♀️'
  },
  {
    name: 'Tuấn Anh',
    comment: 'Khách sạn giá ổn, đặt dễ, rất hài lòng.',
    emoji: '🏨'
  }
];

export default function Testimonials() {
  return (
    <section className="my-5 bg-light py-4 rounded">
      <h2 className="text-center mb-4">Khách hàng nói gì?</h2>
      <div className="row text-center">
        {feedbacks.map((f, i) => (
          <div key={i} className="col-md-4 mb-3">
            <div className="border rounded p-3 h-100 shadow-sm">
              <div className="display-4">{f.emoji}</div>
              <p className="fst-italic">"{f.comment}"</p>
              <strong>– {f.name}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

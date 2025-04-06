import { useRouter } from 'next/router';
import React from 'react';

function CarCardMobile({ car }) {
  const router = useRouter();
  const originalPrice = car.pricePerDay + 200;
  const discount = Math.round(((originalPrice - car.pricePerDay) / originalPrice) * 100);

  return (
    <div
      onClick={() => router.push(`/cars/${car._id}`)}
      className="flex items-start gap-4 bg-white shadow-md rounded-xl p-3 w-full max-w-full cursor-pointer active:scale-[0.98] transition sm:hidden"
    >
      {/* Car Image */}
      <img
        src={car.image}
        alt={car.name}
        className="w-28 h-20 object-cover rounded-md"
      />

      {/* Car Info */}
      <div className="flex-1">
        <h2 className="text-base font-bold text-gray-800 mb-1">
          {car.name} - {car.model}
        </h2>
        <p className="text-sm text-gray-500 mb-1">{car.brand}</p>

        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-green-600 font-bold text-sm">
            ₹{car.pricePerDay}/day
          </span>
        </div>

        <ul className="list-disc text-xs text-gray-600 pl-4">
          {car.features.slice(0, 2).map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CarCardMobile;

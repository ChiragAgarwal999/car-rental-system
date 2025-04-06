import { useRouter } from 'next/router';
import React from 'react';

function CarCard({ car }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/cars/${car._id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-transform duration-200 cursor-pointer p-4 w-full sm:w-auto active:scale-95"
    >
      <img
        src={car.image}
        alt={`${car.name} - ${car.model}`}
        className="w-full h-48 sm:h-52 object-cover rounded-xl mb-4"
      />

      <div className="flex justify-between items-center mb-1">
        <di className="text-lg flex justify-start items-center flex-wrap gap-2 font-semibold text-gray-800">
          {car.name} <span className="text-sm text-gray-500">({car.model})</span>
        </di>
        <span className="text-green-600 font-bold text-md">
          ₹{car.pricePerDay}/day
        </span>
      </div>

      <p className="text-gray-600 mb-2 text-sm sm:text-base">{car.brand}</p>

      <ul className="text-sm sm:text-[15px] text-gray-700 list-disc pl-5 space-y-1">
        {car.features.slice(0, 3).map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
        {car.features.length > 3 && <li>+{car.features.length - 3} more</li>}
      </ul>
    </div>
  );
}

export default CarCard;

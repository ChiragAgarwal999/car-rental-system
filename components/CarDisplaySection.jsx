import { useState } from 'react';
import CarCard from './CarCard';
import CarCardMobile from './CarCardMobile';

export default function CarDisplaySection({ cars }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-800">
          Available Cars
        </h2>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search by name, brand, or model..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredCars.length > 0 ? (
          <>
            {/* Large screen layout */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {/* Mobile layout */}
            <div className="flex flex-col gap-4 sm:hidden">
              {filteredCars.map(car => (
                <CarCardMobile key={car._id} car={car} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-center">No cars found.</p>
        )}
      </div>
    </section>
  );
}

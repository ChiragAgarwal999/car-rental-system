import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-6 sm:px-10 md:px-20" id="about">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-6">
          About CarRentalHub
        </h2>

        <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed text-center mb-10">
          CarRentalHub is India’s trusted platform for hassle-free car rentals. Whether you're planning a business trip, a vacation with family, or need a car for daily commute — we provide the most reliable and affordable vehicles across cities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">🚗 Wide Range of Vehicles</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              From compact cars to luxury sedans, SUVs, and tempo travelers, we have the perfect ride for every occasion and budget.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">🛡️ Safe & Sanitized</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              All vehicles are sanitized before each booking. Your safety is our top priority — always clean, insured, and well-maintained.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">💳 Easy Booking & Support</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Book your car in just a few clicks. Need help? Our 24/7 customer support is always ready to assist via chat, email, or phone.
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed text-center mt-12">
          Trusted by thousands of customers nationwide, we take pride in making travel easier, more accessible, and more enjoyable.
          Experience the freedom of the road with CarRentalHub today!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;

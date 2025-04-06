// pages/cars/[id].js
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CarDetails({ car }) {
  const router = useRouter();

  if (!car) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <main className="mmin-h-[85vh] bg-gray-50 px-4 py-8 lg:py-14">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
      

        <div className="flex flex-col md:flex-row gap-6">
          {/* Car Image */}
          <div className="md:w-1/2 w-full h-64 md:h-auto">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* Car Details */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
            <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline mb-4 text-sm sm:text-base"
        >
          ← Go Back
        </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {car.name}
              </h1>
              <p className="text-gray-600 text-base mb-1">
                <span className="font-medium">Brand:</span> {car.brand}
              </p>
              <p className="text-gray-600 text-base mb-3">
                <span className="font-medium">Model:</span> {car.model}
              </p>

              <p className="text-green-600 text-xl font-semibold mb-4">
                ₹{car.pricePerDay} <span className="text-sm text-gray-500 font-normal">/ day</span>
              </p>

              <h2 className="text-lg font-semibold text-gray-700 mb-2">Features</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
                {car.features?.length > 0 ? (
                  car.features.map((feature, idx) => <li key={idx}>{feature}</li>)
                ) : (
                  <li>No features listed.</li>
                )}
              </ul>
            </div>

            <div className="mt-6">
              <button
                onClick={() => router.push(`/booking/${car._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow-sm text-sm sm:text-base w-full md:w-auto"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const res = await axios.get(`${process.env.API_URL}/api/cars/${id}`);
    return {
      props: {
        car: res.data,
      },
    };
  } catch (error) {
    console.error('Error fetching car data:', error);
    return {
      props: {
        car: null,
      },
    };
  }
}

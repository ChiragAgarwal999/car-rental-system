import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function BookCar() {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/cars/${id}`)
        .then((res) => {
          setCar(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to load car details.');
        });
    }
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = Math.abs(end - start);
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      setTotalPrice(days * car.pricePerDay);
    }
  }, [startDate, endDate, car]);

  const userId = typeof window !== 'undefined' ? Cookies.get('userId') : null;

  if (loading)
    return <p className="text-center mt-10 text-sm sm:text-base">Loading car details...</p>;
  if (!car) return null;

  const carImage =
    car.image ||
    'https://images.unsplash.com/photo-1605283179621-d54a2db81001?auto=format&fit=crop&w=800&q=80';

  return (
    <main className="min-h-[85vh] flex items-center justify-center bg-gray-200 p-4 sm:p-6">
  <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left: Car Image */}
         <div className="lg:w-1/2 w-full h-64 md:h-auto p-4">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover rounded-lg shadow-sm"
            />
          </div>

        {/* Right: Booking Form */}
        <div className="lg:w-1/2 w-full p-5 sm:p-8 flex flex-col justify-center">
          <button
            onClick={() => router.back()}
            className="mb-4 text-blue-600 hover:underline text-sm sm:text-base w-fit"
          >
            ← Back
          </button>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-3">
            Book {car.name}
          </h1>

          <p className="text-gray-700 mb-1 text-sm sm:text-base md:text-lg">
            🚗 Brand: <strong>{car.brand}</strong>
          </p>
          <p className="text-gray-700 mb-4 text-sm sm:text-base md:text-lg">
            💰 Price Per Day: ₹<strong>{car.pricePerDay}</strong>
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!userId) {
                toast.warning('Please login to proceed with booking!');
                return;
              }
              console.log("BookData",{
                car: id,
                user: userId,
                startDate,
                endDate,
              })

              try {
                await axios.post('/api/bookings', {
                  car: id,
                  user: userId,
                  startDate,
                  endDate,
                });

                toast.success('Booking successful!');
                setTimeout(() => router.push('/my-bookings'), 1500);
              } catch (err) {
                console.error(err);
                toast.error('Something went wrong!');
              }
            }}
            className="space-y-4 sm:space-y-5"
          >
            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base text-gray-800">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full border px-3 py-2 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base text-gray-800">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                min={startDate || new Date().toISOString().split('T')[0]}
                className="w-full border px-3 py-2 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {startDate && endDate && (
              <div className="text-base sm:text-lg md:text-xl font-semibold text-green-700 bg-green-50 px-4 py-2 rounded text-center">
                🧾 Total Price: ₹{totalPrice}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-sm sm:text-base md:text-lg py-2.5 sm:py-3 rounded-md shadow hover:bg-blue-700 transition"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

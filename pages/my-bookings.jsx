import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userId = typeof window !== 'undefined' ? Cookies.get('userId') : null;

  useEffect(() => {
    if (!userId) {
      router.push('/login');
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/users/userBookings`, {
          params: { userId },
        })
        .then((res) => {
          console.log('Full Booking Details:', res.data);
          setBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to fetch booking details.');
          setLoading(false);
        });
    }
  }, [userId]);
  


  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-blue-700 text-lg font-medium">Loading your bookings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">My Bookings</h1>

        {Array.isArray(bookings) && bookings.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
              >
                <img
                  src={
                    booking.car?.image ||
                    'https://images.unsplash.com/photo-1605283179621-d54a2db81001?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={booking.car?.name || 'Car Image'}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">{booking.car?.name}</h2>
                  <p className="text-sm text-gray-700 mb-1">Brand: <span className="font-medium">{booking.car?.brand}</span></p>
                  <p className="text-sm text-gray-700 mb-1">Price/Day: ₹{booking.car?.pricePerDay}</p>
                  <p className="text-sm text-gray-700 mb-1">Start: {new Date(booking.startDate).toDateString()}</p>
                  <p className="text-sm text-gray-700 mb-1">End: {new Date(booking.endDate).toDateString()}</p>
                  <p className="text-sm text-gray-700 font-semibold mt-2">Total: ₹{booking.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// pages/admin/booking.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminBooking() {
  const [isVerified, setIsVerified] = useState(false);
  const [input, setInput] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('/api/admin/bookings')
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-verified');
    if (isLoggedIn === 'true') {
      setIsVerified(true);
    }
  }, []);

  const handleVerify = () => {
    const adminUser = 'admin';
    const adminPass = 'admin123';

    if (input.username === adminUser && input.password === adminPass) {
      setIsVerified(true);
      localStorage.setItem('admin-verified', 'true');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    if (isVerified) {
      axios
        .get('/api/bookings/all')
        .then((res) => setBookings(res.data))
        .catch((err) => console.error(err));
    }
  }, [isVerified]);

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Admin Login</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 relative">
      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem('admin-verified');
          setIsVerified(false);
        }}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
       Admin Logout
      </button>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">All Bookings</h1>
      {loading ?
      <p className="text-center text-gray-600">Loading bookings...</p>
      :
      <div className="overflow-x-auto min-h-[80vh]">
        <table className="min-w-full border bg-white shadow-sm">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Car</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...bookings].reverse().map((booking, i) => (
              <tr key={i} className="text-center border-t text-gray-700 text-sm sm:text-base">
                <td className="p-2">{booking.user?.name || 'N/A'}</td>
                  <td className="p-2">{booking.car?.name || booking.car?.model || 'N/A'}</td>
                <td className="p-2">{new Date(booking.startDate).toLocaleDateString()}</td>
                <td className="p-2">{new Date(booking.endDate).toLocaleDateString()}</td>
                <td className="p-2">₹{booking.totalAmount}</td>
                <td className="p-2">{booking.status || 'Confirmed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }

    </div>
  );
}

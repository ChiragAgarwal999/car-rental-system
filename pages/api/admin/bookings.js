// pages/api/admin/bookings.js
import dbConnect from '@/utils/dbConnect';
import Booking from '@/models/Booking';
import Car from '@/models/Car';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const bookings = await Booking.find({})
      .populate('car', 'name model') // populate car details
      .populate('user', 'name email'); // populate user info

    const formatted = bookings.map((b) => ({
      _id: b._id,
      car: b.car,
      user: b.user,
      startDate: b.startDate,
      endDate: b.endDate,
      totalAmount: b.totalPrice,
      status: b.status,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error('Admin Bookings Fetch Error:', err);
    res.status(500).json({ message: 'Failed to fetch admin bookings' });
  }
}

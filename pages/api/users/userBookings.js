// pages/api/users/userBookings.js
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import Booking from '@/models/Booking';
import Car from '@/models/Car';

export default async function handler(req, res) {
  await dbConnect();

  const { userId } = req.method === 'GET' ? req.query : req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Get user and their bookings
    const user = await User.findById(userId);
    if (!user || !user.bookings?.length) {
      return res.status(404).json({ message: 'No bookings found for user' });
    }

    // Populate car details directly via Mongoose
    const bookings = await Booking.find({ _id: { $in: user.bookings } })
      .populate('car')
      .lean();

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Booking Fetch Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

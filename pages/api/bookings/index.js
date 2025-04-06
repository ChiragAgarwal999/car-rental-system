import dbConnect from '@/utils/dbConnect';
import Booking from '@/models/Booking';
import Car from '@/models/Car';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { car, user, startDate, endDate } = req.body;

      // Get car details
      const carData = await Car.findById(car);
      if (!carData) {
        return res.status(404).json({ error: 'Car not found' });
      }

      // Calculate total days
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start & end

      const totalPrice = diffDays * carData.pricePerDay;

      const booking = await Booking.create({
        car,
        user,
        startDate,
        endDate,
        totalPrice
      });

      // 2. Push booking ID to user's bookings array
      await User.findByIdAndUpdate(user, {
        $push: { bookings: booking._id }, // ✅ Corrected variable name
      });
      
      res.status(201).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

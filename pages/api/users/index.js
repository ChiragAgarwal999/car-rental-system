// pages/api/users/index.js
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await User.find().populate({
          path: 'bookings',
          populate: { path: 'car', model: 'Car' }
        });

        return res.status(200).json({ success: true, users });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to fetch users.' });
      }

    case 'DELETE':
      try {
        const { id } = req.body;

        if (!id) return res.status(400).json({ success: false, message: 'User ID is required.' });

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({ success: false, message: 'User not found.' });

        return res.status(200).json({ success: true, message: 'User deleted successfully.' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to delete user.' });
      }

    default:
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

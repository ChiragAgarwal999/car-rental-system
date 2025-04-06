import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method !== 'GET') return res.status(405).end();

  try {
    const user = await User.findById(id);

    console.log("useruser",id);
    console.log("useruser",user);
    

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Send only bookings, since your frontend uses res.data directly as bookings
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

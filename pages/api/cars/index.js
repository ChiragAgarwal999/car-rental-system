import dbConnect from '@/utils/dbConnect';
import Car from '@/models/Car';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const cars = await Car.find({});
    return res.status(200).json({ success: true, data: cars });
  }

  if (req.method === 'POST') {
    try {
      const car = await Car.create(req.body);
      return res.status(201).json({ success: true, data: car });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}

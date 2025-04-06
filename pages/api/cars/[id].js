// /pages/api/products/[id].js

import dbConnect from '@/utils/dbConnect'; // Ensure to have your db connection setup
import Car from '@/models/Car';

export default async function handler(req, res) {
  await dbConnect(); // Ensure the database connection

  const { id } = req.query; // Get the product ID from the URL

  if (req.method === 'GET') {
    
    try {
      const car = await Car.findById(id); // Find the car by its ID
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }

      // Return the car details
      res.status(200).json(car);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  } else  if (req.method === 'PATCH') {
    try {
      const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
      // console.log("data req.body",req.body)
      if (!updatedCar) {
        return res.status(404).json({ error: 'Car not found' });
      }

      res.status(200).json({ message: 'Car updated successfully', updatedCar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update car' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedCar = await Car.findByIdAndDelete(id);

      if (!deletedCar) {
        return res.status(404).json({ error: 'Car not found' });
      }

      res.status(200).json({ message: 'Car deleted successfully', deletedCar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete car' });
    }
  } 
  
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
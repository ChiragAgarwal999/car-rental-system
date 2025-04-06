import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  available: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
  collection: 'cars'
});

// Fix for hot-reload in dev environments (Next.js, etc.)
const Car = mongoose.models?.Car || mongoose.model('Car', CarSchema);

export default Car;

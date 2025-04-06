// scripts/seedCars.js
import dbConnect from '@/utils/dbConnect.js';
import Car from '@/models/Car.js'; // adjust path if needed
import mongoose from 'mongoose';

const cars = [
  {
    name: 'Swift',
    brand: 'Maruti',
    model: '2023',
    pricePerDay: 1200,
    image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg',
    features: ['Air Conditioning', 'Manual Transmission', 'ABS'],
  },
  {
    name: 'City',
    brand: 'Honda',
    model: '2022',
    pricePerDay: 1800,
    image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg',
    features: ['Sunroof', 'Automatic Transmission', 'Cruise Control'],
  },
  {
    name: 'XUV700',
    brand: 'Mahindra',
    model: '2023',
    pricePerDay: 2500,
    image: 'https://imgd.aeplcdn.com/664x374/cw/ec/37964/Mahindra-XUV700-Exterior-173255.jpg',
    features: ['Panoramic Sunroof', 'ADAS', 'Touchscreen Display'],
  },
  {
    name: 'Fortuner',
    brand: 'Toyota',
    model: '2023',
    pricePerDay: 3500,
    image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
    features: ['7-Seater', '4x4 Drive', 'Touchscreen'],
  },
  {
    name: 'i20',
    brand: 'Hyundai',
    model: '2022',
    pricePerDay: 1300,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/110411/i20-exterior-right-front-three-quarter-3.jpeg',
    features: ['Automatic AC', 'Android Auto', 'Rear Camera'],
  },
  {
    name: 'Ertiga',
    brand: 'Maruti',
    model: '2023',
    pricePerDay: 1600,
    image: 'https://imgd.aeplcdn.com/664x374/cw/ec/39705/Maruti-Suzuki-Ertiga-Exterior-169437.jpg',
    features: ['MPV', 'Petrol + CNG', 'Good Mileage'],
  },
  {
    name: 'Venue',
    brand: 'Hyundai',
    model: '2022',
    pricePerDay: 1900,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44951/venue-exterior-right-front-three-quarter-2.jpeg',
    features: ['Sunroof', 'Turbo Engine', 'LED DRLs'],
  },
  {
    name: 'Altroz',
    brand: 'Tata',
    model: '2021',
    pricePerDay: 1100,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44795/altroz-exterior-right-front-three-quarter-2.jpeg',
    features: ['BS6', 'Harman Sound', 'Projector Lamps'],
  },
  {
    name: 'Harrier',
    brand: 'Tata',
    model: '2023',
    pricePerDay: 2800,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44797/harrier-exterior-right-front-three-quarter.jpeg',
    features: ['Diesel', '6 Airbags', 'Panoramic Sunroof'],
  },
  {
    name: 'Nexon',
    brand: 'Tata',
    model: '2023',
    pricePerDay: 2000,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44799/nexon-exterior-right-front-three-quarter-2.jpeg',
    features: ['EV Available', '5-Star Safety', 'Wireless Charger'],
  },
  {
    name: 'Kiger',
    brand: 'Renault',
    model: '2022',
    pricePerDay: 1400,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44777/kiger-exterior-right-front-three-quarter-2.jpeg',
    features: ['Turbo Engine', 'LED Headlamps', 'Wireless CarPlay'],
  },
  {
    name: 'Seltos',
    brand: 'Kia',
    model: '2023',
    pricePerDay: 2300,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44785/seltos-exterior-right-front-three-quarter-3.jpeg',
    features: ['BOSE Audio', 'Sunroof', 'ADAS'],
  },
  {
    name: 'Baleno',
    brand: 'Maruti',
    model: '2023',
    pricePerDay: 1250,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44769/baleno-exterior-right-front-three-quarter.jpeg',
    features: ['Fuel Efficient', 'Projector Headlamps', 'AC Vents'],
  },
  {
    name: 'Thar',
    brand: 'Mahindra',
    model: '2023',
    pricePerDay: 3000,
    image: 'https://imgd.aeplcdn.com/664x374/cw/ec/37964/Mahindra-Thar-Exterior-173249.jpg',
    features: ['Off-Road', 'Convertible Top', 'Diesel Manual'],
  },
  {
    name: 'Creta',
    brand: 'Hyundai',
    model: '2023',
    pricePerDay: 2200,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44793/creta-exterior-right-front-three-quarter-2.jpeg',
    features: ['Voice Commands', 'Smart Air Purifier', 'BlueLink'],
  },
  {
    name: 'Scorpio N',
    brand: 'Mahindra',
    model: '2023',
    pricePerDay: 2700,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/113281/scorpio-n-exterior-right-front-three-quarter-3.jpeg',
    features: ['SUV', 'ADAS', '6-Seater'],
  },
  {
    name: 'Magnite',
    brand: 'Nissan',
    model: '2022',
    pricePerDay: 1500,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44781/magnite-exterior-right-front-three-quarter.jpeg',
    features: ['Turbo CVT', '8-Inch Display', 'Rear Camera'],
  },
  {
    name: 'EcoSport',
    brand: 'Ford',
    model: '2021',
    pricePerDay: 1700,
    image: 'https://imgd.aeplcdn.com/664x374/cw/ec/39705/Ford-EcoSport-Exterior-169469.jpg',
    features: ['Sync 3', 'Compact SUV', 'Diesel'],
  },
  {
    name: 'Tiago',
    brand: 'Tata',
    model: '2022',
    pricePerDay: 1000,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44773/tiago-exterior-right-front-three-quarter-2.jpeg',
    features: ['Budget Friendly', 'Harman Audio', 'Dual Airbags'],
  },
  {
    name: 'Ciaz',
    brand: 'Maruti',
    model: '2021',
    pricePerDay: 1600,
    image: 'https://imgd.aeplcdn.com/664x374/cw/ec/44769/Ciaz-Exterior-173268.jpg',
    features: ['Luxury Sedan', 'Petrol', 'Comfort Ride'],
  }
];


async function seedCars() {
  try {
    await dbConnect();
    await Car.deleteMany(); // optional: clear existing data
    await Car.insertMany(cars);
    console.log('✅ Successfully seeded 20 cars!');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error seeding cars:', err);
    mongoose.connection.close();
  }
}

seedCars();

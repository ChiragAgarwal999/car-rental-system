// pages/index.js
import AboutUs from '@/components/AboutUs';
import CarDisplaySection from '@/components/CarDisplaySection';
import ContactUs from '@/components/ContactUs';
import HeroSection from '@/components/HeroSection';
import LoginCTA from '@/components/LoginCTA';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import React from 'react';

function Home({ cars }) {
  const {user} = useUser()
  return (
    <div>
      <HeroSection />
      <CarDisplaySection cars={cars} />
      {!user && <LoginCTA />}
      <AboutUs />
      <ContactUs />
    </div>
  );
}

export default Home;

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.API_URL}/api/cars`); // Replace with actual base URL if needed
  const carsData = res.data;

  return {
    props: {
      cars: carsData.data, // Assuming your API response is { data: [...] }
    },
  };
}

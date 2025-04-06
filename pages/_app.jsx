import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/context/UserContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Component {...pageProps} />
        <Footer/>
      </UserProvider>
    </>
  );
}

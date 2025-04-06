import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { navigateAndScroll } from '@/utils/scrollToSection';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react'; // using Lucide icons

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  const scrollAndClose = (sectionId) => {
    setIsOpen(false);
    navigateAndScroll(router, '/', sectionId);
  };

  return (
    <nav className="bg-white shadow-md pl-4 sm:pr-10 sm:pl-8 lg:py-3 py-0 flex md:justify-between items-center sticky top-0 z-50">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center ">
        {/* Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-blue-600">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo */}
        <div
          onClick={() => handleNavigation('/')}
          className="cursor-pointer flex items-center gap-2 scale-90 sm:scale-100"
        >
          <svg width="250" height="80" viewBox="86 0 400 120" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M90 60c0-13 10-23 23-23h100c13 0 23 10 23 23v12c0 3-2 5-5 5h-8a14 14 0 01-28 0H129a14 14 0 01-28 0h-8c-3 0-5-2-5-5V60z" fill="#1D4ED8" />
            <circle cx="120" cy="77" r="7" fill="#fff" />
            <circle cx="200" cy="77" r="7" fill="#fff" />
            <text x="240" y="70" fontFamily="Segoe UI, sans-serif" fontSize="35" fontWeight="bold" fill="#111827" letterSpacing="1">
              Rent<tspan fill="#2563EB">ACar</tspan>
            </text>
          </svg>
        </div>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
        <li className="cursor-pointer" onClick={() => handleNavigation('/')}>Home</li>
        <li className="cursor-pointer" onClick={() => scrollAndClose('#about')}>About</li>
        <li className="cursor-pointer" onClick={() => scrollAndClose('#contact')}>Contact</li>

        {user ? (
          <>
          <li className="cursor-pointer" onClick={() => handleNavigation('/my-bookings')}>Booking</li>
            <li className="text-blue-600 font-semibold">Hi, {user.name.split(' ')[0]}</li>
            <li className="cursor-pointer text-red-500 font-semibold" onClick={logout}>Logout</li>
          </>
        ) : (
          <li className="cursor-pointer text-blue-600 font-semibold" onClick={() => handleNavigation('/auth')}>Login</li>
        )}
      </ul>

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="pt-20 px-6 flex flex-col gap-6 text-lg font-medium text-gray-700">
          <span onClick={() => handleNavigation('/')} className="cursor-pointer">Home</span>
          <span onClick={() => scrollAndClose('#about')} className="cursor-pointer">About</span>
          <span onClick={() => scrollAndClose('#contact')} className="cursor-pointer">Contact</span>
          {user ? (
            <>
            <span onClick={() => handleNavigation('/my-bookings')} className="cursor-pointer">Booking</span>
              <span className="text-blue-600 font-semibold">Hi, {user.name.split(' ')[0]}</span>
              <span onClick={logout} className="cursor-pointer text-red-500 font-semibold">Logout</span>
            </>
          ) : (
            <span onClick={() => handleNavigation('/auth')} className="cursor-pointer text-blue-600 font-semibold">Login</span>
          )}
        </div>
      </div>

      {/* Overlay when drawer open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}

// components/Footer.jsx
export default function Footer() {
    return (
      <footer className="bg-white shadow-inner py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600">
          <p className="text-sm mb-2 md:mb-0">© {new Date().getFullYear()} RentACar. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-blue-600 text-sm transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-600 text-sm transition">Terms of Use</a>
            <a href="/contact" className="hover:text-blue-600 text-sm transition">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  
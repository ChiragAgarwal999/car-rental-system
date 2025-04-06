import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-blue-50 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
        {/* Text Section */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-700 leading-tight mb-6">
            Drive Your Dream Car, Today.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
            Explore a fleet of well-maintained, affordable, and luxury vehicles across your city.
            Whether it's a business trip or a weekend getaway — we've got your wheels ready.
          </p>
          <button
            className="bg-blue-600 text-white px-8 py-3 text-sm sm:text-base font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
          >
            Browse Cars
          </button>
          <p className="mt-4 text-sm text-gray-600">
            No hidden fees. Instant bookings. 24/7 Support.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full">
          <Image
            src="/car-banner.png"
            alt="Car Banner"
            width={800}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

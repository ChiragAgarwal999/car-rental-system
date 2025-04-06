import React from 'react';

const ContactUs = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 sm:px-12" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-6">
          Get in Touch with Us
        </h2>
        <p className="text-gray-700 text-center text-base sm:text-lg md:text-xl mb-10">
          Whether you have a question, feedback, or need assistance with your booking,
          we’re here to help. Reach out to us anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Contact Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">📍 Visit Our Office</h3>
            <p className="text-gray-700 mb-2">CarRentalHub Pvt. Ltd.</p>
            <p className="text-gray-700 mb-2">123 Main Street, Jaipur, Rajasthan, India</p>
            <p className="text-gray-700 mb-2">📞 Phone: <a href="tel:+919876543210" className="text-blue-600 hover:underline">+91-9876543210</a></p>
            <p className="text-gray-700 mb-2">✉️ Email: <a href="mailto:support@carrentalhub.com" className="text-blue-600 hover:underline">support@carrentalhub.com</a></p>
            <p className="text-gray-700 mt-4">🕘 <span className="font-medium">Business Hours:</span></p>
            <ul className="text-gray-600 ml-4 list-disc">
              <li>Mon – Sat: 9:00 AM – 8:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

          {/* Map Embed */}
          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Our Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.031772920537!2d75.803365!3d26.912433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db422e11647c3%3A0x6c973c1c24c3aa2!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1712212345678"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 text-base sm:text-lg">
            Still have questions? Feel free to drop us a message or connect via call. Our team is always happy to assist you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

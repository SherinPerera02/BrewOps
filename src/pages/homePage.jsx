import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-green-600 flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-white">BrewOps</h1>
        <nav className="space-x-6 text-white font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Log In
          </Link>
        </nav>
      </header>

      {/* Hero Section - Modern Redesign */}
      <section
        className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-cover bg-center rounded-xl overflow-hidden shadow-lg mx-2 md:mx-6 mt-6"
        style={{ backgroundImage: "url('/images/tea-field.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-black/60 z-0" />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fade-in-up mb-6">
            Welcome to <span className="text-green-400">Maleesha Tea Factory</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up delay-100">
            Experience the future of tea production with digital tools, transparent supply chains, and a commitment to quality.
          </p>
          <a
            href="#features"
            className="inline-block bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 animate-fade-in-up delay-200"
          >
            Discover More
          </a>
        </div>
      </section>

      {/* Animations for hero section */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .delay-100 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.3s; }
      `}</style>
      {/* Description Section */}
      <section className="px-6 py-10 space-y-6">
        <div>
          <h3 className="font-semibold text-lg">Simplifying Tea Production, Every Step of the Way</h3>
          <p className="text-gray-700 mt-2">
            Our platform simplifies and digitalizes tea leaf collection, supplier interactions,
            inventory tracking, and factory operations. Built for factories working closely with
            local farmers, we focus on improving transparency, efficiency, and accuracy throughout
            the production cycle.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Who We Are</h3>
          <p className="text-gray-700 mt-2">
            We combine traditional tea cultivation with smart digital tools to create a smooth and
            reliable supply chain from field to factory. Our commitment is to quality, community
            relationships, and modernized factory processes.
          </p>
        </div>
      </section>

      {/* Feature Section */}
      <section className="px-6 pb-10">
        <h3 className="font-semibold text-lg mb-6">System Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inventory Card */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src="/images/inventory.jpg"
              alt="Inventory Management"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold">Inventory Management</h4>
              <p className="text-gray-600 text-sm">
                Efficiently monitor stock levels, record inventory data and make work easier.
              </p>
            </div>
          </div>

          {/* Supplier Card */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src="/images/supplier.jpg"
              alt="Supplier Management"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold">Supplier Management</h4>
              <p className="text-gray-600 text-sm">
                Track relationships, ensure quality control, and review delivery history.
              </p>
            </div>
          </div>
        </div>

        {/* More Details */}
        <div className="text-center mt-8">
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-5 py-2 rounded transition">
            More Details
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo & Socials */}
          <div>
            <h4 className="text-3xl font-bold mb-4">BrewOps</h4>
            <div className="flex space-x-4 text-xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f text-white hover:text-green-400 transition" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in text-white hover:text-green-400 transition" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube text-white hover:text-green-400 transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-white hover:text-green-400 transition" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-2">Experiences</h4>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Accommodation</h4>
            <h4 className="font-semibold mb-2">Who We Are</h4>
            <h4 className="font-semibold mb-2">Contact Us</h4>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold mb-2">Address</h4>
            <p className="text-sm">Maleesha Tea Factory, Omaththa Road, Agalawatta, Mathugama.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

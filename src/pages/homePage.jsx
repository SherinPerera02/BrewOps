import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import teaLeavesAnimation from '../assets/tea-leaves.json';

const HomePage = () => {
  const textRefs = useRef([]);
  const imageRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.1 }
    );

    textRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect(); // Clean up observer
    };
  }, []);
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

      {(() => {
        // Array of hero images (update paths as needed)
        const heroImages = [
          '/public/background.jpg',
          '/public/tea_1.jpg',
          '/public/tea.jpg',
          '/public/pic_01.jpg',
          '/public/pic_02.jpg',
        ];
        const [currentImage, setCurrentImage] = useState(0);
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
          }, 7000); // 5 seconds
          return () => clearInterval(interval);
        }, []);


        return (
          <section
            className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-cover bg-center rounded-xl overflow-hidden shadow-lg mx-2 md:mx-6 mt-6 transition-all duration-1000"
            style={{ backgroundImage: `url('${heroImages[currentImage]}')` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-black/60 z-0" />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-12 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fade-in-up mb-6">
                Welcome to Maleesha Tea Factory
              </h1>
              <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl animate-fade-in-up delay-100">
                Experience the future of tea production with digital tools, transparent supply chains and a commitment to quality.
              </p>
              <a
                href="#features"
                className="inline-block bg-green-400 hover:bg-black text-black hover:text-white font-semibold text-bold  cursor-pointer px-8 py-3 rounded-full shadow-lg transition-all duration-300 animate-fade-in-up delay-200"
              >
                Discover More
              </a>
            </div>
            {/* Slider Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${currentImage === idx ? 'bg-green-400' : 'bg-white/40'}`}
                  style={{ display: 'inline-block' }}
                />
              ))}
            </div>
          </section>
        );
      })()}


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
        @keyframes card-fade-in {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-card-fade-in {
          animation: card-fade-in 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .delay-150 { animation-delay: 0.15s; }
        @keyframes text-fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-text-fade-in {
          animation: text-fade-in 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .delay-100 { animation-delay: 0.1s; }
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .opacity-0 {
          opacity: 0;
        }
      `}</style>
      {/* Description Section */}
      <section className="px-6 py-10 space-y-6">
        
          
       <div className="text-center py-10">
          <h1 className="text-4xl font-bold mb-6">
            Maleesha Tea – More Than Just a Tea Factory
          </h1>
          <p className="text-gray-700 mt-2 text-lg max-w-3xl mx-auto">
            For generations, Maleesha Tea Factory has been at the heart of our community, 
            working hand in hand with individual tea pluckers and small-scale growers from nearby villages. 
            Rooted in tradition yet embracing modern processing standards, we ensure that every leaf 
            reflects the dedication and care of those who harvest it. Beyond producing the finest Ceylon tea, 
            we provide fair prices, reliable support, and a lifeline for local livelihoods  
            sustaining families and preserving the proud heritage of Sri Lankan tea. 
            Join us in celebrating this timeless craft.
          </p>
          <button className="mt-6 px-6 py-2 border border-black rounded hover:bg-black hover:text-white transition">
            Read About Us
          </button>
       </div>

              {/* Tea Leaves Animation Section */}
      <section className="flex justify-center items-center py-10">
        <div className="w-full max-w-md">
          <Lottie animationData={teaLeavesAnimation} loop={true} />
        </div>
      </section>

        <div>
          <h3
            className="font-semibold text-lg opacity-0"
            ref={(el) => (textRefs.current[2] = el)}
          >
            Who We Are
          </h3>
          <p
            className="text-gray-700 mt-2 opacity-0"
            ref={(el) => (textRefs.current[3] = el)}
          >
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
          <div
            className="bg-white rounded-xl shadow overflow-hidden transform transition duration-500 hover:scale-105 opacity-0"
            ref={(el) => (imageRefs.current[0] = el)}
          >
            <img
              src="/public/tea_1.jpg"
              alt="Inventory Management"
              className="w-full h-100 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold animate-text-fade-in">Inventory Management</h4>
              <p className="text-gray-600 text-sm animate-text-fade-in delay-100">
                Efficiently monitor stock levels, record inventory data and make work easier.
              </p>
            </div>
          </div>

          {/* Supplier Card */}
          <div
            className="bg-white rounded-xl shadow overflow-hidden transform transition duration-500 hover:scale-105 opacity-0"
            ref={(el) => (imageRefs.current[1] = el)}
          >
            <img
              src="/public/tea.jpg"
              alt="Supplier Management"
              className="w-full h-100 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold animate-text-fade-in">Supplier Management</h4>
              <p className="text-gray-600 text-sm animate-text-fade-in delay-100">
                Track relationships, ensure quality control, and review delivery history.
              </p>
            </div>
          </div>
        </div>

        {/* More Details */}
        <div className="text-center mt-8">
          <button className="bg-green-400 hover:bg-black text-black hover:text-white font-semibold text-bold px-5 py-2 cursor-pointer rounded transition">
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

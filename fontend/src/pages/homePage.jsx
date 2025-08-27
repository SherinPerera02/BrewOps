import React, { useState, useEffect, useRef } from 'react';
import WhoWeAre from './WhoWeAre';
import NavigationBar from '../components/homeNavigation';

const HomePage = () => {
  const textRefs = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
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
      observer.disconnect();
    };
  }, []);

  const heroImages = [
    '/background.jpg',
    '/tea_1.jpg',
    '/tea.jpg',
    '/pic_01.jpg',
    '/pic_02.jpg',
  ];
  const slides = [...heroImages, heroImages[0]]; // clone first slide at end for seamless loop

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
      setIsTransitioning(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide === slides.length - 1) {
      // After transition duration, jump instantly back to slide 0 without animation
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 700); // match transition duration

      return () => clearTimeout(timeout);
    } else {
      setIsTransitioning(true);
    }
  }, [currentSlide, slides.length]);

  return (
    <div className="font-sans bg-gray-50">
      {/* Header */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] rounded-xl overflow-hidden shadow-lg mx-2 md:mx-6 mt-6">
        {/* Sliding images container */}
        <div
          className={`flex min-h-[70vh] md:min-h-[80vh] ${
            isTransitioning ? 'transition-transform duration-1300 ease-in-out' : ''
          }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full bg-center bg-cover rounded-xl"
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-black/60 rounded-xl z-10" />

        {/* Fixed content on top */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-12 text-center z-20 pointer-events-none">
          <h1
            ref={(el) => textRefs.current.push(el)}
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fade-in-up mb-6 pointer-events-auto"
          >
            Welcome to Maleesha Tea Factory
          </h1>
          <p
            className="text-lg md:text-2xl text-white mb-8 max-w-2xl animate-fade-in-up delay-100 pointer-events-auto"
          >
            Experience the future of tea production with digital tools, transparent supply chains and a commitment to quality.
          </p>
          <a
            href="#features"
            className="inline-block bg-green-400 hover:bg-black text-black hover:text-white font-semibold cursor-pointer px-8 py-3 rounded-full shadow-lg transition-all duration-300 animate-fade-in-up delay-200 pointer-events-auto"
          >
            Discover More
          </a>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {heroImages.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${
                currentSlide === idx ||
                (currentSlide === slides.length - 1 && idx === 0)
                  ? 'bg-green-400'
                  : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .delay-100 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.3s; }

        
      `}</style>

      {/* Description Section */}
      <section className="px-6 py-10 space-y-6">
        <div
          ref={(el) => textRefs.current.push(el)}
          className="text-center py-10"
        >
          <h1 className="text-4xl font-bold mb-6">
            Maleesha Tea – More Than Just a Tea Factory
          </h1>
          <p className="text-gray-700 mt-2 text-lg max-w-3xl mx-auto ">
            For generations, Maleesha Tea Factory has been at the heart of our
            community,
            <br />
            working hand in hand with individual tea pluckers and small-scale
            growers from nearby villages.
            <br />
            Rooted in tradition yet embracing modern processing standards, we
            ensure that every leaf
            <br />
            reflects the dedication and care of those who harvest it.
            <br />
            Beyond producing the finest Ceylon tea,
            <br />
            we provide fair prices, reliable support and a lifeline for local
            livelihoods,
            <br />
            sustaining families and preserving the proud heritage of Sri Lankan
            tea.
            <br />
            Join us in celebrating this timeless craft.
          </p>
          <button className="mt-6 px-6 py-2 font-semibold bg-green-400 rounded-full hover:bg-black hover:text-white transition cursor-pointer ">
            Read About Us
          </button>
        </div>
      </section>

      <section id="who-we-are">
        <WhoWeAre />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 text-white py-10 px-6 animate-fade-in-up">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo & Socials */}
          <div>
            <h4 className="text-3xl font-bold mb-4">BrewOps</h4>
            <div className="flex space-x-4 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f text-white hover:text-green-400 transition" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in text-white hover:text-green-400 transition" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube text-white hover:text-green-400 transition" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-white hover:text-green-400 transition" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-2">Experiences</h4>
            <h4 className="font-semibold mb-2">Tea Tours</h4>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Accommodation</h4>
            <h4 className="font-semibold mb-2">Who We Are</h4>
            <h4 className="font-semibold mb-2">Contact Us</h4>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold mb-2">Address</h4>
            <p className="text-sm">
              Maleesha Tea Factory, Omaththa Road, Agalawatta, Mathugama.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import teaLeavesAnimation from '../assets/tea-leaves.json';
import hotTeaAnimation from '../assets/hot-tea.json';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// const center = {
//   lat: 6.555103856339234,
//   lng: 80.18148954466014,
// };

// function MapComponent() {
//   return (
//     <LoadScript googleMapsApiKey="YOUR_API_KEY">
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
//         <Marker position={center} />
//       </GoogleMap>
//     </LoadScript>
//   );
// }

export default function WhoWeAre() {
  const textRefs = useRef([]);

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
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="max-w-6xl md:mx-auto px-6 py-16">
      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center mb-4"> 
        {/* Hot Tea Animation Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center py-8"> 
          <div className="w-full max-w-md">
            <Lottie animationData={hotTeaAnimation} loop={true} />
          </div>
        </div>

        {/* Text Content */}
        <div ref={(el) => textRefs.current.push(el)} className="w-full md:w-1/2 text-center md:text-left opacity-0 transition-opacity duration-4000">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4"> 
            Maleesha Tea Journey
          </h1>
          <p className="text-gray-700 md:text-lg max-w-3xl mx-auto md:mx-0 text-center">
            Rooted in tradition and trusted by our community, Maleesha Tea Factory works hand-in-hand with
            individual tea pluckers and small-scale growers to produce authentic, high-quality Ceylon tea.
            We blend modern processing standards with deep respect for rural livelihoods so every cup tells a story.
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT: Content */}
        <div ref={(el) => textRefs.current.push(el)} className="opacity-0">
          <article id="about" className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed ">
              For years, Maleesha Tea Factory has been a trusted partner to nearby villages, working closely
              with individual tea pluckers and family-run holdings. Our factory provides fair prices, reliable
              support and expert leaf processing so that every harvest gets the care it deserves.
            </p>
          </article>

          <article ref={(el) => textRefs.current.push(el)} className="mb-8 opacity-0">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To preserve the heritage of Sri Lankan tea while supporting the livelihoods of the community.
              We’re committed to sustainable farming practices, transparent partnerships with pickers, and
              consistent quality from pluck to cup.
            </p>
          </article>

          <article ref={(el) => textRefs.current.push(el)} className="mb-8 opacity-0">
            <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
            <ul className="list-disc pl-6 text-gray-700 text-lg leading-relaxed">
              <li>Fairness: fair prices and respectful partnerships with tea pluckers.</li>
              <li>Quality: careful processing and quality control to honour each harvest.</li>
              <li>Community: investing in local livelihoods and preserving traditional knowledge.</li>
              <li>Sustainability: responsible practices to protect the land for future generations.</li>
            </ul>
          </article>


          

          <div ref={(el) => textRefs.current.push(el)} className="mt-6 opacity-0">
            <a
              href="/contact"
              className="inline-block font-semibold bg-green-400 px-6 py-2 border border-black rounded hover:bg-black hover:text-white transition"
            >
              Connect With Us
            </a>
          </div>
        </div>

        {/* RIGHT: Animation */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md">
            <Lottie animationData={teaLeavesAnimation} loop={true} />
          </div>
        </div>
      </div>

              {/* PHOTO SECTION */}
          <div
            ref={(el) => textRefs.current.push(el)}
            className="md:grid-cols-2 gap-6 mb-8 opacity-0 w-full grid"
          >
            <img
              src="/tea-factory.jpeg"
              alt="Tea factory"
              className="w-full h-100 object-cover rounded-lg shadow-md"
            />
            <img
              src="/tea-field.jpg"
              alt="Tea processing"
              className="w-full h-100 object-cover rounded-lg shadow-md"
            />
          </div>

          <article ref={(el) => textRefs.current.push(el)} className="mb-8 opacity-0">
            <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Single-estate Ceylon teas, small-batch blends, and supportive sourcing for independent pluckers.
              Every batch is handled with care so we can deliver a bright, clean cup that reflects the terroir
              and the hands that harvested it.
            </p>
          </article>

      {/* MAP SECTION
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Locate us on the map</h2>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <MapComponent />
        </div>
      </div> */}

      {/* FOOTER CTA */}
      <div ref={(el) => textRefs.current.push(el)} className="text-center mt-12 opacity-0">
        <p className="text-gray-700 text-lg mb-4">
          Ready to taste Maleesha? Discover our teas, meet our community and experience the heart of Ceylon.
        </p>
        <a href="/shop" className="inline-block font-semibold px-6 py-2 border bg-green-400 border-black rounded hover:bg-black hover:text-white transition">Visit Us</a>
      </div>
    </section>
  );
}
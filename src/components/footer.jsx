import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white px-8 py-6 flex flex-col md:flex-row justify-between items-center">
      
      {/* Contact Info */}
      <div className="text-left mb-6 md:mb-0">
        <h3 className="text-2xl font-bold mb-4">Evergreen Tea Factory</h3>
        <div className="text-sm space-y-1">
          <div><strong>Email:</strong> brewopsTea@gmail.com</div>
          <div><strong>Phone:</strong> +94711738453</div>
          <div><strong>Location:</strong> Maleesha Tea Factory, Omattha road, Agalawattha, Mathugama, Sri Lanka</div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="text-center md:text-right">
        <h1 className="text-3xl font-bold tracking-wider">BrewOps</h1>
      </div>
    </footer>
  );
};

export default Footer;

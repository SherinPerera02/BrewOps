import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-950/70 bg-opacity-50 shadow-lg sticky justify-center items-center top-0 z-50">
      <div className="flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-white tracking-wide transition-transform duration-300 cursor-pointer">
          BrewOps
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center items-center flex-grow space-x-16 text-white font-medium">
            

          <Link
            to="/"
            className="hover:text-black transition-colors duration-300"
          >
            Home
          </Link>
          <a
            href="#who-we-are"
            className="hover:text-black transition-colors duration-300"
          >
            About
          </a>
          <Link
            to="/Service"
            className="hover:text-black transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            to="/ContactUs"
            className="hover:text-black transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-colors duration-300"
          >
            Log In
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="flex flex-col items-center md:hidden bg-green-700 text-white space-y-4 py-4 animate-fadeIn">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <a href="#who-we-are" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <Link to="/Service" onClick={() => setMenuOpen(false)}>
            Services
          </Link>
          <Link to="/ContactUs" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link
            to="/login"
            className="bg-black px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
            onClick={() => setMenuOpen(false)}
          >
            Log In
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavigationBar;

import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav className="bg-green-600 px-6 py-4 flex justify-between items-center shadow-md">
            {/* Logo and Title */}
            <div className="flex items-center">
                <h1 className="text-white text-3xl font-bold">BrewOps</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6">
                <Link to="/" className="text-white text-lg hover:text-green-900 transition">Home</Link>
                <Link to="/AboutUs" className="text-white text-lg hover:text-green-900 transition">About</Link>
                <Link to="/Service" className="text-white text-lg hover:text-green-900 transition">Services</Link>
                <Link to="/ContactUs" className="text-white text-lg hover:text-green-900 transition">Contact</Link>
            </div>
        </nav>
    );
};

export default NavigationBar;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          <div className="text-center md:text-left">
          <img
              src="/logo.png"
              alt="Logo"
              className="py-3 h-40 w-auto"
            />
            <h2 className="text-2xl font-bold">TravelNEPAL</h2>
            <p className="mt-2">Discover the beauty of Nepal</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-gray-300">Terms and Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} TravelNEPAL. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
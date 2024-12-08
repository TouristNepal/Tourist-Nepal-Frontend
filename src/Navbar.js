import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaSignInAlt, FaUserPlus, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  // Check if user details are in cookies on component mount (page refresh)
  useEffect(() => {
    const user = Cookies.get('userDetails');
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    onLogout();
    setSidebarOpen(false);
    Cookies.remove('userDetails'); // Remove user details from cookies
    setUserDetails(null); // Reset user details in state
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full bg-white shadow-lg z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Mobile Hamburger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSidebar}
          className="text-gray-600 md:hidden"
        >
          <FaBars size={24} />
        </motion.button>

        {/* Logo */}
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="text-2xl font-bold text-gray-600 flex-grow text-center"
        >
          <Link to="/">TravelNEPAL</Link>
        </motion.h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {userDetails ? (
            <>
              <div className="relative">
                <img
                  src={userDetails?.profileImage?.url || '/default-profile.png'}
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer border border-gray-300"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40">
                    <ul className="py-2 text-gray-600">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate('/profile')}
                      >
                        Profile
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-orange-500 transition duration-300">
                Login
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-orange-500 transition duration-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-200 z-20 text-gray-800 shadow-md p-4 ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={toggleSidebar} className="text-gray-600">
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="space-y-4">
          {userDetails ? (
            <>
              <li>
                <Link to="/profile" className="flex items-center space-x-3" onClick={toggleSidebar}>
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                  onClick={toggleSidebar}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="flex items-center space-x-2" onClick={toggleSidebar}>
                  <FaSignInAlt /> <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/signup" className="flex items-center space-x-2" onClick={toggleSidebar}>
                  <FaUserPlus /> <span>Sign Up</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </motion.div>

      {/* Overlay for Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </motion.nav>
  );
};

export default Navbar;

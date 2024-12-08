import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaSignInAlt, FaUserPlus, FaTimes, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch user details from cookies
  useEffect(() => {
    const user = Cookies.get('userDetails');
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    onLogout();
    Cookies.remove('userDetails');
    setUserDetails(null);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full bg-white shadow-lg z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Mobile Hamburger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSidebar}
          className="text-gray-600 md:hidden"
        >
          <FaBars size={24} />
        </motion.button>

        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-600">
          <Link to="/">TravelNEPAL</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center border-2 border-gray-300 rounded-full px-4 py-2 shadow-inner"
          >
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-gray-600 w-full"
            />
          </form>
          <Link to="/post" className="text-gray-600 hover:text-orange-500 transition duration-300">
            Posts
          </Link>
          {userDetails ? (
            <div className="relative">
              <img
                src={userDetails.user.profileImage}
                alt={userDetails.user.name || 'Profile'}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
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
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-orange-500 transition">
                Login
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-orange-500 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Sidebar */}
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
          <li>
            <Link to="/posts" onClick={toggleSidebar}>
              Posts
            </Link>
          </li>
          {userDetails ? (
            <>
              <li>
                <Link to="/profile" onClick={toggleSidebar}>
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleSidebar}>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={toggleSidebar}>
                  <FaUserPlus /> Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </motion.div>

      {/* Overlay */}
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

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import Body from './home/Body';
import Login from './auth/Login';
import SignUp from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';
import Footer from './Footer';
import Profile from './UserProfile'; // Import the Profile component
import CreatePost from './CreatePost';
import PostList from './PostList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove('token'); // Remove the token when logging out
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="container mx-auto px-4 pt-2 flex-grow mb-12">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} /> {/* Add profile route */}
            <Route path="/post" element={<CreatePost/>} />
            <Route path="/posts" element={<PostList/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

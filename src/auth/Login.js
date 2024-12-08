import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('https://tourist-guide-app.onrender.com/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Response Data:', data);
  
        // Save the full response object to cookies as a JSON string
        Cookies.set('userDetails', JSON.stringify(data), { expires: 7 });
  
        // Notify the user (optional) and navigate
        onLogin();
        navigate('/');
      } else {
        setError(data.message || 'Invalid login credentials');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-3 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </a>
          </p>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-blue-500 hover:underline mt-2"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

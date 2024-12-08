import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await axios.post(
        'https://tourist-guide-app.onrender.com/api/forgot-password',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check the response data
      console.log('Response Data:', res.data); // Debug log to inspect the response data

      if (res.data.status === 'ok') {
        setMessage(res.data.message || 'If the email is registered, a reset link has been sent to your email address.');
      } else if (res.data.status === 'User not available') {
        setError('Email not found. Please make sure you entered the correct email address.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      console.log('Error Response:', err.response); // Log the error response

      if (err.response) {
        setError(
          err.response.data?.message ||
            err.response.data?.status ||
            `Error: ${err.response.status} - ${err.response.statusText}`
        );
      } else if (err.request) {
        setError('Unable to connect to the server. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-96" onSubmit={handleForgotPassword}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>

        {/* Display success or error messages */}
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center bg-blue-600 text-white p-3 rounded ${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
          } transition duration-300`}
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

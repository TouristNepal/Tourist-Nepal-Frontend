import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'; // Use the named import for jwt-decode

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Retrieve user details from cookies
    const userData = Cookies.get('userDetails');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserDetails(parsedData);

      // Decode the JWT token to check if the user is an admin
      if (parsedData.token) {
        try {
          const decodedToken = jwtDecode(parsedData.token); // Decode the JWT token

          // Access the 'isAdmin' field from the decoded token
          setIsAdmin(decodedToken.isAdmin); // Set isAdmin based on the decoded token's payload
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }, []);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-20">
      <div className="flex flex-col items-center mb-6">
        {/* Profile Image */}
        <img
          src={userDetails.profileImage?.url}
          alt={userDetails.profileImage?.altText || 'Profile image'}
          className="w-32 h-32 rounded-full shadow-xl mb-6 transition-transform transform hover:scale-110"
        />
        {/* User's Name */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">{userDetails.name}</h2>
        {/* User's Email */}
        <p className="text-gray-600 text-sm">{userDetails.email}</p>
      </div>

      {/* User Role */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <span className="text-gray-500 font-medium">Role:</span>
          <span className="text-gray-800">{isAdmin ? 'Admin' : 'User'}</span>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-10 text-center">
        <button className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
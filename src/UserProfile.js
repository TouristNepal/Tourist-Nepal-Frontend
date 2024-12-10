import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Retrieve user details from cookies
    const userData = Cookies.get("userDetails");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserDetails(parsedData);

        // Decode JWT token manually
        if (parsedData.token) {
          const tokenParts = parsedData.token.split(".");
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            setIsAdmin(payload.isAdmin || false); // Extract isAdmin status
          } else {
            console.error("Invalid JWT token structure");
          }
        }
      } catch (error) {
        console.error("Error parsing user data or decoding token:", error);
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
          src={userDetails.user.profileImage}
          alt={userDetails.user.name || "Profile Image"}
          className="w-32 h-32 rounded-full shadow-xl mb-6 transition-transform transform hover:scale-110"
        />
        {/* User's Name */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">{userDetails.user.name}</h2>
        {/* User's Email */}
        <p className="text-gray-600 text-sm">{userDetails.user.email}</p>
      </div>

      {/* User Role */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <span className="text-gray-500 font-medium">Role:</span>
          <span className="text-gray-800">{isAdmin ? "Admin" : "User"}</span>
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

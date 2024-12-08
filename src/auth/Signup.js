import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaRegUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "Sudikshya Ojha",
    email: "sudikshyaa40@gmail.com",
    password: "1111",
    phone: "+977 enter your phone number",
    bio: "enter your bio",
    img: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.fullname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("bio", formData.bio);
    if (formData.img) {
      formDataToSend.append("img", formData.img);
    }

    try {
      const response = await axios.post("https://tourist-guide-app.onrender.com/api/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <FaUser className="text-gray-500 ml-3" />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              className="w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <FaEnvelope className="text-gray-500 ml-3" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-md relative">
            <FaLock className="text-gray-500 ml-3" />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 text-gray-500 focus:outline-none"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <FaPhone className="text-gray-500 ml-3" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              required
              className="w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Bio */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <FaRegUserCircle className="text-gray-500 ml-3" />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              required
              className="w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Profile Image */}
          <div>
            <label htmlFor="img" className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              name="img"
              id="img"
              onChange={handleFileChange}
              className="w-full p-3 mt-4 border border-gray-300 rounded-md"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-200 text-red-800 rounded-md">
          <p>{errorMessage}</p>
        </div>
      )}
      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 p-3 bg-green-200 text-green-800 rounded-md">
          <p>{successMessage}</p>
        </div>
      )}
      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Registration Successful!</h3>
            <p>Please verify your email to complete the registration process.</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

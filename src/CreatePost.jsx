import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = [
  "Hotels",
  "Restaurants",
  "Destinations",
  "Attractions",
  "Services",
];

const defaultPost = {
  title: "Explore the Ancient City of Bhaktapur",
  category: "Restaurants",
  content:
    "Bhaktapur, also known as Bhadgaon, is one of the most beautiful cultural cities in Nepal. It is famous for its art, architecture, and historic monuments.",
  imageURL: "https://example.com/images/bhaktapur.jpg",
  description:
    "A detailed guide to exploring Bhaktapur, including its temples, festivals, and traditional lifestyle.",
};

const CreateTouristGuidePost = () => {
  const [formData, setFormData] = useState(defaultPost);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Simulate fetching user details from cookies or storage
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userDetails="))
      ?.split("=")[1];
    if (userCookie) {
      const parsedUserDetails = JSON.parse(decodeURIComponent(userCookie));
      setUserDetails(parsedUserDetails);
    } else {
      setMessage("Please log in to create a post.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userDetails) {
      setMessage("User details not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const { name, email, profileImage, token } = userDetails;

      const postPayload = {
        ...formData,
        createdBy: {
          name,
          email,
          profileImage: profileImage.url,
        },
      };

      const response = await axios.post(
        "http://localhost:8080/api/blog",
        postPayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Post created successfully!");
      setFormData(defaultPost); // Reset the form to default values
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create a Tourist Guide Post</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the title"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Content */}
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Detailed content about the post"
          rows="5"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        ></textarea>

        {/* Image URL */}
        <input
          type="url"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short description"
          rows="3"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreateTouristGuidePost;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaUserAlt, FaCommentAlt } from "react-icons/fa"; // FontAwesome icons

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(
        `https://tourist-guide-app.onrender.com/api/blog/${id}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading post details...</p>
      </div>
    );
  }

  if (!post) {
    return <p className="text-center text-xl text-gray-600">Post not found.</p>;
  }

  return (
    <div className="container mx-auto p-6 md:p-12 mt-20">
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Left Column: Image and Title */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 font-sans">{post.title}</h1>

          {post.imageURL && (
            <img
              src={post.imageURL}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-xl mb-6"
            />
          )}

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              Category
            </h2>
            <p className="text-lg text-gray-700 mt-4">{post.category}</p>
          </div>
        </div>

        {/* Right Column: Description, Content, Rating, Created By, Reviews */}
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
            <p className="text-lg text-gray-700 mt-4">{post.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-gray-800">Content</h2>
            <p className="text-lg text-gray-700 mt-4">{post.content}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <FaStar className="mr-2 text-yellow-500" />
              Rating
            </h2>
            <p className="text-lg text-gray-700 mt-4">Rating: {post.rating} / 5</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <FaUserAlt className="mr-2 text-blue-500" />
              Created By
            </h2>
            <p className="text-lg text-gray-700 mt-4">Email: {post.createdBy.email}</p>
            <p className="text-lg text-gray-700 mt-2">
              Created at: {new Date(post.createdTime).toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <FaCommentAlt className="mr-2 text-green-500" />
              Reviews
            </h2>
            {post.reviews.length === 0 ? (
              <p className="text-lg text-gray-700 mt-4">No reviews yet.</p>
            ) : (
              <ul className="mt-4">
                {post.reviews.map((review, index) => (
                  <li key={index} className="mb-2 text-lg text-gray-700">
                    <p>{review}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

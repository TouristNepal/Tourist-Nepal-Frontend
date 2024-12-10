import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CreatePost from "./CreatePost";

const TouristGuidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://tourist-guide-app.onrender.com/api/blog");
      console.log("Fetched Posts:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading posts...</p>
      </div>
    );
  }

  return (
    <>
      <CreatePost />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Tourist Guide Posts</h1>
        {posts.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post._id}`} // Navigate to post details on click
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                {post.imageURL && (
                  <img
                    src={post.imageURL}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.category}</p>
                  <p className="text-gray-700 mt-4">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TouristGuidePosts;

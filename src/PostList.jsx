import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/blog", {
          withCredentials: true, // Include cookies
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading posts...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">All Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="p-4 border rounded bg-white">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.category}</p>
              <p className="mt-2 text-gray-700">{post.description}</p>
              {post.imageURL && (
                <img
                  src={post.imageURL}
                  alt={post.title}
                  className="mt-2 rounded w-full h-40 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;

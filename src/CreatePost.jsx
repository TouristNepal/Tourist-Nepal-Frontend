import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreatePost = () => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to get token from cookies
  const getTokenFromCookies = () => {
    const userDetails = Cookies.get('userDetails.token'); // 'userDetails' is the cookie key where user data is stored
    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails); // Parse the userDetails string into an object
      return parsedDetails?.token; // Return the token if available
    }
    return null; // Return null if token is not found
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!title || !category || !content || !description) {
      setError('Please fill in all required fields.');
      return;
    }

    // Get the token from cookies
    const token = getTokenFromCookies();
    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      return;
    }

    // Prepare data for the request
    const postData = {
      title,
      category,
      content,
      description,
      imageURL,
    };

    // Set up request headers with token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    // Set loading state to true while the request is being made
    setLoading(true);
    setError(''); // Reset error

    try {
      // Send POST request to create a new tourist guide post
      const response = await axios.post('https://tourist-guide-app.onrender.com/api/blog', postData, config);
      
      // Handle successful response
      console.log('Post created successfully:', response.data);
      alert('Tourist guide post created successfully!');

      // Reset form after success
      setTitle('');
      setCategory('');
      setContent('');
      setDescription('');
      setImageURL('');
    } catch (err) {
      // Handle error response
      console.error('Error creating post:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Set loading to false once the request is done
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Tourist Guide Post</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title</label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block">Category</label>
          <input
            id="category"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block">Content</label>
          <textarea
            id="content"
            className="w-full p-2 border border-gray-300 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="imageURL" className="block">Image URL (Optional)</label>
          <input
            id="imageURL"
            type="url"
            className="w-full p-2 border border-gray-300 rounded"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Creating Post...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

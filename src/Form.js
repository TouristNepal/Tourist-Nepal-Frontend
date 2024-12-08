import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';  // Import close icon from react-icons

const Form = ({ guideName, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Close Icon at the Top Left */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <AiOutlineClose size={24} />
        </button>

        <h3 className="text-xl font-bold mb-4">Hi, I’m {guideName}</h3>
        <p className="mb-4">
          Please fill out your information below so we can chat!
        </p>
        <form>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Preferred Date & Group Size (optional)"
              className="border p-2 rounded-md"
            />
            <textarea
              placeholder="Your Message"
              className="border p-2 rounded-md h-24"
              required
            ></textarea>
            <label className="flex items-center space-x-2">
              <input type="checkbox" required />
              <span>
                Accept <a href="https://en.wikipedia.org/wiki/Terms_of_service" className="text-blue-600 underline">Terms and Conditions</a> and{' '}
                <a href="https://en.wikipedia.org/wiki/Terms_of_service" className="text-blue-600 underline">Privacy Policy</a>.
              </span>
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

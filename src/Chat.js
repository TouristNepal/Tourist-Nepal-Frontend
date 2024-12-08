import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane} from 'react-icons/fa';

const guides = [
  { id: 1, name: 'Ram Bahadur', lastMessage: 'Sure, I can help with that!' },
  { id: 2, name: 'Sita Sharma', lastMessage: 'The weather is great for trekking now.' },
  { id: 3, name: 'Hari Prasad', lastMessage: 'Namaste! How can I assist you?' },
];

const initialMessages = [
  { id: 1, guideId: 1, text: 'Hello! How can I help you with your trip to Nepal?', sender: 'guide', timestamp: '10:00 AM' },
  { id: 2, guideId: 1, text: "Hi! I'm interested in trekking to Everest Base Camp. Can you provide some information?", sender: 'user', timestamp: '10:05 AM' },
];

const Chat = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && selectedGuide) {
      const newMessage = {
        id: messages.length + 1,
        guideId: selectedGuide.id,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      setTimeout(() => {
        const guideResponse = {
          id: messages.length + 2,
          guideId: selectedGuide.id,
          text: `Thank you for your message about ${inputMessage}. I'll get back to you shortly with more information.`,
          sender: 'guide',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prevMessages => [...prevMessages, guideResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Guide list */}
      {(!selectedGuide || !isMobile) && (
        <div className=" rounded-md mt-16 w-full md:w-1/3 bg-white border-r border-gray-300 overflow-y-auto">
          <h2 className="px-4 y-10 text-2xl font-bold bg-gray-600 text-white">Messages</h2>
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              whileHover={{ backgroundColor: '#ebf4ff' }}
              onClick={() => setSelectedGuide(guide)}
              className="p-4 border-b border-gray-300 cursor-pointer hover:bg-blue-50"
            >
              <h3 className="font-bold">{guide.name}</h3>
              <p className="text-sm text-gray-600 truncate">{guide.lastMessage}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Chat area */}
      {selectedGuide && (
        <div className="w-full md:w-2/3 flex flex-col">
          {/* Chat header */}
          <div className="bg-gray-600 text-white p-4 flex items-center">
            <h3 className="text-xl font-bold mt-16">{selectedGuide.name}</h3>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
            {messages
              .filter((msg) => msg.guideId === selectedGuide.id)
              .map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-2xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-gray-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-300">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Aa"
                className="flex-grow p-3 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gray-500 text-white p-3 rounded-r-full"
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;

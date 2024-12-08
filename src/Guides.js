import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Form from './Form'; 

const Guides = () => {
  const [activeTab, setActiveTab] = useState('guides');
  const [showMore, setShowMore] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const tabs = ['guides', 'tours', 'safari'];

  const items = {
    guides: [
      { name: 'priyanka', language: 'Nepali, English', image: '/guide.jpg' },
      { name: 'Sita Sharma', language: 'Nepali, Hindi', image: '/guide.jpg' },
      { name: 'Hari Prasad', language: 'Nepali, English', image: '/guide.jpg' },
      { name: 'Laxmi Tamang', language: 'Nepali, French', image: '/guide.jpg' },
      { name: 'Bishnu Thapa', language: 'Nepali, Chinese', image: '/guide.jpg' },
      { name: 'Saraswati Rana', language: 'Nepali, Japanese', image: '/guide.jpg' },
      { name: 'Gopal Gurung', language: 'Nepali, Hindi', image: '/guide.jpg' },
      { name: 'Anita Magar', language: 'Nepali, English', image: '/guide.jpg' },
      { name: 'Prakash Shrestha', language: 'Nepali, French', image: '/guide.jpg' },
      { name: 'Rita KC', language: 'Nepali, English', image: '/guide.jpg' },
      { name: 'Krishna Bhandari', language: 'Nepali, Hindi', image: '/guide.jpg' },
      { name: 'Maya Raut', language: 'Nepali, Spanish', image: '/guide.jpg' },
    ],
    tours: [
      { name: 'Everest Base Camp Trek', duration: '14 days', image: '/ebc.jpg' },
      { name: 'Annapurna Circuit', duration: '21 days', image: '/abc.jpg' },
      { name: 'Kathmandu Valley Tour', duration: '5 days', image: '/kathmandu.jpg' },
      { name: 'Pokhara Leisure Trip', duration: '7 days', image: '/pokhara.jpg' },
    ],
    safari: [
      { name: 'Chitwan National Park Safari', duration: '3 days', image: '/cnp.jpg' },
      { name: 'Dhorpatan Hunting Reserve', duration: '7 days', image: '/dhr.jpg' },
      { name: 'Koshi Tappu Wildlife Reserve', duration: '2 days', image: '/ktwr.jpg' },
      { name: 'Bardia National Park Safari', duration: '4 days', image: '/bnp.jpeg' },
    ],
  };

  const visibleItems = activeTab === 'guides' && !showMore ? items[activeTab].slice(0, 8) : items[activeTab];

  const openForm = (guide) => {
    setSelectedGuide(guide);
    setIsFormOpen(true); 
  };

  const closeForm = () => {
    setIsFormOpen(false); 
    setSelectedGuide(null); 
  };

  return (
    <div className="my-20">
      {isFormOpen && <Form guideName={selectedGuide.name} onClose={closeForm} />}

      <div className="flex justify-center space-x-4 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowMore(false);
            }}
            className={`px-6 py-2 rounded-md ${
              activeTab === tab
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleItems.map((item, index) => (
          <div key={item.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <img
              src={process.env.PUBLIC_URL + item.image}
              alt={item.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600">
              {activeTab === 'guides' ? item.language : `Duration: ${item.duration}`}
            </p>
            {activeTab === 'guides' && (
              <motion.button
                onClick={() => openForm(item)} 
                className=" text-gray-800 outline outline-1 outline-gray-400 px-3 py-2 w-full rounded-xl flex items-center mt-2"
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)', scale: 1.03 }}
              >
                <img src="/message.png.png" alt="message icon" className="w-4 h-4 mr-2" />
                Message
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {activeTab === 'guides' && (
        <div className="mt-8 text-center">
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className="bg-gray-800 text-white px-6 py-2 rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: showMore ? 0.95 : 1 }}
          >
            {showMore ? 'View Less' : 'View More'}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Guides;

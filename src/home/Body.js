import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Body = () => {
  const [searchType, setSearchType] = useState('guides');
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const trendingPlaces = [
    {
      name: 'Kathmandu',
      image: '/kathmandu.jpg',
      description: "Kathmandu is the Capital of Nepal also known for its temples",
    },
    {
      name: 'Pokhara',
      image: '/pokhara.jpg',
      description: "Pokhara is the gateway to most of the trekking destinations of Nepal and also known for its lakes.",
    },
    {
      name: 'Chitwan',
      image: '/cnp.jpg',
      description: 'Home to the famous Chitwan National Park and wildlife safaris.',
    },
    {
      name: 'Everest Base Camp',
      image: '/ebc.jpg',
      description: "A trekker's paradise at the base of the world's highest peak.",
    },
    {
      name: 'Annapurna Base Camp',
      image: '/abc.jpg',
      description: 'The Annapurna circuit offers amazing views and trekking experiences.',
    },
  ];

  const images = [...Array(18).keys()].map(i => `/${i + 1}.jpg`);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const direction = 1;

  const handlePrevPlace = () => {
    setCurrentPlaceIndex((prevIndex) =>
      prevIndex === 0 ? trendingPlaces.length - 1 : prevIndex - 1
    );
  };

  const handleNextPlace = () => {
    setCurrentPlaceIndex((prevIndex) =>
      (prevIndex + 1) % trendingPlaces.length
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-20 md:px-8 mx-auto">
      <div className="relative w-full md:w-1/2 mb-10 md:mb-0 overflow-hidden">
        <div className="relative w-full h-[400px] md:h-[600px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Nepal Landscape"
              className="absolute w-full h-full object-cover rounded-lg shadow-lg"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8 }}
              custom={direction}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:pl-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeInOut' }}
          className="bg-white my-2 p-4 rounded-lg shadow-md"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {['guides', 'tours', 'safari'].map((type) => (
              <motion.button
                key={type}
                onClick={() => setSearchType(type)}
                className={`px-4 py-2 rounded-md ${
                  searchType === type
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </div>
          <input
            type="text"
            placeholder={`Search for ${searchType} in Nepal...`}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button className="mt-4 w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
            Search
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: 'easeInOut' }}
          className="mt-10 w-full"
        >
          <h3 className="text-2xl font-bold mb-8">Recommended Places</h3>
          <div className="relative flex items-center justify-center">
            <motion.button
              onClick={handlePrevPlace}
              whileHover={{ scale: 1.2 }}
              className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center z-10"
            >
              <img src="right.png" alt="Previous" className="w-full h-full object-contain" />
            </motion.button>

            <div className="flex-shrink-0 w-full max-w-[500px] bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row h-[300px] md:h-[200px]">
                <div className="w-full md:w-1/2 h-1/2 md:h-full">
                  <img
                    src={trendingPlaces[currentPlaceIndex].image}
                    alt={trendingPlaces[currentPlaceIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto">
                  <h4 className="text-xl font-semibold mb-2">
                    {trendingPlaces[currentPlaceIndex].name}
                  </h4>
                  <p className="text-sm">{trendingPlaces[currentPlaceIndex].description}</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleNextPlace}
              whileHover={{ scale: 1.2 }}
              className="absolute right-0 w-8 h-8 rounded-full flex items-center justify-center z-10"
            >
              <img src="left.png" alt="Next" className="w-full h-full object-contain" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Body;
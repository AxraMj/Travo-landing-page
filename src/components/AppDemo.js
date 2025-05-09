import React, { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import welcomeScreen from '../assets/screenshots/welcome screen.png';
import homeScreen from '../assets/screenshots/home screen.png';
import locationScreen from '../assets/screenshots/location.png';

const screenshots = [welcomeScreen, homeScreen, locationScreen];

export default function AppDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="w-full py-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">App Preview</h2>
          <p className="text-gray-300">Take a look at our beautiful and intuitive interface</p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous screenshot"
          >
            <IoChevronBack size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next screenshot"
          >
            <IoChevronForward size={20} />
          </button>

          {/* Screenshot Display */}
          <div className="relative overflow-hidden rounded-xl shadow-lg w-[280px] mx-auto">
            <div className="relative aspect-[9/16]">
              <img
                src={screenshots[currentIndex]}
                alt="App screenshot"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-4 gap-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 w-4' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
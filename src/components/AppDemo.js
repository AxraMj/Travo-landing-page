import React, { useState, useEffect, useRef } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import welcomeScreen from '../assets/screenshots/welcome screen.png';
import homeScreen from '../assets/screenshots/home screen.png';
import locationScreen from '../assets/screenshots/location.png';
import GalaxyDotsBackground from './GalaxyDotsBackground';
import gsap from 'gsap';

const screenshots = [welcomeScreen, homeScreen, locationScreen];

export default function AppDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenshotRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    // Animate the screenshot container
    gsap.fromTo(screenshotRef.current,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      }
    );

    // Animate navigation buttons
    gsap.fromTo([prevButtonRef.current, nextButtonRef.current],
      {
        opacity: 0,
        x: (index) => index === 0 ? -20 : 20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, []);

  const nextSlide = () => {
    gsap.to(screenshotRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex((prevIndex) => 
          prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
        );
        gsap.to(screenshotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      }
    });
  };

  const prevSlide = () => {
    gsap.to(screenshotRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
        );
        gsap.to(screenshotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      }
    });
  };

  return (
    <section className="relative w-full py-8 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <GalaxyDotsBackground />
      <div className="max-w-xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">App Preview</h2>
          <p className="text-gray-300">Take a look at our beautiful and intuitive interface</p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            ref={prevButtonRef}
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous screenshot"
          >
            <IoChevronBack size={20} />
          </button>
          
          <button
            ref={nextButtonRef}
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next screenshot"
          >
            <IoChevronForward size={20} />
          </button>

          {/* Screenshot Display */}
          <div ref={screenshotRef} className="relative overflow-hidden rounded-xl shadow-lg w-[280px] mx-auto">
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
                onClick={() => {
                  if (index !== currentIndex) {
                    gsap.to(screenshotRef.current, {
                      opacity: 0,
                      scale: 0.95,
                      duration: 0.3,
                      onComplete: () => {
                        setCurrentIndex(index);
                        gsap.to(screenshotRef.current, {
                          opacity: 1,
                          scale: 1,
                          duration: 0.3
                        });
                      }
                    });
                  }
                }}
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
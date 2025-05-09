import React, { useState, useEffect } from 'react';
import worldMap from '../assets/worldMap.jpg';

const pins = [
  { top: '18%', left: '28%', visibleBreakpoint: 'md' }, // North America
  { top: '22%', left: '55%', visibleBreakpoint: 'sm' }, // Europe
  { top: '38%', left: '70%', visibleBreakpoint: 'xs' }, // Asia - visible on all devices
  { top: '65%', left: '35%', visibleBreakpoint: 'xs' }, // South America - visible on all devices
  { top: '60%', left: '50%', visibleBreakpoint: 'lg' }, // Africa
  { top: '80%', left: '80%', visibleBreakpoint: 'md' }, // Australia
];

export default function HeroSection() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine breakpoints
  const isXs = windowWidth > 0;
  const isSm = windowWidth >= 640;
  const isMd = windowWidth >= 768;
  const isLg = windowWidth >= 1024;
  
  // Filter pins based on screen size - showing more pins on large screens
  const visiblePins = pins.filter(pin => {
    if (windowWidth >= 1280) return true; // Show all pins on xl screens and above
    if (pin.visibleBreakpoint === 'xs') return true;
    if (pin.visibleBreakpoint === 'sm' && isSm) return true;
    if (pin.visibleBreakpoint === 'md' && isMd) return true;
    if (pin.visibleBreakpoint === 'lg' && isLg) return true;
    return false;
  });

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Map Background with better responsive handling */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-105 opacity-0 animate-zoom"
        style={{ backgroundImage: `url(${worldMap})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 sm:h-1/3 z-20 pointer-events-none bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
      
      {/* Glowing Pins with responsive sizing */}
      {visiblePins.map((pin, idx) => (
        <span
          key={idx}
          className="absolute z-20 flex flex-col items-center opacity-0 animate-fadeIn"
          style={{ 
            top: pin.top, 
            left: pin.left, 
            transform: 'translate(-50%, -50%)',
            animationDelay: `${0.2 + idx * 0.15}s`
          }}
        >
          <span className="w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-400/80 animate-pulse">
            <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 bg-white rounded-full opacity-90" />
          </span>
        </span>
      ))}
      
      {/* Text Content with better responsive scaling */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 sm:px-8 md:px-12 py-8 sm:py-12 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <h1 className="text-white font-extrabold uppercase text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl drop-shadow-2xl mb-4 xs:mb-5 sm:mb-8 lg:mb-10 tracking-tight opacity-0 animate-fadeIn leading-tight" style={{ animationDelay: '0.4s' }}>
          WHERE TRAVEL<br className="md:hidden" />{' '}
          <span className="md:inline">MEETS SOCIAL</span>
        </h1>
        
        <blockquote 
          className="text-white italic text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl opacity-0 animate-fadeIn mt-3 xs:mt-4 md:mt-6 lg:mt-8 opacity-90 border-l-2 sm:border-l-4 border-blue-400 pl-3 sm:pl-4 md:pl-6 lg:pl-8 mx-auto" 
          style={{ 
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', Times, serif", 
            fontStyle: 'italic',
            animationDelay: '0.7s'
          }}
        >
          "Imagine discovering your next adventure through real travelers—not ads"
        </blockquote>
        
        {/* CTA Button - Added for better UX/conversion */}
        <button 
          className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 xs:py-3 px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 rounded-full text-sm xs:text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl transition-all duration-300 transform hover:scale-105 opacity-0 animate-fadeIn shadow-lg shadow-orange-500/20"
          style={{ animationDelay: '1s' }}
        >
          Start Exploring
        </button>
      </div>
      
      {/* Animations with Tailwind classes */}
        <style>{`
        @keyframes zoom {
          0% { transform: scale(1.08); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-zoom {
          animation: zoom 1.5s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        /* Adding a custom breakpoint for extra-small devices */
        @media (min-width: 480px) {
          .xs\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
          .xs\\:mb-5 { margin-bottom: 1.25rem; }
          .xs\\:mt-4 { margin-top: 1rem; }
          .xs\\:max-w-sm { max-width: 24rem; }
          .xs\\:w-4 { width: 1rem; }
          .xs\\:h-4 { height: 1rem; }
          .xs\\:w-2 { width: 0.5rem; }
          .xs\\:h-2 { height: 0.5rem; }
          .xs\\:py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
          .xs\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
        }
      `}</style>
    </section>
  );
}
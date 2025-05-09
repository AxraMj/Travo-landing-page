import React from 'react';
import worldMap from '../assets/worldMap.jpg';

const pins = [
  { top: '18%', left: '28%', mobile: false }, // North America
  { top: '22%', left: '55%', mobile: false }, // Europe
  { top: '38%', left: '70%', mobile: true }, // Asia
  { top: '65%', left: '35%', mobile: true }, // South America
  { top: '60%', left: '50%', mobile: false }, // Africa
  { top: '80%', left: '80%', mobile: false }, // Australia
];

export default function HeroSection() {
  // Detect mobile
  const isMobile = window.innerWidth < 640;
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden animate-zoom-fade"
      style={{ backgroundImage: `url(${worldMap})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 z-20 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      {/* Glowing Pins */}
      {pins.filter(pin => !isMobile || pin.mobile).map((pin, idx) => (
        <span
          key={idx}
          className="absolute z-20 flex flex-col items-center animate-fade-in"
          style={{ top: pin.top, left: pin.left, transform: 'translate(-50%, -50%)' }}
        >
          <span className="w-5 h-5 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-400/80 animate-pulse">
            <span className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-white rounded-full opacity-90" />
          </span>
        </span>
      ))}
      {/* Text Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 sm:px-8 md:px-12 py-12 w-full max-w-2xl sm:max-w-4xl">
        <h1 className="text-white font-extrabold uppercase text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl mb-6 sm:mb-10 tracking-tight animate-fade-in delay-200 leading-tight break-words">
          WHERE TRAVEL<br />MEETS SOCIAL
        </h1>
        <blockquote className="text-white italic font-playfair text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-2xl animate-fade-in delay-400 mt-6 md:mt-8 opacity-90 mx-auto leading-tight">
          "Imagine discovering your next adventure through real travelers—not ads"
        </blockquote>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes zoom-fade {
          0% { transform: scale(1.08); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-fade {
          animation: zoom-fade 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
} 
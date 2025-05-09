import React, { useState, useEffect, useRef } from 'react';
import worldMap from '../assets/worldMap.jpg';
import gsap from 'gsap';

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
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const titleRef = useRef(null);
  const quoteRef = useRef(null);
  const buttonRef = useRef(null);
  const pinsRef = useRef([]);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // GSAP Animation Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Map zoom animation
    tl.fromTo(mapRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5 }
    );

    // Title animation
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=1"
    );

    // Quote animation
    tl.fromTo(quoteRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 0.9, duration: 1 },
      "-=0.8"
    );

    // Button animation
    tl.fromTo(buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );

    // Pins animation
    pinsRef.current.forEach((pin, index) => {
      tl.fromTo(pin,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.3"
      );
    });

  }, []);

  // Determine breakpoints
  const isXs = windowWidth > 0;
  const isSm = windowWidth >= 640;
  const isMd = windowWidth >= 768;
  const isLg = windowWidth >= 1024;
  
  // Filter pins based on screen size
  const visiblePins = pins.filter(pin => {
    if (windowWidth >= 1280) return true;
    if (pin.visibleBreakpoint === 'xs') return true;
    if (pin.visibleBreakpoint === 'sm' && isSm) return true;
    if (pin.visibleBreakpoint === 'md' && isMd) return true;
    if (pin.visibleBreakpoint === 'lg' && isLg) return true;
    return false;
  });

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Map Background */}
      <div 
        ref={mapRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${worldMap})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 sm:h-1/3 z-20 pointer-events-none bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
      
      {/* Glowing Pins */}
      {visiblePins.map((pin, idx) => (
        <span
          key={idx}
          ref={el => pinsRef.current[idx] = el}
          className="absolute z-20 flex flex-col items-center"
          style={{ 
            top: pin.top, 
            left: pin.left, 
            transform: 'translate(-50%, -50%)'
          }}
        >
          <span className="w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-400/80">
            <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-white rounded-full opacity-90" />
          </span>
        </span>
      ))}
      
      {/* Text Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 sm:px-8 md:px-12 py-8 sm:py-12 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <h1 ref={titleRef} className="text-white font-extrabold uppercase text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl drop-shadow-2xl mb-4 xs:mb-5 sm:mb-8 lg:mb-10 tracking-tight leading-tight">
          TRAVO
        </h1>
        
        <blockquote 
          ref={quoteRef}
          className="text-white italic text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mt-3 xs:mt-4 md:mt-6 lg:mt-8 border-l-2 sm:border-l-4 border-blue-400 pl-3 sm:pl-4 md:pl-6 lg:pl-8 mx-auto" 
          style={{ 
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', Times, serif", 
            fontStyle: 'italic'
          }}
        >
          "Imagine discovering your next adventure through real travelers—not ads"
        </blockquote>
        
        {/* CTA Button */}
        <button 
          ref={buttonRef}
          className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 xs:py-2 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 rounded-full text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/20"
          onClick={() => {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Start Exploring
        </button>
      </div>
    </section>
  );
}
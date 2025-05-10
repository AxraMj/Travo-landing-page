import React, { useEffect, useRef } from 'react';
import { SiMongodb, SiExpress, SiReact, SiExpo } from 'react-icons/si';
import { FaTv } from 'react-icons/fa';
import GalaxyDotsBackground from './GalaxyDotsBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const techStackRef = useRef(null);
  const techItemsRef = useRef([]);

  useEffect(() => {
    const techItems = techItemsRef.current;
    
    gsap.fromTo(techItems,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: techStackRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div ref={techStackRef} className="relative flex items-center justify-center w-full py-8 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <GalaxyDotsBackground />
      <div className="flex flex-wrap justify-center gap-6 px-6 py-4 rounded-xl backdrop-blur-md shadow-md border border-white border-opacity-10 sm:px-8 md:gap-8">
        <div ref={el => techItemsRef.current[0] = el} className="flex items-center gap-3 text-slate-200">
          <SiMongodb className="text-green-400" size={28} />
          <span className="font-medium text-lg">mongoDB</span>
        </div>
        <div ref={el => techItemsRef.current[1] = el} className="flex items-center gap-3 text-slate-200">
          <SiExpress className="text-gray-400" size={28} />
          <span className="font-medium text-lg">express</span>
        </div>
        <div ref={el => techItemsRef.current[2] = el} className="flex items-center gap-3 text-slate-200">
          <SiReact className="text-cyan-400" size={28} />
          <span className="font-medium text-lg">React Native</span>
        </div>
        <div ref={el => techItemsRef.current[3] = el} className="flex items-center gap-3 text-slate-200">
          <SiExpo className="text-indigo-300" size={28} />
          <span className="font-medium text-lg">Expo</span>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useRef } from 'react';
import { FaUser, FaRegFileAlt, FaBell, FaMapMarkedAlt, FaRobot } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FaUser size={36} className="text-blue-400" />,
    title: 'Authentication & User Profiles',
    description: 'Secure sign-in, personalized profiles, and account management for every traveler.'
  },
  {
    icon: <FaRegFileAlt size={36} className="text-green-400" />,
    title: 'Guide & Post Creation',
    description: 'Easily create, edit, and share travel guides and posts with the community.'
  },
  {
    icon: <FaBell size={36} className="text-yellow-400" />,
    title: 'Real-Time Notifications & Social Features',
    description: 'Stay updated with instant notifications, likes, comments, and follows.'
  },
  {
    icon: <FaMapMarkedAlt size={36} className="text-pink-400" />,
    title: 'Interactive Map & Location Discovery',
    description: 'Explore destinations and discover new places with our interactive world map.'
  },
  {
    icon: <FaRobot size={36} className="text-purple-400" />,
    title: 'AI-powered Recommendations',
    description: 'Get smart suggestions for trips, guides, and friends using advanced AI.'
  },
];

export default function FeatureHighlights() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards animation
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="features" className="w-full bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 flex flex-col items-center">
      <h2 ref={titleRef} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center drop-shadow-lg">
        Feature Highlights
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {features.map((feature, idx) => (
          <div
            key={idx}
            ref={el => cardsRef.current[idx] = el}
            className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-xl border border-gray-700 p-8 flex flex-col items-center text-center transition-all hover:scale-105 hover:shadow-blue-400/60 duration-300 mx-auto w-full"
          >
            <div className="mb-4 bg-gray-800 p-3 rounded-full">{feature.icon}</div>
            <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-200 text-sm sm:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
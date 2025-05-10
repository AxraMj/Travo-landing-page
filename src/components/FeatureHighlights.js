import React, { useEffect, useRef } from 'react';
import { FaUser, FaRegFileAlt, FaBell, FaMapMarkedAlt, FaRobot } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GalaxyDotsBackground from './GalaxyDotsBackground';

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
  const iconsRef = useRef([]);
  const eventListenersRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const icons = iconsRef.current;
    
    // Title animation with a nice reveal effect
    gsap.fromTo(titleRef.current,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards animation with a staggered effect
    cards.forEach((card, index) => {
      if (!card) return;

      // Initial card animation
      gsap.fromTo(card,
        { 
          y: 100, 
          opacity: 0,
          rotationX: 15,
          transformOrigin: "center center"
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Icon animation
      if (icons[index]) {
        gsap.fromTo(icons[index],
          {
            scale: 0,
            rotation: -180,
            opacity: 0
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Hover animation handlers
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
        });
        if (icons[index]) {
          gsap.to(icons[index], {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 0 0px rgba(59, 130, 246, 0)"
        });
        if (icons[index]) {
          gsap.to(icons[index], {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };

      // Add event listeners
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Store event listeners for cleanup
      eventListenersRef.current.push({
        element: card,
        handlers: {
          mouseenter: handleMouseEnter,
          mouseleave: handleMouseLeave
        }
      });
    });

    // Cleanup function
    return () => {
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Cleanup event listeners
      eventListenersRef.current.forEach(({ element, handlers }) => {
        if (element) {
          element.removeEventListener('mouseenter', handlers.mouseenter);
          element.removeEventListener('mouseleave', handlers.mouseleave);
        }
      });
      eventListenersRef.current = [];
    };
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative w-full bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 flex flex-col items-center overflow-hidden">
      <GalaxyDotsBackground />
      <h2 ref={titleRef} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center drop-shadow-lg">
        Feature Highlights
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {features.map((feature, idx) => (
          <div
            key={idx}
            ref={el => cardsRef.current[idx] = el}
            className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-xl border border-gray-700 p-8 flex flex-col items-center text-center transition-all duration-300 mx-auto w-full"
          >
            <div 
              ref={el => iconsRef.current[idx] = el}
              className="mb-4 bg-gray-800 p-3 rounded-full"
            >
              {feature.icon}
            </div>
            <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-200 text-sm sm:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
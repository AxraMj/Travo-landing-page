import './index.css';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import TechStack from './components/TechStack';
import AppDemo from './components/AppDemo';
import DownloadAppSection from './components/DownloadAppSection';
import CollaborationSection from './components/CollaborationSection';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const quoteRef = useRef(null);

  useEffect(() => {
    const quote = quoteRef.current;
    
    gsap.fromTo(quote,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <>
      <HeroSection />
      <FeatureHighlights />
      <TechStack />
      <div className="w-full py-12 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote ref={quoteRef} className="text-center">
            <p className="text-xl sm:text-2xl text-slate-200 italic leading-relaxed" style={{ 
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', Times, serif", 
              fontStyle: 'italic'
            }}>
              "As a traveler and builder, I always struggled to find authentic travel experiences. That inspired me to create Travo…"
            </p>
            <footer className="mt-4 text-slate-400">
              — Axra
            </footer>
          </blockquote>
        </div>
      </div>
      <AppDemo />
      <CollaborationSection/>
      <DownloadAppSection />
    </>
  );
}

export default App;

import './index.css';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import TechStack from './components/TechStack';
import AppDemo from './components/AppDemo';
import DownloadAppSection from './components/DownloadAppSection';

function App() {
  return (
    <>
      <HeroSection />
      <FeatureHighlights />
      <TechStack />
      <div className="w-full py-12 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="text-center">
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
      <DownloadAppSection />
    </>
  );
}

export default App;

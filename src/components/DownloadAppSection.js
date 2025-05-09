import React, { useState } from 'react';
import { 
  FaGooglePlay, FaApple, FaLinkedin 
} from 'react-icons/fa';

export default function SimplifiedFooter() {
  const [showMessage, setShowMessage] = useState(false);
  const [store, setStore] = useState('');

  const handleStoreClick = (storeName) => {
    setStore(storeName);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white">
      {/* Notification */}
      {showMessage && (
        <div className="fixed bottom-4 right-4 px-6 py-3 rounded-lg bg-blue-600 text-white shadow-lg transition-all duration-300 z-50">
          <p>{store} version coming soon!</p>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* App Download Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold mb-6">Download the App</h2>
            <div className="flex gap-6">
              <button
                onClick={() => handleStoreClick('Google Play')}
                className="flex items-center bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-lg transition-colors"
              >
                <FaGooglePlay className="mr-2 text-green-400 text-lg" />
                <span>Play Store</span>
              </button>
              <button
                onClick={() => handleStoreClick('App Store')}
                className="flex items-center bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-lg transition-colors"
              >
                <FaApple className="mr-2 text-gray-200 text-lg" />
                <span>App Store</span>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
            <div className="flex flex-col items-center md:items-start gap-3">
              <p className="text-gray-400 mb-2">Follow us on LinkedIn for updates</p>
              <a 
                href="https://www.linkedin.com/in/akshara-manoj/" 
                className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">&copy; {currentYear} Travo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
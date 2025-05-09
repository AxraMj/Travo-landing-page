import React, { useState } from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

export default function DownloadAppSection() {
  const [showMessage, setShowMessage] = useState(false);
  const [store, setStore] = useState('');

  const handleClick = (storeName) => {
    setStore(storeName);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <section className="w-full flex flex-col items-center py-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <h2 className="text-3xl font-bold text-white mb-6">Download the App</h2>
      <div className="flex gap-8 mb-4">
        <button
          onClick={() => handleClick('Google Play')}
          className="flex flex-col items-center group focus:outline-none"
        >
          <FaGooglePlay size={56} className="text-green-400 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-white mt-2 text-lg">Play Store</span>
        </button>
        <button
          onClick={() => handleClick('App Store')}
          className="flex flex-col items-center group focus:outline-none"
        >
          <FaApple size={56} className="text-slate-200 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-white mt-2 text-lg">App Store</span>
        </button>
      </div>
      {showMessage && (
        <div className="mt-4 px-6 py-2 rounded-lg bg-gray-900 bg-opacity-90 text-white text-lg shadow-lg animate-pulse">
          {store} version coming soon!
        </div>
      )}
    </section>
  );
} 
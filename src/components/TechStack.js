import React from 'react';
import { SiMongodb, SiExpress, SiReact, SiExpo } from 'react-icons/si';
import { FaTv } from 'react-icons/fa';

export default function TechStack() {
  return (
    <div className="flex items-center justify-center w-full py-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex flex-wrap justify-center gap-6 px-6 py-4 rounded-xl backdrop-blur-md shadow-md border border-white border-opacity-10 sm:px-8 md:gap-8">
        <div className="flex items-center gap-3 text-slate-200">
          <SiMongodb className="text-green-400" size={28} />
          <span className="font-medium text-lg">mongoDB</span>
        </div>
        <div className="flex items-center gap-3 text-slate-200">
          <SiExpress className="text-gray-400" size={28} />
          <span className="font-medium text-lg">express</span>
        </div>
        <div className="flex items-center gap-3 text-slate-200">
          <SiReact className="text-cyan-400" size={28} />
          <span className="font-medium text-lg">React Native</span>
        </div>
        <div className="flex items-center gap-3 text-slate-200">
          <SiExpo className="text-indigo-300" size={28} />
          <span className="font-medium text-lg">Expo</span>
        </div>
      </div>
    </div>
  );
}
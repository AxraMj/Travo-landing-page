import React from 'react';

const NUM_DOTS = 40;
const dots = Array.from({ length: NUM_DOTS }, (_, i) => {
  // Random movement direction and distance
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * 30 + 10; // px
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;
  return {
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 4, // slower movement
    delay: Math.random() * 3,
    dx,
    dy,
  };
});

export default function GalaxyDotsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
      {dots.map(dot => (
        <span
          key={dot.id}
          className="absolute rounded-full bg-white opacity-80"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animation: `galaxy-dot-twinkle ${dot.duration / 2}s ease-in-out ${dot.delay}s infinite, galaxy-dot-move-${dot.id} ${dot.duration}s linear ${dot.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes galaxy-dot-twinkle {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        ${dots.map(dot => `
          @keyframes galaxy-dot-move-${dot.id} {
            0% { transform: translate(0px, 0px); }
            100% { transform: translate(${dot.dx}px, ${dot.dy}px); }
          }
        `).join('')}
      `}</style>
    </div>
  );
} 
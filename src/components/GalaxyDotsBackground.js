import React from 'react';

export default function GalaxyStarsBackground() {
  // Create a galaxy structure with a dense center and spiral arms
  const createGalaxyStars = () => {
    const NUM_STARS = 120;
    const stars = [];
    
    // Parameters for spiral galaxy
    const centerX = 50; // center position as percentage
    const centerY = 50;
    const spiralTightness = 0.3; // how tight the spiral is
    const armWidth = 20; // width of spiral arms
    const centralDensity = 0.6; // how dense the central region is
    
    // Central bulge stars (more dense in the middle)
    const centralStars = Math.floor(NUM_STARS * centralDensity);
    for (let i = 0; i < centralStars; i++) {
      // Use polar coordinates for more stars in center
      const radius = Math.pow(Math.random(), 2) * 15; // squared for central concentration
      const angle = Math.random() * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Larger, brighter stars in center
      const sizeFactor = Math.random() * 0.8 + 1.2;
      const opacityFactor = Math.random() * 0.3 + 0.7;
      
      stars.push(createStar(i, x, y, sizeFactor, opacityFactor));
    }
    
    // Spiral arm stars
    const armStars = NUM_STARS - centralStars;
    const armsCount = 2; // number of spiral arms
    
    for (let i = 0; i < armStars; i++) {
      const armId = i % armsCount; // which arm
      const distanceFromCenter = 15 + Math.random() * 35; // distance from center
      
      // Calculate spiral position
      // Each arm is offset by (2π / armsCount)
      const angleOffset = (Math.PI * 2 * armId) / armsCount;
      const angle = angleOffset + (distanceFromCenter * spiralTightness);
      
      // Add some randomness to create arm width
      const randomSpread = (Math.random() - 0.5) * armWidth;
      const spreadAngle = randomSpread * (Math.PI / 180);
      
      const finalAngle = angle + spreadAngle;
      const x = centerX + distanceFromCenter * Math.cos(finalAngle);
      const y = centerY + distanceFromCenter * Math.sin(finalAngle);
      
      // Smaller stars in the arms
      const sizeFactor = Math.random() * 0.5 + 0.5;
      const opacityFactor = Math.random() * 0.4 + 0.6;
      
      stars.push(createStar(centralStars + i, x, y, sizeFactor, opacityFactor));
    }
    
    return stars;
  };
  
  // Helper function to create a star with all its properties
  const createStar = (id, x, y, sizeFactor, opacityFactor) => {
    // Star size - create a few different sizes for variety
    const sizeCategory = Math.random();
    const baseSize = sizeCategory > 0.95 ? 2.5 : // Few larger stars
                    sizeCategory > 0.7 ? 1.5 : // Medium stars
                    0.7; // Smaller stars (most common)
    const size = baseSize * sizeFactor + Math.random();
    
    // Star opacity and blur for depth
    const opacity = (Math.random() * 0.3 + 0.4) * opacityFactor;
    const blur = Math.random() > 0.8 ? 'blur-sm' : '';
    
    // Star color - varies by position in galaxy
    // Center stars more yellowish/reddish, outer stars more blue/white
    const isCenter = x >= 35 && x <= 65 && y >= 35 && y <= 65;
    const colorType = Math.random();
    
    let color;
    if (isCenter) {
      color = colorType > 0.7 ? 'bg-yellow-200' :
              colorType > 0.4 ? 'bg-yellow-100' :
              colorType > 0.1 ? 'bg-white' : 'bg-red-200';
    } else {
      color = colorType > 0.8 ? 'bg-blue-200' :
              colorType > 0.6 ? 'bg-purple-200' :
              'bg-white';
    }
    
    // Random movement direction and distance (gentle)
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 10 + 3; // px
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    
    return {
      id,
      top: y,
      left: x,
      size,
      opacity,
      blur,
      color,
      duration: Math.random() * 6 + 8, // slow movement
      twinkleDuration: Math.random() * 4 + 3, // different speed for twinkling
      delay: Math.random() * 4,
      dx,
      dy,
    };
  };
  
  // Generate stars in galaxy pattern
  const stars = React.useMemo(() => createGalaxyStars(), []);
  
  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
      {/* Very subtle galaxy glow in center */}
      <div 
        className="absolute rounded-full bg-purple-900/10 blur-3xl"
        style={{
          top: '40%',
          left: '40%',
          width: '20%',
          height: '20%',
        }}
      />
      
      {/* Stars */}
      {stars.map(star => (
        <span
          key={star.id}
          className={`absolute rounded-full ${star.color} ${star.blur}`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `galaxy-star-twinkle-${star.id} ${star.twinkleDuration}s ease-in-out ${star.delay}s infinite, galaxy-star-move-${star.id} ${star.duration}s linear ${star.delay}s infinite alternate`,
          }}
        />
      ))}
      
      {/* Occasional shooting stars */}
      <span 
        className="absolute rounded-full bg-white"
        style={{
          top: '10%',
          left: '70%',
          width: '2px',
          height: '2px',
          opacity: 0,
          animation: 'shooting-star 6s linear 8s infinite',
        }}
      />
      
      <span 
        className="absolute rounded-full bg-white"
        style={{
          top: '60%',
          left: '20%',
          width: '2px',
          height: '2px',
          opacity: 0,
          animation: 'shooting-star-2 6s linear 19s infinite',
        }}
      />
      
      {/* CSS Animations */}
      <style>{`
        ${stars.map(star => `
          @keyframes galaxy-star-twinkle-${star.id} {
            0%, 100% { opacity: ${star.opacity}; transform: scale(1); }
            50% { opacity: ${Math.min(1, star.opacity + 0.3)}; transform: scale(${1 + Math.random() * 0.4}); }
          }
          
          @keyframes galaxy-star-move-${star.id} {
            0% { transform: translate(0px, 0px); }
            100% { transform: translate(${star.dx}px, ${star.dy}px); }
          }
        `).join('')}
        
        @keyframes shooting-star {
          0% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0;
            box-shadow: none;
          }
          5% { 
            opacity: 1;
            box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.4), 0 0 8px 2px rgba(255, 255, 255, 0.2);
          }
          15% { 
            transform: translate(-150px, 150px) scale(1.2);
            opacity: 1;
            box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.4), 0 0 8px 2px rgba(255, 255, 255, 0.2);
          }
          25% { 
            transform: translate(-300px, 300px) scale(0.2); 
            opacity: 0;
            box-shadow: none;
          }
          100% { 
            transform: translate(-300px, 300px) scale(0); 
            opacity: 0; 
          }
        }
        
        @keyframes shooting-star-2 {
          0% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0;
            box-shadow: none;
          }
          5% { 
            opacity: 1;
            box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.4), 0 0 8px 2px rgba(255, 255, 255, 0.2);
          }
          15% { 
            transform: translate(150px, 150px) scale(1.2);
            opacity: 1;
            box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.4), 0 0 8px 2px rgba(255, 255, 255, 0.2);
          }
          25% { 
            transform: translate(300px, 300px) scale(0.2); 
            opacity: 0;
            box-shadow: none;
          }
          100% { 
            transform: translate(300px, 300px) scale(0); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
}
import { useEffect, useState } from 'react';

/**
 * StarField Component
 * 
 * Renders a field of stars using simple HTML elements for guaranteed visibility
 * @returns {JSX.Element} The StarField component
 */
export default function StarField() {
  // Create fixed stars for guaranteed visibility
  const fixedStars = [
    // Top section - more scattered
    { left: '3%', top: '2%', size: 0.5 },
    { left: '12%', top: '6%', size: 0.5 },
    { left: '19%', top: '3%', size: 0.5 },
    { left: '27%', top: '8%', size: 0.5 },
    { left: '34%', top: '4%', size: 0.5 },
    { left: '41%', top: '9%', size: 0.5 },
    { left: '52%', top: '2%', size: 0.5 },
    { left: '63%', top: '7%', size: 0.5 },
    { left: '71%', top: '3%', size: 0.5 },
    { left: '84%', top: '5%', size: 0.5 },
    { left: '93%', top: '8%', size: 0.5 },
    { left: '7%', top: '11%', size: 0.5 },
    { left: '23%', top: '14%', size: 0.5 },
    { left: '38%', top: '12%', size: 0.5 },
    { left: '57%', top: '15%', size: 0.5 },
    { left: '78%', top: '13%', size: 0.5 },
    
    // Bottom section - more scattered
    { left: '4%', top: '87%', size: 0.5 },
    { left: '13%', top: '92%', size: 0.5 },
    { left: '21%', top: '89%', size: 0.5 },
    { left: '32%', top: '94%', size: 0.5 },
    { left: '43%', top: '88%', size: 0.5 },
    { left: '51%', top: '96%', size: 0.5 },
    { left: '62%', top: '91%', size: 0.5 },
    { left: '74%', top: '97%', size: 0.5 },
    { left: '83%', top: '93%', size: 0.5 },
    { left: '92%', top: '89%', size: 0.5 },
    { left: '8%', top: '97%', size: 0.5 },
    { left: '26%', top: '98%', size: 0.5 },
    { left: '47%', top: '93%', size: 0.5 },
    { left: '68%', top: '95%', size: 0.5 },
    { left: '89%', top: '98%', size: 0.5 },
    
    // Left side - more scattered
    { left: '1%', top: '18%', size: 0.5 },
    { left: '3%', top: '27%', size: 0.5 },
    { left: '2%', top: '39%', size: 0.5 },
    { left: '4%', top: '52%', size: 0.5 },
    { left: '1%', top: '64%', size: 0.5 },
    { left: '3%', top: '73%', size: 0.5 },
    { left: '2%', top: '81%', size: 0.5 },
    { left: '4%', top: '42%', size: 0.5 },
    
    // Right side - more scattered
    { left: '97%', top: '19%', size: 0.5 },
    { left: '98%', top: '31%', size: 0.5 },
    { left: '96%', top: '44%', size: 0.5 },
    { left: '99%', top: '57%', size: 0.5 },
    { left: '97%', top: '62%', size: 0.5 },
    { left: '98%', top: '71%', size: 0.5 },
    { left: '96%', top: '83%', size: 0.5 },
    { left: '99%', top: '92%', size: 0.5 },
  ];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 9999 }}>
      {fixedStars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: '0 0 10px #fff, 0 0 20px #fff',
            filter: 'brightness(1.5)',
            animation: index % 3 === 0 ? 'starTwinkle 3s infinite alternate' : undefined
          }}
        />
      ))}
      
      <style>{`
        @keyframes starTwinkle {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
import React, { useEffect } from 'react';

const StarOverlay = () => {
  useEffect(() => {
    // Create a container for stars
    const starContainer = document.createElement('div');
    starContainer.style.position = 'fixed';
    starContainer.style.top = '0';
    starContainer.style.left = '0';
    starContainer.style.width = '100%';
    starContainer.style.height = '100%';
    starContainer.style.pointerEvents = 'none';
    starContainer.style.zIndex = '9999999'; // Extremely high z-index
    starContainer.id = 'star-overlay';

    // Add to body
    document.body.appendChild(starContainer);

    // Create 80 stars
    for (let i = 0; i < 200; i++) {
      createStar(starContainer, i);
    }

    return () => {
      // Clean up
      if (document.getElementById('star-overlay')) {
        document.body.removeChild(starContainer);
      }
    };
  }, []);

  const createStar = (container, index) => {
    const star = document.createElement('div');

    // Determine position - scatter stars closer to center where planets are
    // Use modulo to cycle through areas regardless of total star count
    let left, top;
    const area = index % 5; // Cycle through 5 areas

    if (area === 0) {
      // Around center horizontal band (where planets are) - 20% of stars
      left = `${Math.random() * 80 + 10}%`;
      top = `${Math.random() * 40 + 30}%`; // Center vertical area
    } else if (area === 1) {
      // Upper area closer to center - 20% of stars
      left = `${Math.random() * 70 + 15}%`;
      top = `${Math.random() * 25 + 5}%`;
    } else if (area === 2) {
      // Lower area closer to center - 20% of stars
      left = `${Math.random() * 70 + 15}%`;
      top = `${Math.random() * 25 + 70}%`;
    } else if (area === 3) {
      // Left side near center - 20% of stars
      left = `${Math.random() * 15 + 5}%`;
      top = `${Math.random() * 50 + 25}%`;
    } else {
      // Right side near center - 20% of stars
      left = `${Math.random() * 15 + 80}%`;
      top = `${Math.random() * 50 + 25}%`;
    }

    // Style the star - small sizes with nice glow
    star.style.position = 'absolute';
    star.style.left = left;
    star.style.top = top;
    star.style.width = `${Math.random() * 1 + 1}px`; // 1-2px (tiny stars)
    star.style.height = star.style.width;
    star.style.borderRadius = '50%';
    star.style.backgroundColor = 'white';
    star.style.boxShadow = '0 0 10px #fff, 0 0 20px #fff';
    star.style.filter = 'brightness(2)';

    // Add twinkle animation to every third star
    if (index % 3 === 0) {
      star.style.animation = `twinkle ${Math.random() * 3 + 4}s ease-in-out infinite`;

      // Add keyframes for twinkle animation
      if (!document.getElementById('star-keyframes')) {
        const style = document.createElement('style');
        style.id = 'star-keyframes';
        style.innerHTML = `
          @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `;
        document.head.appendChild(style);
      }
    }

    container.appendChild(star);
  };

  // This component doesn't render anything itself
  return null;
};

export default StarOverlay;
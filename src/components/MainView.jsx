import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CelestialBody from './CelestialBody';
import MoonOrbit from './MoonOrbit';
import StarField from './StarField';
import { celestialBodies, getMoon } from '../data/celestialBodies';
import { PLANET_SIZE_MULTIPLIER, STARFIELD } from '../data/constants';

/**
 * MainView Component
 *
 * Displays the solar system with all celestial bodies laid out from left to right,
 * starting at the Sun and moving outward. Designed for big touch targets,
 * animated sparkles, and responsive scaling that keeps everything on-screen.
 *
 * @param {function} onSelectBody - Callback when a body is clicked
 */
export default function MainView({ onSelectBody, selectedBodyId }) {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [stars, setStars] = useState([]);
  const prefersReducedMotion = useReducedMotion();
  const moonData = useMemo(() => getMoon(), []);
  const bodies = useMemo(
    () => celestialBodies.filter(body => body.id !== 'moon'),
    []
  );
  // Removed accent star sparkles to keep only small star systems

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Generate fixed positions for stars that are guaranteed to be visible
  useEffect(() => {
    // Create a fixed pattern of stars that will be clearly visible
    const createFixedStars = () => {
      const stars = [];
      const starCount = 100;
      
      // Create a grid of stars around the edges
      for (let i = 0; i < starCount; i++) {
        // Determine position based on index to create a pattern
        let x, y;
        
        if (i < 30) {
          // Top edge - evenly spaced
          x = (i * 3.33) + 1; // Distribute across width
          y = 5 + (Math.random() * 10); // Top area
        } else if (i < 60) {
          // Bottom edge - evenly spaced
          x = ((i - 30) * 3.33) + 1;
          y = 85 + (Math.random() * 10); // Bottom area
        } else if (i < 80) {
          // Left edge - evenly spaced
          x = 5 + (Math.random() * 10);
          y = ((i - 60) * 3.5) + 15; // Distribute along height
        } else {
          // Right edge - evenly spaced
          x = 85 + (Math.random() * 10);
          y = ((i - 80) * 3.5) + 15;
        }
        
        // Add some randomness to the fixed positions
        x += (Math.random() * 4) - 2;
        y += (Math.random() * 4) - 2;
        
        // Ensure x and y are within bounds
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));
        
        stars.push({
          id: i,
          x,
          y,
          size: Math.random() * 6 + 4, // 4-10px (larger stars)
          twinkle: i % 3 === 0, // Every third star twinkles
          duration: Math.random() * 4 + 3,
          delay: Math.random() * 5,
        });
      }
      
      return stars;
    };
    
    setStars(createFixedStars());
  }, []);

  const rowMetrics = useMemo(() => {
    const baseDiameters = bodies.map(body => body.size * PLANET_SIZE_MULTIPLIER);

    if (!viewport.width || !viewport.height) {
      return {
        scale: 1,
        diameters: baseDiameters,
        gap: 80,
        paddingX: 96,
      };
    }

    const count = bodies.length;
    const paddingX = Math.max(32, Math.min(160, viewport.width * 0.08));
    const availableWidth = Math.max(260, viewport.width - paddingX * 2);
    const gap = Math.max(32, Math.min(140, viewport.width * 0.04));
    const totalBase = baseDiameters.reduce((sum, d) => sum + d, 0);
    const rowWidth = totalBase + gap * (count - 1);
    const scale = rowWidth > 0 ? Math.min(1, availableWidth / rowWidth) : 1;

    return {
      scale,
      diameters: baseDiameters,
      gap,
      paddingX,
    };
  }, [viewport.width, viewport.height]);

  return (
    <div className="relative w-screen h-screen bg-space overflow-hidden">
      {/* Gradient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(58,80,163,0.12),_transparent_65%)] pointer-events-none" />

      {/* Removed extreme star overlay to keep only tiny star systems */}

      {/* Removed accent star sparkles */}

      {/* Celestial bodies in horizontal layout */}
      <div
        className="relative z-10 h-full flex items-center"
        style={{
          paddingLeft: `${rowMetrics.paddingX}px`,
          paddingRight: `${Math.max(24, rowMetrics.paddingX * 0.5)}px`,
        }}
      >
        <div
          className="flex items-center"
          style={{
            gap: `${rowMetrics.gap}px`,
            transform: `scale(${rowMetrics.scale})`,
            transformOrigin: 'left center',
          }}
        >
          {bodies.map((body, index) => {
            const diameter = rowMetrics.diameters[index] || (body.size * PLANET_SIZE_MULTIPLIER);
            return (
              <div
                key={body.id}
                style={{
                  width: `${diameter}px`,
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <CelestialBody
                  body={body}
                  onClick={(position) => onSelectBody(body, position)}
                  size={diameter}
                  isSelected={selectedBodyId === body.id}
                />
                {body.id === 'earth' && (
                  <MoonOrbit
                    earthDiameter={diameter}
                    moon={moonData}
                    onSelectBody={onSelectBody}
                    isSelected={selectedBodyId === moonData?.id}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

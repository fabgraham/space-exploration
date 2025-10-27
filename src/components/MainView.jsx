import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CelestialBody from './CelestialBody';
import { celestialBodies } from '../data/celestialBodies';
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
  const accentStars = useMemo(() => {
    const sparkleCount = 24;
    const sparkles = [];
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 18 + 14,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 4,
      });
    }
    return sparkles;
  }, []);

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

  useEffect(() => {
    const generateStars = (count) => {
      const newStars = [];
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (STARFIELD.maxSize - STARFIELD.minSize) + STARFIELD.minSize,
          opacity: Math.random() * 0.6 + 0.4,
          duration: Math.random() * 3 + 2,
        });
      }
      return newStars;
    };

    setStars(generateStars(STARFIELD.count));
  }, []);

  const rowMetrics = useMemo(() => {
    const baseDiameters = celestialBodies.map(body => body.size * PLANET_SIZE_MULTIPLIER);

    if (!viewport.width || !viewport.height) {
      return {
        scale: 1,
        diameters: baseDiameters,
        gap: 80,
        paddingX: 96,
      };
    }

    const count = celestialBodies.length;
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(58,80,163,0.35),_transparent_65%)] pointer-events-none" />

      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/90 star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Accent star sparkles */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6 }}>
        {accentStars.map(star => (
          <motion.span
            key={`sparkle-${star.id}`}
            className="absolute text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.9)]"
            style={{
              left: `calc(${star.x}% - ${star.size / 2}px)`,
              top: `calc(${star.y}% - ${star.size / 2}px)`,
              fontSize: `${star.size}px`,
            }}
            initial={{ opacity: 0.3, scale: 0.8, rotate: 0 }}
            animate={prefersReducedMotion
              ? { opacity: 0.6, scale: 1, rotate: 0 }
              : { opacity: [0.3, 0.9, 0.4], scale: [0.8, 1.15, 0.9], rotate: [0, 35, -20, 0] }}
            transition={prefersReducedMotion
              ? { duration: 0 }
              : { duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            ✶
          </motion.span>
        ))}
      </div>

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
          {celestialBodies.map((body, index) => {
            const diameter = rowMetrics.diameters[index] || (body.size * PLANET_SIZE_MULTIPLIER);
            return (
              <div
                key={body.id}
                style={{
                  width: `${diameter}px`,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CelestialBody
                  body={body}
                  onClick={() => onSelectBody(body)}
                  size={diameter}
                  isSelected={selectedBodyId === body.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import CelestialBody from './CelestialBody';
import { PLANET_SIZE_MULTIPLIER } from '../data/constants';

/**
 * MoonOrbit Component
 *
 * Renders the Moon orbiting Earth with a smooth rotational animation.
 * Places the Moon at the 12 o'clock position initially and animates
 * a full revolution using CSS transforms for optimal performance.
 */
export default function MoonOrbit({
  earthDiameter,
  moon,
  onSelectBody,
  isSelected,
}) {
  if (!moon || !earthDiameter) {
    return null;
  }

  const baseMoonDiameter = moon.size * PLANET_SIZE_MULTIPLIER;
  const moonDiameter = Math.min(baseMoonDiameter, earthDiameter * 0.55);
  const orbitPadding = Math.max(earthDiameter * 0.45, 48);
  const orbitSize = earthDiameter + orbitPadding;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden={false}
      style={{ zIndex: isSelected ? 1000 : 'auto' }}
    >
      {/* Orbital path ring */}
      <div
        className="absolute rounded-full border border-white/30"
        style={{
          width: `${orbitSize}px`,
          height: `${orbitSize}px`,
          boxShadow: '0 0 16px rgba(255,255,255,0.2)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Moon orbit animation */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: `${orbitSize}px`,
          height: `${orbitSize}px`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: 'linear',
        }}
      >
        <div
          className="absolute left-1/2 pointer-events-auto"
          style={{
            top: 0,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CelestialBody
            body={moon}
            onClick={(position) => onSelectBody(moon, position)}
            size={moonDiameter}
            isSelected={isSelected}
          />
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ANIMATION, MIN_TOUCH_TARGET } from '../data/constants';

/**
 * CelestialBody Component
 *
 * Renders an individual celestial body (Sun, planet, or moon) as a clickable element.
 * Displays an image or falls back to a colored circle if image fails to load.
 *
 * @param {object} body - Celestial body data object
 * @param {function} onClick - Click handler function
 * @param {number} size - Display size in pixels
 * @param {object} position - { x, y } position coordinates
 */
export default function CelestialBody({
  body,
  onClick,
  size,
  position,
  isSelected = false,
}) {
  const [imageError, setImageError] = useState(false);
  const preferPlaceholder = body.usePlaceholder === true;
  const shouldRenderImage = !preferPlaceholder && !imageError && Boolean(body.imagePath);
  const layoutId = useMemo(() => `celestial-${body.id}`, [body.id]);
  const imageScale = body.imageScale ?? 1;
  const innerPadding = body.imagePadding ?? 0;

  const isAbsolute = position && typeof position.x === 'number' && typeof position.y === 'number';
  const isSun = body.id === 'sun';

  // Ensure minimum touch target size
  const touchTargetSize = Math.max(size, MIN_TOUCH_TARGET);
  const visualSize = size;

  // Calculate padding to center visual within touch target
  const padding = (touchTargetSize - visualSize) / 2;

  const containerBorderRadius = '9999px';
  const haloShadow = isSun
    ? '0 0 38px rgba(255,196,86,0.85), 0 0 96px rgba(255,148,30,0.6)'
    : '0 0 32px rgba(255,255,255,0.85), 0 0 88px rgba(255,255,255,0.6)';
  const selectedShadow = isSun
    ? '0 0 90px rgba(255,210,120,0.7), 0 0 160px rgba(255,160,40,0.55)'
    : `0 0 90px ${body.color}90, 0 0 160px ${body.color}60`;
  const haloBackground = isSun
    ? 'radial-gradient(circle at 50% 50%, rgba(255,205,112,0.35), rgba(255,140,0,0.08) 68%, transparent 100%)'
    : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), rgba(255,255,255,0.2) 60%, transparent 100%)';

  const baseClass = 'cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 border-0';
  const buttonClass = isAbsolute ? `absolute ${baseClass} rounded-full` : `relative ${baseClass} rounded-full`;

  const buttonStyle = isAbsolute
    ? {
        left: position.x - touchTargetSize / 2,
        top: position.y - touchTargetSize / 2,
        width: `${touchTargetSize}px`,
        height: `${touchTargetSize}px`,
        padding: `${padding}px`,
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: containerBorderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {
        width: `${touchTargetSize}px`,
        height: `${touchTargetSize}px`,
        padding: `${padding}px`,
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: containerBorderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

  return (
    <motion.button
      className={buttonClass}
      style={buttonStyle}
      whileHover={{
        scale: 1.15,
        transition: { duration: ANIMATION.hover }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={`${body.names.en}, tap to learn more`}
      layoutId={`${layoutId}-button`}
    >
      <motion.div
        layoutId={layoutId}
        className="relative flex items-center justify-center shadow-lg"
        style={{
          width: `${visualSize}px`,
          height: `${visualSize}px`,
          boxShadow: isSelected ? selectedShadow : haloShadow,
          background: isSelected ? 'transparent' : haloBackground,
          borderRadius: containerBorderRadius,
          padding: `${innerPadding}px`,
          boxSizing: 'border-box',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Image or placeholder */}
        {shouldRenderImage ? (
          <motion.img
            src={body.imagePath}
            alt={body.names.en}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
              transform: `scale(${imageScale})`,
              transformOrigin: 'center',
            }}
            layoutId={`${layoutId}-image`}
            draggable={false}
          />
        ) : (
          <motion.div
            layoutId={`${layoutId}-placeholder`}
            className="w-full h-full rounded-full flex items-center justify-center text-white font-bold select-none"
            style={{
              background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6), ${body.color})`,
            }}
          >
            <span
              className="text-center uppercase tracking-wide"
              style={{
                fontSize: `${visualSize / 6.5}px`,
                textShadow: '0 3px 6px rgba(0,0,0,0.6)'
              }}
            >
              {body.names.en.split(' ').pop()}
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  );
}

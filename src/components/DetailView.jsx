import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ANIMATION, DETAIL_IMAGE_SIZE } from '../data/constants';

/**
 * DetailView Component
 *
 * Full-screen overlay showing detailed view of selected celestial body.
 * Features:
 * - Large planet image
 * - Title in large text
 * - Auto-playing audio pronunciation
 * - Back button (top-left)
 * - Zoom in/out animations
 * - Click backdrop or press Escape to close
 *
 * @param {object} body - Selected celestial body data
 * @param {function} onClose - Callback to close detail view
 * @param {string} language - Current language ('en' for Phase 1)
 */
export default function DetailView({ body, onClose, language = 'en' }) {
  console.log('DetailView mounted for:', body.names[language]);
  const audioRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [imageSize, setImageSize] = useState(DETAIL_IMAGE_SIZE.mobile);
  const preferPlaceholder = body.usePlaceholder === true;
  const shouldRenderImage = !preferPlaceholder && !imageError && Boolean(body.imagePath);
  const layoutId = useMemo(() => `celestial-${body.id}`, [body.id]);
  const imageScale = body.imageScale ?? 1;
  const detailPadding = body.detailPadding ?? 24;
  const containerBorderRadius = '9999px';
  const prefersReducedMotion = useReducedMotion();

  const starOrnaments = useMemo(() => (
    [
      { id: 'tl', x: -imageSize * 0.55, y: -imageSize * 0.6, size: 44, delay: 0 },
      { id: 'tr', x: imageSize * 0.6, y: -imageSize * 0.4, size: 36, delay: 0.2 },
      { id: 'bl', x: -imageSize * 0.65, y: imageSize * 0.45, size: 32, delay: 0.35 },
      { id: 'br', x: imageSize * 0.55, y: imageSize * 0.55, size: 38, delay: 0.5 },
      { id: 'top', x: 0, y: -imageSize * 0.75, size: 28, delay: 0.15 },
    ]
  ), [imageSize]);

  // Determine image size based on viewport
  useEffect(() => {
    const updateImageSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setImageSize(DETAIL_IMAGE_SIZE.desktop);
      } else if (width >= 768) {
        setImageSize(DETAIL_IMAGE_SIZE.tablet);
      } else {
        setImageSize(DETAIL_IMAGE_SIZE.mobile);
      }
    };

    updateImageSize();
    window.addEventListener('resize', updateImageSize);
    return () => window.removeEventListener('resize', updateImageSize);
  }, []);

  // Play audio on mount and when body changes
  useEffect(() => {
    if (audioRef.current) {
      // Reset audio to beginning
      audioRef.current.currentTime = 0;

      // Small delay to ensure component is visible
      const timer = setTimeout(() => {
        audioRef.current?.play().catch(err => {
          console.log('Audio autoplay prevented by browser:', err);
          // Silently fail - browser may block autoplay
        });
      }, 400); // Wait for animation to complete

      return () => clearTimeout(timer);
    }
  }, [body.id]);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    setImageError(false);
  }, [body.id]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION.backdropFade }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 md:gap-6 p-4 md:p-8 max-w-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: ANIMATION.zoomIn,
          delay: 0.1,
          ease: 'easeOut'
        }}
      >
        {/* Back Button */}
        <button
          className="absolute top-2 left-2 md:top-4 md:left-4 w-20 h-20 flex items-center justify-center bg-black bg-opacity-60 rounded-full text-white text-4xl md:text-5xl hover:scale-110 active:scale-95 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-400"
          onClick={onClose}
          aria-label="Go back to solar system"
        >
          ←
        </button>

        {/* Planet Image / Placeholder with decorative stars */}
        <div className="relative flex items-center justify-center">
          {starOrnaments.map(star => (
            <motion.span
              key={star.id}
              className="absolute text-white drop-shadow-[0_0_26px_rgba(255,255,255,0.85)] select-none"
              style={{
                left: `calc(50% + ${star.x}px)`,
                top: `calc(50% + ${star.y}px)`,
                fontSize: `${star.size}px`,
              }}
              initial={{ opacity: 0.4, scale: 0.8 }}
              animate={prefersReducedMotion
                ? { opacity: 0.7, scale: 1, rotate: 0 }
                : { opacity: [0.4, 1, 0.5], scale: [0.8, 1.1, 0.85], rotate: [0, 10, -10, 0] }}
              transition={prefersReducedMotion
                ? { duration: 0 }
                : { duration: 6, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              ✦
            </motion.span>
          ))}

          <motion.div
            layoutId={layoutId}
            className="relative flex items-center justify-center shadow-2xl"
            style={{
              width: `${imageSize}px`,
              height: `${imageSize}px`,
              boxShadow: `0 12px 48px rgba(0,0,0,0.55), 0 0 120px ${body.color}80`,
              borderRadius: containerBorderRadius,
              padding: `${detailPadding}px`,
              boxSizing: 'border-box',
              overflow: 'visible',
            }}
          >
            {shouldRenderImage ? (
              <motion.img
                layoutId={`${layoutId}-image`}
                src={body.imagePath}
                alt={body.names[language]}
                onError={() => setImageError(true)}
                className="w-full h-full object-contain"
                draggable={false}
                style={{
                  filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.6))',
                  transform: `scale(${imageScale})`,
                  transformOrigin: 'center',
                }}
              />
            ) : (
              <motion.div
                layoutId={`${layoutId}-placeholder`}
                className="w-full h-full rounded-full flex items-center justify-center text-white font-bold select-none"
                style={{
                  background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.65), ${body.color})`,
                }}
              >
                <span
                  className="text-center uppercase tracking-widest drop-shadow-lg"
                  style={{
                    fontSize: `${imageSize / 5.5}px`,
                    textShadow: '0 5px 16px rgba(0,0,0,0.65)'
                  }}
                >
                  {body.names[language]}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Title */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase text-center select-none"
          style={{
            textShadow: '0 4px 8px rgba(0,0,0,0.7)',
            letterSpacing: '0.05em'
          }}
        >
          {body.names[language]}
        </h1>

        {/* Audio (hidden, auto-plays) */}
        <audio
          ref={audioRef}
          src={body.audioPath[language]}
          aria-label={`Pronunciation of ${body.names[language]}`}
        />

        {/* Optional: Audio indicator (subtle pulse while playing) */}
        <div
          className="text-white text-2xl opacity-70 animate-pulse"
          aria-hidden="true"
        >
          🔊
        </div>
      </motion.div>
    </motion.div>
  );
}

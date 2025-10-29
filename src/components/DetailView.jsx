import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ANIMATION, DETAIL_IMAGE_SIZE, Z_INDEX } from '../data/constants';

/**
 * DetailView Component
 *
 * Handles the zoom-to-center interaction, audio playback, and timed return
 * to the main solar system view.
 */
export default function DetailView({ body, onClose, language = 'en', sourcePosition }) {
  const audioRef = useRef(null);
  const exitTimerRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [imageSize, setImageSize] = useState(DETAIL_IMAGE_SIZE.mobile);
  const layoutId = useMemo(() => `celestial-${body.id}`, [body.id]);
  const preferPlaceholder = body.usePlaceholder === true;
  const shouldRenderImage = !preferPlaceholder && !imageError && Boolean(body.imagePath);
  const imageScale = body.imageScale ?? 1;
  const detailPadding = body.detailPadding ?? 24;
  const containerBorderRadius = '9999px';

  // Calculate viewport center
  const viewportCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const viewportCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

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

  useEffect(() => {
    setImageError(false);
  }, [body.id]);

  useEffect(() => {
    if (!audioRef.current) {
      return undefined;
    }

    audioRef.current.currentTime = 0;
    // Play audio after zoom animation completes
    const playTimer = setTimeout(() => {
      audioRef.current?.play().catch(() => {
        // Browsers may block autoplay; no action needed on rejection.
      });
    }, ANIMATION.zoomIn * 1500);

    return () => clearTimeout(playTimer);
  }, [body.id]);

  useEffect(() => {
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }

    // Exit after: zoom in + 1.5 seconds hold time
    exitTimerRef.current = setTimeout(() => {
      onClose();
    }, (ANIMATION.zoomIn * 1000) + 1500);

    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, [onClose, body.id]);

  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION.backdropFade, ease: 'easeInOut' }}
      style={{ zIndex: Z_INDEX.detailView }}
      role="dialog"
      aria-modal="true"
      aria-label={`${body.names[language]} highlighted`}
    >
      <motion.div
        className="absolute flex flex-col items-center gap-6 p-6"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{
          scale: 0.2,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        exit={{
          scale: 0.2,
          opacity: 0
        }}
        transition={{
          duration: ANIMATION.zoomIn,
          ease: [0.25, 0.1, 0.25, 1.0] // Smooth easing curve
        }}
      >
        <motion.div
          className="relative flex items-center justify-center shadow-2xl"
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            boxShadow: `0 0 120px ${body.color}a0`,
            borderRadius: containerBorderRadius,
            padding: `${detailPadding}px`,
            boxSizing: 'border-box',
            background: 'transparent',
          }}
          transition={{ duration: ANIMATION.zoomIn, ease: 'easeInOut' }}
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
                filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.35))',
              }}
              initial={{ scale: imageScale }}
              animate={{ scale: imageScale }}
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
                  textShadow: '0 5px 16px rgba(0,0,0,0.65)',
                }}
              >
                {body.names[language]}
              </span>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          className="text-white text-4xl md:text-5xl font-bold uppercase tracking-[0.3em] text-center drop-shadow-lg select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.15 }}
        >
          {body.names[language]}
        </motion.p>

        <audio
          ref={audioRef}
          src={body.audioPath[language]}
          aria-label={`Pronunciation of ${body.names[language]}`}
        />
      </motion.div>
    </motion.div>
  );
}

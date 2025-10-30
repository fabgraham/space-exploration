import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { ANIMATION, DETAIL_IMAGE_SIZE } from '../data/constants';

/**
 * DetailView Component
 *
 * Shows detailed view of selected celestial body with in-place zoom.
 * Image scales up from its original position without moving to center.
 */
export default function DetailView({ body, onClose, language = 'en' }) {
  const audioRef = useRef(null);
  const exitTimerRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [imageSize, setImageSize] = useState(DETAIL_IMAGE_SIZE.mobile);

  // Generate matching layoutId (must match CelestialBody!)
  const layoutId = useMemo(() => `celestial-${body.id}`, [body.id]);

  const preferPlaceholder = body.usePlaceholder === true;
  const shouldRenderImage = !preferPlaceholder && !imageError && Boolean(body.imagePath);
  const imageScale = body.imageScale ?? 1;
  const detailPadding = body.detailPadding ?? 24;
  const containerBorderRadius = '9999px';

  // Update image size based on viewport
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

  // Reset image error state when body changes
  useEffect(() => {
    setImageError(false);
  }, [body.id]);

  // Play audio after animation completes
  useEffect(() => {
    if (!audioRef.current) {
      return undefined;
    }

    audioRef.current.currentTime = 0;
    // Play audio after zoom animation completes (500ms)
    const playTimer = setTimeout(() => {
      audioRef.current?.play().catch(() => {
        // Browsers may block autoplay; no action needed on rejection.
      });
    }, ANIMATION.zoomIn * 1000 + 100);

    return () => clearTimeout(playTimer);
  }, [body.id]);

  // Auto-close after 2 seconds
  useEffect(() => {
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }

    exitTimerRef.current = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, [onClose, body.id]);

  // Cleanup audio on unmount
  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION.backdropFade }}
      role="dialog"
      aria-modal="true"
      aria-label={`${body.names[language]} highlighted`}
    >
      {/* Backdrop - dims background */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ANIMATION.backdropFade }}
        onClick={onClose}
      />

      {/* Audio (hidden, auto-plays after delay) */}
      <audio
        ref={audioRef}
        src={body.audioPath[language]}
        aria-label={`Pronunciation of ${body.names[language]}`}
      />
    </motion.div>
  );
}

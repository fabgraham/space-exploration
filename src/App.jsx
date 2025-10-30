import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MainView from './components/MainView';
import DetailView from './components/DetailView';
import StarOverlay from './components/StarOverlay';
import StarBackground from './components/StarBackground';
import { ANIMATION } from './data/constants';

/**
 * Solar System Explorer - Main App Component
 *
 * Phase 1: English-only MVP
 * - Displays solar system in MainView
 * - Shows DetailView when body is clicked
 * - Manages selected body state
 * - Language fixed to 'en' for Phase 1
 *
 * Phase 2: Will add language toggle (EN/PT)
 */
function App() {
  const [selectedBody, setSelectedBody] = useState(null);
  const [language] = useState('en'); // Phase 1: English only
  const [isAnimating, setIsAnimating] = useState(false);
  const animationResetRef = useRef(null);

  const handleSelectBody = (body) => {
    if (isAnimating) {
      return;
    }

    setSelectedBody(body);
    setIsAnimating(true);
  };

  const handleCloseDetail = () => {
    setSelectedBody(null);
    if (animationResetRef.current) {
      clearTimeout(animationResetRef.current);
    }

    animationResetRef.current = setTimeout(() => {
      setIsAnimating(false);
      animationResetRef.current = null;
    }, ANIMATION.zoomOut * 1000);
  };

  useEffect(() => {
    return () => {
      if (animationResetRef.current) {
        clearTimeout(animationResetRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <header className="absolute top-6 left-1/2 z-20 -translate-x-1/2 px-4 text-center">
        <h1 className="fun-title text-[45px] sm:text-[84px] md:text-[96px] lg:text-[128px] md:whitespace-nowrap tracking-[0.18em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
          The Solar System
        </h1>
      </header>

      {/* Main solar system view */}
      <MainView
        onSelectBody={handleSelectBody}
        selectedBodyId={selectedBody?.id}
      />

      {/* Detail view with AnimatePresence for exit animations */}
      <AnimatePresence>
        {selectedBody && (
          <DetailView
            body={selectedBody}
            onClose={handleCloseDetail}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Restore larger star overlay and background */}
      <StarBackground />
      <StarOverlay />
    </div>
  );
}

export default App;

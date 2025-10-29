import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
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
  const [sourcePosition, setSourcePosition] = useState(null);
  const [language] = useState('en'); // Phase 1: English only
  const [isAnimating, setIsAnimating] = useState(false);
  const animationResetRef = useRef(null);

  const handleSelectBody = (body, position) => {
    if (isAnimating) {
      return;
    }

    setSelectedBody(body);
    setSourcePosition(position);
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
    <LayoutGroup id="solar-system">
      <div className="w-screen h-screen overflow-hidden">
        {/* Main solar system view */}
        <MainView
          onSelectBody={handleSelectBody}
          selectedBodyId={selectedBody?.id}
        />

        {/* Detail view (with exit animation support) */}
        <AnimatePresence>
          {selectedBody && (
            <DetailView
              body={selectedBody}
              onClose={handleCloseDetail}
              language={language}
              sourcePosition={sourcePosition}
            />
          )}
        </AnimatePresence>
        {/* Restore larger star overlay and background */}
        <StarBackground />
        <StarOverlay />
       </div>
     </LayoutGroup>
  );
}

export default App;

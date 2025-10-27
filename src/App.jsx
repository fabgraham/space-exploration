import { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import MainView from './components/MainView';
import DetailView from './components/DetailView';

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

  const handleSelectBody = (body) => {
    console.log('Body clicked:', body.names.en);
    setSelectedBody(body);
  };

  const handleCloseDetail = () => {
    setSelectedBody(null);
  };

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
            />
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

export default App;

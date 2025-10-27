# Solar System Explorer - Tasks Document

## Project Overview

**Project Name:** Solar System Explorer
**Version:** Phase 1 MVP (English Only)
**Status:** Planning → Development
**Estimated Timeline:** 2-3 days (10-15 hours)

---

## Task Categories

- **Setup:** Project initialization and dependencies
- **Structure:** Folder organization and data models
- **Components:** React component development
- **Styling:** Tailwind CSS and visual design
- **Animations:** Framer Motion implementation
- **Integration:** Audio, images, and asset handling
- **Testing:** Manual testing and bug fixes
- **Deployment:** Build and deploy to Vercel

---

## Phase 1: Project Setup

### Task 1.1: Initialize Vite + React Project
**Priority:** High
**Estimated Time:** 15 minutes
**Dependencies:** None

**Steps:**
1. Open terminal in `/Users/ihk/Documents/projects/space-exploration`
2. Run: `npm create vite@latest . -- --template react`
3. Confirm to proceed in existing directory
4. Choose template: `react` (JavaScript, not TypeScript)
5. Verify `package.json` created
6. Verify project structure created:
   ```
   ├── index.html
   ├── package.json
   ├── vite.config.js
   ├── src/
   │   ├── App.jsx
   │   ├── main.jsx
   │   └── App.css
   └── public/
   ```

**Acceptance Criteria:**
- ✅ Vite project initialized
- ✅ React configured (JavaScript, not TypeScript)
- ✅ `package.json` exists
- ✅ Project structure created

---

### Task 1.2: Install Dependencies
**Priority:** High
**Estimated Time:** 10 minutes
**Dependencies:** Task 1.1

**Steps:**
1. Run: `npm install`
2. Install Framer Motion: `npm install framer-motion`
3. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
4. Verify `package.json` shows:
   - `react` (18+)
   - `react-dom` (18+)
   - `framer-motion` (11+)
   - `tailwindcss` (3+)

**Acceptance Criteria:**
- ✅ All dependencies installed
- ✅ `node_modules/` folder created
- ✅ `tailwind.config.js` created
- ✅ `postcss.config.js` created

---

### Task 1.3: Configure Tailwind CSS
**Priority:** High
**Estimated Time:** 10 minutes
**Dependencies:** Task 1.2

**Steps:**
1. Edit `tailwind.config.js`:
   ```javascript
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,jsx}",
     ],
     theme: {
       extend: {
         colors: {
           space: '#0a0e27',
           'space-light': '#0f1628',
           orbital: '#2a3a52',
         },
       },
     },
     plugins: [],
   }
   ```

2. Edit `src/index.css` (or create if doesn't exist):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   body {
     margin: 0;
     padding: 0;
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
   }
   ```

3. Import in `src/main.jsx`:
   ```javascript
   import './index.css'
   ```

**Acceptance Criteria:**
- ✅ Tailwind configured for content paths
- ✅ Custom colors added (space, orbital)
- ✅ Base CSS directives added
- ✅ CSS imported in main.jsx

---

### Task 1.4: Create Folder Structure
**Priority:** High
**Estimated Time:** 5 minutes
**Dependencies:** Task 1.1

**Steps:**
1. Create folders inside `src/`:
   ```bash
   mkdir -p src/components
   mkdir -p src/data
   mkdir -p src/hooks
   ```

2. Create folders inside `public/`:
   ```bash
   mkdir -p public/images
   mkdir -p public/audio/en
   mkdir -p public/audio/pt
   ```

3. Verify structure:
   ```
   space-exploration/
   ├── public/
   │   ├── images/          (for PNG files)
   │   └── audio/
   │       ├── en/          (for English MP3s)
   │       └── pt/          (for Portuguese - Phase 2)
   ├── src/
   │   ├── components/      (React components)
   │   ├── data/            (celestial bodies data)
   │   ├── hooks/           (custom hooks)
   │   ├── App.jsx
   │   ├── main.jsx
   │   └── index.css
   └── package.json
   ```

**Acceptance Criteria:**
- ✅ All folders created
- ✅ Structure matches design document
- ✅ Ready for asset files

---

### Task 1.5: Test Development Server
**Priority:** High
**Estimated Time:** 5 minutes
**Dependencies:** Tasks 1.1, 1.2, 1.3

**Steps:**
1. Run: `npm run dev`
2. Open browser to `http://localhost:5173`
3. Verify Vite + React default page loads
4. Verify Tailwind CSS is working (test with utility class)
5. Stop server (Ctrl+C)

**Acceptance Criteria:**
- ✅ Dev server starts without errors
- ✅ React app loads in browser
- ✅ Tailwind CSS working
- ✅ No console errors

---

## Phase 2: Data Structure & Constants

### Task 2.1: Create Celestial Bodies Data Model
**Priority:** High
**Estimated Time:** 30 minutes
**Dependencies:** Task 1.4

**Steps:**
1. Create `src/data/celestialBodies.js`
2. Define data structure for all 10 bodies:
   ```javascript
   export const celestialBodies = [
     {
       id: 'sun',
       names: {
         en: 'The Sun',
         pt: 'O Sol'  // Phase 2
       },
       type: 'star',
       color: '#FDB813',
       size: 10,  // Relative size (1-10 scale)
       orbitRadius: 0,  // Center
       imagePath: '/images/Sun.png',
       audioPath: {
         en: '/audio/en/sun-en.mp3',
         pt: '/audio/pt/sun-pt.mp3'  // Phase 2
       }
     },
     {
       id: 'mercury',
       names: { en: 'Mercury', pt: 'Mercúrio' },
       type: 'planet',
       color: '#8C7853',
       size: 2,
       orbitRadius: 80,  // Mobile base
       imagePath: '/images/Mercury.png',
       audioPath: {
         en: '/audio/en/mercury-en.mp3',
         pt: '/audio/pt/mercury-pt.mp3'
       }
     },
     // ... (add all 10 bodies: Sun, Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, Neptune)
   ];
   ```

3. Add all 10 celestial bodies with correct:
   - IDs (lowercase)
   - English names
   - Colors (from DESIGN.md color palette)
   - Sizes (semi-realistic: Jupiter largest, Mercury smallest)
   - Orbit radii (mobile base, will scale responsively)
   - Image paths (capitalized filenames)
   - Audio paths (lowercase with -en suffix)

4. Export helper function:
   ```javascript
   export const getCelestialBodyById = (id) => {
     return celestialBodies.find(body => body.id === id);
   };
   ```

**Reference (from DESIGN.md):**
- Sun: size 10, orbitRadius 0, color #FDB813
- Mercury: size 2, orbitRadius 80, color #8C7853
- Venus: size 3, orbitRadius 110, color #FFC649
- Earth: size 4, orbitRadius 140, color #4A90E2
- Moon: size 1.5, orbitRadius 140 + 30 offset, color #C0C0C0
- Mars: size 3, orbitRadius 170, color #CD5C5C
- Jupiter: size 8, orbitRadius 200, color #C88B3A
- Saturn: size 7, orbitRadius 230, color #FAD5A5
- Uranus: size 5, orbitRadius 260, color #4FD0E7
- Neptune: size 5, orbitRadius 290, color #4166F5

**Acceptance Criteria:**
- ✅ All 10 bodies defined with complete data
- ✅ Colors match DESIGN.md palette
- ✅ Sizes semi-realistic (Jupiter largest)
- ✅ File paths follow naming conventions
- ✅ Helper function exported
- ✅ No syntax errors

---

### Task 2.2: Create Responsive Scaling Constants
**Priority:** Medium
**Estimated Time:** 15 minutes
**Dependencies:** Task 2.1

**Steps:**
1. Create `src/data/constants.js`
2. Define responsive breakpoints:
   ```javascript
   export const BREAKPOINTS = {
     mobile: 375,
     tablet: 768,
     desktop: 1024,
   };
   ```

3. Define scaling factors for orbital radii:
   ```javascript
   export const ORBIT_SCALE = {
     mobile: 1.0,    // Base (80-290px)
     tablet: 1.5,    // 1.5x (120-470px)
     desktop: 1.8,   // 1.8x (140-560px)
   };
   ```

4. Define minimum touch target size:
   ```javascript
   export const MIN_TOUCH_TARGET = 80; // pixels
   ```

5. Export animation durations:
   ```javascript
   export const ANIMATION = {
     zoomIn: 0.4,    // 400ms
     zoomOut: 0.3,   // 300ms
     hover: 0.2,     // 200ms
   };
   ```

**Acceptance Criteria:**
- ✅ Constants file created
- ✅ Breakpoints defined
- ✅ Scaling factors exported
- ✅ Animation timings defined
- ✅ No magic numbers in code

---

## Phase 3: Core Components

### Task 3.1: Create CelestialBody Component
**Priority:** High
**Estimated Time:** 45 minutes
**Dependencies:** Task 2.1

**Steps:**
1. Create `src/components/CelestialBody.jsx`
2. Implement component:
   ```javascript
   import { motion } from 'framer-motion';
   import { useState } from 'react';

   export default function CelestialBody({
     body,
     onClick,
     showLabel = false,
     size,
     position
   }) {
     const [imageError, setImageError] = useState(false);

     return (
       <motion.button
         className="absolute"
         style={{
           left: position.x,
           top: position.y,
           width: `${size}px`,
           height: `${size}px`,
         }}
         whileHover={{ scale: 1.15 }}
         whileTap={{ scale: 0.95 }}
         onClick={onClick}
         aria-label={`${body.names.en}, click to learn more`}
       >
         {/* Image or fallback colored circle */}
         {!imageError ? (
           <img
             src={body.imagePath}
             alt={body.names.en}
             onError={() => setImageError(true)}
             className="w-full h-full rounded-full object-cover"
           />
         ) : (
           <div
             className="w-full h-full rounded-full flex items-center justify-center"
             style={{ backgroundColor: body.color }}
           >
             <span className="text-white text-xs font-bold">
               {body.names.en.split(' ')[0]}
             </span>
           </div>
         )}

         {/* Optional label (tablet/desktop only) */}
         {showLabel && (
           <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm whitespace-nowrap">
             {body.names.en}
           </span>
         )}
       </motion.button>
     );
   }
   ```

3. Add hover effects (glow) in CSS
4. Handle image loading errors (fallback to colored circle)
5. Add accessibility labels (ARIA)

**Acceptance Criteria:**
- ✅ Component renders celestial body
- ✅ Framer Motion hover/tap animations work
- ✅ Image fallback to colored circle
- ✅ Optional label display
- ✅ Accessible (ARIA labels)
- ✅ Touch target 80px minimum

---

### Task 3.2: Create MainView Component
**Priority:** High
**Estimated Time:** 90 minutes
**Dependencies:** Tasks 2.1, 2.2, 3.1

**Steps:**
1. Create `src/components/MainView.jsx`
2. Implement layout:
   - Full viewport height
   - Dark space background
   - Centered solar system
   - SVG orbital paths (concentric circles)
   - Positioned celestial bodies

3. Calculate responsive positions:
   ```javascript
   import { useEffect, useState } from 'react';
   import { celestialBodies } from '../data/celestialBodies';
   import { ORBIT_SCALE } from '../data/constants';
   import CelestialBody from './CelestialBody';

   export default function MainView({ onSelectBody }) {
     const [scale, setScale] = useState(1.0);
     const [centerX, setCenterX] = useState(0);
     const [centerY, setCenterY] = useState(0);

     useEffect(() => {
       // Calculate scale based on viewport size
       const updateScale = () => {
         const width = window.innerWidth;
         if (width >= 1024) setScale(ORBIT_SCALE.desktop);
         else if (width >= 768) setScale(ORBIT_SCALE.tablet);
         else setScale(ORBIT_SCALE.mobile);

         setCenterX(window.innerWidth / 2);
         setCenterY(window.innerHeight / 2);
       };

       updateScale();
       window.addEventListener('resize', updateScale);
       return () => window.removeEventListener('resize', updateScale);
     }, []);

     return (
       <div className="relative w-screen h-screen bg-space overflow-hidden">
         {/* Background stars */}
         <div className="absolute inset-0" style={starsBackground} />

         {/* Orbital paths (SVG circles) */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
           {celestialBodies
             .filter(body => body.orbitRadius > 0)
             .map(body => (
               <circle
                 key={body.id}
                 cx={centerX}
                 cy={centerY}
                 r={body.orbitRadius * scale}
                 fill="none"
                 stroke="#2a3a52"
                 strokeWidth="1"
                 opacity="0.3"
               />
             ))}
         </svg>

         {/* Celestial bodies */}
         {celestialBodies.map((body, index) => {
           const angle = (index / (celestialBodies.length - 1)) * 2 * Math.PI;
           const x = centerX + Math.cos(angle) * body.orbitRadius * scale - (body.size * 5);
           const y = centerY + Math.sin(angle) * body.orbitRadius * scale - (body.size * 5);

           return (
             <CelestialBody
               key={body.id}
               body={body}
               onClick={() => onSelectBody(body)}
               showLabel={window.innerWidth >= 768}
               size={body.size * 10}
               position={{ x, y }}
             />
           );
         })}
       </div>
     );
   }
   ```

4. Add background stars (CSS or small divs)
5. Handle responsive scaling
6. Position Moon offset from Earth (not on orbital path)

**Acceptance Criteria:**
- ✅ Full-screen solar system view
- ✅ Dark space background with stars
- ✅ Orbital paths visible (subtle circles)
- ✅ All 10 bodies positioned correctly
- ✅ Sun centered, planets in order
- ✅ Moon offset from Earth
- ✅ Responsive (scales on mobile/tablet/desktop)
- ✅ Bodies clickable

---

### Task 3.3: Create DetailView Component
**Priority:** High
**Estimated Time:** 60 minutes
**Dependencies:** Task 2.1

**Steps:**
1. Create `src/components/DetailView.jsx`
2. Implement full-screen overlay:
   ```javascript
   import { motion } from 'framer-motion';
   import { useEffect, useRef, useState } from 'react';

   export default function DetailView({ body, onClose, language = 'en' }) {
     const audioRef = useRef(null);
     const [imageError, setImageError] = useState(false);

     useEffect(() => {
       // Play audio on mount
       if (audioRef.current) {
         audioRef.current.play().catch(err => {
           console.log('Audio autoplay blocked:', err);
         });
       }

       // Stop audio on unmount
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
         if (e.key === 'Escape') onClose();
       };
       window.addEventListener('keydown', handleEscape);
       return () => window.removeEventListener('keydown', handleEscape);
     }, [onClose]);

     return (
       <motion.div
         className="fixed inset-0 z-50 flex items-center justify-center"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
       >
         {/* Backdrop */}
         <div
           className="absolute inset-0 bg-black bg-opacity-85 backdrop-blur-sm"
           onClick={onClose}
         />

         {/* Content */}
         <motion.div
           className="relative z-10 flex flex-col items-center gap-6 p-8"
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 0.8, opacity: 0 }}
           transition={{ duration: 0.4, delay: 0.1 }}
         >
           {/* Back Button */}
           <button
             className="absolute top-4 left-4 w-20 h-20 flex items-center justify-center bg-black bg-opacity-60 rounded-full text-white text-4xl hover:scale-110 transition-transform"
             onClick={onClose}
             aria-label="Go back to solar system"
           >
             ←
           </button>

           {/* Planet Image */}
           {!imageError ? (
             <img
               src={body.imagePath}
               alt={body.names[language]}
               onError={() => setImageError(true)}
               className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full object-cover shadow-2xl"
             />
           ) : (
             <div
               className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full flex items-center justify-center shadow-2xl"
               style={{ backgroundColor: body.color }}
             >
               <span className="text-white text-6xl font-bold">
                 {body.names[language]}
               </span>
             </div>
           )}

           {/* Title */}
           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase text-center drop-shadow-lg">
             {body.names[language]}
           </h1>

           {/* Audio (hidden, auto-plays) */}
           <audio ref={audioRef} src={body.audioPath[language]} />
         </motion.div>
       </motion.div>
     );
   }
   ```

3. Add Framer Motion animations (zoom in/out)
4. Implement auto-play audio
5. Add back button (Unicode arrow)
6. Handle Escape key to close
7. Handle missing images/audio gracefully

**Acceptance Criteria:**
- ✅ Full-screen overlay with backdrop
- ✅ Large planet image (300-500px)
- ✅ Title in large text (48-72px)
- ✅ Back button (top-left, 80px, Unicode arrow)
- ✅ Audio auto-plays on open
- ✅ Audio stops on close
- ✅ Escape key closes view
- ✅ Click backdrop to close
- ✅ Framer Motion zoom animations
- ✅ Graceful fallbacks (missing assets)

---

### Task 3.4: Create Custom Audio Hook
**Priority:** Medium
**Estimated Time:** 30 minutes
**Dependencies:** None

**Steps:**
1. Create `src/hooks/useAudio.js`
2. Implement custom hook:
   ```javascript
   import { useEffect, useRef, useState } from 'react';

   export default function useAudio(audioPath) {
     const audioRef = useRef(null);
     const [isPlaying, setIsPlaying] = useState(false);
     const [error, setError] = useState(null);

     useEffect(() => {
       audioRef.current = new Audio(audioPath);

       const audio = audioRef.current;

       audio.addEventListener('play', () => setIsPlaying(true));
       audio.addEventListener('pause', () => setIsPlaying(false));
       audio.addEventListener('ended', () => setIsPlaying(false));
       audio.addEventListener('error', (e) => setError(e));

       return () => {
         audio.pause();
         audio.currentTime = 0;
       };
     }, [audioPath]);

     const play = () => {
       audioRef.current?.play().catch(err => {
         console.error('Audio play error:', err);
         setError(err);
       });
     };

     const pause = () => {
       audioRef.current?.pause();
     };

     const stop = () => {
       if (audioRef.current) {
         audioRef.current.pause();
         audioRef.current.currentTime = 0;
       }
     };

     return { play, pause, stop, isPlaying, error };
   }
   ```

3. (Optional) Use this hook in DetailView for better audio control

**Acceptance Criteria:**
- ✅ Custom hook created
- ✅ Play/pause/stop functions
- ✅ Error handling
- ✅ Cleanup on unmount
- ✅ Can be reused across components

---

## Phase 4: App Integration

### Task 4.1: Update App.jsx (Main App Component)
**Priority:** High
**Estimated Time:** 30 minutes
**Dependencies:** Tasks 3.2, 3.3

**Steps:**
1. Edit `src/App.jsx`:
   ```javascript
   import { useState } from 'react';
   import { AnimatePresence } from 'framer-motion';
   import MainView from './components/MainView';
   import DetailView from './components/DetailView';

   export default function App() {
     const [selectedBody, setSelectedBody] = useState(null);
     const [language] = useState('en'); // Phase 1: English only

     const handleSelectBody = (body) => {
       setSelectedBody(body);
     };

     const handleCloseDetail = () => {
       setSelectedBody(null);
     };

     return (
       <div className="w-screen h-screen overflow-hidden">
         <MainView onSelectBody={handleSelectBody} />

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
     );
   }
   ```

2. Remove default Vite/React boilerplate
3. Remove `App.css` (using Tailwind instead)
4. Test component integration

**Acceptance Criteria:**
- ✅ App.jsx manages state (selectedBody, language)
- ✅ MainView and DetailView integrated
- ✅ AnimatePresence wraps DetailView for exit animations
- ✅ Click body → opens DetailView
- ✅ Close DetailView → returns to MainView
- ✅ No errors in console

---

### Task 4.2: Update main.jsx (Entry Point)
**Priority:** High
**Estimated Time:** 5 minutes
**Dependencies:** Task 4.1

**Steps:**
1. Edit `src/main.jsx`:
   ```javascript
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import App from './App.jsx'
   import './index.css'

   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
   )
   ```

2. Ensure `index.css` is imported
3. Verify no errors

**Acceptance Criteria:**
- ✅ App renders correctly
- ✅ CSS imported
- ✅ StrictMode enabled (React best practice)

---

### Task 4.3: Update index.html (Page Title & Meta)
**Priority:** Low
**Estimated Time:** 5 minutes
**Dependencies:** None

**Steps:**
1. Edit `index.html`:
   ```html
   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <link rel="icon" type="image/svg+xml" href="/vite.svg" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta name="description" content="Solar System Explorer - Learn the planets for kids" />
       <title>Solar System Explorer</title>
     </head>
     <body>
       <div id="root"></div>
       <script type="module" src="/src/main.jsx"></script>
     </body>
   </html>
   ```

2. Add meta description
3. Update title

**Acceptance Criteria:**
- ✅ Page title updated
- ✅ Meta description added
- ✅ Viewport meta tag correct

---

## Phase 5: Styling & Visual Polish

### Task 5.1: Add Background Stars Effect
**Priority:** Medium
**Estimated Time:** 30 minutes
**Dependencies:** Task 3.2

**Steps:**
1. Create star background using CSS `box-shadow` trick:
   ```javascript
   // In MainView.jsx, add helper function
   const generateStars = (count) => {
     const stars = [];
     for (let i = 0; i < count; i++) {
       stars.push({
         x: Math.random() * 100,
         y: Math.random() * 100,
         size: Math.random() * 2 + 1,
         opacity: Math.random() * 0.7 + 0.3,
       });
     }
     return stars;
   };

   const [stars] = useState(() => generateStars(150));
   ```

2. Render stars as small divs or use CSS `box-shadow`
3. Ensure stars are static (no animation)
4. Optimize performance (use CSS transforms)

**Acceptance Criteria:**
- ✅ 100-200 white stars on dark background
- ✅ Random positions and sizes
- ✅ Static (no twinkling/animation)
- ✅ Performance optimized
- ✅ Visible but not distracting

---

### Task 5.2: Add Glow Effects to Celestial Bodies
**Priority:** Medium
**Estimated Time:** 20 minutes
**Dependencies:** Task 3.1

**Steps:**
1. Add CSS classes for hover glow:
   ```css
   /* In index.css or Tailwind config */
   .celestial-body:hover {
     filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));
   }
   ```

2. Or use Tailwind + inline styles:
   ```javascript
   // In CelestialBody.jsx
   whileHover={{
     scale: 1.15,
     filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))'
   }}
   ```

3. Test on all bodies
4. Ensure glow matches planet color (optional enhancement)

**Acceptance Criteria:**
- ✅ Hover/touch shows white glow around body
- ✅ Smooth transition
- ✅ Works on all 10 bodies
- ✅ Not too bright (subtle effect)

---

### Task 5.3: Add Text Shadows for Readability
**Priority:** Low
**Estimated Time:** 10 minutes
**Dependencies:** Tasks 3.1, 3.3

**Steps:**
1. Add text shadows to labels and titles:
   ```javascript
   // In CelestialBody.jsx (labels)
   className="... drop-shadow-lg"
   // or inline style
   style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}

   // In DetailView.jsx (title)
   className="... drop-shadow-2xl"
   ```

2. Test readability on all backgrounds
3. Ensure high contrast

**Acceptance Criteria:**
- ✅ All text has drop shadow
- ✅ Text readable over images
- ✅ High contrast (WCAG AA)

---

### Task 5.4: Optimize for Mobile (Touch Feedback)
**Priority:** High
**Estimated Time:** 20 minutes
**Dependencies:** Task 3.1

**Steps:**
1. Test touch interactions on mobile device or emulator
2. Ensure 80px minimum touch targets
3. Add visual feedback on tap (scale down slightly)
4. Prevent double-tap zoom:
   ```css
   /* In index.css */
   * {
     touch-action: manipulation;
   }
   ```

5. Test on iOS Safari and Chrome Mobile

**Acceptance Criteria:**
- ✅ All bodies tappable with 80px+ targets
- ✅ Visual feedback on tap
- ✅ No accidental zooming
- ✅ Works on iOS and Android

---

## Phase 6: Asset Integration

### Task 6.1: Prepare Asset Folders (User Instruction)
**Priority:** High
**Estimated Time:** 10 minutes (user task)
**Dependencies:** Task 1.4

**User Instructions:**
1. You (the user) should add your 10 PNG images to `/public/images/`:
   - `Sun.png`
   - `Mercury.png`
   - `Venus.png`
   - `Earth.png`
   - `Moon.png`
   - `Mars.png`
   - `Jupiter.png`
   - `Saturn.png`
   - `Uranus.png`
   - `Neptune.png`

2. You should rename and add your 10 MP3 audio files to `/public/audio/en/`:
   - `sun-en.mp3`
   - `mercury-en.mp3`
   - `venus-en.mp3`
   - `earth-en.mp3`
   - `moon-en.mp3`
   - `mars-en.mp3`
   - `jupiter-en.mp3`
   - `saturn-en.mp3`
   - `uranus-en.mp3`
   - `neptune-en.mp3`

**Acceptance Criteria:**
- ✅ All 10 image files in `/public/images/`
- ✅ All 10 audio files in `/public/audio/en/`
- ✅ File names match exactly (case-sensitive)
- ✅ Images are PNG format
- ✅ Audio files are MP3 format

---

### Task 6.2: Test Image Loading
**Priority:** High
**Estimated Time:** 15 minutes
**Dependencies:** Task 6.1

**Steps:**
1. Start dev server: `npm run dev`
2. Open app in browser
3. Verify all 10 images load correctly in MainView
4. Click each body, verify image loads in DetailView
5. Test fallback: Temporarily rename an image, verify colored circle appears
6. Fix any path issues

**Acceptance Criteria:**
- ✅ All 10 images load in MainView
- ✅ All 10 images load in DetailView
- ✅ No broken image icons
- ✅ Fallback colored circle works if image missing
- ✅ No console errors

---

### Task 6.3: Test Audio Playback
**Priority:** High
**Estimated Time:** 15 minutes
**Dependencies:** Task 6.1

**Steps:**
1. Click on each celestial body (all 10)
2. Verify audio plays automatically in DetailView
3. Verify audio is clear and correct pronunciation
4. Test audio stops when closing DetailView
5. Test audio stops when clicking another body (shouldn't overlap)
6. Test on different browsers (Chrome, Firefox, Safari)
7. Handle autoplay blocking (some browsers block autoplay):
   - Show error message if audio blocked
   - Add "Tap to play audio" button as fallback

**Acceptance Criteria:**
- ✅ All 10 audio files play correctly
- ✅ Audio auto-plays (if browser allows)
- ✅ Audio stops on close
- ✅ No audio overlap
- ✅ Graceful fallback if autoplay blocked
- ✅ Works on Chrome, Firefox, Safari

---

## Phase 7: Testing & Bug Fixes

### Task 7.1: Manual Testing - Core Functionality
**Priority:** High
**Estimated Time:** 30 minutes
**Dependencies:** All previous tasks

**Test Cases:**
1. **Main View:**
   - ✅ All 10 bodies visible
   - ✅ Sun centered
   - ✅ Planets in order (Mercury → Neptune)
   - ✅ Moon near Earth
   - ✅ Orbital paths visible
   - ✅ Background stars visible

2. **Interactions:**
   - ✅ Hover shows glow effect (desktop)
   - ✅ Click/tap opens DetailView
   - ✅ All 10 bodies clickable

3. **Detail View:**
   - ✅ Large image displayed
   - ✅ Title shown correctly
   - ✅ Audio plays automatically
   - ✅ Back button works
   - ✅ Escape key closes view
   - ✅ Click backdrop closes view

4. **Animations:**
   - ✅ Zoom in smooth (400ms)
   - ✅ Zoom out smooth (300ms)
   - ✅ Hover scale smooth (200ms)
   - ✅ No janky animations

**Acceptance Criteria:**
- ✅ All test cases pass
- ✅ No visual glitches
- ✅ No console errors

---

### Task 7.2: Manual Testing - Responsive Design
**Priority:** High
**Estimated Time:** 30 minutes
**Dependencies:** Task 7.1

**Test Devices/Sizes:**
1. **Mobile (375px - iPhone SE):**
   - ✅ All bodies visible and tappable
   - ✅ Labels hidden
   - ✅ Orbital paths scaled correctly
   - ✅ DetailView image 300px
   - ✅ Title 48px
   - ✅ No horizontal scrolling

2. **Tablet (768px - iPad):**
   - ✅ Larger orbital radii
   - ✅ Labels visible below bodies
   - ✅ DetailView image 400px
   - ✅ Title 64px

3. **Desktop (1024px+):**
   - ✅ Full orbital radii
   - ✅ Labels visible
   - ✅ DetailView image 500px
   - ✅ Title 72px
   - ✅ Hover effects work with mouse

**Acceptance Criteria:**
- ✅ App works on all screen sizes
- ✅ No layout breaks
- ✅ Touch targets adequate on mobile
- ✅ Text readable on all sizes

---

### Task 7.3: Accessibility Testing
**Priority:** Medium
**Estimated Time:** 20 minutes
**Dependencies:** Task 7.1

**Test Cases:**
1. **Keyboard Navigation:**
   - ✅ Tab through all celestial bodies
   - ✅ Enter/Space activates selected body
   - ✅ Escape closes DetailView
   - ✅ Focus indicators visible

2. **Screen Reader:**
   - ✅ ARIA labels read correctly
   - ✅ Planet names announced
   - ✅ Back button labeled

3. **Color Contrast:**
   - ✅ White text on dark background (WCAG AA)
   - ✅ Labels readable
   - ✅ Planet colors distinct

**Tools:**
- Chrome DevTools Lighthouse (Accessibility audit)
- WAVE browser extension
- Manual keyboard testing

**Acceptance Criteria:**
- ✅ Lighthouse Accessibility score 90+
- ✅ Keyboard navigation works
- ✅ ARIA labels correct
- ✅ WCAG AA compliant

---

### Task 7.4: Performance Testing
**Priority:** Medium
**Estimated Time:** 15 minutes
**Dependencies:** Task 7.1

**Test Cases:**
1. **Load Time:**
   - ✅ Initial page load under 3 seconds
   - ✅ Images load progressively
   - ✅ No blocking resources

2. **Animation Performance:**
   - ✅ 60fps animations (use DevTools Performance tab)
   - ✅ No dropped frames during zoom
   - ✅ Smooth hover effects

3. **Memory Usage:**
   - ✅ No memory leaks
   - ✅ Audio cleanup on component unmount

**Tools:**
- Chrome DevTools Performance tab
- Lighthouse Performance audit
- Network throttling (test on slow 3G)

**Acceptance Criteria:**
- ✅ Lighthouse Performance score 90+
- ✅ No performance warnings in console
- ✅ Smooth on mobile devices

---

### Task 7.5: Browser Compatibility Testing
**Priority:** Medium
**Estimated Time:** 20 minutes
**Dependencies:** Task 7.1

**Test Browsers:**
1. **Chrome (latest):** ✅
2. **Firefox (latest):** ✅
3. **Safari (latest):** ✅
4. **Edge (latest):** ✅
5. **iOS Safari (mobile):** ✅
6. **Chrome Mobile (Android):** ✅

**Test:**
- Basic functionality
- Audio playback
- Animations
- Touch interactions (mobile)

**Acceptance Criteria:**
- ✅ Works on all major browsers
- ✅ No browser-specific bugs
- ✅ Audio plays on all platforms

---

### Task 7.6: Fix Bugs & Polish
**Priority:** High
**Estimated Time:** Variable (1-3 hours)
**Dependencies:** Tasks 7.1-7.5

**Common Issues to Address:**
- Audio autoplay blocking (add fallback UI)
- Image loading delays (add loading spinner)
- Responsive layout tweaks
- Animation timing adjustments
- Color/contrast improvements
- Performance optimizations

**Acceptance Criteria:**
- ✅ All critical bugs fixed
- ✅ App feels polished
- ✅ No known issues

---

## Phase 8: Documentation

### Task 8.1: Create README.md
**Priority:** High
**Estimated Time:** 30 minutes
**Dependencies:** All development tasks complete

**Steps:**
1. Create `README.md` in project root
2. Include sections:
   - Project description
   - Features
   - Tech stack
   - Installation instructions
   - Running locally (`npm run dev`)
   - Building for production (`npm run build`)
   - Asset requirements (images, audio)
   - File naming conventions
   - Deployment instructions (Vercel)
   - Phase 2 roadmap (Portuguese)
   - Credits

**Example Structure:**
```markdown
# Solar System Explorer

An interactive educational app for 4-5 year old children to learn celestial bodies.

## Features
- 10 celestial bodies (Sun, 8 planets, Moon)
- Interactive zoom-in view
- Audio pronunciation (English)
- Kid-friendly design (large touch targets)
- Responsive (mobile, tablet, desktop)

## Tech Stack
- React 18
- Vite 5
- Framer Motion 11
- Tailwind CSS 3

## Installation
\`\`\`bash
npm install
\`\`\`

## Run Locally
\`\`\`bash
npm run dev
\`\`\`

## Build for Production
\`\`\`bash
npm run build
\`\`\`

## Adding Your Assets
[Instructions for images and audio]

## Deployment
[Vercel deployment steps]

## Phase 2 Roadmap
- Portuguese language support
- Language toggle UI
```

**Acceptance Criteria:**
- ✅ README.md complete
- ✅ Clear instructions
- ✅ All sections included
- ✅ Markdown formatting correct

---

### Task 8.2: Add Code Comments
**Priority:** Low
**Estimated Time:** 20 minutes
**Dependencies:** All development tasks

**Steps:**
1. Add JSDoc comments to functions:
   ```javascript
   /**
    * Calculates the position of a celestial body on screen
    * @param {CelestialBody} body - The celestial body object
    * @param {number} scale - The responsive scale factor
    * @returns {{x: number, y: number}} Position coordinates
    */
   ```

2. Add inline comments for complex logic
3. Document component props
4. Explain non-obvious code sections

**Acceptance Criteria:**
- ✅ All major functions documented
- ✅ Component props documented
- ✅ Complex logic explained
- ✅ Code maintainable by others

---

## Phase 9: Build & Deployment

### Task 9.1: Test Production Build
**Priority:** High
**Estimated Time:** 15 minutes
**Dependencies:** All development tasks complete

**Steps:**
1. Run production build:
   ```bash
   npm run build
   ```

2. Preview production build:
   ```bash
   npm run preview
   ```

3. Test in browser (http://localhost:4173)
4. Verify:
   - All features work
   - Assets load correctly
   - No console errors
   - Performance is good
   - Build size is reasonable (<10MB)

**Acceptance Criteria:**
- ✅ Build completes without errors
- ✅ Preview works correctly
- ✅ All features functional in production build
- ✅ Bundle size optimized

---

### Task 9.2: Deploy to Vercel
**Priority:** High
**Estimated Time:** 20 minutes
**Dependencies:** Task 9.1

**Steps:**

**Option A: Vercel CLI (Fastest)**
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow prompts (accept defaults)
5. Get deployment URL (e.g., `https://solar-system-explorer.vercel.app`)

**Option B: Vercel Git Integration**
1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Solar System Explorer"
   git remote add origin [YOUR_GITHUB_REPO_URL]
   git push -u origin main
   ```

2. Go to vercel.com
3. Sign in with GitHub
4. Click "New Project"
5. Import your GitHub repository
6. Accept default settings (Vite framework auto-detected)
7. Click "Deploy"
8. Wait 2-3 minutes
9. Get deployment URL

**Acceptance Criteria:**
- ✅ App deployed to Vercel
- ✅ URL accessible online
- ✅ All features work on deployed version
- ✅ Assets load correctly
- ✅ No 404 errors

---

### Task 9.3: Test Deployed App
**Priority:** High
**Estimated Time:** 15 minutes
**Dependencies:** Task 9.2

**Steps:**
1. Open deployed URL on multiple devices:
   - Desktop computer
   - Tablet (if available)
   - Mobile phone

2. Test all features:
   - Main view loads
   - All 10 bodies visible
   - Click/tap bodies
   - DetailView opens
   - Audio plays
   - Back button works
   - Responsive on all devices

3. Test on different browsers (mobile and desktop)

4. Share URL with family/friends for testing

**Acceptance Criteria:**
- ✅ App works on deployed URL
- ✅ Tested on mobile and desktop
- ✅ Tested on multiple browsers
- ✅ No issues found
- ✅ Ready for use!

---

## Phase 10: Phase 2 Preparation (Future)

### Task 10.1: Document Phase 2 Tasks (Future)
**Priority:** Low
**Estimated Time:** 30 minutes
**Dependencies:** Phase 1 complete

**When implementing Phase 2 (Portuguese language support):**

1. **Add Portuguese Translations:**
   - Update `celestialBodies.js` with Portuguese names (already structured)
   - No code changes needed (data already supports it)

2. **Add Portuguese Audio Files:**
   - User adds 10 MP3 files to `/public/audio/pt/`
   - Naming: `sun-pt.mp3`, `mercury-pt.mp3`, etc.

3. **Create LanguageToggle Component:**
   - New file: `src/components/LanguageToggle.jsx`
   - Button group or toggle switch (EN | PT)
   - Position: top-right corner of MainView

4. **Update App.jsx:**
   - Add language state (useState for 'en' or 'pt')
   - Pass language to MainView and DetailView
   - Update on toggle click

5. **Test:**
   - Toggle switches text instantly
   - Audio loads correct language file
   - All 10 bodies work in both languages

**Estimated Time for Phase 2:** 2-3 hours

**Acceptance Criteria:**
- ✅ Phase 2 tasks documented
- ✅ Ready for future implementation
- ✅ No code refactoring needed (architecture supports it)

---

## Summary & Timeline

### Total Estimated Time: 10-15 hours

| Phase | Tasks | Time Estimate |
|-------|-------|---------------|
| 1. Project Setup | 5 tasks | 45 min |
| 2. Data Structure | 2 tasks | 45 min |
| 3. Core Components | 4 tasks | 3.5 hours |
| 4. App Integration | 3 tasks | 40 min |
| 5. Styling & Polish | 4 tasks | 1.5 hours |
| 6. Asset Integration | 3 tasks | 40 min |
| 7. Testing & Bugs | 6 tasks | 2.5 hours |
| 8. Documentation | 2 tasks | 50 min |
| 9. Deployment | 3 tasks | 50 min |
| **Total** | **32 tasks** | **12-15 hours** |

### Recommended Schedule

**Day 1 (4-5 hours):**
- Phase 1: Project Setup
- Phase 2: Data Structure
- Phase 3: Core Components (start)

**Day 2 (4-5 hours):**
- Phase 3: Core Components (finish)
- Phase 4: App Integration
- Phase 5: Styling & Polish

**Day 3 (3-4 hours):**
- Phase 6: Asset Integration
- Phase 7: Testing & Bug Fixes
- Phase 8: Documentation
- Phase 9: Deployment

---

## Task Tracking Checklist

### Phase 1: Setup ✅
- [ ] 1.1 Initialize Vite + React
- [ ] 1.2 Install Dependencies
- [ ] 1.3 Configure Tailwind CSS
- [ ] 1.4 Create Folder Structure
- [ ] 1.5 Test Dev Server

### Phase 2: Data ✅
- [ ] 2.1 Create Celestial Bodies Data
- [ ] 2.2 Create Constants

### Phase 3: Components ✅
- [ ] 3.1 CelestialBody Component
- [ ] 3.2 MainView Component
- [ ] 3.3 DetailView Component
- [ ] 3.4 Custom Audio Hook

### Phase 4: Integration ✅
- [ ] 4.1 Update App.jsx
- [ ] 4.2 Update main.jsx
- [ ] 4.3 Update index.html

### Phase 5: Styling ✅
- [ ] 5.1 Background Stars
- [ ] 5.2 Glow Effects
- [ ] 5.3 Text Shadows
- [ ] 5.4 Mobile Touch Feedback

### Phase 6: Assets ✅
- [ ] 6.1 Prepare Asset Folders (User)
- [ ] 6.2 Test Image Loading
- [ ] 6.3 Test Audio Playback

### Phase 7: Testing ✅
- [ ] 7.1 Manual Testing - Core
- [ ] 7.2 Manual Testing - Responsive
- [ ] 7.3 Accessibility Testing
- [ ] 7.4 Performance Testing
- [ ] 7.5 Browser Compatibility
- [ ] 7.6 Fix Bugs & Polish

### Phase 8: Documentation ✅
- [ ] 8.1 Create README.md
- [ ] 8.2 Add Code Comments

### Phase 9: Deployment ✅
- [ ] 9.1 Test Production Build
- [ ] 9.2 Deploy to Vercel
- [ ] 9.3 Test Deployed App

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-27 | Initial | Tasks document created with 32 actionable tasks across 9 phases |

---

**End of Tasks Document**

🚀 **Ready to start building your Solar System Explorer!**

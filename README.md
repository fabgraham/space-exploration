# Solar System Explorer

Interactive solar-system viewing experience built with React + Vite for 4–5 year olds. Phase 1 ships with an English-only interface, bright star-filled visuals, touch-friendly interactions, zooming detail screens, and auto-play audio pronunciations.

## Getting Started

```bash
npm install
npm run dev
```

- Dev server runs on http://localhost:5173 by default
- `npm run build` creates a production bundle with Vite
- `npm run preview` serves the production build locally

## Project Highlights

- Main overview lines up the Sun, eight planets, and the Moon from left to right with layered starfields and sparkles
- Tap/click a body to zoom smoothly into a detail view with a large visual, title, and audio pronunciation
- Framer Motion drives the shared-element zoom animation and transitions
- Tailwind CSS powers the bright, kid-friendly palette and ensures 80px+ touch targets
- Uses the PNG artwork in `public/images` by default, with colourful fallbacks only when a file is missing

## Updating Images and Audio

### 1. Planet Images

1. Place high-resolution PNG/JPG files in `public/images/`
2. Update each entry in `src/data/celestialBodies.js`:
   - Point `imagePath` at your asset (e.g. `/images/mercury.png`)
   - (Optional) Tweak `imageScale`, `imagePadding`, or `detailPadding` to fine-tune how the planet sits inside its circular frame
3. Keep files square where possible (≥ 800×800 px). Transparent backgrounds help the glow effects.

### 2. Pronunciation Audio

1. Add English MP3/OGG files to `public/audio/en/`
2. (Optional) Add Portuguese files to `public/audio/pt/` for Phase 2
3. Keep filenames lowercase and matching the IDs in `celestialBodies.js` (e.g. `jupiter.mp3`)
4. Ensure filenames stay lowercase and match the IDs. The UI automatically uses your clips when present.

### 3. Enabling Portuguese (Phase 2)

All PT-BR strings and audio paths are stubbed in `celestialBodies.js`. To enable the toggle later:

1. Add a language state + toggle button to `App.jsx`
2. Pass the active language down to `MainView` and `CelestialBody` (for labels) and to `DetailView`
3. Provide Portuguese audio clips in `public/audio/pt/`

## Folder Structure

```
space-exploration/
├── public/
│   ├── audio/
│   │   ├── en/          # English audio (Phase 1 live)
│   │   └── pt/          # Portuguese audio (Phase 2 placeholder)
│   └── images/          # Optional real artwork
├── src/
│   ├── components/      # MainView, DetailView, CelestialBody
│   ├── data/            # Celestial body definitions and constants
│   ├── hooks/           # Re-usable hooks (audio utilities)
│   ├── App.jsx          # Entry composition
│   ├── index.css        # Tailwind setup + global styles
│   └── main.jsx         # React root
└── ...
```

## Accessibility & Performance Notes

- Minimum 80×80px touch targets on all bodies and controls
- Stars respect `prefers-reduced-motion` via CSS keyframes (can be tuned further if needed)
- Audio auto-plays after a slight delay; browsers that block autoplay simply show the 🔊 indicator
- Layout and animation tuned for 375px+ mobile screens, scaling up to desktop

## Troubleshooting

- If audio fails to autoplay, interact with the page once (browser policy) and tap the body again
- When swapping assets, clear your browser cache or run `npm run dev -- --force` to bust Vite asset caches
- If planets overlap on extremely small screens, reduce orbit scale values in `src/data/constants.js`

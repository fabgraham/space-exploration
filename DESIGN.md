# Solar System Explorer - Design Document

## Project Overview

**Project Name:** Solar System Explorer
**Version:** Phase 1 MVP (English Only)
**Target Audience:** Children aged 4-5 years old
**Design Philosophy:** Kid-friendly, bright, educational, simple, touch-optimized

---

## 1. Design System

### 1.1 Color Palette

#### Celestial Body Colors
Each celestial body has a distinct color scheme for easy recognition:

| Body | Primary Color | Hex Code | Usage |
|------|---------------|----------|-------|
| **Sun** | Bright Yellow-Orange | `#FDB813` | Main body color |
| **Mercury** | Gray-Brown | `#8C7853` | Rocky appearance |
| **Venus** | Yellow-Cream | `#FFC649` | Thick atmosphere |
| **Earth** | Blue-Green | `#4A90E2` | Oceans and land |
| **Moon** | Light Gray | `#C0C0C0` | Rocky satellite |
| **Mars** | Red-Orange | `#CD5C5C` | Red planet |
| **Jupiter** | Orange-Brown | `#C88B3A` | Gas giant |
| **Saturn** | Golden Yellow | `#FAD5A5` | Ringed planet |
| **Uranus** | Cyan-Blue | `#4FD0E7` | Ice giant |
| **Neptune** | Deep Blue | `#4166F5` | Ocean blue |

#### UI Colors

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| **Background (Space)** | Near Black | `#0a0e27` | Main view background |
| **Stars** | White | `#FFFFFF` | Background stars (static) |
| **Orbital Paths** | Dark Gray (subtle) | `#2a3a52` | Concentric circles |
| **Text (Light)** | White | `#FFFFFF` | Body names, titles |
| **Text (Shadow)** | Black (50% opacity) | `rgba(0,0,0,0.5)` | Text shadow for readability |
| **Detail View Backdrop** | Black (80% opacity) | `rgba(0,0,0,0.8)` | Semi-transparent overlay |
| **Interactive Hover** | White Glow | `rgba(255,255,255,0.3)` | Hover/active state |

### 1.2 Typography

#### Font Families
```css
/* Primary Font (Headings, Body Names) */
font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif;

/* Fallback System Fonts */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

#### Font Sizes (Mobile-First)

| Element | Mobile (375px+) | Tablet (768px+) | Desktop (1024px+) | Weight |
|---------|-----------------|-----------------|-------------------|--------|
| **Detail View Title** | 48px | 64px | 72px | Bold (700) |
| **Main View Labels** | 16px | 20px | 24px | Medium (500) |
| **Back Button** | 40px | 48px | 48px | Regular (400) |
| **Body Text** | 18px | 20px | 24px | Regular (400) |

#### Text Styling
- **High Contrast:** White text on dark backgrounds
- **Text Shadow:** `0 2px 4px rgba(0,0,0,0.5)` for readability over images
- **Letter Spacing:** +0.5px for better legibility
- **Line Height:** 1.4 for readability

### 1.3 Spacing & Layout

#### Touch Targets
- **Minimum Size:** 80px × 80px (all interactive elements)
- **Recommended Size:** 100px+ for primary actions
- **Spacing Between:** Minimum 16px gap between interactive elements

#### Padding & Margins
```css
/* Base spacing scale (mobile) */
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 32px;
--spacing-xl: 48px;
```

#### Safe Areas
- **Mobile:** 16px padding from screen edges
- **Tablet:** 24px padding from screen edges
- **Desktop:** 32px padding from screen edges

---

## 2. Main View (Solar System Overview)

### 2.1 Layout Structure

#### Visual Hierarchy
```
┌─────────────────────────────────────┐
│  Space Background (dark, stars)    │
│                                     │
│     Orbital Path (Neptune)         │
│   Orbital Path (Uranus)           │
│  Orbital Path (Saturn)            │
│   Orbital Path (Jupiter)          │
│    Orbital Path (Mars)            │
│     Orbital Path (Earth)          │
│       w/ Moon nearby              │
│      Orbital Path (Venus)         │
│       Orbital Path (Mercury)      │
│                                    │
│          ☀️ SUN (center)          │
│                                    │
└─────────────────────────────────────┘
```

#### Responsive Orbital Radii

| Planet | Mobile (375px) | Tablet (768px) | Desktop (1024px+) | Size (diameter) |
|--------|----------------|----------------|-------------------|-----------------|
| **Sun** | 0px (center) | 0px (center) | 0px (center) | 80-120px |
| **Mercury** | 80px | 120px | 140px | 40-50px |
| **Venus** | 110px | 170px | 200px | 50-60px |
| **Earth** | 140px | 220px | 260px | 60-70px |
| **Moon** | +30px offset | +40px offset | +50px offset | 25-35px |
| **Mars** | 170px | 270px | 320px | 50-60px |
| **Jupiter** | 200px | 320px | 380px | 90-110px |
| **Saturn** | 230px | 370px | 440px | 80-100px |
| **Uranus** | 260px | 420px | 500px | 60-75px |
| **Neptune** | 290px | 470px | 560px | 60-75px |

**Note:** Sizes are semi-realistic (Jupiter largest, Mercury smallest) but all maintain 80px+ touch targets with padding.

### 2.2 Celestial Body Component Design

#### Visual Structure (Each Body)
```
┌──────────────┐
│   ┌────┐    │  ← Circular image/colored circle
│   │    │    │  ← Minimum 40px diameter (visual)
│   │ 🪐 │    │  ← Within 80px+ touch target
│   │    │    │
│   └────┘    │
│   Label     │  ← Body name (optional on mobile)
└──────────────┘
   80px × 80px min (touch target)
```

#### States

**Normal (Default):**
- Image/colored circle at 100% scale
- Opacity: 1
- No border
- Subtle shadow: `0 4px 8px rgba(0,0,0,0.4)`

**Hover (Desktop) / Active (Touch):**
- Scale: 1.15 (transform)
- Opacity: 1
- White glow: `box-shadow: 0 0 20px rgba(255,255,255,0.4)`
- Cursor: pointer
- Transition: 200ms ease-out

**Pressed (Click/Tap):**
- Scale: 0.95 (instant feedback)
- Transition: 100ms ease-in

#### Label Positioning
- **Mobile (< 768px):** Labels hidden (to reduce clutter)
- **Tablet/Desktop (768px+):** Labels below body, 8px gap
- **Font:** 16-24px, white, text-shadow for readability

### 2.3 Orbital Paths

**Visual Style:**
- Stroke: `#2a3a52` (dark gray, subtle)
- Stroke Width: 1-2px
- Opacity: 0.3 (subtle guides)
- No fill

**Purpose:**
- Visual guide to show orbital structure
- Educational (shows solar system organization)
- Non-interactive (decorative only)

### 2.4 Background (Space Theme)

#### Base Background
- Color: `#0a0e27` (dark blue-black)
- Gradient (optional): Radial gradient from center
  - Center: `#0f1628`
  - Edges: `#0a0e27`

#### Stars
- **Implementation:** Small white dots (`#FFFFFF`)
- **Size:** 1-3px diameter
- **Distribution:** Randomly scattered (100-200 stars)
- **Opacity:** Random 0.3-1.0 for depth
- **Animation:** None (static, per design preference)
- **Implementation Note:** Can use CSS `box-shadow` for performance

### 2.5 Moon Positioning

**Layout Strategy:** Offset from Earth (not orbiting)
- **Position:** 30-50px to the right or below Earth
- **Reasoning:** Easier for small fingers to tap separately
- **Visual Connection:** Slightly closer to Earth than other bodies
- **Size:** 25-35px diameter (smaller than Earth)

---

## 3. Detail View (Zoomed-In Body)

### 3.1 Layout Structure

```
┌─────────────────────────────────────────┐
│  ← Back Button      [Backdrop: dark]   │
│  (top-left)                             │
│                                         │
│                                         │
│            ┌───────────┐               │
│            │           │               │
│            │  Planet   │  400-500px    │
│            │   Image   │               │
│            │           │               │
│            └───────────┘               │
│                                         │
│              MERCURY                    │
│           (Large Title)                 │
│                                         │
│           🔊 Audio plays                │
│                                         │
└─────────────────────────────────────────┘
```

### 3.2 Backdrop Overlay

**Styling:**
- Background: `rgba(0,0,0,0.85)` (85% black)
- Position: Fixed, covers entire viewport
- Z-index: 100 (above main view)
- Blur effect (optional): `backdrop-filter: blur(10px)`

**Interaction:**
- Optional: Click backdrop to return to Main View
- Provides visual focus on selected body

### 3.3 Content Container

**Positioning:**
- Centered vertically and horizontally
- Max-width: 600px
- Padding: 32px on all sides (mobile: 16px)

**Layout:**
```
┌─────────────────────┐
│  Back Button (↩)   │  ← Top-left corner
│                     │
│  [Planet Image]     │  ← Centered, 400-500px
│                     │
│     MERCURY         │  ← Title (48-72px, bold)
│                     │
│  (Audio auto-plays) │  ← Invisible, plays on load
└─────────────────────┘
```

### 3.4 Back Button

**Visual Design:**
- **Icon:** Unicode arrow `←` or `↩`
- **Size:** 80px × 80px minimum (touch target)
- **Visual Size:** 40-48px icon
- **Position:** Top-left corner (16-24px from edges)
- **Background:** Semi-transparent dark circle
  - `rgba(0,0,0,0.6)`
  - Border-radius: 50% (fully circular)
- **Text Color:** White (`#FFFFFF`)
- **Font Size:** 40-48px

**States:**
- **Normal:** Opacity 0.9
- **Hover/Active:** Opacity 1, scale 1.1
- **Pressed:** Scale 0.95

**Accessibility:**
- ARIA label: "Go back to solar system"
- Role: button
- Keyboard accessible: Enter/Space triggers

### 3.5 Planet Image

**Sizing:**
- **Mobile (< 768px):** 300px × 300px
- **Tablet (768-1023px):** 400px × 400px
- **Desktop (1024px+):** 500px × 500px

**Styling:**
- Border-radius: 50% (perfect circle)
- Box-shadow: `0 8px 32px rgba(0,0,0,0.6)` (depth)
- Optional: Subtle glow matching planet color
  - Example: `0 0 60px rgba(253,184,19,0.4)` for Sun

**Fallback (if image missing):**
- Colored CSS circle using `color` from data
- SVG gradient for visual interest
- Label inside circle if image fails to load

### 3.6 Title (Body Name)

**Typography:**
- **Font Size:** 48px (mobile), 64px (tablet), 72px (desktop)
- **Font Weight:** Bold (700)
- **Color:** White (`#FFFFFF`)
- **Text Transform:** Uppercase
- **Text Align:** Center
- **Margin:** 24px above title (gap from image)

**Text Shadow:**
- `0 4px 8px rgba(0,0,0,0.7)` for readability

**Examples:**
- MERCURY
- VENUS
- EARTH
- THE SUN (for Sun)
- THE MOON (for Moon)

### 3.7 Audio Indicator (Optional)

**Purpose:** Visual feedback that audio is playing

**Design (Optional):**
- Small pulsing audio icon: 🔊
- Position: Below title, center
- Size: 32px
- Animation: Gentle pulse (scale 1.0 → 1.1 → 1.0)
- Duration: 1s infinite loop
- Opacity: 0.7

**Alternative:** No visual indicator (audio just plays)

---

## 4. Animations

### 4.1 Zoom In (Main View → Detail View)

**Trigger:** User clicks/taps a celestial body

**Animation Sequence:**
1. **Clicked body scales up** (0.95 → 1.5x) — 150ms
2. **Backdrop fades in** (opacity 0 → 0.85) — 300ms
3. **Detail View content appears** (scale 0.8 → 1.0, opacity 0 → 1) — 400ms
4. **Audio plays** (after animation completes)

**Implementation (Framer Motion):**
```javascript
// Backdrop
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3, ease: 'easeOut' }}

// Content
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
```

**Easing:** `ease-out` (fast start, slow end)
**Total Duration:** ~400-500ms

### 4.2 Zoom Out (Detail View → Main View)

**Trigger:** User clicks back button or backdrop

**Animation Sequence:**
1. **Detail View content scales down** (1.0 → 0.8, opacity 1 → 0) — 300ms
2. **Backdrop fades out** (opacity 0.85 → 0) — 300ms
3. **Main View re-appears** (already visible, no animation needed)
4. **Audio stops** (if still playing)

**Implementation (Framer Motion):**
```javascript
exit={{ scale: 0.8, opacity: 0 }}
transition={{ duration: 0.3, ease: 'easeIn' }}
```

**Easing:** `ease-in` (slow start, fast end)
**Total Duration:** ~300ms

### 4.3 Hover/Touch Feedback

**Celestial Bodies (Main View):**
- Scale: 1.0 → 1.15 (200ms, ease-out)
- Glow: `box-shadow: 0 0 20px rgba(255,255,255,0.4)`
- Cursor: pointer (desktop)

**Back Button:**
- Scale: 1.0 → 1.1 (150ms, ease-out)
- Opacity: 0.9 → 1.0

**Tap/Click:**
- Scale: 1.0 → 0.95 (instant, 100ms)
- Visual feedback for touch

### 4.4 Reduced Motion

**Respect User Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Implementation:**
- Check `prefers-reduced-motion` media query
- Disable zoom animations if user prefers reduced motion
- Use instant transitions (opacity changes only)

---

## 5. Responsive Design

### 5.1 Breakpoints

```css
/* Mobile (default) */
@media (min-width: 375px) { ... }

/* Tablet */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Large Desktop */
@media (min-width: 1440px) { ... }
```

### 5.2 Mobile Layout (375px - 767px)

**Main View:**
- Orbital radii: Compressed (80-290px from center)
- Planet sizes: 40-90px
- Labels: Hidden
- Sun size: 80px
- Touch targets: 80px minimum
- Safe area padding: 16px

**Detail View:**
- Planet image: 300px × 300px
- Title: 48px
- Back button: 80px (top-left, 16px margins)
- Content padding: 16px

### 5.3 Tablet Layout (768px - 1023px)

**Main View:**
- Orbital radii: Medium (120-470px from center)
- Planet sizes: 50-110px
- Labels: Visible below bodies (20px font)
- Sun size: 100px
- Touch targets: 100px recommended
- Safe area padding: 24px

**Detail View:**
- Planet image: 400px × 400px
- Title: 64px
- Back button: 80px (top-left, 24px margins)
- Content padding: 24px

### 5.4 Desktop Layout (1024px+)

**Main View:**
- Orbital radii: Full (140-560px from center)
- Planet sizes: 60-110px
- Labels: Visible below bodies (24px font)
- Sun size: 120px
- Touch/click targets: 100px+
- Safe area padding: 32px
- Mouse hover effects enabled

**Detail View:**
- Planet image: 500px × 500px
- Title: 72px
- Back button: 80px (top-left, 32px margins)
- Content padding: 32px

### 5.5 Orientation Support

**Portrait (Default):**
- Orbital layout centered vertically and horizontally
- Scrolling enabled if content overflows

**Landscape:**
- Same layout, may show more space around orbits
- No special adjustments needed (circular layout adapts)

---

## 6. Accessibility

### 6.1 Touch Targets

**Minimum Sizes (WCAG AAA):**
- All interactive elements: 80px × 80px minimum
- Recommended: 100px × 100px for primary actions
- Spacing: 16px gap between touch targets

### 6.2 Color Contrast

**Text Contrast Ratios (WCAG AA):**
- White text on dark background: 15:1 (AAA level)
- Body labels: Use text-shadow for readability
- Planet colors: Distinct and vibrant for recognition

**Testing:**
- All text passes WCAG AA (4.5:1 minimum)
- Large text (24px+) passes AAA (3:1 minimum)

### 6.3 Keyboard Navigation

**Focusable Elements:**
- All celestial bodies (tab order: Sun → Mercury → Neptune)
- Back button in Detail View
- Future: Language toggle (Phase 2)

**Focus Indicators:**
- Outline: `3px solid #4A90E2` (blue)
- Offset: 4px
- Border-radius: matches element shape

**Keyboard Shortcuts:**
- Enter/Space: Activate focused element
- Escape: Close Detail View (return to Main View)
- Tab: Navigate between bodies

### 6.4 Screen Readers

**ARIA Labels:**
```html
<!-- Celestial Body -->
<button aria-label="Mercury, click to learn more">
  <img src="Mercury.png" alt="Mercury" />
</button>

<!-- Detail View -->
<div role="dialog" aria-labelledby="planet-title" aria-modal="true">
  <h1 id="planet-title">Mercury</h1>
  <audio aria-label="Pronunciation of Mercury" autoplay />
</div>

<!-- Back Button -->
<button aria-label="Go back to solar system">
  ←
</button>
```

**Semantic HTML:**
- Use `<button>` for interactive elements
- Use `<h1>` for planet titles
- Use `<main>` for Main View
- Use `role="dialog"` for Detail View

### 6.5 Reduced Motion

**Implementation:**
- Detect `prefers-reduced-motion: reduce`
- Disable zoom animations
- Use instant opacity transitions only
- Respect user accessibility preferences

---

## 7. Asset Specifications

### 7.1 Images (User-Provided)

**Format:** PNG
**Naming Convention:** Capitalized (e.g., `Mercury.png`, `Sun.png`)
**Location:** `/public/images/`

| Body | Filename | Recommended Size | Max File Size |
|------|----------|------------------|---------------|
| Sun | `Sun.png` | 800×800px | 500KB |
| Mercury | `Mercury.png` | 800×800px | 500KB |
| Venus | `Venus.png` | 800×800px | 500KB |
| Earth | `Earth.png` | 800×800px | 500KB |
| Moon | `Moon.png` | 800×800px | 500KB |
| Mars | `Mars.png` | 800×800px | 500KB |
| Jupiter | `Jupiter.png` | 800×800px | 500KB |
| Saturn | `Saturn.png` | 800×800px | 500KB |
| Uranus | `Uranus.png` | 800×800px | 500KB |
| Neptune | `Neptune.png` | 800×800px | 500KB |

**Optimization:**
- Use PNG with transparency
- Compress with tools like TinyPNG or ImageOptim
- Square aspect ratio (1:1)
- Center subject in canvas

### 7.2 Audio Files (User-Provided)

**Format:** MP3
**Naming Convention:** Lowercase with `-en` suffix (e.g., `mercury-en.mp3`)
**Location:** `/public/audio/en/`

| Body | Filename | Duration | Bitrate |
|------|----------|----------|---------|
| Sun | `sun-en.mp3` | 1-3s | 128kbps |
| Mercury | `mercury-en.mp3` | 1-3s | 128kbps |
| Venus | `venus-en.mp3` | 1-3s | 128kbps |
| Earth | `earth-en.mp3` | 1-3s | 128kbps |
| Moon | `moon-en.mp3` | 1-3s | 128kbps |
| Mars | `mars-en.mp3` | 1-3s | 128kbps |
| Jupiter | `jupiter-en.mp3` | 1-3s | 128kbps |
| Saturn | `saturn-en.mp3` | 1-3s | 128kbps |
| Uranus | `uranus-en.mp3` | 1-3s | 128kbps |
| Neptune | `neptune-en.mp3` | 1-3s | 128kbps |

**Optimization:**
- Clear pronunciation
- No background music/noise
- Normalized volume levels
- 128kbps MP3 (balance of quality and size)

### 7.3 Fallback Visuals (No Images)

**If images are missing, use colored CSS circles:**
- Background color from `color` property in data
- SVG circle with radial gradient
- Text label inside circle (planet name)
- Example:
  ```html
  <div style="
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, #FDB813, #F59300);
  ">
    SUN
  </div>
  ```

---

## 8. Component-Specific Design

### 8.1 MainView Component

**Purpose:** Display all celestial bodies in orbital arrangement

**Props:**
- `onSelectBody: (bodyId) => void` — Callback when body clicked
- `language: string` — Current language ('en' for Phase 1)

**Layout:**
- Full viewport height and width
- Dark space background
- Centered solar system
- Orbital paths as SVG circles
- Celestial bodies positioned absolutely

**Responsive Behavior:**
- Scale orbital radii based on viewport size
- Hide labels on mobile (< 768px)
- Adjust planet sizes for touch targets

### 8.2 DetailView Component

**Purpose:** Show zoomed-in view of selected body with audio

**Props:**
- `body: CelestialBody` — Selected body data
- `onClose: () => void` — Callback when back button clicked
- `language: string` — Current language ('en')

**Layout:**
- Fixed position overlay (covers viewport)
- Centered content container
- Backdrop (semi-transparent black)
- Back button (top-left)

**Behavior:**
- Auto-play audio on mount
- Stop audio on unmount
- Framer Motion exit animation
- Escape key to close

### 8.3 CelestialBody Component

**Purpose:** Individual clickable celestial body

**Props:**
- `body: CelestialBody` — Body data (name, color, size, image)
- `onClick: () => void` — Click handler
- `showLabel: boolean` — Show name label below body
- `size: number` — Display size in pixels

**Visual:**
- Circular image or colored circle
- Touch target: 80px minimum (padding around visual)
- Hover effect (scale + glow)
- Optional label below

**States:**
- Normal, Hover, Active (pressed), Focus

---

## 9. Design Rationale

### 9.1 Why Simplified Orbital Layout?

**Educational Value:**
- Clear visual hierarchy (Sun center, planets in order)
- Easy to understand solar system structure
- Distinct orbital paths aid learning

**Usability:**
- All bodies visible at once
- No scrolling or panning needed
- Large touch targets, well-spaced

### 9.2 Why Semi-Realistic Planet Sizes?

**Balance:**
- Jupiter largest, Mercury smallest (educational accuracy)
- All planets tappable (80px+ touch targets)
- Visual variety maintains interest

**Alternative Considered:** All same size
- **Rejected:** Less educational, less visually interesting

### 9.3 Why Moon Offset (Not Orbiting)?

**Touch Accuracy:**
- Small fingers can easily tap Earth or Moon separately
- No overlapping or accidental mis-taps

**Visual Clarity:**
- Moon clearly associated with Earth (nearby)
- Still maintains educational connection

### 9.4 Why Static Stars?

**Performance:**
- Animated stars could cause performance issues
- No GPU overhead for animations

**Focus:**
- Child focuses on planets, not distracting background
- Keeps interaction simple and purposeful

### 9.5 Why No Language Toggle in Phase 1?

**Scope:**
- MVP focuses on core functionality (English only)
- Data structure ready for Phase 2 expansion
- Simpler UI for initial release

**Future Addition:**
- Phase 2 will add toggle (top-right corner)
- EN/PT flag icons or text labels
- No code refactoring needed

---

## 10. Design Checklist

### Phase 1 MVP Design Complete When:

- ✅ Color palette defined for all 10 celestial bodies
- ✅ Typography scale specified (mobile/tablet/desktop)
- ✅ Orbital radii calculated for responsive layouts
- ✅ Touch targets meet 80px minimum
- ✅ Main View layout designed (simplified orbital)
- ✅ Detail View layout designed (centered, backdrop)
- ✅ Back button designed (Unicode arrow, 80px)
- ✅ Animation specifications defined (zoom in/out, hover)
- ✅ Responsive breakpoints defined (375px, 768px, 1024px)
- ✅ Accessibility requirements specified (WCAG AA, keyboard nav)
- ✅ Asset specifications documented (images, audio)
- ✅ Fallback designs defined (colored circles, silent mode)
- ✅ Component designs documented (MainView, DetailView, CelestialBody)

---

## 11. Phase 2 Design Additions

When implementing Phase 2 (Portuguese language support):

### Language Toggle Component

**Position:** Top-right corner (fixed)
**Size:** 60px × 40px minimum
**Design:**
```
┌──────────┐
│ EN | PT  │  ← Toggle switch or button group
└──────────┘
```

**States:**
- Active language: Bold, white, background highlight
- Inactive language: Gray, no background
- Hover: Scale 1.05

**Alternative Design:** Flag icons
- 🇺🇸 for English
- 🇧🇷 for Brazilian Portuguese

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-27 | Initial | Design document created with simplified orbital layout, semi-realistic sizes, offset Moon, static stars |

---

**End of Design Document**

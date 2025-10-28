/**
 * Application Constants
 *
 * Responsive breakpoints, scaling factors, animation timings, and other constants
 * used throughout the Solar System Explorer app.
 */

/**
 * Responsive breakpoints (in pixels)
 */
export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
};

/**
 * Orbital radius scaling factors for responsive design
 * Base orbit radii are defined in celestialBodies.js (mobile scale)
 * These factors are multiplied by the base to get tablet/desktop sizes
 */
export const ORBIT_SCALE = {
  mobile: 1.0,    // Base (80-290px from center)
  tablet: 1.7,    // 1.7x (136-493px from center)
  desktop: 2.2,   // 2.2x (176-638px from center)
};

/**
 * Minimum touch target size (WCAG AAA compliance)
 * All interactive elements should meet this minimum
 */
export const MIN_TOUCH_TARGET = 80; // pixels

/**
 * Animation durations (in seconds)
 * Used with Framer Motion
 */
export const ANIMATION = {
  zoomIn: 0.5,     // 500ms - Main View → Detail View
  zoomOut: 0.5,    // 500ms - Detail View → Main View
  hover: 0.2,      // 200ms - Hover/touch feedback
  backdropFade: 0.3, // 300ms - Backdrop fade in/out
};

/**
 * Animation easing functions
 */
export const EASING = {
  zoomIn: 'easeOut',   // Fast start, slow end
  zoomOut: 'easeIn',   // Slow start, fast end
  hover: 'easeOut',    // Smooth hover
};

/**
 * Z-index layers
 */
export const Z_INDEX = {
  background: 0,
  orbitalPaths: 1,
  celestialBodies: 10,
  detailView: 100,
  backdrop: 99,
};

/**
 * Detail View image sizes (in pixels) for different screen sizes
 */
export const DETAIL_IMAGE_SIZE = {
  mobile: 340,
  tablet: 460,
  desktop: 600,
};

/**
 * Planet size multiplier
 * Base sizes in celestialBodies.js are multiplied by this to get display size
 */
export const PLANET_SIZE_MULTIPLIER = 26; // size 1 = 26px, size 10 = 260px
/**
 * Starfield configuration
 */
export const STARFIELD = {
  minCount: 100,
  maxCount: 150,
  minSize: 2,
  maxSize: 6,
  twinkleRatio: 0.2,
};

/**
 * Detail view timing
 */
export const DETAIL_HOLD_DURATION = 2000; // milliseconds the focused body remains centered

/**
 * Celestial Bodies Data
 *
 * Contains all data for the 10 celestial bodies in our solar system:
 * - Sun (star)
 * - 8 Planets (Mercury through Neptune)
 * - Moon (Earth's satellite)
 *
 * Phase 1: English only
 * Phase 2: Portuguese translations ready to use
 */

export const celestialBodies = [
  {
    id: 'sun',
    names: {
      en: 'The Sun',
      pt: 'O Sol'  // Phase 2
    },
    type: 'star',
    color: '#FDB813',
    size: 12,  // Relative size (1-12 scale)
    orbitRadius: 0,  // Center of solar system
    imagePath: '/images/sun.png',
    imageScale: 0.95,
    imagePadding: 8,
    detailPadding: 32,
    audioPath: {
      en: '/audio/en/sun.mp3',
      pt: '/audio/pt/sun-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'mercury',
    names: {
      en: 'Mercury',
      pt: 'Mercúrio'  // Phase 2
    },
    type: 'planet',
    color: '#8C7853',
    size: 4.5,
    orbitRadius: 80,  // Mobile base (will scale responsively)
    imagePath: '/images/mercury.png',
    imageScale: 1,
    imagePadding: 6,
    detailPadding: 20,
    audioPath: {
      en: '/audio/en/mercury.mp3',
      pt: '/audio/pt/mercury-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'venus',
    names: {
      en: 'Venus',
      pt: 'Vênus'  // Phase 2
    },
    type: 'planet',
    color: '#FFC649',
    size: 5.5,
    orbitRadius: 110,
    imagePath: '/images/venus.png',
    imageScale: 0.96,
    imagePadding: 6,
    detailPadding: 24,
    audioPath: {
      en: '/audio/en/venus.mp3',
      pt: '/audio/pt/venus-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'earth',
    names: {
      en: 'Earth',
      pt: 'Terra'  // Phase 2
    },
    type: 'planet',
    color: '#4A90E2',
    size: 6,
    orbitRadius: 140,
    imagePath: '/images/earth.png',
    imageScale: 0.96,
    imagePadding: 6,
    detailPadding: 26,
    audioPath: {
      en: '/audio/en/earth.mp3',
      pt: '/audio/pt/earth-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'moon',
    names: {
      en: 'The Moon',
      pt: 'A Lua'  // Phase 2
    },
    type: 'satellite',
    color: '#C0C0C0',
    size: 3.5,
    orbitRadius: 140,  // Same as Earth, will be offset in positioning
    moonOffset: 35,  // Offset from Earth (pixels)
    imagePath: '/images/moon.png',
    imageScale: 0.95,
    imagePadding: 6,
    detailPadding: 24,
    audioPath: {
      en: '/audio/en/moon.mp3',
      pt: '/audio/pt/moon-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'mars',
    names: {
      en: 'Mars',
      pt: 'Marte'  // Phase 2
    },
    type: 'planet',
    color: '#CD5C5C',
    size: 5,
    orbitRadius: 170,
    imagePath: '/images/mars.png',
    imageScale: 0.96,
    imagePadding: 6,
    detailPadding: 24,
    audioPath: {
      en: '/audio/en/mars.mp3',
      pt: '/audio/pt/mars-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'jupiter',
    names: {
      en: 'Jupiter',
      pt: 'Júpiter'  // Phase 2
    },
    type: 'planet',
    color: '#C88B3A',
    size: 11,  // Largest planet
    orbitRadius: 200,
    imagePath: '/images/jupiter.png',
    imageScale: 0.95,
    imagePadding: 8,
    detailPadding: 30,
    audioPath: {
      en: '/audio/en/jupiter.mp3',
      pt: '/audio/pt/jupiter-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'saturn',
    names: {
      en: 'Saturn',
      pt: 'Saturno'  // Phase 2
    },
    type: 'planet',
    color: '#FAD5A5',
    size: 10.5,
    orbitRadius: 230,
    imagePath: '/images/saturn.png',
    imageScale: 0.88,
    imagePadding: 12,
    detailPadding: 36,
    audioPath: {
      en: '/audio/en/saturn.mp3',
      pt: '/audio/pt/saturn-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'uranus',
    names: {
      en: 'Uranus',
      pt: 'Urano'  // Phase 2
    },
    type: 'planet',
    color: '#4FD0E7',
    size: 7.5,
    orbitRadius: 260,
    imagePath: '/images/uranus.png',
    imageScale: 0.95,
    imagePadding: 8,
    detailPadding: 28,
    audioPath: {
      en: '/audio/en/uranus.mp3',
      pt: '/audio/pt/uranus-pt.mp3'  // Phase 2
    }
  },
  {
    id: 'neptune',
    names: {
      en: 'Neptune',
      pt: 'Netuno'  // Phase 2
    },
    type: 'planet',
    color: '#4166F5',
    size: 7.5,
    orbitRadius: 290,
    imagePath: '/images/neptune.png',
    imageScale: 0.95,
    imagePadding: 8,
    detailPadding: 28,
    audioPath: {
      en: '/audio/en/neptune.mp3',
      pt: '/audio/pt/neptune-pt.mp3'  // Phase 2
    }
  }
];

/**
 * Helper function to get a celestial body by ID
 * @param {string} id - The body ID (e.g., 'mercury', 'earth')
 * @returns {object|undefined} The celestial body object or undefined if not found
 */
export const getCelestialBodyById = (id) => {
  return celestialBodies.find(body => body.id === id);
};

/**
 * Get all planets (excludes Sun and Moon)
 * @returns {array} Array of planet objects
 */
export const getPlanets = () => {
  return celestialBodies.filter(body => body.type === 'planet');
};

/**
 * Get the Sun
 * @returns {object} Sun object
 */
export const getSun = () => {
  return celestialBodies.find(body => body.id === 'sun');
};

/**
 * Get the Moon
 * @returns {object} Moon object
 */
export const getMoon = () => {
  return celestialBodies.find(body => body.id === 'moon');
};

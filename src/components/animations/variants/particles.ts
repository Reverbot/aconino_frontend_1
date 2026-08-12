// Particle configurations for header entrance effect
export const particleConfigs = {
  // Light particles that float during header reveal
  entrance: {
    count: 12,
    size: { min: 2, max: 6 },
    duration: { min: 2, max: 4 },
    spread: 100,
    colors: ['#f8b719', '#365ca1', '#ffffff'],
  },
  // Subtle particles around CTA button
  cta: {
    count: 6,
    size: { min: 2, max: 4 },
    duration: { min: 3, max: 5 },
    orbitRadius: 60,
    colors: ['#f8b719', '#ffffff'],
  },
};

// Generate random particles for entrance
export const generateEntranceParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 0.5,
    vx: Math.random() * 20 - 10, // Added for stable animation
    color: ['#f8b719', '#365ca1', '#ffffff'][Math.floor(Math.random() * 3)],
  }));
};

// Generate orbiting particles for CTA
export const generateOrbitParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i * 360) / count,
    radius: 50 + Math.random() * 20,
    size: Math.random() * 2 + 2,
    duration: 3 + Math.random() * 2,
  }));
};

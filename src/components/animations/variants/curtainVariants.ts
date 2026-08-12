export const curtainVariants = {
  initial: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    opacity: 0,
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1] as const, // Custom cinematic easing
    },
    transitionEnd: {
      clipPath: "none",
    }
  }
};

export const shimmerVariants = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  animate: {
    x: "200%",
    opacity: [0, 0.6, 0.3, 0],
    transition: {
      duration: 1.5,
      delay: 0.3,
      ease: "easeInOut" as const,
    },
  }
};

export const morphingGradient = {
  initial: { backgroundPosition: '0% 50%' },
  animate: { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], transition: { duration: 8, repeat: Infinity } }
};

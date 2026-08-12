export const headerContainerVariants = {
  top: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
    y: 0,
  },
  scrolled: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(248,183,25,0.1)",
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut" as const
    }
  }
};

// For accent line at bottom
export const accentLineVariants = {
  initial: { scaleX: 0, opacity: 0 },
  scrolled: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" as const }
  },
};

// Subtle border glow
export const borderGlowVariants = {
  top: {
    boxShadow: "inset 0 0 0 0px rgba(248,183,25,0)",
  },
  scrolled: {
    boxShadow: "inset 0 -1px 0 1px rgba(248,183,25,0.2)",
    transition: { duration: 0.3 }
  }
};

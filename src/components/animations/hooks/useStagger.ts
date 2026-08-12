"use client";

export const useStagger = (staggerChildren: number = 0.15) => {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren
      }
    }
  };
};

"use client";

export const useScrollReveal = (margin: string = "-100px") => {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin }
  };
};

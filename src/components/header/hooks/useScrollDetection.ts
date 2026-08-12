import { useState, useEffect } from "react";
import { ANIMATION } from "@/constants";

export interface UseScrollDetectionReturn {
  isScrolled: boolean;
  scrollY: number;
}

const DEFAULT_THRESHOLD = ANIMATION.SCROLL_THRESHOLD_DEFAULT;

export function useScrollDetection(threshold: number = DEFAULT_THRESHOLD): UseScrollDetectionReturn {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled, scrollY };
}

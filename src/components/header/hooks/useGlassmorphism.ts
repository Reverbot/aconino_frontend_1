import { useMemo } from 'react';
import { useScrollDetection, type UseScrollDetectionReturn } from './useScrollDetection';
import { ANIMATION } from "@/constants";

const DEFAULT_BLUR_DIVISOR = ANIMATION.GLASS_BLUR_DIVISOR;
const MAX_BLUR_VALUE = ANIMATION.GLASS_BLUR_MAX;
const SCROLL_THRESHOLD = ANIMATION.SCROLL_THRESHOLD_DEFAULT;

interface GlassStyles {
  backdropFilter?: string;
  backgroundColor: string;
  boxShadow: string;
}

interface UseGlassmorphismReturn extends UseScrollDetectionReturn {
  glassStyles: GlassStyles;
}

export function useGlassmorphism(): UseGlassmorphismReturn {
  const { isScrolled, scrollY } = useScrollDetection(SCROLL_THRESHOLD);

  const glassStyles = useMemo<GlassStyles>(() => {
    if (!isScrolled) {
      return {
        backgroundColor: "rgba(255, 255, 255, 1)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)"
      };
    }

    const blurValue = Math.min(MAX_BLUR_VALUE, scrollY / DEFAULT_BLUR_DIVISOR);
    
    return {
      backdropFilter: `blur(${blurValue}px)`,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)"
    };
  }, [isScrolled, scrollY]);

  return { isScrolled, scrollY, glassStyles };
}

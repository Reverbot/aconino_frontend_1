import { useState, useEffect } from "react";
import { ANIMATION } from "@/constants";

const ANIMATION_DELAY_MS = ANIMATION.MOBILE_MENU_DELAY_MS;

export interface UseCurtainRevealReturn {
  isRevealed: boolean;
}

export function useCurtainReveal(): UseCurtainRevealReturn {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), ANIMATION_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return { isRevealed };
}

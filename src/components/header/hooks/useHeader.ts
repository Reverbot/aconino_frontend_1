import { useMemo } from "react";
import { useScrollDetection } from "./useScrollDetection";
import { useMobileMenu } from "./useMobileMenu";
import { useCurtainReveal } from "./useCurtainReveal";

export function useHeader() {
  const scroll = useScrollDetection();
  const mobile = useMobileMenu();
  const curtain = useCurtainReveal();

  return useMemo(() => ({
    isScrolled: scroll.isScrolled,
    mobileMenu: mobile,
    isRevealed: curtain.isRevealed,
  }), [scroll.isScrolled, mobile, curtain.isRevealed]);
}

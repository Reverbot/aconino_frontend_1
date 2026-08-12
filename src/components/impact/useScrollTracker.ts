"use client";

import { useState, useCallback, useEffect, RefObject } from "react";

export function useScrollTracker(
  scrollRef: RefObject<HTMLDivElement | null>,
  itemCount: number,
  gap: number = 16
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position to update active index
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.children[0]) return;
    
    const itemWidth = (el.children[0] as HTMLElement).offsetWidth;
    const scrollLeft = el.scrollLeft;
    
    // Calculate which item is most visible
    const idx = Math.round(scrollLeft / (itemWidth + gap));
    setActiveIndex(Math.min(Math.max(idx, 0), itemCount - 1));
  }, [itemCount, gap, scrollRef]);

  // Attach scroll event listener
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll, scrollRef]);

  // Method to manually scroll to an item
  const scrollToItem = useCallback((idx: number, offset: number = 24) => {
    const el = scrollRef.current;
    if (!el || !el.children[idx]) return;
    
    const child = el.children[idx] as HTMLElement;
    el.scrollTo({ left: child.offsetLeft - offset, behavior: "smooth" });
  }, [scrollRef]);

  return { activeIndex, isMobile, scrollToItem };
}

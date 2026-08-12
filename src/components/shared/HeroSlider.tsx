"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import Image from "next/image";
import HeroBase, { HeroBaseProps } from "./HeroBase";

export interface HeroSliderSlide {
  src: string;
  alt: string;
  overlayOpacity?: number;
}

interface HeroSliderProps extends Omit<HeroBaseProps, 'backgroundImage' | 'backgroundVideo' | 'backgroundType' | 'overlayOpacity'> {
  slides: HeroSliderSlide[];
  autoPlayInterval?: number;
}

export default function HeroSlider({
  slides,
  autoPlayInterval = 6000,
  ...heroBaseProps
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => { // eslint-disable-line @typescript-eslint/no-unused-vars
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => { // eslint-disable-line @typescript-eslint/no-unused-vars
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval]);

  const currentSlide = slides[currentIndex];
  const overlayOpacity = currentSlide?.overlayOpacity ?? 30;

  return (
    <section className={`relative w-full overflow-hidden ${heroBaseProps.height || "h-[600px] md:h-[700px]"}`}>
      {/* 1. Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          {currentSlide.src && (
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              className="object-cover object-center"
              style={currentIndex === 1 ? { transform: "scaleX(-1)" } : undefined}
              priority={currentIndex === 0}
              sizes="100vw"
            />
          )}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10" 
            style={{ opacity: overlayOpacity / 100 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Navigation Arrows - Removed per user request */}

      {/* 3. Hero Content Base */}
      <HeroBase 
        {...heroBaseProps}
        backgroundType="image"
        backgroundImage="" // Empty because we handle it in the slider
        overlayOpacity={0} // Handled in the slider
        customOverlay={null} // Handled in the slider
        showDefaultBackground={false}
        className={`!absolute inset-0 flex pointer-events-none ${heroBaseProps.className || ""}`}
      >
        <div className="pointer-events-auto">
            {heroBaseProps.children}
        </div>
      </HeroBase>

      {/* 4. Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 h-3 bg-accent"
                  : "w-3 h-3 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir a imagen ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

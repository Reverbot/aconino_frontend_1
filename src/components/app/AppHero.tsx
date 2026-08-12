"use client";

import HeroSlider, { HeroSliderSlide } from "../shared/HeroSlider";

interface AppHeroProps {
  slides: HeroSliderSlide[];
}

export default function AppHero({ slides }: AppHeroProps) {
  return (
    <HeroSlider
        slides={slides}
        title="App"
        height="h-[400px] md:h-[500px] lg:h-[600px]"
        titleClassName="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter"
    >
        <div className="absolute -top-8 right-0 md:-top-10 md:right-2 z-20">
            <span className="text-accent text-4xl md:text-5xl drop-shadow-lg">♥</span>
        </div>
    </HeroSlider>
  );
}

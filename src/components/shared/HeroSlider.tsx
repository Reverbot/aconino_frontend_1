import Image from "next/image";
import HeroBase, { HeroBaseProps } from "./HeroBase";

export interface HeroSliderSlide {
  src: string;
  alt: string;
  overlayOpacity?: number;
}

interface HeroSliderProps extends Omit<HeroBaseProps, "backgroundImage" | "backgroundVideo" | "backgroundType" | "overlayOpacity"> {
  slides: HeroSliderSlide[];
  autoPlayInterval?: number;
}

export default function HeroSlider({
  slides,
  autoPlayInterval = 6000,
  ...heroBaseProps
}: HeroSliderProps) {
  const safeSlides = slides.length > 0 ? slides : [{ src: "/images/hero-background-blue.png", alt: "Aconiño" }];

  return (
    <section
      data-hero-slider
      data-autoplay={autoPlayInterval}
      className={`relative w-full overflow-hidden ${heroBaseProps.height || "h-[600px] md:h-[700px]"}`}
    >
      <div className="absolute inset-0 z-0">
        {safeSlides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            data-hero-slide
            aria-hidden={index === 0 ? "false" : "true"}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${index === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              style={index === 1 ? { transform: "scaleX(-1)" } : undefined}
              priority={index === 0}
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/80 z-10"
              style={{ opacity: (slide.overlayOpacity ?? 30) / 100 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent z-10" />
          </div>
        ))}
      </div>

      <HeroBase
        {...heroBaseProps}
        backgroundType="image"
        backgroundImage=""
        overlayOpacity={0}
        customOverlay={null}
        showDefaultBackground={false}
        className={`!absolute inset-0 flex pointer-events-none ${heroBaseProps.className || ""}`}
      >
        <div className="pointer-events-auto">{heroBaseProps.children}</div>
      </HeroBase>

      {safeSlides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {safeSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-hero-dot
              data-index={index}
              aria-label={`Ir a imagen ${index + 1}`}
              aria-current={index === 0 ? "true" : "false"}
              className={`rounded-full transition-all duration-300 ${index === 0 ? "w-8 h-3 bg-accent" : "w-3 h-3 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

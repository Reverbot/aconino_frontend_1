"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VideoItem {
  id: string;   // ID del video de YouTube (lo que va después de watch?v=)
  title?: string;
}

// Videos del canal de Aconiño: https://www.youtube.com/@asociacionaconino1526
const DEFAULT_VIDEOS: VideoItem[] = [
  { id: "sUQlJzGlNTE" },
  { id: "Bh_OaEmq-_w" },
];

interface YoutubeCarouselProps {
  title?: string;
  subtitle?: string;
  videos?: VideoItem[];
}

export default function YoutubeCarousel({
  subtitle = "Nuestro canal",
  videos = DEFAULT_VIDEOS,
}: YoutubeCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!videos || videos.length === 0) return null;

  const goTo = (newIndex: number) => {
    setIndex((newIndex + videos.length) % videos.length);
  };

  const current = videos[index];

  return (
    <section className="w-full bg-transparent py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-[2px] bg-accent w-10"></div>
            <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">{subtitle}</span>
            <div className="h-[2px] bg-accent w-10"></div>
          </div>
        </div>

        {/* Carrusel: un video a la vez */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10">
          {/* Flecha anterior */}
          {videos.length > 1 && (
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Anterior"
              className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          )}

          {/* Video horizontal (16:9) */}
          <div className="relative w-full max-w-3xl">
            <div
              className="relative w-full overflow-hidden shadow-2xl bg-gray-900 border-4 border-white"
              style={{ aspectRatio: "16 / 9", borderRadius: "20px" }}
            >
              <iframe
                key={current.id}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${current.id}?rel=0&playsinline=1`}
                title={current.title || "Video Aconiño"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Flecha siguiente */}
          {videos.length > 1 && (
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Siguiente"
              className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          )}
        </div>

        {/* Indicadores (puntos) */}
        {videos.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al video ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

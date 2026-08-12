import React from "react";
import { ImpactSectionProps, ImpactStat, ImpactStory } from "./impact/types";
import ImpactHeader from "./impact/ImpactHeader";
import ImpactStats from "./impact/ImpactStats";
import ImpactStories from "./impact/ImpactStories";
import ImpactVideos from "./impact/ImpactVideos";
import ImpactCta from "./impact/ImpactCta";

const defaultStats = [
  { id: 1, value: 150, suffix: "+", label: "Niños atendidos" },
  { id: 2, value: 25, suffix: "", label: "Años de servicio" },
  { id: 3, value: 5000, suffix: "+", label: "Sesiones anuales" },
];

const defaultStories = [
  { id: 1, name: "M.", story: "Gracias a las terapias, M. ha logrado dar sus primeros pasos independientes.", img: "/images/programa-atencion-temprana.jpg" },
  { id: 2, name: "J.", story: "El programa Pediasuit transformó la calidad de vida de toda nuestra familia.", img: "/images/programa-pediasuit.jpg" },
  { id: 3, name: "S.", story: "Verlo sonreír y jugar con otros niños es el mayor regalo que pudimos recibir.", img: "/images/programa-neurodesarrollo.jpg" }
];

export default function ImpactSection({ stats = [], stories = [], videos = [], ctaButtonText }: ImpactSectionProps) {
  // Process Stats
  const processedStats = stats && stats.length > 0 
    ? stats.map((s: ImpactStat, i: number) => {
        const numMatch = s.value.match(/\d+/);
        const val = numMatch ? parseInt(numMatch[0]) : 0;
        const suffix = s.value.replace(/\d+/g, '').trim();
        return { id: i + 1, value: val, suffix, label: s.label };
      })
    : defaultStats;

  // Process Stories
  const processedStories = stories && stories.length > 0
    ? stories.map((s: ImpactStory, i: number) => ({
        id: i + 1,
        name: s.name,
        story: s.quote,
        img: (typeof s.image === 'object' ? s.image?.url : (s.image as string)) || "/images/programa-atencion-temprana.jpg"
    }))
    : defaultStories;

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Premium Background Decor */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-accent/5 rounded-full blur-[60px] md:blur-[80px] lg:blur-[100px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-secondary/5 rounded-full blur-[50px] md:blur-[70px] lg:blur-[100px] opacity-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <ImpactHeader />

        {/* Modular Components */}
        <ImpactStats stats={processedStats} />

        {/* Si hay videos, muestra los reels; si no, los testimonios en tarjeta */}
        {videos && videos.length > 0 ? (
          <ImpactVideos videos={videos} />
        ) : (
          <ImpactStories stories={processedStories} />
        )}

        {/* CTA Button */}
        <ImpactCta ctaButtonText={ctaButtonText ?? undefined} />
      </div>
    </section>
  );
}

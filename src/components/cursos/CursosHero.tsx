"use client";

import HeroSlider, { HeroSliderSlide } from "../shared/HeroSlider";

interface CursosHeroProps {
    title?: string;
    slides?: HeroSliderSlide[];
}

const defaultSlides: HeroSliderSlide[] = [
    {
        src: "/images/cursos-hero.jpg",
        alt: "Cursos de formación en neurodesarrollo",
    },
    {
        src: "/images/programas-hero.jpg",
        alt: "Capacitación profesional en rehabilitación",
    },
    {
        src: "/images/programas-intervention.jpg",
        alt: "Terapias especializadas para niños",
    },
];

export default function CursosHero({
    title = "Cursos",
    slides: providedSlides
}: CursosHeroProps) {
    // Solo una imagen en el banner (sin carrusel)
    const slides = (providedSlides && providedSlides.length > 0 ? providedSlides : defaultSlides).slice(0, 1);

    return (
        <HeroSlider
            slides={slides}
            title={title}
            subtitle="Capacitación Profesional"
            description="Explora nuestros programas de formación en neurodesarrollo y certificación en metodologías especializadas."
            height="h-[40vh] md:h-[45vh]"
        >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 md:-top-12 z-20">
                <span className="text-accent text-4xl md:text-5xl drop-shadow-lg mt-10">♥</span>
            </div>
        </HeroSlider>
    );
}

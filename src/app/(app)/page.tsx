import Hero from "../../components/Hero";
import { InterventionModelSection } from "@/components/InterventionModelSection";
import ProgramsSection from "../../components/ProgramsSection";
import ImpactSection from "../../components/ImpactSection";
import SocialFeedSection from "../../components/SocialFeedSection";
import RecognitionsSection from "../../components/RecognitionsSection";

import type { HeroSliderSlide } from "@/components/shared/HeroSlider";

const siteHome = {
    hero: {
        slogan: "36 años acompañando a niños con discapacidad.",
        description: "Hoy seguimos soñando y trabajando por un nuevo paso: un Centro Día para adultos.",
        backgroundType: "video",
        backgroundVideoUrl: "/videos/hero-banner.mp4",
        backgroundImageUrl: "/images/hero-background-blue.png",
    },
    programs: {
        ctaLabel: "CONTÁCTANOS",
        items: [
            { title: "Atención Temprana", description: "Programa especializado para la primera infancia.", imageUrl: "/images/programa-atencion-temprana.jpg", category: "0 a 3 años" },
            { title: "Atención a niños y jóvenes", description: "Tratamientos especializados bajo el modelo contemporáneo de neurodesarrollo.", imageUrl: "/images/programa-neurodesarrollo.jpg", category: "Niños y Jóvenes" },
            { title: "Apoyo a dificultades en el aprendizaje", description: "Intervención integral para niños con retos pedagógicos.", imageUrl: "/images/programa-aprendizaje.jpg", category: "3 a 14 años" },
            { title: "Protocolo Intensivo PediaSuit", description: "Terapia intensiva con traje ortopédico dinámico.", imageUrl: "/images/programa-pediasuit.jpg", category: "Terapia Intensiva" },
        ],
    },
};

export default function Home() {

    // Mapear datos para el Hero - estructura homePage
    const heroData = siteHome?.hero;
    const acf = {
        hero_title: heroData?.slogan || "36 años acompañando a niños con discapacidad.",
        hero_subtitle: "",
        hero_description: heroData?.description || "Hoy seguimos soñando y trabajando por un nuevo paso: un Centro Día para adultos.",
        hero_background_type: heroData?.backgroundType || "image", 
        hero_video_url: heroData?.backgroundVideoUrl || "",
        hero_image: heroData?.backgroundImageUrl || "/images/hero-background-blue.png",
        hero_impact: heroData?.impact,
        hero_cta_text: siteHome?.programs?.ctaLabel || "CONTÁCTANOS",
        hero_cta_link: siteHome?.cta?.ctaLink || "/contactanos",
        cta_title: siteHome?.cta?.title || "35 años apoiando la inclusión",
        cta_label: siteHome?.cta?.ctaLabel || "CONTÁCTANOS",
        cta_background_image: siteHome?.cta?.backgroundImageUrl || "/images/hero-background-blue.png",
    };

    interface ProgramContent {
        title?: string;
        description?: string;
        imageUrl?: string;
        category?: string;
    }

    const programTitles = [
        "Atención temprana",
        "Atención a niños y jóvenes",
        "Apoyo a dificultades en el aprendizaje",
        "Protocolo Intensivo Pediasuit",
    ];

    const mappedPrograms = siteHome?.programs?.items?.map((p: ProgramContent, i: number) => ({
        title: programTitles[i] ?? p.title,
        desc: p.description || '',
        slug: p.title?.toLowerCase().replace(/ /g, '-') || '',
        imageUrl: p.imageUrl || null,
        category: p.category || "Programa Aconiño"
    })) || [];

    interface TestimonialContent {
        name?: string;
        quote?: string;
        imageUrl?: string;
    }

    const mappedTestimonials = siteHome?.testimonials?.items?.map((t: TestimonialContent) => ({
        name: t.name || 'Familia Aconiño',
        quote: t.quote || 'Gracias a Aconiño, nuestro hijo ha logrado avances increíbles.',
        image: t.imageUrl || null
    })) || [];

    interface HeroSlideContent {
        imageUrl?: string;
        alt?: string;
        overlayOpacity?: number;
    }

    // Determinar si mostrar carrusel o imagen individual
    // Solo mostrar carrusel si hay slides Y tienen imagen válida
    const rawSlides = heroData?.heroSlides;
    const hasValidSlides = Array.isArray(rawSlides) && rawSlides.length > 0 && rawSlides.some((s: HeroSlideContent) => s.imageUrl);
    const heroSlides: HeroSliderSlide[] | undefined = hasValidSlides
        ? rawSlides
            .filter((s: HeroSlideContent) => s.imageUrl)
            .map((s: HeroSlideContent) => ({
                src: s.imageUrl!,
                alt: s.alt || '',
                overlayOpacity: s.overlayOpacity,
            }))
        : undefined;

    return (
        <div className="w-full">
            <Hero acf={acf} slides={heroSlides} />
            
            <InterventionModelSection />
            
            <ProgramsSection 
                programs={mappedPrograms}
                sectionTitle={siteHome?.programs?.sectionTitle}
                sectionDescription={siteHome?.programs?.sectionDescription}
            />
            
            <ImpactSection
                title={siteHome?.impact?.headerTitle}
                description={siteHome?.impact?.headerDescription}
                stats={siteHome?.impact?.stats}
                stories={mappedTestimonials}
                videos={siteHome?.impactVideos}
                ctaButtonText={siteHome?.impact?.ctaButtonText}
            />

            <SocialFeedSection
                title="Entérate primero"
                description="Sigue nuestras últimas actividades y noticias en tiempo real a través de nuestras redes sociales."
                instagramImageUrl={siteHome?.news?.instagramImageUrl}
                facebookImageUrl={siteHome?.news?.facebookImageUrl}
            />
            
            <RecognitionsSection 
                text={siteHome?.recognitions?.title} 
                recognitions={siteHome?.recognitions?.items} 
            />
        </div>
    );
}

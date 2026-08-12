import Link from "next/link";
import ScrollReveal from "./animations/ScrollReveal";
import CtaBackground from "./cta/CtaBackground";

interface CtaSectionProps {
    acf?: {
        cta_title?: string;
        cta_label?: string;
        cta_background_image?: string;
        hero_cta_link?: string;
    };
}

export default function CtaSection({ acf }: CtaSectionProps) {
    const ctaTitle = acf?.cta_title || "35 años apoyando la inclusión";
    const ctaText = acf?.cta_label || "CONTÁCTANOS";
    const ctaLink = acf?.hero_cta_link || "/contactanos";
    const backgroundImage = acf?.cta_background_image || "/images/hero-background-blue.png";

    return (
        <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden bg-primary">
            {/* Background Image with Dark Blue Overlay */}
            <CtaBackground backgroundImage={backgroundImage} />

            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 z-10" />

            {/* Content */}
            <ScrollReveal 
                animation="fade-up"
                className="relative z-20 text-center px-4 max-w-4xl mx-auto"
            >
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[2px] bg-accent w-12 md:w-24"></div>
                    <span className="text-sm text-gray-200 tracking-widest uppercase font-bold">
                        Aconino
                    </span>
                    <div className="h-[2px] bg-accent w-12 md:w-24"></div>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-12 tracking-tight drop-shadow-lg leading-tight">
                    {ctaTitle}
                </h2>
                
                <Link href={ctaLink} className="inline-block bg-accent text-primary font-black tracking-widest text-sm md:text-base px-12 py-5 rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-xl shadow-accent/20 transform hover:-translate-y-1 hover:scale-105">
                    {ctaText}
                </Link>
            </ScrollReveal>
        </section>
    );
}

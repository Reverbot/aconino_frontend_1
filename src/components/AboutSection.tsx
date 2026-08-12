import Image from "next/image";
import ScrollReveal from "./animations/ScrollReveal";
import AnimatedBadge from "./shared/AnimatedBadge";

interface AboutSectionProps {
    acf?: {
        about_title?: string;
        about_description?: string;
        about_image?: string;
        about_cta_text?: string;
        about_cta_link?: string;
        experience_label?: string;
        experience_value?: string;
    };
}

export default function AboutSection({ acf }: AboutSectionProps) {
    const imageUrl = acf?.about_image || "/images/equipo-principal.jpg";
    const experienceLabel = acf?.experience_label || "Tradición";
    const experienceValue = acf?.experience_value || "35 AÑOS";

    return (
        <section className="w-full py-20 md:py-32 overflow-hidden relative bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

                {/* Centered Image Group with Decorative Frame */}
                <ScrollReveal
                    animation="zoom-in"
                    className="relative p-4 md:p-10 w-full max-w-4xl"
                >
                    {/* Decorative Frame Elements */}
                    <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-l-4 border-accent rounded-tl-3xl z-0" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-r-4 border-accent rounded-br-3xl z-0" />

                    {/* Secondary Frame offset */}
                    <div className="absolute top-2 left-2 right-2 bottom-2 md:top-4 md:left-4 md:right-4 md:bottom-4 border-2 border-primary/10 rounded-2xl md:rounded-[2.5rem] z-0 pointer-events-none" />

                    {/* Main Image Container */}
                    <div
                        className="relative z-10 w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden border-4 md:border-8 border-white group transition-transform hover:scale-[1.01] duration-400"
                    >
                        <Image
                            src={imageUrl}
                            alt="Equipo Aconiño"
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />

                        {/* Subtle Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Floating Badge/Accent */}
                    <AnimatedBadge 
                        label={experienceLabel} 
                        value={experienceValue} 
                        className="-bottom-2 -left-1 md:-bottom-4 md:left-4"
                    />
                </ScrollReveal>

            </div>

            {/* Very faint background illustration */}
            <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none z-0 w-1/2 h-full bg-primary/10" />
        </section>
    );
}

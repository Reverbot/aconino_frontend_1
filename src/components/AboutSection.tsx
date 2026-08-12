import Image from "next/image";
import Link from "next/link";
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

const DEFAULT_STATS = [
  { value: "36", label: "Años de trayectoria" },
  { value: "150+", label: "Niños atendidos" },
  { value: "5.000+", label: "Sesiones al año" },
];

export default function AboutSection({ acf }: AboutSectionProps) {
    const imageUrl = acf?.about_image || "/images/equipo-principal.jpg";
    const experienceLabel = acf?.experience_label || "Tradición";
    const experienceValue = acf?.experience_value || "36 AÑOS";
    const title = acf?.about_title || "Más de 36 años transformando vidas";
    const description = acf?.about_description || "Somos una ONG colombiana fundada en 1990, dedicada a la rehabilitación integral de niños y jóvenes con discapacidad sensoriomotora. Trabajamos para garantizar su derecho a una vida plena, con amor, ciencia y compromiso.";
    const ctaText = acf?.about_cta_text || "Conoce nuestra historia";
    const ctaLink = acf?.about_cta_link || "/quienes-somos/nosotros";

    return (
        <section className="w-full py-24 md:py-32 overflow-hidden relative bg-white">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Image with decorative frame */}
                    <ScrollReveal animation="slide-right" className="relative p-4 md:p-8">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 border-t-4 border-l-4 border-accent rounded-tl-3xl z-0" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 border-b-4 border-r-4 border-accent rounded-br-3xl z-0" />

                        {/* Inner frame */}
                        <div className="absolute top-2 left-2 right-2 bottom-2 md:top-4 md:left-4 md:right-4 md:bottom-4 border border-primary/10 rounded-2xl z-0 pointer-events-none" />

                        {/* Main image */}
                        <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl group">
                            <Image
                                src={imageUrl}
                                alt="Equipo Aconiño"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                priority
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent pointer-events-none" />
                        </div>

                        {/* Floating badge */}
                        <AnimatedBadge
                            label={experienceLabel}
                            value={experienceValue}
                            className="-bottom-2 -left-1 md:-bottom-4 md:left-4"
                        />
                    </ScrollReveal>

                    {/* Right: Text content */}
                    <div className="flex flex-col gap-8">

                        {/* Supertítulo */}
                        <ScrollReveal animation="fade-up">
                            <div className="flex items-center gap-3">
                                <div className="h-0.5 w-10 bg-accent" />
                                <span className="text-xs font-bold tracking-widest uppercase text-primary/50">
                                    Quiénes somos
                                </span>
                            </div>
                        </ScrollReveal>

                        {/* Título */}
                        <ScrollReveal animation="fade-up" delay={0.08}>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight tracking-tight">
                                {title}
                            </h2>
                        </ScrollReveal>

                        {/* Descripción */}
                        <ScrollReveal animation="fade-up" delay={0.15}>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-prose">
                                {description}
                            </p>
                        </ScrollReveal>

                        {/* Mini stats */}
                        <ScrollReveal animation="fade-up" delay={0.22}>
                            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
                                {DEFAULT_STATS.map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="text-2xl md:text-3xl font-black text-primary">{stat.value}</div>
                                        <div className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1 leading-tight">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* CTA */}
                        <ScrollReveal animation="fade-up" delay={0.28}>
                            <Link
                                href={ctaLink}
                                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-accent hover:text-primary active:scale-[0.97] transition-all duration-200 shadow-lg shadow-primary/20 text-sm tracking-wide w-fit"
                            >
                                {ctaText}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

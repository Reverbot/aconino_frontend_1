import Link from "next/link";
import ScrollReveal from "./animations/ScrollReveal";
import ProgramCard from "./programs/ProgramCard";

interface ProgramItem {
    title: string;
    desc: string;
    slug?: string;
    link?: string;
    imageUrl?: string;
    category?: string;
}

export default function ProgramsSection({ 
    programs,
    sectionTitle,
    sectionDescription
}: { 
    programs?: ProgramItem[];
    sectionTitle?: string;
    sectionDescription?: string;
}) {
    
    const defaultPrograms: ProgramItem[] = [
        {
            title: "Atención Temprana",
            category: "0 a 3 años",
            desc: "Programa terapéutico integral para apoyar el desarrollo sicomotor en la primera infancia.",
            slug: "atencion-temprana",
            imageUrl: "/images/programa-atencion-temprana.jpg"
        },
        {
            title: "Protocolo PediaSuit",
            category: "Terapia Intensiva",
            desc: "Uso de traje ortopédico dinámico para potenciar habilidades motoras y funcionales.",
            slug: "pediasuit",
            imageUrl: "/images/programa-pediasuit.jpg"
        },
        {
            title: "Apoyo al Aprendizaje",
            category: "3 a 14 años",
            desc: "Intervención integral para niños con retos pedagógicos y dificultades cognitivas.",
            slug: "apoyo-aprendizaje",
            imageUrl: "/images/programa-aprendizaje.jpg"
        },
        {
            title: "Neurodesarrollo",
            category: "Niños y Jóvenes",
            desc: "Tratamientos especializados bajo el modelo contemporáneo de neurodesarrollo NDT.",
            slug: "neurodesarrollo",
            imageUrl: "/images/programa-neurodesarrollo.jpg"
        }
    ];

    const displayPrograms = (programs && programs.length > 0) ? programs : defaultPrograms;

    return (
        <section className="w-full py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -right-[5%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-primary/5 blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px]" />
                <div className="absolute top-[40%] -left-[5%] w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full bg-accent/5 blur-[50px] sm:blur-[70px] md:blur-[80px] lg:blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Título de la Sección */}
                <div className="text-center mb-16 md:mb-20">
                    <ScrollReveal
                        animation="zoom-in"
                        className="inline-block mb-4"
                    >
                        <span className="block w-12 h-1 bg-accent mx-auto rounded-full" />
                    </ScrollReveal>
                    
                    <ScrollReveal
                        animation="fade-up"
                        delay={0.1}
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight">
                            {sectionTitle || "Nuestros Programas"}
                        </h2>
                    </ScrollReveal>
                    
                    <ScrollReveal
                        animation="fade-up"
                        delay={0.25}
                    >
                        <p className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
                            {sectionDescription || "Programas terapéuticos especializados para el desarrollo integral de niños y jóvenes"}
                        </p>
                    </ScrollReveal>
                </div>

                {/* Grid de Tarjetas */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-stretch">
                    {displayPrograms.map((prog, idx) => (
                        <ProgramCard
                            key={prog.slug || idx}
                            title={prog.title}
                            desc={prog.desc}
                            slug={prog.slug || ""}
                            link={prog.link || "/programas"}
                            imageUrl={prog.imageUrl || "/images/programa-atencion-temprana.jpg"}
                            category={prog.category || "Programa Aconiño"}
                            index={idx}
                        />
                    ))}
                </div>

                {/* Botón Nuestros Programas */}
                <ScrollReveal animation="fade-up" delay={0.2} className="mt-12 md:mt-16 text-center">
                    <Link
                        href="/programas"
                        className="inline-block bg-accent text-primary font-bold tracking-widest text-sm md:text-base px-12 py-5 rounded-full hover:bg-primary hover:text-white active:scale-[0.97] transition-all duration-200 shadow-xl shadow-accent/20 transform hover:-translate-y-1 hover:scale-105"
                    >
                        NUESTROS PROGRAMAS
                    </Link>
                </ScrollReveal>
            </div>

            {/* Elemento de Diseño Abstracto */}
            <div className="hidden lg:block absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] pointer-events-none -ml-24 select-none z-0">
                <span className="text-[28rem] font-black text-[#0a1f44] leading-none tracking-tighter">ACN</span>
            </div>
        </section>
    );
}

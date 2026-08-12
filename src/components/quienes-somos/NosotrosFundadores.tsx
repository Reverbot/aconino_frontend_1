"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";

interface FundadorData {
    name?: string;
    role?: string;
    imageUrl?: string;
    imageAlt?: string;
}

interface Props {
    data?: FundadorData[] | null;
}

const defaultFundadores: FundadorData[] = [
    { name: "Berta Brunal", role: "Fundadora", imageUrl: "/images/berta-avatar.jpg" },
    { name: "Patricia Flórez", role: "Fundadora", imageUrl: "/images/equipo-secundario.jpg" },
    { name: "Laureano González", role: "Fundador", imageUrl: "/images/laureano-gonzalez.png" },
    { name: "Beatriz Acevedo", role: "Fundadora", imageUrl: "/images/equipo-principal.jpg" },
    { name: "Miryam Barrera", role: "Fundadora", imageUrl: "/images/quienes-junta.jpg" },
    { name: "Lila Cañaveras", role: "Fundadora", imageUrl: "/images/quienes-vision.jpg" },
    { name: "Juan Andrade", role: "Fundador", imageUrl: "/images/quienes-mission.jpg" },
    { name: "Guillermo Ronderos", role: "Fundador", imageUrl: "/images/guillermo-ronderos.png" },
    { name: "Rosana Bonilla", role: "Fundadora", imageUrl: "/images/rosana-bonilla.png" },
];

export default function NosotrosFundadores({ data }: Props) {
    const fundadores = data && data.length > 0 ? data : defaultFundadores;

    const FounderCard = ({ founder, delay }: { founder: FundadorData, delay: number }) => (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'saturate(0.2) brightness(0.8)' }}
            whileInView={{ 
                opacity: 1, 
                scale: 1, 
                filter: 'saturate(1) brightness(1)',
                transition: { duration: 0.8, delay, ease: "easeOut" }
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="flex flex-col items-center w-full max-w-[120px] md:max-w-none mx-auto group cursor-pointer"
        >
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-36 md:h-36 mb-3 md:mb-6 rounded-full overflow-hidden border-2 md:border-[6px] border-white shadow-lg group-hover:shadow-accent/30 transition-all duration-500 ring-4 ring-transparent group-hover:ring-accent/20">
                <Image
                    src={founder.imageUrl || "/images/equipo-principal.jpg"}
                    alt={founder.name || "Fundador"}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                />
                
                {/* Subtle Bloom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <h4 className="text-primary group-hover:text-accent font-black text-center text-[11px] md:text-xl leading-tight px-1 transition-colors duration-300">
                {founder.name}
            </h4>
            
            <span className="text-accent/80 font-bold text-[8px] md:text-xs uppercase tracking-[0.1em] mt-1">
                {founder.role || "Fundador/a"}
            </span>
        </motion.div>
    );

    return (
        <section id="fundadores" className="py-16 md:py-32 bg-gray-50 relative overflow-hidden scroll-mt-32">
            <div className="absolute inset-0 bg-primary/5 opacity-[0.03] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10 md:mb-20">
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
                        <div className="h-[1px] md:h-[2px] bg-accent w-8 md:w-12"></div>
                        <span className="text-[10px] md:text-sm font-bold text-gray-400 tracking-widest uppercase">Quienes iniciaron todo</span>
                        <div className="h-[1px] md:h-[2px] bg-accent w-8 md:w-12"></div>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-primary leading-tight">
                        Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Fundadores</span>
                    </h2>
                </div>

                <div 
                    className="flex flex-wrap justify-center gap-y-8 md:gap-y-20 gap-x-2 sm:gap-x-4 md:gap-x-8"
                >
                    {fundadores.map((founder, idx) => (
                        <div key={idx} className="w-[30%] sm:w-[30%] md:w-[30%] lg:w-[18%] flex-shrink-0">
                            <FounderCard 
                                key={idx} 
                                founder={founder} 
                                delay={idx * 0.03} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

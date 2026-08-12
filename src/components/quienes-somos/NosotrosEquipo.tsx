"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";
import { FaUsers } from "react-icons/fa";

interface EquipoData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    secondImageUrl?: string;
    secondImageAlt?: string;
}

interface Props {
    data?: EquipoData | null;
}

export default function NosotrosEquipo({ data }: Props) {
    const subtitle = data?.subtitle || "El Corazón de Aconiño";
    const title = data?.title || "Nuestro equipo de trabajo";
    const imageUrl = data?.imageUrl || "/images/equipo-principal.jpg";
    const imageAlt = data?.imageAlt || "Equipo de trabajo Aconiño";
    const secondImageUrl = data?.secondImageUrl || "/images/equipo-secundario.jpg";
    const secondImageAlt = data?.secondImageAlt || imageAlt;

    return (
        <section id="equipo-de-trabajo" className="bg-white py-12 md:py-32 relative overflow-hidden scroll-mt-32">
            <div className="absolute right-0 top-0 w-[150px] h-[150px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-accent/5 rounded-full blur-[50px] md:blur-[80px] lg:blur-3xl -translate-y-1/2 translate-x-1/3" />
            
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-24 flex flex-col items-center"
                >
                    <div className="bg-primary/5 p-3 md:p-4 rounded-full mb-4 md:mb-6">
                        <FaUsers className="text-primary text-xl md:text-3xl" />
                    </div>
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="h-[1px] md:h-[2px] bg-accent w-8 md:w-12"></div>
                        <span className="text-[10px] md:text-sm font-bold text-gray-400 tracking-widest uppercase">{subtitle}</span>
                        <div className="h-[1px] md:h-[2px] bg-accent w-8 md:w-12"></div>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-primary leading-tight">
                        {title}
                    </h2>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[3/1.2] max-w-6xl mx-auto shadow-[0_20px_50px_rgba(8,112,184,0.15)] rounded-2xl md:rounded-3xl overflow-hidden group bg-gray-50 border border-white"
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        priority
                    />
                    
                    {/* Elegant Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60" />
                    
                    {/* Internal Shine border */}
                    <div className="absolute inset-2 md:inset-4 border border-white/20 rounded-xl md:rounded-2xl pointer-events-none" />
                    
                    {/* Brand Accent bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
                </motion.div>

                {/* Segunda imagen (mismo tamaño, debajo) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[3/1.2] max-w-6xl mx-auto mt-8 md:mt-12 shadow-[0_20px_50px_rgba(8,112,184,0.15)] rounded-2xl md:rounded-3xl overflow-hidden group bg-gray-50 border border-white"
                >
                    <Image
                        src={secondImageUrl}
                        alt={secondImageAlt}
                        fill
                        style={{ objectPosition: "center 25%" }}
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    />

                    {/* Elegant Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60" />

                    {/* Internal Shine border */}
                    <div className="absolute inset-2 md:inset-4 border border-white/20 rounded-xl md:rounded-2xl pointer-events-none" />

                    {/* Brand Accent bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
                </motion.div>
            </div>
        </section>
    );
}

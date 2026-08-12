"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";

interface JuntaData {
    subtitle?: string;
    title?: string;
    photoUrl?: string;
    photoAlt?: string;
}

interface Props {
    data?: JuntaData | null;
}

export default function NosotrosJuntaPhoto({ data }: Props) {
    const subtitle = data?.subtitle || "Liderazgo";
    const title = data?.title || "Junta Directiva";
    const photoUrl = data?.photoUrl || "/images/quienes-junta.jpg";
    const photoAlt = data?.photoAlt || "Junta Directiva Aconiño";

    return (
        <section id="junta-directiva" className="bg-gray-50 py-24 md:py-32 relative overflow-hidden scroll-mt-32">
            <div className="absolute top-1/2 left-0 w-full h-[300px] bg-primary/5 -skew-y-3 transform -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[2px] bg-accent w-12"></div>
                        <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">{subtitle}</span>
                        <div className="h-[2px] bg-accent w-12"></div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-primary">
                        {title}
                    </h2>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full max-w-6xl mx-auto shadow-[0_20px_50px_rgba(8,112,184,0.15)] rounded-3xl overflow-hidden group bg-white border border-white"
                >
                    {/* Background decoration inside the frame */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                    
                    <div className="relative w-full h-auto">
                        <Image
                            src={photoUrl}
                            alt={photoAlt}
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        />
                    </div>
                    
                    {/* Elegant Minimalist Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    {/* Subtle Internal Shine Border */}
                    <div className="absolute inset-3 md:inset-5 border border-white/20 rounded-[1.4rem] md:rounded-[2rem] pointer-events-none" />
                    
                    {/* Brand Accent Detail - Bottom Right Corner */}
                    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 md:w-16 h-[2px] bg-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />
                    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 h-12 md:h-16 w-[2px] bg-accent rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom" />
                </motion.div>
            </div>
        </section>
    );
}

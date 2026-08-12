"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";
import { PortableText, PortableTextBlock } from "@portabletext/react";

interface MissionData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    description?: PortableTextBlock[];
}

interface Props {
    data?: MissionData | null;
}

export default function NosotrosMission({ data }: Props) {
    const subtitle = data?.subtitle || "Nuestro Propósito";
    const title = data?.title || "Misión";
    const imageUrl = data?.imageUrl || "/images/quienes-mission.jpg";
    const imageAlt = data?.imageAlt || "Terapeuta con niño";

    return (
        <section id="mision" className="bg-primary flex flex-col lg:flex-row relative overflow-hidden scroll-mt-32">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-white/10" />

            {/* Left side Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 flex items-center p-8 md:p-20 lg:p-24 relative z-10"
            >
                <div className="max-w-xl mx-auto w-full text-white">
                    <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                        <span className="text-accent font-bold tracking-widest uppercase text-[10px] md:text-sm">{subtitle}</span>
                        <div className="h-[1px] md:h-[2px] w-12 md:w-16 bg-white/20"></div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 tracking-tight drop-shadow-md leading-tight">
                        {title}
                    </h2>

                    <div className="relative">
                        <span className="absolute -top-8 md:-top-10 -left-6 md:-left-8 text-7xl md:text-8xl text-white/10 font-serif leading-none select-none">&quot;</span>
                        {data?.description ? (
                            <div className="space-y-4 md:space-y-6 relative z-10">
                                <PortableText
                                    value={data.description}
                                    components={{
                                        block: {
                                            normal: ({ children }) => (
                                                <p className="text-gray-200 leading-relaxed text-lg md:text-xl text-justify font-medium">{children}</p>
                                            ),
                                        },
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="space-y-4 md:space-y-6 relative z-10">
                                <p className="text-gray-200 leading-relaxed text-lg md:text-2xl text-justify font-medium">
                                    Impulsar el desarrollo y la participación plena de bebés, niños y jóvenes con alteraciones del neurodesarrollo mediante programas terapéuticos interdisciplinarios.
                                </p>
                                <p className="text-gray-200 leading-relaxed text-lg md:text-2xl text-justify font-medium">
                                    Acompañar y orientar a las familias, fortaleciendo su participación activa en el proceso de desarrollo y rehabilitación.
                                </p>
                                <p className="text-gray-200 leading-relaxed text-lg md:text-2xl text-justify font-medium">
                                    Impulsar la formación continua de profesionales mediante programas de capacitación, cursos y seminarios especializados, incorporando instructores y expertos de Europa, Estados Unidos y otros países, para fortalecer el intercambio de conocimiento y elevar la calidad de la atención a nivel nacional e internacional.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-accent h-2/3 w-3 hidden lg:block rounded-l-full origin-top"
                />
            </motion.div>

            {/* Right side Image with Frame */}
            <div className="w-full lg:w-1/2 relative bg-primary/20 flex items-center justify-center p-6 md:p-12 lg:p-20 z-10 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-video md:aspect-square lg:h-full min-h-[280px] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden group bg-accent/5 border border-white/10"
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    {/* Minimalist Overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-500" />

                    {/* Internal Shine border */}
                    <div className="absolute inset-2 md:inset-4 border border-white/20 rounded-xl md:rounded-2xl pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}

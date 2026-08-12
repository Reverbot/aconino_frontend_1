"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";
import { FaHeart } from "react-icons/fa";

interface SemillaData {
    name?: string;
    age?: string;
    imageUrl?: string;
    imageAlt?: string;
}

interface Props {
    data?: SemillaData[] | null;
}

const defaultSemillas: SemillaData[] = [
    { name: "Sandra Arbeláez", age: "8", imageUrl: "/images/programa-atencion-temprana.jpg" },
    { name: "Ernesto Constantín", age: "10", imageUrl: "/images/programa-neurodesarrollo.jpg" },
    { name: "Juan Carlos Andrade", age: "7", imageUrl: "/images/programa-aprendizaje.jpg" },
    { name: "Guillermo José Ronderos", age: "9", imageUrl: "/images/programa-pediasuit.jpg" },
    { name: "Camilo González", age: "6", imageUrl: "/images/quienes-intro.jpg" },
    { name: "Daniel Domínguez", age: "11", imageUrl: "/images/programas-intervention.jpg" },
];

// Nombres que no se renderizan aunque estén en el contenido de respaldo.
const HIDDEN_SEMILLAS = ["Daniel Domínguez"];

export default function NosotrosSemillas({ data }: Props) {
    const semillas = (data && data.length > 0 ? data : defaultSemillas)
        .filter((child) => !HIDDEN_SEMILLAS.includes(child.name || ""));

    const SemillaCard = ({ child, delay }: { child: SemillaData, delay: number }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            className="flex flex-col items-center text-center group cursor-pointer w-full max-w-[120px] mx-auto"
        >
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-36 md:h-36 mb-3 md:mb-6 rounded-2xl md:rounded-3xl rotate-3 overflow-hidden shadow-lg border-2 md:border-[6px] border-white group-hover:rotate-0 group-hover:scale-105 group-hover:border-accent transition-all duration-500">
                <Image
                    src={child.imageUrl || "/images/programa-atencion-temprana.jpg"}
                    alt={child.name || "Niño"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <h4 className="text-primary group-hover:text-accent font-black text-center text-[10px] md:text-xl leading-tight px-1 transition-colors duration-300">
                {child.name}
            </h4>
            {child.age && (
                <span className="text-accent/80 font-bold text-[8px] md:text-sm uppercase tracking-wider mt-1">
                    {child.age} años
                </span>
            )}
        </motion.div>
    );

    return (
        <section className="bg-white">
            <div className="relative bg-gradient-to-r from-primary via-primary to-secondary py-12 md:py-24 overflow-hidden shadow-inner">
                <div className="absolute inset-0 z-0 opacity-20 bg-white/10 mix-blend-overlay" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center"
                >
                    <FaHeart className="text-accent text-3xl md:text-5xl mb-4 md:mb-6 drop-shadow-md" />
                    <h2 className="text-white text-2xl md:text-6xl font-black leading-tight drop-shadow-xl tracking-tight">
                        Semillas de amor <br className="hidden md:block" />
                        <span className="text-accent italic font-light tracking-normal text-xl md:text-2xl block mt-1">Estos cinco niños no solo son parte de nuestra historia; son la razón por la que seguimos creyendo que cada infancia merece ser acompañada, valorada y celebrada como un regalo para el mundo</span>
                    </h2>
                    <p className="text-white/80 font-bold uppercase tracking-[0.2em] text-sm md:text-lg mt-4 md:mt-6">
                        Hijos de Fundadores
                    </p>
                </motion.div>
            </div>

            <div className="py-12 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 md:gap-y-20 gap-x-1 sm:gap-x-3 md:gap-x-10"
                >
                    {semillas.map((child, idx) => (
                        <SemillaCard
                            key={idx}
                            child={child}
                            delay={idx * 0.05}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

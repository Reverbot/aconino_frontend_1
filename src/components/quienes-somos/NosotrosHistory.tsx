"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";
import { FaHistory } from "react-icons/fa";

interface HistoryEvent {
    year: string;
    title: string;
    description: string;
}

interface HistoryData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    events?: HistoryEvent[];
}

interface Props {
    data?: HistoryData | null;
}

export default function NosotrosHistory({ data }: Props) {
    const subtitle = data?.subtitle || "Nuestro Legado";
    const title = data?.title || "Historia";
    const imageUrl = data?.imageUrl || "/images/quienes-history.jpg";
    const imageAlt = data?.imageAlt || "Terapia grupal con niños";

    return (
        <section id="historia" className="bg-primary flex flex-col md:flex-row relative overflow-hidden scroll-mt-32">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex items-center p-6 md:p-12 lg:p-24 relative overflow-hidden z-10"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                
                <div className="max-w-xl mx-auto z-10 w-full text-white">
                    <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                        <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px] md:text-sm">{subtitle}</span>
                        <div className="h-[1px] md:h-[2px] w-12 md:w-16 bg-accent"></div>
                    </div>
                    
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                        <div className="bg-white/10 p-2 md:p-3 rounded-full">
                            <FaHistory className="text-accent text-xl md:text-2xl" />
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-sm leading-tight">
                            {title}
                        </h2>
                    </div>
                    
                    <div className="space-y-4 md:space-y-5">
                        <p className="text-gray-300 leading-relaxed text-sm md:text-lg text-justify font-medium">
                            <span className="bg-accent text-primary px-1 rounded-sm">En noviembre de 1990,</span> siete padres y dos fisioterapeutas, movidos por la necesidad de encontrar mejores oportunidades de atención y desarrollo para sus hijos con discapacidad, decidieron unir esfuerzos y crear esta organización privada sin ánimo de lucro.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-lg text-justify font-medium">
                            Su propósito no era solo brindar apoyo a sus propios hijos, sino generar un espacio de atención y acompañamiento para todas las familias de la comunidad que enfrentaban la misma realidad: la falta de servicios especializados para niños, niñas y jóvenes con alteraciones sensoriomotoras derivadas de lesiones del sistema nervioso central.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-lg text-justify font-medium">
                            Desde su origen, la organización se construyó con una convicción clara: las familias son un pilar fundamental en el proceso de rehabilitación y desarrollo de las personas con discapacidad. Por ello, la participación activa, el acompañamiento y el fortalecimiento de las familias se convirtieron en el eje central de nuestro trabajo.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-lg text-justify font-medium">
                            Así nació Aconiño: como una iniciativa de familias para familias, comprometida con ofrecer atención interdisciplinaria, apoyo humano y oportunidades de desarrollo para cada niño, niña y joven que lo requiera.
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="w-full md:w-1/2 relative bg-primary flex items-center justify-center p-6 md:p-12 lg:p-20 z-10 overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative w-full aspect-video md:aspect-square lg:h-full min-h-[300px] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden group border border-white/10"
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Internal Shine border matching Mission/Vision */}
                    <div className="absolute inset-2 md:inset-4 border border-white/10 rounded-xl md:rounded-2xl pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}

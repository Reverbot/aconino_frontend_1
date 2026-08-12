"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";
import { FaHeart } from "react-icons/fa";

interface NosotrosIntroProps {
    data?: {
        subtitle?: string;
        title?: string;
        imageUrl?: string;
        imageAlt?: string;
        description?: string | object;
        stats?: Array<{
            value: string;
            label: string;
            color: string;
        }>;
    } | null;
}

export default function NosotrosIntro({ data }: NosotrosIntroProps) {
    const subtitle = data?.subtitle || "Historia Aconiño";
    const title = data?.title || "Nuestra Identidad";
    const imageUrl = data?.imageUrl || "/images/quienes-intro.jpg";
    const imageAlt = data?.imageAlt || "Niña en terapia";

    return (
        <section id="nosotros" className="py-12 md:py-32 bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-gray-50 rounded-full blur-[50px] md:blur-[80px] lg:blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[150px] h-[150px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-accent/5 rounded-full blur-[40px] md:blur-[60px] lg:blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">

                    {/* Left side Image with Framer Motion */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 flex justify-center order-1 lg:order-1"
                    >
                        <div className="relative w-full max-w-lg">
                            <div className="relative aspect-video md:aspect-square w-full shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden group max-h-[300px] md:max-h-none">
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Inner overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Decorative Accent Elements - Half-in, Half-out of the Image Corner */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center border-b-4 border-accent z-20"
                            >
                                <FaHeart className="text-2xl md:text-4xl text-accent" />
                            </motion.div>

                            <div className="hidden md:block absolute -top-6 -left-6 w-32 h-32 border-8 border-gray-100 rounded-3xl -z-10" />
                        </div>
                    </motion.div>

                    {/* Right side Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="w-full lg:w-1/2 order-2 lg:order-2"
                    >
                        <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                            <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px] md:text-sm">{subtitle}</span>
                            <div className="h-[1px] md:h-[2px] w-12 md:w-16 bg-accent"></div>
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-6 md:mb-8 tracking-tight leading-tight">
                            {title}
                        </h2>

                        <div className="prose prose-base md:prose-lg text-gray-600 prose-p:leading-relaxed max-w-none space-y-4 md:space-y-6">
                            <p className="text-justify text-sm md:text-lg">
                                Somos una entidad privada sin ánimo de lucro fundada en 1990, nacida con el propósito de acompañar y apoyar a las familias de niños y jóvenes con discapacidad en su proceso de desarrollo y rehabilitación para que puedan participar plenamente en su vida familiar, escolar y social.
                            </p>
                            <p className="text-justify text-sm md:text-lg">
                                En Aconiño brindamos atención integral basada en el Neurodesarrollo, abordando condiciones como parálisis cerebral, retraso en el desarrollo psicomotor, síndrome de West, hipotonía, entre otras.
                            </p>
                            <p className="text-justify text-sm md:text-lg">
                                Durante más de tres décadas de trabajo, hemos construido un espacio seguro y humano donde la ciencia, el compromiso profesional y el amor por lo que hacemos se unen para acompañar a cada niño y joven en el desarrollo de su máximo potencial.                            </p>
                            <p className="text-justify text-sm md:text-lg font-bold text-primary">
                                Aconiño es, ante todo, un lugar donde las familias encuentran apoyo, esperanza y oportunidades para el futuro.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 md:mt-10 grid grid-cols-2 lg:flex gap-6 md:gap-10"
                        >
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

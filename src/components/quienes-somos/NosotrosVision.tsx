"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";

interface VisionData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    cardImageUrl?: string;
    cardImageAlt?: string;
    visionText?: string;
    visionTextSecondary?: string;
}

interface Props {
    data?: VisionData | null;
}

export default function NosotrosVision({ data }: Props) {
    const imageUrl = data?.imageUrl || "/images/quienes-vision.jpg";
    const imageAlt = data?.imageAlt || "Terapeuta ayudando a niña";

    return (
        <section id="vision" className="bg-gray-50 flex flex-col-reverse lg:flex-row relative overflow-hidden scroll-mt-32">

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 relative min-h-[420px] md:min-h-[620px] flex items-center justify-center p-6 md:p-10 lg:p-12 z-10 overflow-hidden"
            >
                <div className="relative w-full aspect-video md:aspect-square lg:h-full min-h-[320px] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden group border border-white/20">
                    <Image
                        src={data?.cardImageUrl || "/images/quienes-vision.jpg"}
                        alt={data?.cardImageAlt || "Visión Aconiño"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-2 md:inset-4 border border-white/20 rounded-xl md:rounded-2xl pointer-events-none" />
                </div>
            </motion.div>

            <div className="w-full lg:w-1/2 relative bg-accent/10 md:bg-accent min-h-[420px] md:min-h-[620px] flex items-center justify-center p-6 md:p-10 lg:p-12 z-10 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"
                />

                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute left-0 top-1/4 h-1/2 w-3 bg-primary hidden lg:block rounded-r-full origin-top z-20"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-video md:aspect-square lg:h-full min-h-[320px] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden group border border-white/20"
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Internal Shine border matching Mission */}
                    <div className="absolute inset-2 md:inset-4 border border-white/20 rounded-xl md:rounded-2xl pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}

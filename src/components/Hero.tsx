"use client";

import { motion } from "@/compat/motion";
import Link from "next/link";
import HeroBackground from "./hero/HeroBackground";

// ─── Types ────────────────────────────────────────────────────────
interface HeroProps {
    acf?: {
        hero_title?: string;
        hero_description?: string;
        hero_background_type?: string;
        hero_video_url?: string;
        hero_image?: string;
    };
}

// ─── Constants ────────────────────────────────────────────────────
const EASE_EXPO = [0.19, 1, 0.22, 1] as const;

const STATS = [
    { value: "36", unit: "años", label: "transformando vidas" },
    { value: "150+", unit: "niños", label: "atendidos cada año" },
    { value: "5.000+", unit: "sesiones", label: "terapéuticas al año" },
];

// ─── Component ────────────────────────────────────────────────────
export default function Hero({ acf }: HeroProps) {
    const title       = acf?.hero_title        || "36 años acompañando a niños con discapacidad.";
    const description = acf?.hero_description  || "Hoy seguimos soñando y trabajando por un nuevo paso: un Centro Día para adultos.";
    const bgType      = (acf?.hero_background_type === "video" ? "video" : "image") as "video" | "image";
    const videoUrl    = acf?.hero_video_url;
    const imageUrl    = acf?.hero_image || "/images/hero-background-blue.png";

    return (
        <section className="relative w-full min-h-[78vh] flex flex-col justify-between overflow-hidden">

            {/* ── 1. Background ─────────────────────────────────── */}
            <div className="absolute inset-0 z-0">
                <HeroBackground
                    backgroundType={bgType}
                    videoUrl={videoUrl}
                    imageUrl={imageUrl}
                    posterPlaceholder="/images/hero-background-blue.png"
                    defaultImage="/images/hero-background-blue.png"
                />

                {/* Multi-layer overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/80 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent z-10" />
            </div>

            {/* ── 2. Main content ───────────────────────────────── */}
            <div className="relative z-20 flex-1 flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">

                    <div className="max-w-3xl">

                        {/* Badge / supertítulo */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: EASE_EXPO }}
                            className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-accent font-bold text-xs tracking-widest uppercase">
                                ONG Colombiana · Desde 1990
                            </span>
                        </motion.div>

                        {/* H1 */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1, ease: EASE_EXPO }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
                            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
                        >
                            Transformando vidas{" "}
                            <span className="text-accent">una terapia</span>{" "}
                            a la vez.
                        </motion.h1>

                        {/* Descripción */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.22, ease: EASE_EXPO }}
                            className="mt-5 text-base md:text-lg text-white/80 max-w-xl leading-relaxed font-medium"
                        >
                            {description}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.34, ease: EASE_EXPO }}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >
                            {/* Primario */}
                            <Link
                                href="/apoyanos"
                                className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-7 py-3.5 rounded-full shadow-lg shadow-accent/30 hover:bg-white hover:text-primary hover:shadow-xl active:scale-[0.97] transition-all duration-200 text-sm tracking-wide"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                                </svg>
                                Apóyanos
                            </Link>

                            {/* Secundario */}
                            <Link
                                href="/quienes-somos/nosotros"
                                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 hover:border-white/40 active:scale-[0.97] transition-all duration-200 text-sm"
                            >
                                Conoce nuestra historia
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── 3. Stats bar flotante en el fondo ─────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE_EXPO }}
                className="relative z-20 w-full"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-6 md:pb-8">
                    <div className="inline-flex flex-wrap gap-px rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md">
                        {STATS.map((stat, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center px-8 py-4 min-w-[120px] hover:bg-white/10 transition-colors duration-200 group"
                            >
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl md:text-3xl font-black text-accent leading-none">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-wide ml-1">
                                        {stat.unit}
                                    </span>
                                </div>
                                <span className="text-[10px] md:text-xs text-white/50 mt-1 font-medium text-center leading-tight">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ── 4. Scroll indicator ───────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute bottom-4 right-8 z-20 hidden md:flex flex-col items-center gap-1.5"
                aria-hidden="true"
            >
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 rotate-90 origin-center translate-x-3">scroll</span>
                <div className="w-px h-10 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
            </motion.div>
        </section>
    );
}

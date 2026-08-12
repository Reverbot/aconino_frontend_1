"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "@/compat/motion";
import { Calendar, MapPin, User, ArrowRight, Star } from "lucide-react";

const countryFlags: Record<string, string> = {
    CO: "🇨🇴",
    VE: "🇻🇪",
    PE: "🇵🇪",
    EC: "🇪🇨",
    MX: "🇲🇽",
    AR: "🇦🇷",
    BR: "🇧🇷",
    CL: "🇨🇱",
    US: "🇺🇸",
    ES: "🇪🇸",
};

export interface CourseCardData {
    id: string;
    title: string;
    slug: string;
    dates?: string | null;
    duration?: string | null;
    location?: string | null;
    countryCode?: string | null;
    status?: string | null;
    description?: string | null;
    featuredImage?: { url: string; alt?: string } | string | null;
    detailUrl?: string | null;
    isFeatured?: boolean;
    instructor?: string | null;
}

export default function CourseCard({
    course,
    index = 0,
}: {
    course: CourseCardData;
    index?: number;
}) {
    const imageUrl =
        typeof course.featuredImage === "object" && course.featuredImage !== null
            ? course.featuredImage.url
            : typeof course.featuredImage === "string"
                ? course.featuredImage
                // Fallback coherente con Aconiño
                : "/images/programa-neurodesarrollo.jpg";

    const imageAlt =
        typeof course.featuredImage === "object" && course.featuredImage !== null
            ? course.featuredImage.alt || course.title
            : course.title;

    const flag = course.countryCode ? countryFlags[course.countryCode] || "" : "";
    
    // Estados semánticos
    const isFinished = course.status?.toLowerCase() === "finalizado";
    const isActive = course.status?.toLowerCase() === "activo" || course.status?.toLowerCase() === "abierto";
    const isUpcoming = course.status?.toLowerCase() === "proximamente" || course.status?.toLowerCase() === "próximamente";

    const href = course.detailUrl || `#${course.slug}`;
    const isExternal = !!course.detailUrl;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -12 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
                y: { type: "spring", stiffness: 260, damping: 20 }
            }}
            className="group h-full flex flex-col relative"
        >
            {/* Si es destacado, le damos un resplandor extra sutil */}
            {course.isFeatured && (
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/40 to-primary/20 opacity-30 group-hover:opacity-50 rounded-[2.2rem] blur-xl transition duration-500" />
            )}
            
            <div className={`relative bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border flex flex-col h-full group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500 z-10 ${course.isFeatured ? 'border-accent/40 ring-1 ring-accent/20' : 'border-slate-100'}`}>
                
                {/* Image Section */}
                <div className="relative w-full overflow-hidden h-72 md:h-96">
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                        {/* Status Badge */}
                        <div className="flex flex-wrap gap-2">
                            {isFinished ? (
                                <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                                    Finalizado
                                </span>
                            ) : isActive ? (
                                <motion.span 
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5"
                                >
                                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                    Abierto
                                </motion.span>
                            ) : isUpcoming ? (
                                <span className="bg-accent text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                    Próximamente
                                </span>
                            ) : null}
                        </div>

                        {/* Featured Badge */}
                        {course.isFeatured && (
                            <span className="bg-white text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-1 border border-accent">
                                <Star className="w-3 h-3 fill-accent text-accent" /> Destacado
                            </span>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                    
                    {/* Title */}
                    <h3 className="text-primary font-black uppercase leading-tight mb-5 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 line-clamp-2 text-xl md:text-2xl tracking-tight">
                        {course.title}
                    </h3>

                    {/* Metadata Grid */}
                    <div className="space-y-4 mb-6">
                        {course.dates && (
                            <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                                <div className="bg-slate-50 p-2 rounded-xl text-primary border border-slate-100">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <span className="truncate tracking-tight">{course.dates}</span>
                            </div>
                        )}
                        
                        {course.location && (
                            <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                                <div className="bg-slate-50 p-2 rounded-xl text-primary border border-slate-100">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="truncate tracking-tight">
                                    {course.location} {flag}
                                </span>
                            </div>
                        )}

                        {course.instructor && (
                            <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                                <div className="bg-slate-50 p-2 rounded-xl text-primary border border-slate-100">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="truncate">
                                    Por: <span className="text-primary">{course.instructor}</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {course.description && (
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-3 font-medium">
                            {course.description}
                        </p>
                    )}

                    {/* CTA Button */}
                    <div className="mt-auto">
                        {isFinished ? (
                            isExternal ? (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn flex items-center justify-center gap-3 w-full text-center font-black text-xs uppercase tracking-widest py-5 px-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl bg-slate-100 text-slate-400"
                                >
                                    Ver Histórico
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            ) : (
                                <Link
                                    href={href}
                                    className="group/btn flex items-center justify-center gap-3 w-full text-center font-black text-xs uppercase tracking-widest py-5 px-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl bg-slate-100 text-slate-400"
                                >
                                    Ver Histórico
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            )
                        ) : (
                            <a
                                href="https://wa.me/573133910760"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn flex items-center justify-center gap-3 w-full text-center font-black text-xs uppercase tracking-widest py-5 px-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl bg-primary text-white hover:bg-secondary hover:-translate-y-1"
                            >
                                Inscribirse Ahora
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

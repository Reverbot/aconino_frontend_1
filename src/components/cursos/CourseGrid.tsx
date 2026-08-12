"use client";

import { motion, type Variants } from "@/compat/motion";
import CourseCard, { CourseCardData } from "./CourseCard";
import ScrollReveal from "../animations/ScrollReveal";
import { Sparkles, Calendar as CalendarIcon } from "lucide-react";

interface CourseGridProps {
    courses: CourseCardData[];
}

// Mapa de meses en español para ordenar por fecha
const MONTHS: Record<string, number> = {
    enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
    julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10,
    noviembre: 11, diciembre: 12,
};

// Extrae una clave ordenable (mes*100 + día) del texto de fechas. Sin fecha → al final.
function dateSortKey(dates?: string | null): number {
    if (!dates) return 999999;
    const lower = dates.toLowerCase();
    let bestIdx = Infinity;
    let month = 13;
    for (const [name, num] of Object.entries(MONTHS)) {
        const idx = lower.indexOf(name);
        if (idx !== -1 && idx < bestIdx) { bestIdx = idx; month = num; }
    }
    const dayMatch = lower.match(/\b(\d{1,2})\b/);
    const day = dayMatch ? parseInt(dayMatch[1], 10) : 0;
    return month * 100 + day;
}

// Datos estáticos coherentes con Aconiño para la salida sin CMS.
const fallbackCourses: CourseCardData[] = [
    {
        id: "fallback-1",
        title: "Certificación en Neurodesarrollo (NDT) Bobath Pediátrico",
        slug: "certificacion-neurodesarrollo-ndt",
        dates: "Inicia Próximamente",
        location: "Bogotá, Sede Aconiño",
        countryCode: "CO",
        status: "activo",
        description: "Formación especializada e intensiva dirigida a profesionales de la salud. Aprende a aplicar el modelo contemporáneo de neurodesarrollo en niños con parálisis cerebral.",
        featuredImage: "/images/programa-neurodesarrollo.jpg",
        isFeatured: true,
        instructor: "Dr. Experto Invitado Aconiño",
    },
    {
        id: "fallback-2",
        title: "Taller Práctico: Protocolo PediaSuit Intensivo",
        slug: "taller-pediasuit",
        dates: "15 de Diciembre, 2026",
        location: "Modalidad Híbrida",
        countryCode: "CO",
        status: "proximamente",
        description: "Profundización en el uso de la Órtesis Dinámica (Traje) enfocada en mejorar la postura y movimiento autónomo del niño.",
        featuredImage: "/images/programa-pediasuit.jpg",
    },
    {
        id: "fallback-3",
        title: "Atención Temprana y Familia: Un Abordaje Integral",
        slug: "atencion-temprana-familia",
        dates: "20 al 22 de Noviembre, 2026",
        location: "Online",
        status: "finalizado",
        description: "Curso teórico enfocado en capacitar a las familias y cuidadores tempranos en estimulación sicomotriz desde casa.",
        featuredImage: "/images/programa-atencion-temprana.jpg",
        instructor: "Equipo Terapéutico Aconiño",
    }
];

// Variantes para animación stagger
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96, rotate: -1 },
    show: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotate: 0,
        transition: { 
            type: "spring", 
            stiffness: 60, 
            damping: 15,
            mass: 0.8
        } 
    }
};

export default function CourseGrid({ courses }: CourseGridProps) {
    interface CourseWithYear extends CourseCardData {
        year?: number;
    }

    const hasRealCourses = courses && courses.length > 0;
    const displayCourses = hasRealCourses ? courses : fallbackCourses;

    // Agrupar por año (Descendiente)
    const grouped = displayCourses.reduce<Record<number, CourseCardData[]>>((acc, course) => {
        const year = (course as CourseWithYear).year || new Date().getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(course);
        return acc;
    }, {});

    const sortedYears = Object.keys(grouped)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <section className="py-20 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
            {/* Elementos Decorativos de Fondo (Glassmorphism blobs) */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div 
                    animate={{ 
                        y: [0, -40, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -right-[15%] w-[400px] h-[400px] rounded-full bg-accent/20 blur-[120px]" 
                />
                <motion.div 
                    animate={{ 
                        y: [0, 40, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[50%] -left-[10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" 
                />
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
                
                {sortedYears.map((year) => (
                    <div key={year} className="mb-24 last:mb-0">
                        {/* Cabecera del Año */}
                        <ScrollReveal animation="fade-up" delay={0.1}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20 border-b border-primary/10 pb-8">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 text-accent font-black uppercase tracking-widest text-sm mb-4">
                                        <div className="w-8 h-px bg-accent/30 hidden md:block"></div>
                                        <CalendarIcon className="w-5 h-5" />
                                        Agenda Académica
                                    </div>
                                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary tracking-tighter leading-none">
                                        {year}
                                    </h2>
                                </div>
                            
                            </div>
                        </ScrollReveal>

                        {/* Grid de Tarjetas Animado */}
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="bg-transparent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
                        >
                            {[...grouped[year]]
                                .sort((a, b) => dateSortKey(a.dates) - dateSortKey(b.dates))
                                .map((course, idx) => (
                                <motion.div 
                                    key={course.id} 
                                    id={course.slug}
                                    variants={itemVariants}
                                    className="col-span-1 scroll-mt-32"
                                >
                                    <CourseCard course={course} index={idx} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}

                {/* Aviso: Nuevos cursos pronto (debajo de los ejemplos) */}
                {!hasRealCourses && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 max-w-4xl mx-auto text-center bg-white/60 backdrop-blur-md border border-accent/20 rounded-2xl p-6 shadow-sm"
                    >
                        <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
                        <h3 className="text-primary font-black text-xl mb-2">¡Nuevos Cursos Pronto!</h3>
                        <p className="text-slate-500">
                            Actualmente estamos preparando nuestra próxima oferta académica. Aquí puedes ver ejemplos de las formaciones de alta calidad que ofrecemos en Aconiño.
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Texto decorativo de fondo con Parallax */}
            <div className="hidden lg:block absolute bottom-0 right-0 opacity-[0.03] pointer-events-none -mb-20 select-none z-0 overflow-hidden">
                <motion.div>
                    <span className="text-[24rem] font-black text-[#0a1f44] leading-none tracking-tighter whitespace-nowrap">
                        ACN ACADEMY
                    </span>
                </motion.div>
            </div>
        </section>
    );
}

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { FaCalendarAlt, FaMapMarkerAlt, FaCertificate, FaArrowLeft } from "react-icons/fa";

const countryFlags: Record<string, string> = {
  CO: "🇨🇴", VE: "🇻🇪", PE: "🇵🇪", EC: "🇪🇨", MX: "🇲🇽",
  AR: "🇦🇷", BR: "🇧🇷", CL: "🇨🇱", US: "🇺🇸", ES: "🇪🇸",
};

interface CursoData {
  _id: string;
  title: string;
  slug: string;
  dates?: string | null;
  location?: string | null;
  countryCode?: string | null;
  status?: string | null;
  description?: string | null;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  benefits?: string[];
  detailUrl?: string | null;
  year?: number;
  instructor?: string | null;
}

const staticCourses: Record<string, CursoData> = {
  "concepto-bobath": {
    _id: "course-bobath",
    title: "Certificación en Neurodesarrollo (NDT) Bobath Pediátrico",
    slug: "concepto-bobath",
    dates: "Inicia próximamente",
    location: "Bogotá, Sede Aconiño",
    countryCode: "CO",
    status: "activo",
    description: "Formación especializada e intensiva dirigida a profesionales de la salud. Aprende a aplicar el modelo contemporáneo de neurodesarrollo en niños con parálisis cerebral.",
    featuredImage: "/images/programa-neurodesarrollo.jpg",
    instructor: "Equipo Terapéutico Aconiño",
  },
  "movimientos-generales": {
    _id: "course-movimientos",
    title: "Movimientos generales y neurodesarrollo",
    slug: "movimientos-generales",
    dates: "Próxima convocatoria",
    location: "Modalidad presencial",
    countryCode: "CO",
    status: "proximamente",
    description: "Herramientas de observación y análisis del movimiento durante las primeras etapas de vida.",
    featuredImage: "/images/programa-atencion-temprana.jpg",
  },
  "pediasuit-formacion": {
    _id: "course-pediasuit",
    title: "Protocolo intensivo PediaSuit",
    slug: "pediasuit-formacion",
    dates: "Próxima convocatoria",
    location: "Bogotá, Colombia",
    countryCode: "CO",
    status: "proximamente",
    description: "Capacitación especializada sobre evaluación, objetivos y aplicación del protocolo intensivo.",
    featuredImage: "/images/programa-pediasuit.jpg",
  },
};

export default function CoursePage({ slug }: { slug: string }) {
  const curso = staticCourses[slug] || staticCourses["concepto-bobath"];

  const flag = curso.countryCode ? countryFlags[curso.countryCode] || "" : "";
  const isFinished = curso.status === "finalizado";

  const imageUrl = curso.featuredImage || "/images/cursos-hero.jpg";

  const defaultBenefits = [
    "Material de apoyo incluido",
    "Sesiones prácticas",
    "Diploma oficial",
    "Instructores internacionales",
  ];
  const benefits = curso.benefits && curso.benefits.length > 0 ? curso.benefits : defaultBenefits;

  return (
    <article className="min-h-screen bg-white">
      <header className="bg-primary text-white pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-in" delay={0.1}>
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Volver a cursos</span>
            </Link>
          </ScrollReveal>

          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal animation="fade-up" delay={0.2}>
              <span className="text-accent font-bold tracking-widest uppercase mb-4 block text-sm">
                Capacitación Especializada
              </span>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={0.3}>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                {curso.title}
              </h1>
            </ScrollReveal>

            {isFinished && (
              <ScrollReveal animation="fade-up" delay={0.35}>
                <span className="inline-block bg-red-500/90 text-white text-sm font-black px-5 py-2 rounded-full uppercase tracking-wider mb-6 shadow-lg">
                  Finalizado
                </span>
              </ScrollReveal>
            )}

            <ScrollReveal animation="fade-up" delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4">
                {curso.dates && (
                  <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 flex items-center gap-3">
                    <FaCalendarAlt className="text-accent" />
                    <div className="text-left">
                      <span className="text-white/60 text-xs block">Fechas</span>
                      <span className="font-bold text-sm">{curso.dates}</span>
                    </div>
                  </div>
                )}
                {curso.location && (
                  <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 flex items-center gap-3">
                    <FaMapMarkerAlt className="text-accent" />
                    <div className="text-left">
                      <span className="text-white/60 text-xs block">Ubicación</span>
                      <span className="font-bold text-sm">{curso.location} {flag}</span>
                    </div>
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 flex items-center gap-3">
                  <FaCertificate className="text-accent" />
                  <div className="text-left">
                    <span className="text-white/60 text-xs block">Certificación</span>
                    <span className="font-bold text-sm">Avalada por Aconiño</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 md:w-96 h-80 md:h-96 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 md:w-96 h-80 md:h-96 bg-secondary rounded-full blur-[120px]" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            {imageUrl && (
              <ScrollReveal animation="fade-up" delay={0.1}>
                <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-12">
                  <Image
                    src={imageUrl}
                    alt={curso.featuredImageAlt || curso.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal animation="fade-up" delay={0.2}>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-6">
                Sobre el curso
              </h2>
              {curso.description && (
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {curso.description}
                </p>
              )}
            </ScrollReveal>

          </div>

          <div className="relative">
            <ScrollReveal animation="slide-left" delay={0.3}>
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
                <h3 className="text-2xl font-extrabold text-primary mb-6">
                  Inscríbete ahora
                </h3>
                <ul className="space-y-4 mb-8 text-gray-600">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {isFinished ? (
                  <div className="text-center">
                    <p className="text-gray-400 font-medium mb-4">
                      Este curso ya finalizó
                    </p>
                    <Link
                      href="/cursos"
                      className="w-full inline-block text-center bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-300 transition-all"
                    >
                      Ver próximos cursos
                    </Link>
                  </div>
                ) : (
                  <a
                    href="https://wa.me/573133910760"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block text-center bg-primary text-white font-black py-5 rounded-2xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    SOLICITAR CUPO
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </article>
  );
}

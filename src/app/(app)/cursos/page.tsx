import CursosHero from "@/components/cursos/CursosHero";
import BobathHistory from "@/components/cursos/BobathHistory";
import InstructorsSection from "@/components/cursos/InstructorsSection";
import CourseGrid from "@/components/cursos/CourseGrid";
import { CourseCardData } from "@/components/cursos/CourseCard";

export const metadata = {
  title: "Cursos y Capacitaciones - Asociación Aconiño",
  description:
    "Cursos de neurodesarrollo, certificaciones profesionales y capacitaciones especializadas en el tratamiento de la discapacidad sensoriomotora.",
};

export default function CursosPage() {
  const cursosPage = null;
  const cursosData: never[] = [];

  const courses: CourseCardData[] = (cursosData || []).map(
    (c: {
      _id: string;
      title: string;
      slug: string;
      dates: string | null;
      location: string | null;
      countryCode: string | null;
      status: string | null;
      description: string | null;
      featuredImage: string | null;
      year: number;
      detailUrl?: string | null;
      instructor?: string | null;
    }) => ({
      id: c._id,
      title: c.title,
      slug: c.slug,
      dates: c.dates,
      location: c.location,
      countryCode: c.countryCode,
      status: c.status,
      description: c.description,
      featuredImage: c.featuredImage,
      year: c.year,
      detailUrl: c.detailUrl,
      instructor: c.instructor,
    })
  );

  let heroTitle = "Cursos y Capacitaciones";
  let heroSlides: { src: string; alt: string; overlayOpacity?: number }[] | undefined;

  if (cursosPage) {
    heroTitle = cursosPage.heroTitle || heroTitle;
    if (cursosPage.heroSlides && Array.isArray(cursosPage.heroSlides)) {
      heroSlides = cursosPage.heroSlides
        .filter((s: { imageUrl?: string }) => s.imageUrl)
        .map((s: { imageUrl?: string; alt?: string; overlayOpacity?: number }) => ({
          src: s.imageUrl || "/images/cursos-hero.jpg",
          alt: s.alt || "",
          overlayOpacity: s.overlayOpacity,
        }));
    }
  }

  const historyTitle = cursosPage?.historiaTitle || "Historia del Neurodesarrollo Bobath";
  const historySubtitle = cursosPage?.historiaSubtitle || "Un recorrido de innovación y esperanza en la neurorehabilitación";
  const historyEvents = cursosPage?.historiaEvents;

  const instructorsTitle = cursosPage?.instructorsTitle || "Aconiño agradece";
  const instructorsIntro = cursosPage?.instructorsIntro;
  const instructorGroups = cursosPage?.instructorGroups;

  const ctaConfig = cursosPage?.cta || {
    title: "¿Interesado en nuestros cursos?",
    description: "Contáctanos para conocer las próximas fechas y disponibilidad de cupos.",
    buttonText: "CONTÁCTANOS",
    buttonLink: "https://wa.me/573133910760",
  };

  return (
    <main className="min-h-screen bg-white">
      <CursosHero title={heroTitle} slides={heroSlides} />

      <BobathHistory
        title={historyTitle}
        subtitle={historySubtitle}
        events={historyEvents}
      />

      <CourseGrid courses={courses} />

      <section className="bg-gradient-to-br from-primary to-secondary py-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            {ctaConfig.title}
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            {ctaConfig.description}
          </p>
          <a
            href={ctaConfig.buttonLink || "https://wa.me/573133910760"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-primary px-10 py-4 rounded-full font-black text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
          >
            {ctaConfig.buttonText}
          </a>
        </div>
      </section>

      <InstructorsSection
        title={instructorsTitle}
        intro={instructorsIntro}
        groups={instructorGroups}
      />
    </main>
  );
}

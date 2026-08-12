"use client";

import ScrollReveal from "../animations/ScrollReveal";

interface InstructorGroup {
  organization: string;
  instructors: string[];
}

interface InstructorsSectionProps {
  title?: string;
  intro?: string;
  groups?: InstructorGroup[];
}

const defaultGroups: InstructorGroup[] = [
  {
    organization: "Asociación Europea de Neurodesarrollo EBTA",
    instructors: ["Neda Rotar", "Evi Sideri", "Lea Šuc", "Aleksandra Łada"],
  },
  {
    organization: "Asociación Americana de Neurodesarrollo NDTA",
    instructors: [
      "Teresa Gutierrez", "Gay Lloyd Pinder", "Addie Adler", "Roma Alexander",
      "Susanna Davis", "Lindell Owens", "Gail Ritchie", "Karl Barn",
      "Mechthild Rast", "Jane Shyer-Acevedo", "Pam Mullens",
    ],
  },
  {
    organization: "Universidad Nacional de Colombia",
    instructors: ["Dr. Jairo Zuluaga"],
  },
]

const defaultIntro =
  "A todos los instructores que han venido a aportarnos no solo su conocimiento y experiencia, " +
  "sino también la voluntad de hacernos partícipes de su sensibilidad frente al servicio por nuestra población vulnerable."

export default function InstructorsSection({
  title = "Aconiño agradece",
  intro = defaultIntro,
  groups = defaultGroups,
}: InstructorsSectionProps) {
  // Cubre null o arreglo vacío desde contenido estático.
  const safeGroups = Array.isArray(groups) && groups.length > 0 ? groups : defaultGroups;
  return (
    <section className="py-16 md:py-24 bg-gray-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4">{title}</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">{intro}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {safeGroups.map((group, idx) => (
              <div
                key={idx}
                className={`text-center px-6 py-10 rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 ${idx < safeGroups.length - 1 ? "md:border-r-0" : ""}`}
              >
                <h3 className="text-sm md:text-base font-black text-primary uppercase tracking-widest mb-6 leading-tight min-h-[3rem] flex items-center justify-center px-2">
                  {group.organization}
                </h3>
                <div className="w-12 h-1 bg-accent/30 mx-auto mb-8 rounded-full" />
                <ul className="space-y-3">
                  {(group.instructors || []).map((name, i) => (
                    <li
                      key={i}
                      className="text-gray-600 text-base font-bold hover:text-primary transition-colors duration-300"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

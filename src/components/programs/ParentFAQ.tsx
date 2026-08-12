import Image from "next/image";

const therapyImage = "/images/programas-intervention.jpg";

const faqs = [
  {
    question: "¿Cuándo debería iniciar terapia mi hijo?",
    answer: "Lo ideal es iniciar tan pronto como se note algún retraso en el desarrollo o tras recibir un diagnóstico. La intervención temprana aprovecha la neuroplasticidad del cerebro para obtener mejores resultados.",
  },
  {
    question: "¿Cuántas sesiones necesita?",
    answer: "El número de sesiones depende de la valoración inicial y de los objetivos planteados. Diseñamos un plan personalizado que se ajusta a las necesidades específicas de cada niño y su familia.",
  },
  {
    question: "¿Cómo puedo apoyar el proceso en casa?",
    answer: "La participación de la familia es fundamental. Nuestros especialistas te brindarán pautas, ejercicios y estrategias adaptadas para integrar el proceso terapéutico en las rutinas diarias del hogar.",
  },
  {
    question: "¿Mi hijo puede mejorar aunque tenga un diagnóstico?",
    answer: "¡Por supuesto! El objetivo de la habilitación y rehabilitación es potenciar al máximo las habilidades, fomentando la independencia y mejorando la calidad de vida funcional, independientemente del diagnóstico.",
  },
];

export function ParentFAQ({ imageUrl, imageAlt }: { imageUrl?: string; imageAlt?: string }) {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden text-slate-800">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
            <div className="h-[2px] w-6 md:w-12 bg-accent" />
            <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs md:text-sm">Para Familias</span>
            <div className="h-[2px] w-6 md:w-12 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight mb-6 px-4">Preguntas Frecuentes</h2>
          <p className="text-base md:text-xl text-gray-500 font-medium max-w-2xl mx-auto px-6">
            Resolvemos las dudas más comunes de los padres sobre el inicio y desarrollo del proceso terapéutico.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2 shrink-0">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-xl group">
              <Image
                src={imageUrl || therapyImage}
                alt={imageAlt || "Niños en diferentes tratamientos"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="mt-8 flex items-start gap-4 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 shadow-lg" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 4.4 1.6c-.9.8-1.9 1.2-1.9 2.4" /><path d="M12 16h.01" /></svg>
              </div>
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                Nuestros profesionales acompañan a los niños en diferentes etapas, garantizando un entorno seguro, motivador y <strong className="text-primary font-bold">centrado en su bienestar.</strong>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0} className="group border rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white border-gray-100 open:bg-blue-50/40 open:border-primary/20 open:shadow-xl hover:border-primary/20 hover:shadow-md">
                <summary className="w-full cursor-pointer list-none p-6 md:p-8 flex items-center justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                  <span className="text-lg md:text-xl font-bold leading-snug pr-4 text-slate-800 group-open:text-primary">{faq.question}</span>
                  <span className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-400 group-open:bg-primary group-open:text-white group-open:rotate-180 transition-all">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  </span>
                </summary>
                <div className="px-6 md:px-8 pb-8 pt-0">
                  <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium pb-2">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

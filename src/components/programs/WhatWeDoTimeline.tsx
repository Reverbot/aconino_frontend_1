import { ChevronLeft, ChevronRight } from "lucide-react";

export interface WhatWeDoStep {
  _key: string;
  step: number;
  title: string;
  description: string;
}

export interface WhatWeDoTimelineProps {
  steps: WhatWeDoStep[];
}

export function WhatWeDoTimeline({ steps }: WhatWeDoTimelineProps) {
  if (!steps || steps.length === 0) return null;

  const progress = (1 / steps.length) * 100;

  return (
    <div
      data-program-timeline
      data-current-index="0"
      data-step-count={steps.length}
      className="w-full max-w-5xl mx-auto py-10 md:py-20 px-4 overflow-hidden"
    >
      <div className="text-center mb-12 md:mb-20">
        <span className="text-accent font-black tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 block">
          Nuestra Metodología
        </span>
        <h2 className="text-3xl md:text-6xl font-black text-primary leading-tight">
          ¿Cómo lo hacemos?
        </h2>

        <div className="mt-6 max-w-md mx-auto relative h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            data-timeline-progress
            className="absolute left-0 top-0 h-full bg-accent transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div data-timeline-status className="mt-4 text-primary font-black text-xs md:text-sm tracking-widest uppercase opacity-40">
          Paso 1 de {steps.length}
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="w-full max-w-4xl relative min-h-[200px] md:min-h-[250px] flex items-center">
          {steps.map((item, index) => (
            <article
              key={item._key}
              data-timeline-card
              data-index={index}
              aria-hidden={index === 0 ? "false" : "true"}
              className={`bg-white px-8 py-6 md:px-14 md:py-8 lg:px-16 lg:py-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_70px_rgba(12,32,112,0.05)] border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden w-full ${index === 0 ? "" : "hidden"}`}
            >
              <div className="shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-primary text-white flex items-center justify-center font-black text-2xl md:text-5xl shadow-xl shadow-primary/20 relative z-10">
                {item.step}
              </div>

              <div className="flex-1 text-center md:text-left relative z-10">
                <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-primary mb-4 tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm md:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="mt-6 lg:hidden text-accent font-black text-[10px] tracking-[0.2em] uppercase opacity-40">
                  Desliza para continuar
                </div>
              </div>

              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />
            </article>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-10 md:mt-12 bg-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-xl shadow-primary/5 border border-gray-100">
          <button
            type="button"
            data-timeline-prev
            aria-label="Paso anterior"
            disabled
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all text-gray-200 cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="flex gap-3 px-4">
            {steps.map((item, index) => (
              <button
                key={item._key}
                type="button"
                data-timeline-dot
                data-index={index}
                aria-label={`Ir al paso ${index + 1}`}
                aria-current={index === 0 ? "step" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${index === 0 ? "w-10 bg-primary" : "w-2 bg-gray-200 hover:bg-gray-300"}`}
              />
            ))}
          </div>

          <button
            type="button"
            data-timeline-next
            aria-label="Siguiente paso"
            disabled={steps.length === 1}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${steps.length === 1 ? "text-gray-200 cursor-not-allowed" : "bg-gray-50 text-primary hover:bg-primary hover:text-white hover:scale-110 active:scale-95 shadow-sm"}`}
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export interface Principle {
  _key: string;
  title: string;
  description: string;
}

export interface PrinciplesAccordionProps {
  principles: Principle[];
}

export function PrinciplesAccordion({ principles }: PrinciplesAccordionProps) {
  if (!principles || principles.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 px-2 md:px-0">
      {principles.map((principle, index) => (
        <details
          key={principle._key}
          open={index === 0}
          className="group border rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-300 bg-white border-gray-100 open:bg-blue-50/40 open:border-primary/20 open:shadow-[0_15px_45px_rgba(12,32,112,0.05)] hover:border-primary/20 hover:shadow-lg"
        >
          <summary className="w-full cursor-pointer list-none p-5 md:p-8 flex items-center justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-6 md:gap-10">
              <span className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-2xl md:rounded-3xl text-sm md:text-lg font-black shrink-0 shadow-sm bg-gray-50 text-gray-400 group-open:bg-primary group-open:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-base md:text-2xl font-black transition-colors tracking-tight leading-tight text-slate-800 group-open:text-primary">
                {principle.title}
              </span>
            </span>
            <span className="shrink-0 ml-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all bg-gray-50 text-gray-300 group-open:bg-primary/10 group-open:text-primary group-open:rotate-180">
              <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </summary>
          <div className="px-5 md:px-8 pb-8 md:pb-12 pt-0 md:ml-24">
            <p className="text-sm md:text-xl text-slate-500 leading-relaxed font-medium max-w-2xl border-l-4 border-accent pl-6 md:pl-10">
              {principle.description}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}

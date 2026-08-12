import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Objective {
  _key: string;
  description: string;
}

export interface ObjectivesByArea {
  motorGruesa: Objective[];
  motorFina: Objective[];
  comunicacion: Objective[];
  psicologia: Objective[];
}

export interface ObjectivesTabsProps {
  objectives: ObjectivesByArea;
}

const TABS: { id: keyof ObjectivesByArea; label: string; icon: string }[] = [
  { id: "motorGruesa", label: "Motor Gruesa", icon: "🏃" },
  { id: "motorFina", label: "Motor Fina", icon: "✍️" },
  { id: "comunicacion", label: "Comunicación", icon: "🗣️" },
  { id: "psicologia", label: "Psicología", icon: "🧠" },
];

export function ObjectivesTabs({ objectives }: ObjectivesTabsProps) {
  if (!objectives) return null;

  const firstTab = TABS[0].id;
  const firstObjectives = objectives[firstTab] || [];

  return (
    <div data-objectives-tabs className="w-full max-w-6xl mx-auto px-4 md:px-0">
      <div className="text-center mb-10 md:mb-16">
        <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em] bg-blue-50 px-6 py-2 rounded-full inline-block mb-4">
          Metas Terapéuticas
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
          Objetivos por Área
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-slate-50 p-2 md:p-3 rounded-3xl md:rounded-full border border-gray-100 shadow-inner w-full md:w-auto">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              data-objective-tab={tab.id}
              aria-selected={index === 0}
              className={`relative flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-all duration-300 z-10 flex items-center justify-center gap-2 md:gap-3 ${index === 0 ? "text-white bg-primary shadow-lg shadow-primary/20" : "text-gray-500 hover:text-primary hover:bg-white/50"}`}
            >
              <span className="text-base md:text-xl">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[450px]">
        <div data-objectives-desktop className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-6 md:gap-y-10 p-6 md:p-16 lg:p-20 bg-white rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-xl shadow-gray-500/5">
          {TABS.map((tab, tabIndex) => (
            <div key={tab.id} data-objectives-panel={tab.id} className={tabIndex === 0 ? "col-span-full grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-6 md:gap-y-10" : "hidden col-span-full grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-6 md:gap-y-10"}>
              {(objectives[tab.id] || []).map((objective, index) => (
                <div key={objective._key} className="flex items-start gap-5 md:gap-6 group">
                  <div className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-sm md:text-lg shadow-lg shadow-primary/10">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-gray-900 font-bold leading-relaxed text-base md:text-xl tracking-tight">
                    {objective.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div data-objectives-mobile className="sm:hidden flex flex-col items-center">
          {TABS.map((tab, tabIndex) => {
            const tabObjectives = objectives[tab.id] || [];
            return (
              <div key={tab.id} data-objectives-mobile-panel={tab.id} data-objective-items={JSON.stringify(tabObjectives.map((objective) => objective.description))} className={tabIndex === 0 ? "w-full" : "hidden w-full"}>
                <div className="w-full relative min-h-[380px] flex items-center">
                  <div data-objective-mobile-card className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center w-full">
                    <div data-objective-mobile-number className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl mb-8 shadow-xl shadow-primary/20">1</div>
                    <div className="flex-1 flex items-center justify-center">
                      <p data-objective-mobile-copy className="text-gray-900 font-bold text-xl leading-snug tracking-tight">{tabObjectives[0]?.description}</p>
                    </div>
                    <div className="mt-8 text-accent font-black text-[10px] tracking-[0.2em] uppercase opacity-60">Desliza para continuar</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 mt-8 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-50">
                  <button type="button" data-objective-prev aria-label="Objetivo anterior" disabled className="w-10 h-10 rounded-full flex items-center justify-center text-gray-200"><ChevronLeft className="w-6 h-6" /></button>
                  <span data-objective-mobile-status className="text-primary font-black text-sm tracking-widest">1 / {tabObjectives.length}</span>
                  <button type="button" data-objective-next aria-label="Siguiente objetivo" disabled={tabObjectives.length <= 1} className={`w-10 h-10 rounded-full flex items-center justify-center ${tabObjectives.length <= 1 ? "text-gray-200" : "bg-gray-50 text-primary active:scale-90"}`}><ChevronRight className="w-6 h-6" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

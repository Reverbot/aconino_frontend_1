import Image from "next/image";
import { Activity } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import HeroBase from "@/components/shared/HeroBase";
import { PrinciplesAccordion } from "@/components/programs/PrinciplesAccordion";
import { WhoForSection } from "@/components/programs/WhoForSection";
import { WhatWeDoTimeline } from "@/components/programs/WhatWeDoTimeline";
import { ObjectivesTabs } from "@/components/programs/ObjectivesTabs";
import { WhyChooseUs } from "@/components/programs/WhyChooseUs";
import { InterdisciplinaryTeam } from "@/components/programs/InterdisciplinaryTeam";
import { GeneralObjective } from "@/components/programs/GeneralObjective";
import MaxSatisfaction from "@/components/programs/MaxSatisfaction";
import { SpecificPrograms } from "@/components/programs/SpecificPrograms";
import { ParentFAQ } from "@/components/programs/ParentFAQ";
export default function ProgramasPage() {
  const data = null;

  // Safely extract and fallback data
  const hero = data?.hero || {
    title: "Programas",
    subtitle: "Habilitación & Rehabilitación",
    backgroundImageUrl: "/images/programas-hero.jpg"
  };

  const im = data?.interventionModel;
  const interventionModel = {
    mainTitle: im?.mainTitle || "“Nos centramos más en la actividad y menos en la discapacidad”",
    subtitle: im?.subtitle || "“Potenciar habilidades, no solo tratar dificultades”",
    introText: im?.introText || "En Aconiño trabajamos desde un enfoque interdisciplinario centrado en el niño y su familia, integrando fisioterapia, terapia ocupacional, fonoaudiología y psicología para promover el desarrollo integral, mejorar la funcionalidad, la comunicación, la autonomía y la participación social del usuario.",
    imageUrl: im?.imageUrl,
    imageAlt: im?.imageAlt,
  };

  const principles = data?.principles || [
    { _key: "p1", title: "Intervención interdisciplinaria", description: "Fisioterapeutas, terapeutas ocupacionales, fonoaudiólogos y psicólogos trabajamos desde un enfoque interdisciplinario coordinada para alcanzar objetivos terapéuticos comunes." },
    { _key: "p2", title: "Atención centrada en el usuario y su familia", description: "Colaboración entre profesionales, paciente y familia en la valoración, planificación, implementación y seguimiento del proceso terapéutico." },
    { _key: "p3", title: "Objetivos funcionales", description: "Trabajamos habilidades que permiten una mayor independencia y autonomía en las actividades de la vida diaria." },
    { _key: "p4", title: "Intervención personalizada", description: "Diseñamos el tratamiento específicamente para cada usuario tras una evaluación individual, considerando sus condiciones, objetivos y evolución." }
  ];

  const targetAudience = data?.targetAudience || [
    { _key: "t1", icon: "👶", label: "Bebés con riesgo en el neurodesarrollo" },
    { _key: "t2", icon: "🧒", label: "Niños con retraso en su desarrollo" },
    { _key: "t3", icon: "🚶", label: "Niños con discapacidad motora" },
    { _key: "t4", icon: "🗣️", label: "Niños con dificultades en comunicación" },
    { _key: "t5", icon: "📚", label: "Niños con dificultades de aprendizaje" },
    { _key: "t6", icon: "🚀", label: "Jóvenes que requieren fortalecer su autonomía y participación" }
  ];

  const maxSatisfaction = data?.maxSatisfaction || {
    title: "Nuestra máxima satisfacción es cuando cada niño puede:",
    items: [
      "Jugar",
      "Aprender",
      "Comunicarse",
      "Relacionarse",
      "Participar activamente en su entorno"
    ]
  };

  const whatWeDo = data?.whatWeDo || [
    { _key: "w1", step: 1, title: "Valoración inicial interdisciplinaria", description: "Permite identificar el desarrollo que está demorado, inmaduro o bloqueado debido al tono postural atípico u otras deficiencias. Permite establecer un plan de tratamiento adecuado." },
    { _key: "w2", step: 2, title: "Definición de objetivos personalizados", description: "Establecemos metas claras basadas en las necesidades del niño y las expectativas de su familia." },
    { _key: "w3", step: 3, title: "Plan terapéutico integral", description: "Diseñamos una ruta de intervención coordinada entre todas las áreas necesarias." },
    { _key: "w4", step: 4, title: "Trabajo conjunto con las familias", description: "La colaboración es fundamental porque la participación activa del niño y sus cuidadores mejora la motivación y los resultados." },
    { _key: "w5", step: 5, title: "Seguimiento diario", description: "Se registra la evolución en cada área, siguiendo lineamientos de normatividad de la historia clínica." },
    { _key: "w6", step: 6, title: "Informe semestral", description: "Evaluación detallada de objetivos mediante escala GAS y planteamiento de un nuevo plan de acción conjunto." },
    { _key: "w7", step: 7, title: "Egreso o Transición", description: "Se realiza el egreso al lograr objetivos o transición al programa de jóvenes si el niño cumple 3 años y requiere continuidad." }
  ];

  const objectivesByArea = data?.objectivesByArea || {
    motorGruesa: [
      { _key: "mg1", description: "Favorecer el desarrollo y la adquisición de patrones motores funcionales y de calidad." },
      { _key: "mg2", description: "Estimular la integración sensoriomotora y el control postural durante el movimiento." },
      { _key: "mg3", description: "Fortalecer la musculatura y mejorar las condiciones osteomusculares, optimizando la movilidad." },
      { _key: "mg4", description: "Prevenir o disminuir alteraciones musculoesqueléticas y limitaciones en la movilidad." },
      { _key: "mg5", description: "Desarrollar ajustes posturales y reacciones de enderezamiento y protección." },
      { _key: "mg6", description: "Evitar compensaciones motoras que interfieran en el desarrollo funcional." },
      { _key: "mg7", description: "Favorecer la participación en actividades de la vida diaria mediante diferentes actividades." },
      { _key: "mg8", description: "Diseñar, realizar y sugerir productos de apoyo para favorecer posturas correctas y desplazamiento." }
    ],
    motorFina: [
      { _key: "mf1", description: "Desarrollar habilidades de motricidad fina y coordinación manual (agarre, manipulación, coordinación bilateral y óculo-manual)." },
      { _key: "mf2", description: "Favorecer la integración sensorial y el procesamiento multisensorial." },
      { _key: "mf3", description: "Estimular procesos cognitivos y funciones ejecutivas (atención, planificación, resolución de problemas) durante actividades con propósito." },
      { _key: "mf4", description: "Potenciar habilidades grafomotoras y pre-académicas, facilitando el desempeño escolar." },
      { _key: "mf5", description: "Promover control postural y posicionamiento adecuado para el desempeño funcional." },
      { _key: "mf6", description: "Fomentar la autonomía en actividades de la vida diaria, juego, aprendizaje y participación." },
      { _key: "mf7", description: "Orientar y acompañar a familias y entorno escolar para favorecer la continuidad del proceso terapéutico." }
    ],
    comunicacion: [
      { _key: "c1", description: "Favorecer el desarrollo de la comunicación funcional (habla, lenguaje y comunicación aumentativa o alternativa)." },
      { _key: "c2", description: "Estimular habilidades cognitivas y lingüísticas que faciliten la comprensión, expresión y razonamiento verbal." },
      { _key: "c3", description: "Fortalecer las funciones estomatognáticas y orofaciales relacionadas con respiración, alimentación y deglución." },
      { _key: "c4", description: "Estimular procesos de atención, concentración y motivación que favorezcan el aprendizaje." },
      { _key: "c5", description: "Promover alineación postural y control corporal que faciliten la producción oral y la alimentación." }
    ],
    psicologia: [
      { _key: "ps1", description: "Fortalecer procesos psicológicos básicos y superiores relacionados con el desarrollo cognitivo, emocional y conductual." },
      { _key: "ps2", description: "Promover conductas sociales adaptativas y habilidades de interacción en contextos familiares, sociales y escolares." },
      { _key: "ps3", description: "Desarrollar estrategias de regulación emocional y afrontamiento, incluyendo tolerancia a la frustración." },
      { _key: "ps4", description: "Estimular habilidades cognitivas relacionadas con el aprendizaje (atención, motivación, resolución de problemas)." },
      { _key: "ps5", description: "Orientar a las familias en pautas de crianza y manejo comportamental." },
      { _key: "ps6", description: "Empoderar a padres y cuidadores para acompañar el proceso terapéutico." },
      { _key: "ps7", description: "Explorar intereses y expectativas del usuario para favorecer su proyecto de vida y desarrollo personal." }
    ]
  };

  const whyChooseUs = data?.whyChooseUs || [
    { _key: "y1", text: "Programas para bebés, niños y jóvenes" },
    { _key: "y2", text: "Intervención temprana y especializada" },
    { _key: "y3", text: "Enfoque centrado en el niño y su familia" },
    { _key: "y4", text: "Trabajo interdisciplinario de alta calidad y humanidad" },
    { _key: "y5", text: "Seguimiento de productos de apoyo (órtesis y ayudas técnicas)" },
    { _key: "y6", text: "Orientación a familia y escuela" },
    { _key: "y7", text: "Equipo profesional actualizado" }
  ];

  const cta = data?.cta || {
    title: "¿Quieres saber más sobre nuestros programas?",
    buttonText: "CONTÁCTANOS",
    buttonLink: "/contacto"
  };

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden selection:bg-primary/20">

      {/* 1. HERO SECTION */}
      <HeroBase
        title={hero.title}
        subtitle="Habilitación & Rehabilitación"
        description={hero.subtitle}
        backgroundImage={hero.backgroundImageUrl}
        height="h-[40vh] md:h-[45vh]"
        overlayOpacity={60}
        showCurtain={true}
        useTypewriter={true}
        containerClassName="max-w-5xl mx-auto px-6 md:px-8 mt-12 md:mt-8"
        customOverlay={
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-transparent to-primary/80 mix-blend-multiply z-10" />
        }
      />

      {/* 2. MODELO DE INTERVENCIÓN */}
      <section id="modelo" className="py-20 md:py-32 bg-white relative overflow-hidden -mt-10 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] scroll-mt-32">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[80px] opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-50 rounded-full blur-[60px] opacity-70 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

            <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-lg">
                <div className="relative aspect-video md:aspect-square w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-[2.5rem] overflow-hidden group">
                  <Image
                    src={interventionModel.imageUrl || "/images/programas-intervention.jpg"}
                    alt={interventionModel.imageAlt || "Modelo de Intervención"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Floating Badge - Repositioned for better integration */}
                <div className="absolute -bottom-4 -right-4 md:bottom-10 md:-right-8 transform bg-white p-5 md:p-7 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center border-b-8 border-accent z-20">
                  <Activity className="text-3xl md:text-4xl text-accent mb-2" />
                  <span className="font-black text-primary text-[10px] md:text-xs tracking-widest uppercase">Cuidado Integral</span>
                </div>


                <div className="hidden md:block absolute -top-8 -left-8 w-32 h-32 border-8 border-accent/20 rounded-3xl -z-10" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-gray-400 font-bold tracking-widest uppercase text-xs md:text-sm">Enfoque Terapéutico</span>
                <div className="h-[2px] w-12 md:w-16 bg-accent"></div>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary mb-8 tracking-tight leading-[1.15]">
                {interventionModel.mainTitle}
              </h2>

              <div className="prose prose-lg text-gray-600">
                <p className="text-xl md:text-2xl font-bold text-secondary mb-6 leading-snug">
                  {interventionModel.subtitle}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  {interventionModel.introText}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. GENERAL OBJECTIVE */}
      <GeneralObjective />

      {/* 4. METODOLOGÍA DE TRABAJO (Pillars) */}
      <section id="metodologia" className="py-20 md:py-32 bg-gray-50 relative scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Nuestros Pilares</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight">Metodología de Trabajo</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto mt-8" />
          </div>
          <PrinciplesAccordion principles={principles} />
        </div>
      </section>

      {/* 5. INTERDISCIPLINARY TEAM */}
      <InterdisciplinaryTeam />

      {/* 6. A QUIÉN ESTÁN DIRIGIDOS */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <WhoForSection targetAudience={targetAudience} />
        </div>
      </section>

      {/* 7. NUESTRA MÁXIMA SATISFACCIÓN */}
      <MaxSatisfaction title={maxSatisfaction.title} items={maxSatisfaction.items} />

      {/* 8. QUÉ HACEMOS (Timeline) */}
      <section className="py-18 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhatWeDoTimeline steps={whatWeDo} />
        </div>
      </section>

      {/* 9. OBJETIVOS POR ÁREA (Tabs) */}
      <section id="objetivos" className="py-16 md:py-24 bg-white border-t border-gray-100 relative scroll-mt-32">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ObjectivesTabs objectives={objectivesByArea} />
        </div>
      </section>

      {/* NEW: PROGRAMAS ESPECÍFICOS */}
      <section className="py-20 md:py-32 bg-gray-50 overflow-hidden relative border-t border-gray-100">
        {/* Background elements for depth */}
        <div className="absolute left-0 top-1/4 w-[300px] h-[300px] bg-yellow-100/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />

        <SpecificPrograms />
      </section>

      {/* FAQ PARA PADRES */}
      <ParentFAQ imageUrl={data?.faqImageUrl} imageAlt={data?.faqImageAlt} />

      {/* 10. POR QUÉ ELEGIR ACONIÑO (Checkmarks) */}
      <section className="pt-16 pb-4 md:pt-24 md:pb-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhyChooseUs items={whyChooseUs} />
        </div>
      </section>

      {/* 11. CTA FINAL */}
      <section className="relative pt-2 pb-16 md:pt-2 md:pb-16 bg-white overflow-hidden text-center">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h3 className="text-4xl md:text-6xl font-black text-primary mb-8 leading-[1.1]">
            {cta.title}
          </h3>
          <p className="text-xl text-gray-500 mb-10 font-medium">
            Déjanos acompañarte y construir juntos el mejor camino para tu hijo.
          </p>
          <a
            href="https://wa.me/573133910760"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-accent text-primary px-12 py-5 rounded-full font-black text-xl shadow-[0_15px_40px_rgba(251,191,36,0.3)] hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_20px_50px_rgba(251,191,36,0.4)] transition-all duration-300 uppercase tracking-wider"
          >
            <FaWhatsapp className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {cta.buttonText}
          </a>
        </div>
      </section>

    </main>
  );
}

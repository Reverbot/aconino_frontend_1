import re

with open('src/components/home/HomePage.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update programs array
programs_old = """const programs = [
  { title: 'Atención Temprana', description: 'Programa especializado para la primera infancia.', category: '0 a 3 años', image: imgAtencionTempranaCard, imagePosition: 'object-top', icon: 'heart', link: '/programas#atencion-temprana' },
  { title: 'Atención a niños y jóvenes', description: 'Tratamientos especializados bajo el modelo contemporáneo de neurodesarrollo.', category: 'Niños y Jóvenes', image: imgNinosJovenesCard, imagePosition: 'object-top', icon: 'walk', link: '/programas#atencion-ninos-jovenes' },
  { title: 'Apoyo a dificultades en el aprendizaje', description: 'Intervención integral para niños con retos pedagógicos.', category: '3 a 14 años', image: imgAprendizajeCard, imagePosition: 'object-top', icon: 'book', link: '/programas#apoyo-aprendizaje' },
  { title: 'Protocolo Intensivo PediaSuit', description: 'Terapia intensiva con traje ortopédico dinámico.', category: 'Terapia Intensiva', image: imgPediasuit, imagePosition: 'object-center', icon: 'brain', link: '/programas#pediasuit' },
];"""

programs_new = """const programs = [
  { title: 'Atención Temprana', description: 'Programa especializado para la primera infancia.', category: '0-3', image: imgAtencionTempranaCard, imagePosition: 'object-top', icon: 'heart', link: '/programas#atencion-temprana' },
  { title: 'Atención a niños y jóvenes', description: 'Tratamientos especializados bajo el modelo contemporáneo de neurodesarrollo.', category: '3-18', image: imgNinosJovenesCard, imagePosition: 'object-top', icon: 'walk', link: '/programas#atencion-ninos-jovenes' },
  { title: 'Apoyo a dificultades en el aprendizaje', description: 'Intervención integral para niños con retos pedagógicos.', category: '3-14', image: imgAprendizajeCard, imagePosition: 'object-top', icon: 'book', link: '/programas#apoyo-aprendizaje' },
  { title: 'Protocolo Intensivo PediaSuit', description: 'Protocolo Pediasuit es un programa terapéutico intensivo para apoyar el desarrollo sicomotor a través de la estimulación de sistemas...', category: '2-18', image: imgPediasuit, imagePosition: 'object-center', icon: 'walk', link: '/programas#pediasuit' },
];"""
content = content.replace(programs_old, programs_new)

# 2. Update programs section HTML
# The block starts at <div class="grid grid-cols-2 items-stretch gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">{programs.map
# and ends at </div><div class="mt-12 text-center
programs_html_old = """<div class="grid grid-cols-2 items-stretch gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">{programs.map((program, index) => <div class={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] md:rounded-[2rem] reveal-on-scroll delay-${(index % 4) * 100} kowalski-card`}><div class="relative h-40 overflow-hidden bg-slate-100 md:h-64 xl:h-72"><Image src={program.image} alt={program.title} class={`h-full w-full object-cover ${program.imagePosition} transition-transform duration-700 md:group-hover:scale-105`} loading="lazy" decoding="async" /><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div><div class="absolute left-3 right-10 top-3 z-10 md:left-4 md:right-12 md:top-4"><div class="inline-block rounded-xl border border-white/20 bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-md md:px-4 md:py-2"><h3 class="text-[9px] font-bold uppercase leading-none tracking-tight text-primary md:text-sm">{program.title}</h3></div></div></div><div class="relative flex flex-1 flex-col bg-white p-4 md:p-8"><div class="absolute right-2 -top-8 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-[0_10px_25px_rgba(255,182,18,0.3)] md:right-4 md:-top-12 md:h-16 md:w-16 md:rounded-2xl"><svg viewBox="0 0 24 24" class="h-5 w-5 text-white md:h-8 md:w-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" set:html={svg(program.icon as keyof typeof iconPaths)}></svg></div><span class="mb-4 text-sm font-extrabold uppercase tracking-widest text-slate-400 md:mb-6 md:text-lg">{program.category}</span><p class="line-clamp-3 text-[10px] leading-relaxed text-slate-600 md:line-clamp-4 md:text-[13px]">{program.description}</p><a href={program.link} class="mt-auto inline-flex items-center gap-1.5 pt-4 text-[10px] font-bold uppercase tracking-wider text-accent transition-all hover:gap-2.5 md:text-sm">Leer más <span aria-hidden="true">→</span></a></div></div>)}</div>"""

programs_html_new = """<div class="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-6 md:gap-8 lg:grid-cols-4">{programs.map((program, index) => <div class={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] reveal-on-scroll delay-${(index % 4) * 100} kowalski-card`}><div class="relative h-64 md:h-72 w-full overflow-hidden"><Image src={program.image} alt={program.title} class={`h-full w-full object-cover ${program.imagePosition} transition-transform duration-700 md:group-hover:scale-105`} loading="lazy" decoding="async" /><div class="absolute left-4 top-4 right-12 md:left-6 md:top-6 z-10"><div class="inline-block rounded-xl bg-white px-4 py-2.5 shadow-sm"><h3 class="text-xs md:text-sm font-extrabold uppercase leading-tight tracking-tight text-[#1a2b4c]">{program.title}</h3></div></div></div><div class="relative flex flex-1 flex-col bg-white p-6 md:p-8 pt-10"><div class="absolute right-6 -top-8 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDB813] shadow-md"><svg viewBox="0 0 24 24" class="h-8 w-8 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" set:html={svg(program.icon as keyof typeof iconPaths)}></svg></div><span class="mb-4 text-3xl md:text-4xl font-extrabold text-[#8A9CBB]">{program.category}</span><p class="mb-6 text-sm md:text-base leading-relaxed text-[#4A5568]">{program.description}</p><a href={program.link} class="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#FDB813] transition-all hover:gap-3">LEER MÁS <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div></div>)}</div>"""

content = content.replace(programs_html_old, programs_html_new)

# 3. Add video section before "Premios & Distinciones"
# Search for: <section class="relative w-full overflow-hidden bg-gray-50 py-24 md:py-32"><div class="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]"></div><div class="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/2 rounded-full bg-accent/5 blur-[100px]"></div><div class="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div><div class="relative z-10 mx-auto max-w-[1400px] px-6 text-center sm:px-6 lg:px-8"><div class="mb-10 flex flex-col items-center justify-center md:mb-20 reveal-on-scroll"><div class="mb-4 flex items-center gap-4"><div class="h-1 w-12 bg-accent md:w-20"></div><span class="text-xs font-bold uppercase tracking-widest text-primary/70">Premios &amp; Distinciones</span>

video_section = """
  <section class="relative w-full bg-white py-24 md:py-32">
    <div class="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center md:mb-16 reveal-on-scroll">
        <h2 class="text-3xl font-extrabold tracking-tight text-primary md:text-5xl">Testimonios en Video</h2>
      </div>
      
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <div class="group relative flex flex-col items-center reveal-on-scroll">
          <div class="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-lg">
            <video class="absolute inset-0 h-full w-full object-cover" controls preload="metadata">
              <source src="/videos/procesos.mp4" type="video/mp4" />
            </video>
          </div>
          <h3 class="mt-4 text-center text-[13px] md:text-sm font-bold text-primary">Procesos con amor y avances</h3>
          <span class="text-[11px] text-gray-500">Testimonio</span>
        </div>
        
        <div class="group relative flex flex-col items-center reveal-on-scroll delay-100">
          <div class="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-lg">
            <video class="absolute inset-0 h-full w-full object-cover" controls preload="metadata">
              <source src="/videos/acompanamiento.mp4" type="video/mp4" />
            </video>
          </div>
          <h3 class="mt-4 text-center text-[13px] md:text-sm font-bold text-primary">Acompañamiento terapias</h3>
          <span class="text-[11px] text-gray-500">Testimonio</span>
        </div>
        
        <div class="group relative flex flex-col items-center reveal-on-scroll delay-200">
          <div class="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-lg">
            <video class="absolute inset-0 h-full w-full object-cover" controls preload="metadata">
              <source src="/videos/exopulse.mp4" type="video/mp4" />
            </video>
          </div>
          <h3 class="mt-4 text-center text-[13px] md:text-sm font-bold text-primary">Exopulse</h3>
          <span class="text-[11px] text-gray-500">Testimonio</span>
        </div>
        
        <div class="group relative flex flex-col items-center reveal-on-scroll delay-300">
          <div class="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-lg">
            <video class="absolute inset-0 h-full w-full object-cover" controls preload="metadata">
              <source src="/videos/manuela.mp4" type="video/mp4" />
            </video>
          </div>
          <h3 class="mt-4 text-center text-[13px] md:text-sm font-bold text-primary">Mi hija Manuela</h3>
          <span class="text-[11px] text-gray-500">Testimonio</span>
        </div>
      </div>
    </div>
  </section>
"""

target = '<section class="relative w-full overflow-hidden bg-gray-50 py-24 md:py-32"><div class="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]"></div><div class="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/2 rounded-full bg-accent/5 blur-[100px]">'

content = content.replace(target, video_section + target)

with open('src/components/home/HomePage.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated HomePage.astro")

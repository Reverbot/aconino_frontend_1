---
description: Estamos construyendo el frontend renovado de la Asociación Aconiño (https://aconino.org/).  Aconiño es una ONG colombiana fundada en 1990, dedicada a la rehabilitación integral de niños y jóvenes con discapacidad sensori
---

**Descripción del Proyecto:**
Estamos construyendo el frontend y backend renovado de la Asociación Aconiño (https://aconino.org/). 
Aconiño es una ONG colombiana fundada en 1990, dedicada a la rehabilitación integral de niños y jóvenes con discapacidad sensoriomotora. Proporcionamos terapias especializadas, orientación familiar y certificaciones profesionales utilizando modelos avanzados de neurodesarrollo (NDT/Bobath) para mejorar la calidad de vida y promover la inclusión social.

**1. Identidad de Marca y UI/UX (Estricto):**
* **Tipografía principal:** Manrope.
* **Paleta de colores:** * Blanco: `#ffffff` (Fondos y contrastes)
    * Azul principal oscuro: `#0c2070` (Elementos primarios, texto destacado)
    * Amarillo/Dorado de acento: `#f8b719` (Llamados a la acción, botones, resaltados)
    * Azul medio/secundario: `#365ca1` (Elementos secundarios, hover states)
* **Estética visual:** Profesional, humanitaria, compasiva, moderna y transparente.
* **Eslogan (Tagline):** "35 años apoyando la inclusión y mejorando la calidad de vida."
* **Regla de accesibilidad y diseño responsivo:** El diseño debe cumplir con altos estándares WCAG. Las familias de los pacientes son los usuarios finales. No utilices dimensiones fijas en píxeles (px) que puedan recortar el contenido en diferentes pantallas. Utiliza escalado responsivo y utilidades relativas de Tailwind (`w-full`, porcentajes, `rem`, flexbox/grid) para garantizar adaptabilidad.

**2. Tono de Voz y Comunicación:**
* **Tono:** Profesional, Empático, Autoritativo (basado en ciencia clínica) y Esperanzador.
* **Valores a reflejar en la interfaz:** Innovación, Inclusión Social, Excelencia Profesional, Apoyo Familiar y Transparencia.
* La comunicación debe transmitir conocimiento científico especializado sin perder la calidez humana. Evita el lenguaje condescendiente o excesivamente técnico si está dirigido a padres, pero mantén el rigor si la vista es para profesionales.

**3. Contexto Arquitectónico y Tecnológico (Modern Self-Hosted Headless Stack):**
* **Arquitectura:** Headless CMS de tipo "Code-First".
* **Stack Principal (Frontend):** Next.js 15+ (App Router), React, TypeScript y Tailwind CSS.
* **Backend y CMS:** Payload CMS v3.0.
* **Base de Datos:** SQLite gestionado a través de Drizzle ORM (archivo `.db` local para maximizar la portabilidad y mantener costo de infraestructura en cero sobre cPanel/Node.js).
* **Regla de Datos y Flujo:** El esquema de base de datos se define estrictamente en el código de Payload mediante Colecciones y Globales (TypeScript). Next.js consumirá la API Local de Payload importando los tipos generados automáticamente. Se deben priorizar los Server Components para el consumo de datos para optimizar el rendimiento y el SEO.

**4. Reglas de Dominio y Terminología Clínica:**
* El enfoque es fisioterapéutico, científico y basado en evidencia empírica.
* Si se requiere generar código para estructurar información médica, taxonomías en la interfaz o redactar *placeholders*, mantén un rigor anatómico y fisiológico estricto. 
* **Regla crítica de clasificación:** Categoriza las deficiencias correctamente. Por ejemplo, la hipotonía debe ser tratada e iterada como una *deficiencia funcional*, separándola estrictamente de deficiencias estructurales (como la hipoplasia del vermis).
import type { ImageMetadata } from 'astro';
import imgNeuro from '../assets/images/programa-neurodesarrollo.jpg';
import imgPediasuit from '../assets/images/programa-pediasuit.jpg';
import imgTemprana from '../assets/images/programa-atencion-temprana.jpg';



export const historyEvents = [
  { year: 'Orígenes', title: 'El Concepto Bobath', description: 'Desarrollado en la década de 1940 por la fisioterapeuta Berta Bobath y el psiquiatra Karel Bobath, basado en la observación clínica y la neuroplasticidad para el tratamiento de alteraciones neurológicas.', color: 'from-blue-500 to-indigo-600' },
  { year: 'Evolución', title: 'Expansión Global', description: 'El enfoque evolucionó de una técnica de facilitación a un concepto vivo de resolución de problemas, adaptándose a los nuevos descubrimientos en neurociencia y control motor.', color: 'from-emerald-400 to-teal-600' },
  { year: 'Colombia', title: 'Llegada e Impacto', description: 'El concepto llega a Colombia impulsado por profesionales comprometidos, transformando la neurorehabilitación infantil y ofreciendo nuevas esperanzas a familias de todo el país.', color: 'from-amber-400 to-orange-500' },
  { year: 'Actualidad', title: 'ACONINO y el Futuro', description: 'Consolidación de la práctica a través de la educación continua, certificación de tutores y un enfoque transdisciplinario centrado en el individuo y su entorno.', color: 'from-purple-500 to-pink-600' },
];

export const instructorGroups = [
  { organization: 'Asociación Europea de Neurodesarrollo EBTA', instructors: ['Neda Rotar', 'Evi Sideri', 'Lea Šuc', 'Aleksandra Łada'] },
  { organization: 'Asociación Americana de Neurodesarrollo NDTA', instructors: ['Teresa Gutierrez', 'Gay Lloyd Pinder', 'Addie Adler', 'Roma Alexander', 'Susanna Davis', 'Lindell Owens', 'Gail Ritchie', 'Karl Barn', 'Mechthild Rast', 'Jane Shyer-Acevedo', 'Pam Mullens'] },
  { organization: 'Universidad Nacional de Colombia', instructors: ['Dr. Jairo Zuluaga'] },
];

export const defaultBenefits = ['Material de apoyo incluido', 'Sesiones prácticas', 'Diploma oficial', 'Instructores internacionales'];

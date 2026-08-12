export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  dates?: string;
  location?: string;
  countryCode?: string;
  status?: 'activo' | 'proximamente' | 'finalizado';
  description?: string;
  image: string;
  instructor?: string;
  featured?: boolean;
  year: number;
}

export const courseList: CourseItem[] = [
  {
    id: 'fallback-1',
    title: 'Certificación en Neurodesarrollo (NDT) Bobath Pediátrico',
    slug: 'certificacion-neurodesarrollo-ndt',
    dates: 'Inicia Próximamente',
    location: 'Bogotá, Sede Aconiño',
    countryCode: 'CO',
    status: 'activo',
    description: 'Formación especializada e intensiva dirigida a profesionales de la salud. Aprende a aplicar el modelo contemporáneo de neurodesarrollo en niños con parálisis cerebral.',
    image: '/images/programa-neurodesarrollo.jpg',
    instructor: 'Dr. Experto Invitado Aconiño',
    featured: true,
    year: 2026,
  },
  {
    id: 'fallback-2',
    title: 'Taller Práctico: Protocolo PediaSuit Intensivo',
    slug: 'taller-pediasuit',
    dates: '15 de Diciembre, 2026',
    location: 'Modalidad Híbrida',
    countryCode: 'CO',
    status: 'proximamente',
    description: 'Profundización en el uso de la Órtesis Dinámica (Traje) enfocada en mejorar la postura y movimiento autónomo del niño.',
    image: '/images/programa-pediasuit.jpg',
    year: 2026,
  },
  {
    id: 'fallback-3',
    title: 'Atención Temprana y Familia: Un Abordaje Integral',
    slug: 'atencion-temprana-familia',
    dates: '20 al 22 de Noviembre, 2026',
    location: 'Online',
    status: 'finalizado',
    description: 'Curso teórico enfocado en capacitar a las familias y cuidadores tempranos en estimulación sicomotriz desde casa.',
    image: '/images/programa-atencion-temprana.jpg',
    instructor: 'Equipo Terapéutico Aconiño',
    year: 2026,
  },
];

export const courseDetails: Record<string, CourseItem> = {
  'concepto-bobath': {
    id: 'course-bobath',
    title: 'Certificación en Neurodesarrollo (NDT) Bobath Pediátrico',
    slug: 'concepto-bobath',
    dates: 'Inicia próximamente',
    location: 'Bogotá, Sede Aconiño',
    countryCode: 'CO',
    status: 'activo',
    description: 'Formación especializada e intensiva dirigida a profesionales de la salud. Aprende a aplicar el modelo contemporáneo de neurodesarrollo en niños con parálisis cerebral.',
    image: '/images/programa-neurodesarrollo.jpg',
    instructor: 'Equipo Terapéutico Aconiño',
    year: 2026,
  },
  'movimientos-generales': {
    id: 'course-movimientos',
    title: 'Movimientos generales y neurodesarrollo',
    slug: 'movimientos-generales',
    dates: 'Próxima convocatoria',
    location: 'Modalidad presencial',
    countryCode: 'CO',
    status: 'proximamente',
    description: 'Herramientas de observación y análisis del movimiento durante las primeras etapas de vida.',
    image: '/images/programa-atencion-temprana.jpg',
    year: 2026,
  },
  'pediasuit-formacion': {
    id: 'course-pediasuit',
    title: 'Protocolo intensivo PediaSuit',
    slug: 'pediasuit-formacion',
    dates: 'Próxima convocatoria',
    location: 'Bogotá, Colombia',
    countryCode: 'CO',
    status: 'proximamente',
    description: 'Capacitación especializada sobre evaluación, objetivos y aplicación del protocolo intensivo.',
    image: '/images/programa-pediasuit.jpg',
    year: 2026,
  },
};

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

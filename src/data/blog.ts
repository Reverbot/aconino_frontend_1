export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-juego',
    title: 'La importancia del juego en el neurodesarrollo',
    slug: 'importancia-del-juego-en-el-neurodesarrollo',
    publishedAt: '2024-03-10',
    excerpt: 'El juego es una herramienta esencial para acompañar el desarrollo motor, cognitivo y social de los niños.',
    image: '/images/programa-atencion-temprana.jpg',
    imageAlt: 'Acompañamiento durante la primera infancia',
    body: [
      'El juego permite que los niños exploren su cuerpo, el espacio y las relaciones con otras personas en un contexto seguro y motivador.',
      'Cuando las actividades se adaptan a las necesidades de cada niño, también pueden apoyar la atención, la comunicación, la planificación y la participación en la vida cotidiana.',
      'Familias y profesionales pueden convertir momentos sencillos de la rutina en oportunidades de aprendizaje, respetando el ritmo y los intereses del niño.',
    ],
  },
  {
    id: 'post-derechos',
    title: 'Derechos de los niños y niñas en condición de discapacidad',
    slug: 'derechos-de-los-ninos-con-discapacidad',
    publishedAt: '2024-02-20',
    excerpt: 'La inclusión comienza cuando reconocemos la participación, la autonomía y la dignidad como derechos.',
    image: '/images/programa-aprendizaje.jpg',
    imageAlt: 'Niños participando en actividades de aprendizaje',
    body: [
      'Los niños con discapacidad tienen los mismos derechos a la educación, la salud, la recreación, la familia y la participación social.',
      'La rehabilitación debe estar conectada con esos derechos y con las actividades que cada niño quiere y necesita realizar en su contexto.',
      'Construir entornos accesibles es una responsabilidad compartida entre familias, instituciones y comunidad.',
    ],
  },
  {
    id: 'post-familia',
    title: 'Hacia un mundo incluyente desde el entorno familiar',
    slug: 'mundo-incluyente-desde-el-entorno-familiar',
    publishedAt: '2024-01-18',
    excerpt: 'Pequeñas decisiones cotidianas pueden abrir más oportunidades de participación para todos.',
    image: '/images/programa-neurodesarrollo.jpg',
    imageAlt: 'Acompañamiento familiar',
    body: [
      'Las familias son protagonistas en los procesos de desarrollo y participación. Escuchar, observar y celebrar los avances ayuda a construir confianza.',
      'La inclusión se fortalece cuando las actividades familiares se organizan para que cada persona pueda participar con los apoyos que necesita.',
      'Aconiño acompaña a las familias con orientación práctica y un enfoque humano centrado en la persona.',
    ],
  },
];

export const blogCategories = [
  { title: 'Neurodesarrollo', slug: 'neurodesarrollo' },
  { title: 'Inclusión', slug: 'inclusion' },
  { title: 'Familias', slug: 'familias' },
];

export function formatBlogDate(date: string, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }) {
  return new Date(date).toLocaleDateString('es-ES', options);
}

import type { ImageMetadata } from 'astro';
import imgTemprana from '../assets/images/programa-atencion-temprana.jpg';
import imgAprendizaje from '../assets/images/programa-aprendizaje.jpg';
import imgNeuro from '../assets/images/programa-neurodesarrollo.jpg';



export const blogCategories = [
  { title: 'Neurodesarrollo', slug: 'neurodesarrollo' },
  { title: 'Inclusión', slug: 'inclusion' },
  { title: 'Familias', slug: 'familias' },
];

export function formatBlogDate(date: string, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }) {
  return new Date(date).toLocaleDateString('es-ES', options);
}

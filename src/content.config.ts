import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    publishedAt: z.string().transform((str) => new Date(str)),
    category: z.enum(['neurodesarrollo', 'inclusion', 'familias']).default('familias'),
    excerpt: z.string(),
    image: image(),
    imageAlt: z.string(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const cursosCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cursos" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    dates: z.string().optional(),
    location: z.string().optional(),
    countryCode: z.string().optional(),
    status: z.enum(['activo', 'proximamente', 'finalizado']).optional(),
    description: z.string().optional(),
    image: image(),
    instructor: z.string().optional(),
    featured: z.boolean().optional(),
    year: z.number(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'cursos': cursosCollection,
};

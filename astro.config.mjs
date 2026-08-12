import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://aconino.org',
  trailingSlash: 'ignore',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        'next/link': new URL('./src/compat/next-link.tsx', import.meta.url).pathname,
        'next/image': new URL('./src/compat/next-image.tsx', import.meta.url).pathname,
        'next/navigation': new URL('./src/compat/next-navigation.ts', import.meta.url).pathname,
      },
    },
  },
});

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// Cargar variables de entorno desde .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf-8');
envFile.split('\n').forEach((line) => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    process.env[key] = valueParts.join('=').trim();
  }
});

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'myf1eg8e';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN no esta configurado');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-14',
  useCdn: false,
  token: token,
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function regenerateSlugs() {
  console.log('Buscando posts en Sanity...');
  
  const posts: any[] = await client.fetch(`
    *[_type == "post"] {
      _id,
      title,
      slug
    }
  `);

  console.log(`Se encontraron ${posts.length} posts`);

  const postsWithoutSlug = posts.filter((post) => 
    !post.slug || !post.slug.current || post.slug.current.trim() === ''
  );

  console.log(`${postsWithoutSlug.length} posts sin slug`);

  if (postsWithoutSlug.length === 0) {
    console.log('Todos los posts ya tienen slug!');
    return;
  }

  let updated = 0;
  let failed = 0;

  for (const post of postsWithoutSlug) {
    try {
      const newSlug = generateSlug(post.title);
      
      if (!newSlug) {
        console.log(`Sin titulo valido: ${post._id}`);
        failed++;
        continue;
      }

      const existingPost: any = await client.fetch(`
        *[_type == "post" && slug.current == $slug && _id != $id][0] { _id }
      `, { slug: newSlug, id: post._id });

      let finalSlug = newSlug;
      if (existingPost) {
        finalSlug = `${newSlug}-${post._id.substring(0, 8)}`;
      }

      await client
        .patch(post._id)
        .set({ slug: { _type: 'slug', current: finalSlug } })
        .commit();

      console.log(`Actualizado: "${post.title.substring(0, 40)}..." -> "${finalSlug}"`);
      updated++;
    } catch (error) {
      console.log(`Error: ${post._id}`, error);
      failed++;
    }
  }

  console.log('\n=== RESUMEN ===');
  console.log(`Actualizados: ${updated}`);
  console.log(`Fallidos: ${failed}`);
  console.log('================');
}

regenerateSlugs()
  .then(() => {
    console.log('\nCompletado!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error fatal:', error);
    process.exit(1);
  });

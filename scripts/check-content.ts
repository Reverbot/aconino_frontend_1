import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf-8');
envFile.split('\n').forEach((line) => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    process.env[key] = valueParts.join('=').trim();
  }
});

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'myf1eg8e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-14',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function checkContent() {
  console.log('Verificando estructura del contenido...\n');
  
  const posts: any[] = await client.fetch(`
    *[_type == "post" && defined(content)][0...2] {
      _id,
      title,
      content
    }
  `);

  posts.forEach((post, idx) => {
    console.log(`=== POST ${idx + 1}: ${post.title?.substring(0, 50)} ===`);
    console.log('Content (primeros 1500 chars):');
    console.log(post.content?.substring(0, 1500));
    console.log('\n' + '='.repeat(50) + '\n');
  });
}

checkContent().catch(console.error);

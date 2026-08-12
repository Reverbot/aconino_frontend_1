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

async function checkAllFields() {
  console.log('Verificando todos los campos del post...\n');
  
  const post: any = await client.fetch(`
    *[_type == "post"][0] {
      _id,
      title,
      publishedAt,
      _createdAt,
      _updatedAt
    }
  `);

  console.log('=== POST FIELDS ===');
  console.log('publishedAt:', post.publishedAt);
  console.log('_createdAt:', post._createdAt);
  console.log('_updatedAt:', post._updatedAt);
}

checkAllFields().catch(console.error);

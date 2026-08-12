import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Configuración del cliente Sanity con el token de escritura
const client = createClient({
  projectId: 'myf1eg8e',
  dataset: 'production',
  apiVersion: '2024-03-14',
  token: 'skpHGuUG0ylDXPdNg57nCHlfrttFjxSL6kpODPySZBjzd8IX7KxsXAOX1ZcPMpy59yeNJLwS8E2ZlPyNh2lXRqcRZ5FRVhfg5lwLG9Hi7q5L1Ma9NzxqFz4jtMrp9ia8dWLYgJKO36cq2a9NDv4lrgCyjOjGGkfu93bv4Bt9yNHWgiENtHkN',
  useCdn: false,
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = path.join(__dirname, '../temp_uploads/uploads')

async function uploadLocalImage(wpUrl) {
  try {
    // Extraer la ruta relativa de la imagen (ej: /wp-content/uploads/2024/03/visita.jpg -> 2024/03/visita.jpg)
    const relativePathMatch = wpUrl.match(/uploads\/(.+)$/i)
    if (!relativePathMatch) return null

    const relativePath = relativePathMatch[1]
    const localPath = path.join(UPLOADS_DIR, relativePath)

    if (!fs.existsSync(localPath)) {
      console.warn(`Local file not found: ${localPath}`)
      return null
    }

    console.log(`Uploading local image: ${localPath}`)
    const buffer = fs.readFileSync(localPath)
    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(localPath),
    })
    
    console.log(`Uploaded asset to Sanity: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error(`Error uploading image ${wpUrl}:`, error.message)
    return null
  }
}

async function migrate() {
  console.log('--- Starting Local Image Migration to Sanity ---')
  
  // Buscar documentos que tengan contenido HTML pero no imagen principal migrada
  const documents = await client.fetch(`*[_type in ["post", "page"] && defined(content) && !defined(mainImage)]`)
  
  console.log(`Found ${documents.length} documents to process.`)

  for (const doc of documents) {
    console.log(`\nProcessing [${doc._type}]: ${doc.title}`)
    
    // Buscar la primera etiqueta <img> en el contenido
    const imgMatch = doc.content.match(/<img[^>]+src="([^">]+)"/i)
    
    if (imgMatch && imgMatch[1]) {
      const wpUrl = imgMatch[1]
      const assetId = await uploadLocalImage(wpUrl)
      
      if (assetId) {
        // Actualizar el documento con la imagen principal
        await client
          .patch(doc._id)
          .set({
            mainImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: assetId,
              },
            }
          })
          .commit()
        
        console.log(`Updated document ${doc._id} with main image.`)
      }
    } else {
      console.log(`No images found in content for ${doc.title}`)
    }
  }
  
  console.log('\n--- Migration Finished ---')
}

migrate()

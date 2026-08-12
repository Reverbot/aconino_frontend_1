import { createClient } from '@sanity/client'
import { JSDOM } from 'jsdom'

// Configuración del cliente Sanity con el token de escritura
const client = createClient({
  projectId: 'myf1eg8e',
  dataset: 'production',
  apiVersion: '2024-03-14',
  token: 'skpHGuUG0ylDXPdNg57nCHlfrttFjxSL6kpODPySZBjzd8IX7KxsXAOX1ZcPMpy59yeNJLwS8E2ZlPyNh2lXRqcRZ5FRVhfg5lwLG9Hi7q5L1Ma9NzxqFz4jtMrp9ia8dWLYgJKO36cq2a9NDv4lrgCyjOjGGkfu93bv4Bt9yNHWgiENtHkN',
  useCdn: false,
})

async function migrateContentDirectly() {
  console.log('--- Starting Direct Content Migration ---')
  
  // Buscar documentos que tengan contenido HTML pero no Body (Portable Text)
  const documents = await client.fetch(`*[_type in ["post", "page"] && defined(content) && !defined(body)]`)
  
  console.log(`Found ${documents.length} documents to process.`)

  for (const doc of documents) {
    console.log(`\nProcessing: ${doc.title}`)
    
    try {
      const dom = new JSDOM(doc.content)
      const text = dom.window.document.body.textContent || ""
      
      // Crear un bloque de Portable Text básico con el texto limpio
      const blocks = [
        {
          _type: 'block',
          _key: Math.random().toString(36).substring(7),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: Math.random().toString(36).substring(7),
              text: text.trim(),
              marks: []
            }
          ]
        }
      ]

      // Actualizar el documento en Sanity
      await client
        .patch(doc._id)
        .set({ body: blocks })
        .commit()
      
      console.log(`Successfully updated: ${doc.title}`)
    } catch (error) {
      console.error(`Error processing ${doc.title}:`, error.message)
    }
  }
  
  console.log('\n--- Migration Finished ---')
}

migrateContentDirectly()

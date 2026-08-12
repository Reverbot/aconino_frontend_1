import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'myf1eg8e',
  dataset: 'production',
  apiVersion: '2024-03-14',
  token: 'skpHGuUG0ylDXPdNg57nCHlfrttFjxSL6kpODPySZBjzd8IX7KxsXAOX1ZcPMpy59yeNJLwS8E2ZlPyNh2lXRqcRZ5FRVhfg5lwLG9Hi7q5L1Ma9NzxqFz4jtMrp9ia8dWLYgJKO36cq2a9NDv4lrgCyjOjGGkfu93bv4Bt9yNHWgiENtHkN',
  useCdn: false,
})

async function seed() {
  console.log('--- Seeding Transcribed Home and Settings data ---')

  const settings = {
    _id: 'settings',
    _type: 'settings',
    title: 'Asociación Aconiño',
    headerCTA: 'PAGO EN LÍNEA',
    phoneNumber: '(601) 6601475',
    email: 'contacto@aconino.org',
    footerInfo: {
        appDownload: 'Enlace disponible en Google Play para la App',
        controlEntity: 'Vigilado por la Superintendencia de Salud (Supersalud)',
        copyright: '1990-2024 Asociación Aconiño. Todos los derechos reservados.',
        designBy: 'Design by Dyerapita.'
    },
    footerLinks: [
      { _key: 'f1', label: 'Permanencia ESAL', url: '/transparencia' },
      { _key: 'f2', label: 'Transparencia', url: '/transparencia' },
      { _key: 'f3', label: 'Protección de datos personales', url: '/privacidad' }
    ]
  }

  const home = {
    _id: 'home',
    _type: 'home',
    title: 'Página de Inicio',
    pageBuilder: [
      {
        _key: 'hero_1',
        _type: 'hero',
        slogan: '35 años apoyando la inclusión',
        impact: '+35 años apoyando la inclusión!'
      },
      {
        _key: 'programs_1',
        _type: 'programs',
        subtitle: '35 años trabajando por mejorar la calidad de vida de niños, niñas y jóvenes en condición de discapacidad.',
        clinicalFocus: 'Tratamientos y terapias con el Modelo de Práctica Contemporáneo de Neurodesarrollo y protocolo intensivo PediaSuit.',
        familySupport: 'Orientación y apoyo a familias.',
        ctaLabel: 'CONTÁCTANOS',
        items: [
          {
            _key: 'p1',
            title: 'Programa de Desarrollo Psicomotor',
            description: 'Enfocado en el desarrollo psicomotor grueso y fino.'
          },
          {
            _key: 'p2',
            title: 'Apoyo a Dificultades en el Aprendizaje',
            description: 'Intervención integral para niños con retos pedagógicos.'
          },
          {
            _key: 'p3',
            title: 'Protocolo Intensivo PediaSuit',
            description: 'Dirigido a niños y jóvenes (terapia intensiva con traje ortopédico dinámico).'
          },
          {
            _key: 'p4',
            title: 'Atención Temprana',
            description: 'Programa especializado para la primera infancia.'
          }
        ]
      },
      {
        _key: 'news_1',
        _type: 'newsSection',
        title: 'Últimas noticias',
        ctaLabel: 'VER TODO'
      },
      {
        _key: 'recog_1',
        _type: 'recognitions',
        text: 'Menciona aliados y reconocimientos institucionales (Ej: Compensar).'
      }
    ]
  }

  try {
    await client.createOrReplace(settings)
    console.log('Settings seeded with transcribed data.')
    await client.createOrReplace(home)
    console.log('Home seeded with transcribed data.')
  } catch (error) {
    console.error('Error seeding data:', error.message)
  }
}

seed()
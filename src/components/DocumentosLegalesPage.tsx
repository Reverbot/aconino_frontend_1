import Link from "next/link"

interface DocumentoLegal {
  _id: string
  titulo: string
  categoria: string
  archivoUrl?: string
  enlaceExterno?: string
  descripcion?: string
  orden: number
}

interface DocumentosPageProps {
  titulo: string
  subtitulo: string
  descripcion: string
  categoria: string
  documentos: DocumentoLegal[]
  icono: string
}

const CATEGORIAS_INFO: Record<string, { titulo: string; subtitulo: string; descripcion: string; icono: string }> = {
  esal: {
    titulo: "Permanencia ESAL",
    subtitulo: "Entidades Sin Ánimo de Lucro",
    descripcion: "Documentos relacionados con la permanencia y regulación de Entidades Sin Ánimo de Lucro.",
    icono: "🏛️",
  },
  transparencia: {
    titulo: "Transparencia",
    subtitulo: "Información Pública",
    descripcion: "Documentos de transparencia e información pública conforme a la normativa vigente.",
    icono: "📋",
  },
  proteccion_datos: {
    titulo: "Protección de Datos Personales",
    subtitulo: "Política de Privacidad",
    descripcion: "Políticas y documentos relacionados con la protección de datos personales y privacidad.",
    icono: "🔒",
  },
}

export { CATEGORIAS_INFO }

export default function DocumentosLegalesPage({ titulo, subtitulo, descripcion, categoria, documentos, icono }: DocumentosPageProps) {
  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12">
          <Link
            href="/"
            className="text-accent hover:underline text-sm flex items-center gap-1 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{icono}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-primary">{titulo}</h1>
              <p className="text-accent font-semibold text-sm tracking-wide uppercase">{subtitulo}</p>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{descripcion}</p>
        </div>

        {documentos.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-primary mb-2">Próximamente</h3>
            <p className="text-gray-500">
              Los documentos de esta sección estarán disponibles pronto.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {documentos.map((doc) => {
              const href = doc.enlaceExterno || doc.archivoUrl || "#"
              const isExternal = !!doc.enlaceExterno || !!doc.archivoUrl

              return (
                <div
                  key={doc._id}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                        {doc.titulo}
                      </h3>
                      {doc.descripcion && (
                        <p className="text-gray-500 text-sm mt-1">{doc.descripcion}</p>
                      )}
                    </div>

                    {isExternal && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent hover:text-white transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Ver documento
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Otras secciones</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(CATEGORIAS_INFO)
              .filter(([key]) => key !== categoria)
              .map(([key, info]) => {
                const ruta = key === "esal"
                  ? "/permanencia-esal"
                  : key === "transparencia"
                  ? "/transparencia"
                  : "/privacidad"

                return (
                  <Link
                    key={key}
                    href={ruta}
                    className="inline-flex items-center gap-2 bg-gray-100 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/10 hover:text-accent transition-all"
                  >
                    <span>{info.icono}</span>
                    {info.titulo}
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}
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

interface FooterDocumentsProps {
  documentos: DocumentoLegal[]
}

const CATEGORIAS: Record<string, { label: string; icon: string }> = {
  esal: {
    label: "ESAL",
    icon: "🏛️",
  },
  transparencia: {
    label: "Transparencia",
    icon: "📋",
  },
  proteccion_datos: {
    label: "Protección de Datos Personales",
    icon: "🔒",
  },
}

export default function FooterDocuments({ documentos }: FooterDocumentsProps) {
  if (!documentos || documentos.length === 0) return null

  const agrupados = Object.entries(
    documentos.reduce<Record<string, DocumentoLegal[]>>((acc, doc) => {
      const cat = doc.categoria || "esal"
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(doc)
      return acc
    }, {})
  )

  const ordenCategorias = ["esal", "transparencia", "proteccion_datos"]

  return (
    <div className="border-t border-white/10 pt-8 mt-8">
      <h4 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-6 text-center md:text-left">
        Documentos Institucionales
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ordenCategorias.map((catKey) => {
          const docs = agrupados.find(([key]) => key === catKey)
          if (!docs) return null
          const [key, documentosCat] = docs
          const config = CATEGORIAS[key] || { label: key, icon: "📄" }

          return (
            <div key={key} className="space-y-3">
              <h5 className="text-accent font-bold text-sm flex items-center gap-2">
                <span>{config.icon}</span>
                {config.label}
              </h5>
              <ul className="space-y-2">
                {documentosCat.map((doc) => {
                  const href = doc.enlaceExterno || doc.archivoUrl || "#"
                  const isExternal = !!doc.enlaceExterno || !!doc.archivoUrl

                  return (
                    <li key={doc._id}>
                      {isExternal ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white text-xs flex items-center gap-1.5 group transition-all duration-300"
                        >
                          <svg
                            className="w-3 h-3 text-accent/70 group-hover:text-accent transition-colors flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="hover:underline underline-offset-2 decoration-accent/50">
                            {doc.titulo}
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-gray-400 hover:text-white text-xs flex items-center gap-1.5 group transition-all duration-300"
                        >
                          <svg
                            className="w-3 h-3 text-accent/70 group-hover:text-accent transition-colors flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="hover:underline underline-offset-2 decoration-accent/50">
                            {doc.titulo}
                          </span>
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
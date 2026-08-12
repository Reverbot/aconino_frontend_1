import DocumentosLegalesPage, { CATEGORIAS_INFO } from "@/components/DocumentosLegalesPage"

export const metadata = {
  title: "Transparencia - Asociación Aconiño",
  description: "Documentos de transparencia e información pública conforme a la normativa vigente.",
}

export default function TransparenciaPage() {
  const info = CATEGORIAS_INFO.transparencia
  const documentos = [
    { _id: "informe-gestion-2024", titulo: "Informe de gestión 2024", categoria: "transparencia", archivoUrl: "/documents/informe-gestion-2024.pdf", orden: 1 },
    { _id: "estados-financieros-2024", titulo: "Estados financieros 2024-2023", categoria: "transparencia", archivoUrl: "/documents/estados-financieros-2024-2023.pdf", orden: 2 },
    { _id: "certificado-legal", titulo: "Certificado de existencia y representación legal", categoria: "transparencia", archivoUrl: "/documents/certificado-existencia-representacion-legal.pdf", orden: 3 },
    { _id: "estatutos", titulo: "Estatutos de la Asociación Aconiño", categoria: "transparencia", archivoUrl: "/documents/estatutos-aconino.pdf", orden: 4 },
  ]

  return (
    <DocumentosLegalesPage
      titulo={info.titulo}
      subtitulo={info.subtitulo}
      descripcion={info.descripcion}
      categoria="transparencia"
      documentos={documentos || []}
      icono={info.icono}
    />
  )
}

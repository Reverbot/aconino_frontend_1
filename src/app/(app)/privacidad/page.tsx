import DocumentosLegalesPage, { CATEGORIAS_INFO } from "@/components/DocumentosLegalesPage"

export const metadata = {
  title: "Protección de Datos Personales - Asociación Aconiño",
  description: "Políticas y documentos relacionados con la protección de datos personales y privacidad.",
}

export default function PrivacidadPage() {
  const info = CATEGORIAS_INFO.proteccion_datos
  const documentos = [
    { _id: "politica-datos", titulo: "Política de protección de datos personales", categoria: "proteccion_datos", archivoUrl: "/documents/politica-proteccion-datos.pdf", orden: 1 },
  ]

  return (
    <DocumentosLegalesPage
      titulo={info.titulo}
      subtitulo={info.subtitulo}
      descripcion={info.descripcion}
      categoria="proteccion_datos"
      documentos={documentos || []}
      icono={info.icono}
    />
  )
}

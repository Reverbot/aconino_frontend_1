import DocumentosLegalesPage, { CATEGORIAS_INFO } from "@/components/DocumentosLegalesPage"

export const metadata = {
  title: "Permanencia ESAL - Asociación Aconiño",
  description: "Documentos relacionados con la permanencia y regulación de Entidades Sin Ánimo de Lucro.",
}

export default function PermanenciaESALPage() {
  const info = CATEGORIAS_INFO.esal
  const documentos = [
    { _id: "formulario-esal", titulo: "Formulario de permanencia ESAL", categoria: "esal", archivoUrl: "/documents/formulario-permanencia-esal.pdf", orden: 1 },
    { _id: "remuneracion-directivos", titulo: "Remuneración de cargos directivos", categoria: "esal", archivoUrl: "/documents/remuneracion-cargos-directivos.pdf", orden: 2 },
    { _id: "antecedentes", titulo: "Certificación de antecedentes", categoria: "esal", archivoUrl: "/documents/certificacion-antecedentes.pdf", orden: 3 },
  ]

  return (
    <DocumentosLegalesPage
      titulo={info.titulo}
      subtitulo={info.subtitulo}
      descripcion={info.descripcion}
      categoria="esal"
      documentos={documentos || []}
      icono={info.icono}
    />
  )
}

import Link from "next/link";

interface FooterLink {
  label?: string;
  url?: string;
  href?: string;
}

interface DocumentoLegal {
  _id: string;
  titulo: string;
  categoria: string;
  archivoUrl?: string;
  enlaceExterno?: string;
  descripcion?: string;
  orden: number;
}

interface FooterNavProps {
  links: FooterLink[];
  documentosLegales?: DocumentoLegal[];
}

export default function FooterNav({ documentosLegales }: FooterNavProps) {
  // Documentos ocultados manualmente (por título, sin importar mayúsculas)
  const HIDDEN_DOCS = ["rendicion-de-cuentas-cong-2023"];

  // Extraer documentos de la categoría "transparencia" para mostrarlos como enlaces individuales
  const transparenciaDocs = documentosLegales?.filter(
    (doc) =>
      doc.categoria === "transparencia" &&
      !HIDDEN_DOCS.some((h) => (doc.titulo || "").toLowerCase().includes(h))
  ) || [];

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left lg:pl-8">
      <h4 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-8">
        ENLACES DE INTERÉS
      </h4>

      {/* Subtítulo de categoría */}
      <h5 className="text-white/70 font-semibold text-sm mb-5">
        Información legal pública
      </h5>

      <ul className="space-y-3 text-sm w-full pl-2">
        {/* Permanencia ESAL → página con los 9 documentos */}
        <li>
          <Link
            href="/permanencia-esal"
            className="text-gray-400 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block uppercase text-xs tracking-wide"
          >
            PERMANENCIA ESAL
          </Link>
        </li>

        {/* Documentos individuales que estaban bajo "transparencia" */}
        {transparenciaDocs.map((doc) => {
          const href = doc.archivoUrl || doc.enlaceExterno || "#";
          return (
            <li key={doc._id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block uppercase text-xs tracking-wide"
              >
                {doc.titulo}
              </a>
            </li>
          );
        })}

        {/* Protección de Datos → página */}
        <li>
          <Link
            href="/privacidad"
            className="text-gray-400 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block uppercase text-xs tracking-wide"
          >
            PROTECCIÓN DE DATOS
          </Link>
        </li>
      </ul>
    </div>
  );
}

import { notFound } from "next/navigation";

export default async function GenericPage() {
    // La colección 'pages' fue eliminada - las páginas now usan globales específicos
    // /quienes-somos/nosotros → global 'quienes-somos-page'
    // Esta página catch-all ya no es necesaria
    
    return notFound();
}

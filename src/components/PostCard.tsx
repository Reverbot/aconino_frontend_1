import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    imageUrl?: string;
}

export default function PostCard({ title, excerpt, slug, date, imageUrl }: PostCardProps) {
    // Formatear fecha simple (ej: 22 de Abril, 2025)
    const formattedDate = new Date(date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            {/* Imagen Destacada */}
            <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 p-6">
                <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {title}
                </h3>

                {/* Renderizado peligroso de HTML para el excerpt, común en WordPress. 
            Nota: en producción, es mejor sanitizar esto con isomorphic-dompurify si no confiamos plenamente en el origen. */}
                <div
                    className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1 prose dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                />

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Link
                        href={`/blog/${slug}`}
                        className="text-secondary hover:text-accent font-medium inline-flex items-center gap-1 group"
                    >
                        Leer más
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}

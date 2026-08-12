import BlogHero from "@/components/blog/BlogHero"
import BlogPostCard from "@/components/blog/BlogPostCard"
import BlogSidebar from "@/components/blog/BlogSidebar"
import BlogPagination from "@/components/blog/BlogPagination"
import type { CategoryListItem, PostListItem } from "@/types/content"

export const metadata = {
    title: "Blog - Asociación Aconiño",
    description:
        "Noticias, artículos y actualidad sobre neurodesarrollo, inclusión social y los programas de la Asociación Aconiño.",
}

const posts: PostListItem[] = [
    {
        _id: "post-juego",
        title: "La importancia del juego en el neurodesarrollo",
        slug: "importancia-del-juego-en-el-neurodesarrollo",
        publishedAt: "2024-03-10",
        excerpt: "El juego es una herramienta esencial para acompañar el desarrollo motor, cognitivo y social de los niños.",
        mainImageUrl: "/images/programa-atencion-temprana.jpg",
        mainImageAlt: "Acompañamiento durante la primera infancia",
    },
    {
        _id: "post-derechos",
        title: "Derechos de los niños y niñas en condición de discapacidad",
        slug: "derechos-de-los-ninos-con-discapacidad",
        publishedAt: "2024-02-20",
        excerpt: "La inclusión comienza cuando reconocemos la participación, la autonomía y la dignidad como derechos.",
        mainImageUrl: "/images/programa-aprendizaje.jpg",
        mainImageAlt: "Niños participando en actividades de aprendizaje",
    },
    {
        _id: "post-familia",
        title: "Hacia un mundo incluyente desde el entorno familiar",
        slug: "mundo-incluyente-desde-el-entorno-familiar",
        publishedAt: "2024-01-18",
        excerpt: "Pequeñas decisiones cotidianas pueden abrir más oportunidades de participación para todos.",
        mainImageUrl: "/images/programa-neurodesarrollo.jpg",
        mainImageAlt: "Acompañamiento familiar",
    },
]

const categories: CategoryListItem[] = [
    { _id: "neurodesarrollo", title: "Neurodesarrollo", slug: "neurodesarrollo" },
    { _id: "inclusion", title: "Inclusión", slug: "inclusion" },
    { _id: "familias", title: "Familias", slug: "familias" },
]

export default function BlogPage() {
    const page = 1
    const categorySlug = undefined
    const totalPages = 1
    const recentPosts = posts

    const featuredPost = page === 1 && posts.length > 0 ? posts[0] : null
    const gridPosts = page === 1 ? posts.slice(1) : posts

    return (
        <main className="min-h-screen bg-slate-50 relative">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
                style={{
                    backgroundImage: `radial-gradient(#cbd5e1 0.5px, transparent 0.5px)`,
                    backgroundSize: '24px 24px'
                }}
            />
            <BlogHero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
                    <div className="lg:col-span-2">
                        {featuredPost && (
                            <div className="mb-12">
                                <BlogPostCard post={featuredPost} featured />
                            </div>
                        )}

                        {gridPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {gridPosts.map((post, idx) => (
                                    <BlogPostCard key={post._id} post={post} index={idx} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-lg">
                                    No se encontraron artículos
                                    {categorySlug ? ` en esta categoría` : ""}.
                                </p>
                            </div>
                        )}

                        <BlogPagination
                            currentPage={page}
                            totalPages={totalPages}
                            categoryParam={categorySlug}
                        />
                    </div>

                    <div className="order-first lg:order-last">
                        <div className="lg:sticky lg:top-36">
                            <BlogSidebar
                                recentPosts={recentPosts}
                                categories={categories}
                                currentCategory={categorySlug}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

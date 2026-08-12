import Link from "next/link"
import Image from "next/image"
import BlogSidebar from "@/components/blog/BlogSidebar"
import BlogContent from "@/components/blog/BlogContent"
import ScrollReveal from "@/components/animations/ScrollReveal"
import { FaCalendarAlt, FaArrowLeft, FaUser } from "react-icons/fa"
import type { PostDetail, PostListItem, CategoryListItem } from "@/types/content"

const staticPosts: Record<string, PostDetail> = {
    "importancia-del-juego-en-el-neurodesarrollo": {
        _id: "post-juego",
        title: "La importancia del juego en el neurodesarrollo",
        slug: "importancia-del-juego-en-el-neurodesarrollo",
        publishedAt: "2024-03-10",
        excerpt: "El juego es una herramienta esencial para acompañar el desarrollo motor, cognitivo y social de los niños.",
        author: { _id: "aconino", name: "Asociación Aconiño" },
        body: [
            { _type: "block", style: "normal", children: [{ _type: "span", text: "El juego permite que los niños exploren su cuerpo, el espacio y las relaciones con otras personas en un contexto seguro y motivador." }] },
            { _type: "block", style: "normal", children: [{ _type: "span", text: "Cuando las actividades se adaptan a las necesidades de cada niño, también pueden apoyar la atención, la comunicación, la planificación y la participación en la vida cotidiana." }] },
            { _type: "block", style: "normal", children: [{ _type: "span", text: "Familias y profesionales pueden convertir momentos sencillos de la rutina en oportunidades de aprendizaje, respetando el ritmo y los intereses del niño." }] },
        ] as any,
    },
    "derechos-de-los-ninos-con-discapacidad": {
        _id: "post-derechos",
        title: "Derechos de los niños y niñas en condición de discapacidad",
        slug: "derechos-de-los-ninos-con-discapacidad",
        publishedAt: "2024-02-20",
        excerpt: "La inclusión comienza cuando reconocemos la participación, la autonomía y la dignidad como derechos.",
        author: { _id: "aconino", name: "Asociación Aconiño" },
        body: [
            { _type: "block", style: "normal", children: [{ _type: "span", text: "Los niños con discapacidad tienen los mismos derechos a la educación, la salud, la recreación, la familia y la participación social." }] },
            { _type: "block", style: "normal", children: [{ _type: "span", text: "La rehabilitación debe estar conectada con esos derechos y con las actividades que cada niño quiere y necesita realizar en su contexto." }] },
            { _type: "block", style: "normal", children: [{ _type: "span", text: "Construir entornos accesibles es una responsabilidad compartida entre familias, instituciones y comunidad." }] },
        ] as any,
    },
    "mundo-incluyente-desde-el-entorno-familiar": {
        _id: "post-familia",
        title: "Hacia un mundo incluyente desde el entorno familiar",
        slug: "mundo-incluyente-desde-el-entorno-familiar",
        publishedAt: "2024-01-18",
        excerpt: "Pequeñas decisiones cotidianas pueden abrir más oportunidades de participación para todos.",
        author: { _id: "aconino", name: "Asociación Aconiño" },
        body: [
            { _type: "block", style: "normal", children: [{ _type: "span", text: "Las familias son protagonistas en los procesos de desarrollo y participación. Escuchar, observar y celebrar los avances ayuda a construir confianza." }] },
            { _type: "block", style: "normal", children: [{ _type: "span", text: "La inclusión se fortalece cuando las actividades familiares se organizan para que cada persona pueda participar con los apoyos que necesita." }] },
            { _type: "block", style: "normal", children: [{ _type: "span", text: "Aconiño acompaña a las familias con orientación práctica y un enfoque humano centrado en la persona." }] },
        ] as any,
    },
}

const recentPosts: PostListItem[] = Object.values(staticPosts).map(({ body: _body, ...post }) => post)
const categories: CategoryListItem[] = [
    { _id: "neurodesarrollo", title: "Neurodesarrollo", slug: "neurodesarrollo" },
    { _id: "inclusion", title: "Inclusión", slug: "inclusion" },
    { _id: "familias", title: "Familias", slug: "familias" },
]

export default function BlogPostPage({ slug }: { slug: string }) {
    const post = staticPosts[slug]
    if (!post) return null

    const date = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null

    return (
        <article className="min-h-screen bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
                style={{
                    backgroundImage: `radial-gradient(#cbd5e1 0.5px, transparent 0.5px)`,
                    backgroundSize: '24px 24px'
                }}
            />
            <header className="bg-primary text-white pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/15 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal animation="fade-in" delay={0.1}>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Volver al blog</span>
                        </Link>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={0.2}>
                        <div className="flex items-center gap-4 text-white/60 text-sm mb-6">
                            {date && (
                                <div className="flex items-center gap-1.5">
                                    <FaCalendarAlt className="text-accent text-xs" />
                                    <time dateTime={post.publishedAt ?? undefined}>{date}</time>
                                </div>
                            )}
                            {post.author && (
                                <>
                                    <span>·</span>
                                    <div className="flex items-center gap-1.5">
                                        <FaUser className="text-accent text-xs" />
                                        <span>{post.author.name}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="zoom-in" delay={0.3}>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                            {post.title}
                        </h1>
                    </ScrollReveal>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
                    <div className="lg:col-span-2">
                        {post.mainImageUrl && (
                            <ScrollReveal animation="fade-up" delay={0.1}>
                                <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-10 -mt-12 md:-mt-16">
                                    <Image
                                        src={post.mainImageUrl}
                                        alt={post.mainImageAlt || post.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </ScrollReveal>
                        )}

                        {post.body && (
                            <ScrollReveal animation="fade-up" delay={0.2}>
                                <BlogContent content={post.body} />
                            </ScrollReveal>
                        )}

                        <ScrollReveal animation="fade-up" delay={0.3}>
                            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-secondary transition-all"
                                >
                                    <FaArrowLeft className="text-xs" />
                                    Volver al blog
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="lg:sticky lg:top-36">
                            <BlogSidebar
                                recentPosts={recentPosts}
                                categories={categories}
                            />
                        </div>
                </div>
            </div>
        </article>
    )
}

export async function generateStaticParams() {
    return Object.keys(staticPosts).map((slug) => ({ slug }))
}

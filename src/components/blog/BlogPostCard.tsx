"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "@/compat/motion"
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa"
import type { PostListItem } from "@/types/content"

function formatDate(dateStr?: string | null): string {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

interface BlogPostCardProps {
    post: PostListItem
    index?: number
    featured?: boolean
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim()
}

function getExcerpt(excerpt?: string | null): string {
    if (!excerpt) return ""
    return stripHtml(excerpt)
}

export default function BlogPostCard({ post, index = 0, featured = false }: BlogPostCardProps) {
    const excerpt = getExcerpt(post.excerpt)
    const date = formatDate(post.publishedAt)

    if (featured) {
        return (
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group"
            >
                <Link href={`/blog/${post.slug}`} className="block">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                        <div className="relative h-64 lg:h-96 overflow-hidden">
                            {post.mainImageUrl ? (
                                <Image
                                    src={post.mainImageUrl}
                                    alt={post.mainImageAlt || post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <span className="text-primary/30 text-6xl font-black">Ɖ</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                            {date && (
                                <div className="flex items-center gap-2 text-secondary text-sm font-semibold mb-4">
                                    <FaCalendarAlt className="text-xs" />
                                    <time>{date}</time>
                                </div>
                            )}

                            <h2 className="text-2xl md:text-3xl font-extrabold text-primary leading-tight mb-4 group-hover:text-secondary transition-colors duration-300 line-clamp-3">
                                {post.title}
                            </h2>

                            {excerpt && (
                                <p className="text-gray-500 text-base leading-relaxed mb-6 line-clamp-3">
                                    {excerpt}
                                </p>
                            )}

                            <div className="flex items-center gap-2 text-primary font-bold group-hover:text-accent transition-colors">
                                <span>Leer artículo</span>
                                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.article>
        )
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group"
        >
            <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                    <div className="relative h-48 md:h-52 overflow-hidden">
                        {post.mainImageUrl ? (
                            <Image
                                src={post.mainImageUrl}
                                alt={post.mainImageAlt || post.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                <span className="text-primary/20 text-5xl font-black">Ɖ</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="flex flex-col flex-1 p-5 md:p-6">
                        {date && (
                            <div className="flex items-center gap-2 text-secondary text-xs font-semibold mb-3">
                                <FaCalendarAlt className="text-[10px]" />
                                <time>{date}</time>
                            </div>
                        )}

                        <h3 className="text-base md:text-lg font-extrabold text-primary leading-tight mb-3 line-clamp-2 group-hover:text-secondary transition-colors duration-300">
                            {post.title}
                        </h3>

                        {excerpt && (
                            <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                                {excerpt}
                            </p>
                        )}

                        <div className="mt-auto flex items-center gap-2 text-primary text-sm font-bold group-hover:text-accent transition-colors">
                            <span>Leer más</span>
                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}

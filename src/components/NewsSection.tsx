import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ScrollReveal from "./animations/ScrollReveal";
import NewsCard from "./blog/NewsCard";

export interface WPPost {
    id: string | number;
    slug: string;
    date?: string;
    publishedAt?: string;
    createdAt?: string;
    title: string | { rendered: string };
    excerpt: string | { rendered: string };
    featuredImage?: { url: string };
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
    };
}

interface NewsSectionProps {
    posts: WPPost[];
    title?: string | null;
    showSection?: boolean | null;
}

export default function NewsSection({ posts, title, showSection = true }: NewsSectionProps) {
    if (showSection === false) return null;

    return (
        <section className="w-full py-20 md:py-32 bg-white">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                <ScrollReveal 
                    animation="fade-up"
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                >
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">Aconino</span>
                            <div className="h-[2px] bg-accent w-16"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary">{title || "Últimas noticias"}</h2>
                    </div>

                    <Link href="/blog" className="inline-flex items-center justify-center gap-3 border-2 border-primary text-primary font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm tracking-widest shrink-0 group">
                        VER TODO <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </ScrollReveal>

                {/* Grid */}
                <div 
                    className="flex gap-6 sm:gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar"
                    style={{ scrollbarWidth: "none" }}
                >
                    {posts.length > 0 ? (
                        posts.map((post, idx) => (
                          <NewsCard 
                            key={post.id} 
                            post={post} 
                            index={idx}
                          />
                        ))
                    ) : (
                        <div className="w-full py-12 flex justify-center text-gray-400 font-medium text-lg">No se encontraron noticias recientes.</div>
                    )}
                </div>

            </div>
        </section>
    );
}
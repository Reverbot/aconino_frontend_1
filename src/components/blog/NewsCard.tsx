"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { motion } from "@/compat/motion";
import ScrollReveal from "../animations/ScrollReveal";

interface NewsCardProps {
  post: {
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
  };
  index: number;
}

export default function NewsCard({ post, index }: NewsCardProps) {
  // WP posts use 'date', not 'publishedAt'/'createdAt'
  const rawDate = post.date || post.publishedAt || post.createdAt;
  const dateObj = rawDate ? new Date(rawDate) : new Date();
  const day = isNaN(dateObj.getTime()) ? '--' : dateObj.getDate();
  const month = isNaN(dateObj.getTime()) ? '---' : dateObj.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();

  // WP embedded media for featured image
  const wpMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const featuredImageUrl = wpMedia?.source_url 
      || (typeof post.featuredImage === 'object' && post.featuredImage?.url ? post.featuredImage.url : null)
      || "/images/programa-atencion-temprana.jpg";

  // WP title and excerpt are {rendered: string}, not flat strings
  const postTitle = typeof post.title === 'object' ? post.title.rendered : (post.title || '');
  const postExcerpt = typeof post.excerpt === 'object' ? post.excerpt.rendered : (post.excerpt || '');

  return (
    <ScrollReveal
      animation="fade-up"
      delay={index * 0.1}
    >
      <motion.article 
          className="w-[85vw] max-w-[300px] shrink-0 snap-start bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 flex flex-col relative group overflow-hidden transition-all duration-300 transform hover:-translate-y-2 h-full"
      >
          {/* Thumbnail */}
          <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
              <Image
                  src={featuredImageUrl}
                  alt={postTitle}
                  fill
                  sizes="(max-width: 300px) 300px, (max-width: 600px) 50vw, 300px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary font-bold flex flex-col items-center justify-center w-16 h-16 rounded-xl z-10 shadow-lg border border-white/20">
                  <span className="text-2xl leading-none">{day}</span>
                  <span className="text-[11px] leading-tight mt-1 text-accent">{month}</span>
              </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-4 text-xs font-bold text-accent mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1">Aconiño</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-2 text-gray-400 font-medium"><FaRegCommentDots /> 0 Comentarios</span>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4 leading-snug line-clamp-3 group-hover:text-secondary transition-colors">
                  {postTitle}
              </h3>

              <div
                  className="text-gray-500 text-base mb-8 line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: postExcerpt }}
              />

              <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-primary tracking-widest flex items-center gap-2 group/link w-fit">
                      <span className="text-accent text-xl leading-none group-hover/link:translate-x-1 transition-transform">&raquo;</span> LEER MÁS
                  </Link>
              </div>
          </div>
      </motion.article>
    </ScrollReveal>
  );
}

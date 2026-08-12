"use client"

import Image from "next/image"
import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react"
import type { ImageAsset } from "@/types/content"
import { extractYouTubeId } from "@/lib/format"

function YouTubeVideo({ url }: { url: string }) {
  const videoId = extractYouTubeId(url)

  if (!videoId) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
        URL de YouTube inválida
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg my-8">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}

function ContentImage({ value }: { value: ImageAsset }) {
  if (!value?.asset) return null

  const imageUrl = value.url || value.asset.url
  if (!imageUrl) return null

  return (
    <figure className="my-8">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt={value.alt || "Imagen del artículo"}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
      {value.alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
          {value.alt}
        </figcaption>
      )}
    </figure>
  )
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mt-10 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary mt-10 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold text-primary mt-6 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent bg-gray-50 rounded-r-xl py-4 px-6 my-8 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-gray-700 text-base md:text-lg mb-6">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary hover:text-accent underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => <ContentImage value={value} />,
    youtubeVideo: ({ value }) => <YouTubeVideo url={value?.url || ""} />,
  },
}

interface BlogContentProps {
  content: PortableTextBlock[]
}

export default function BlogContent({ content }: BlogContentProps) {
  if (!content) return null

  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}

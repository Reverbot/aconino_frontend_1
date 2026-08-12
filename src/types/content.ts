import type { PortableTextBlock } from "@portabletext/react"
import type { PaginatedResponse } from "./navigation"

export interface ImageAsset {
  _type?: "image"
  asset?: {
    _ref?: string
    _type?: "reference"
    url?: string
  }
  url?: string
  alt?: string
  hotspot?: {
    x?: number
    y?: number
    width?: number
    height?: number
  }
  crop?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
}

export type BlockContent = PortableTextBlock[]

export interface Author {
  _id: string
  name: string
  imageUrl?: string
  bio?: string
}

export interface CategoryListItem {
  _id: string
  title: string
  slug: string
  description?: string
}

export interface PostListItem {
  _id: string
  title: string
  slug: string | null
  publishedAt?: string | null
  excerpt?: string | null
  mainImageUrl?: string | null
  mainImageAlt?: string | null
  author?: {
    name: string
    imageUrl?: string | null
  }
}

export interface PostDetail {
  _id: string
  title: string
  slug: string | null
  publishedAt?: string
  _createdAt?: string
  excerpt?: string
  body?: BlockContent
  mainImageUrl?: string
  mainImageAlt?: string
  author?: Author
  categories?: CategoryListItem[]
}

export type PostsResponse = PaginatedResponse<PostDetail>

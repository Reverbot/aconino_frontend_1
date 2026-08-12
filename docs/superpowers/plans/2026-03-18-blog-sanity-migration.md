# Blog Sanity Migration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate blog content from WordPress to Sanity CMS by updating the frontend to fetch data from Sanity instead of WordPress, while using Sanity Studio as the admin panel.

**Architecture:** Replace WordPress API calls with Sanity GROQ queries. Create a new data layer (`src/lib/sanity-blog.ts`) that mirrors the existing `wp.ts` interface but uses Sanity data. Update blog pages and components to use the new data format.

**Tech Stack:** Next.js 15, Sanity CMS, GROQ queries, @portabletext/react

---

## File Structure

```
src/
├── lib/
│   ├── sanity-blog.ts        (NEW) - Sanity data fetching functions
│   ├── sanity-image.ts        (NEW) - Image URL builder
│   └── wp.ts                 (KEEP) - Keep for other WP integrations
├── types/
│   └── sanity-post.ts        (NEW) - Sanity-specific types
├── app/(app)/blog/
│   ├── page.tsx              (MODIFY) - Blog listing
│   └── [slug]/page.tsx       (MODIFY) - Single post
└── components/blog/
    ├── BlogPostCard.tsx      (MODIFY) - Post card component
    ├── BlogSidebar.tsx        (MODIFY) - Sidebar component
    └── BlogPagination.tsx     (MODIFY) - Pagination (check if needed)
```

---

## Chunk 1: Data Layer (Types + Sanity Client)

### Task 1: Create Sanity Types

**Files:**
- Create: `src/types/sanity-post.ts`
- Read: `src/types/wp.ts` (reference)

- [ ] **Step 1: Create type definitions for Sanity blog data**

```typescript
// src/types/sanity-post.ts
import { PortableTextBlock } from '@portabletext/react'

// Note: GROQ projects images as { _ref: string, alt?: string } at top level
// Then we transform to add URL via urlFor()
export interface SanityImageSource {
  _ref: string
  url?: string
}

export interface SanityImage extends SanityImageSource {
  alt?: string
}

export interface SanityCategory {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

export interface SanityAuthor {
  _id: string
  name: string
  bio?: string
  image?: {
    _ref: string
    url?: string
  }
}

export interface SanityPost {
  _id: string
  _type?: 'post'
  title: string
  slug: { current: string }
  publishedAt: string
  updatedAt?: string
  excerpt?: string
  body?: PortableTextBlock[]
  // GROQ returns: { _ref: string, alt?: string }
  // After transformation: { _ref: string, url: string, alt?: string }
  mainImage?: {
    _ref: string
    url?: string
    alt?: string
  }
  categories?: SanityCategory[]
  author?: SanityAuthor
  featured?: boolean
  order?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface BlogPostsResponse {
  posts: SanityPost[]
  totalPages: number
  total: number
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/sanity-post.ts
git commit -m "feat(blog): add Sanity post types"
```

### Task 2: Create Image URL Builder

**Files:**
- Create: `src/lib/sanity-image.ts`
- Read: `src/sanity/lib/client.ts` (reference for client)

- [ ] **Step 1: Create image URL builder utility**

```typescript
// src/lib/sanity-image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

export interface ImageSource {
  asset: {
    _ref: string
  }
  alt?: string
}

export function urlFor(source: ImageSource | undefined) {
  if (!source?.asset?._ref) {
    return {
      width: (w: number) => ({ url: () => '' }),
      height: (h: number) => ({ url: () => '' }),
      fit: () => ({ url: () => '' }),
      auto: () => ({ url: () => '' }),
      url: () => '',
    }
  }
  return builder.image(source.asset)
}

// Helper to get direct URL
export function getImageUrl(source: ImageSource | undefined, width?: number): string {
  if (!source?.asset?._ref) return ''

  let builderImg = builder.image(source.asset)

  if (width) {
    builderImg = builderImg.width(width)
  }

  return builderImg.url()
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/sanity-image.ts
git commit -m "feat(blog): add Sanity image URL builder"
```

---

## Chunk 2: Data Fetching Functions

### Task 3: Create Sanity Blog Data Layer

**Files:**
- Create: `src/lib/sanity-blog.ts`
- Read: `src/lib/wp.ts` (reference for interface)

- [ ] **Step 1: Create data fetching functions**

```typescript
// src/lib/sanity-blog.ts
import { client } from '@/sanity/lib/client'
import { urlFor } from './sanity-image'
import { SanityPost, SanityCategory, BlogPostsResponse } from '@/types/sanity-post'

// GROQ queries
// GROQ queries
// Note: Use asset._ref (dot notation) to access the _ref property of the asset object
const POSTS_QUERY = `*[_type == "post" && defined(publishedAt)] | order(order desc, publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featured,
  "mainImage": mainImage{
    "_ref": asset._ref,
    alt
  },
  "categories": categories[]->{_id, title, slug}
}`

const POSTS_COUNT_QUERY = `count(*[_type == "post" && defined(publishedAt)])`

const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  updatedAt,
  excerpt,
  featured,
  body,
  "mainImage": mainImage{
    "_ref": asset._ref,
    alt
  },
  "categories": categories[]->{_id, title, slug},
  "author": author->{name, "image": image{
    "_ref": asset._ref
  }},
  seo
}`

const CATEGORIES_QUERY = `*[_type == "category"] | order(count desc) {
  _id,
  title,
  slug,
  description
}`

const POSTS_BY_CATEGORY_QUERY = `*[_type == "post" && defined(publishedAt) && $categorySlug in categories[]->slug.current] | order(order desc, publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featured,
  "mainImage": mainImage{
    "_ref": asset._ref,
    alt
  },
  "categories": categories[]->{_id, title, slug}
}`

const POSTS_BY_CATEGORY_COUNT_QUERY = `count(*[_type == "post" && defined(publishedAt) && $categorySlug in categories[]->slug.current])`

/**
 * Fetch paginated blog posts with optional category filter.
 */
export async function getBlogPosts(
  page: number = 1,
  perPage: number = 9,
  categorySlug?: string
): Promise<BlogPostsResponse> {
  try {
    const start = (page - 1) * perPage
    const end = start + perPage

    // Get total count
    const countQuery = categorySlug ? POSTS_BY_CATEGORY_COUNT_QUERY : POSTS_COUNT_QUERY
    const countParams = categorySlug ? { categorySlug } : {}
    const total: number = await client.fetch(countQuery, countParams)

    // Get posts
    const query = categorySlug ? POSTS_BY_CATEGORY_QUERY : POSTS_QUERY
    const params = categorySlug
      ? { categorySlug, start, end }
      : { start, end }

    const posts: SanityPost[] = await client.fetch(query, params)

    // Transform to include image URLs using urlFor
    const transformedPosts = posts.map((post) => ({
      ...post,
      mainImage: post.mainImage?._ref
        ? {
            ...post.mainImage,
            asset: {
              _ref: post.mainImage._ref,
              url: urlFor(post.mainImage).width(800).url(),
            },
          }
        : undefined,
    }))

    return {
      posts: transformedPosts,
      totalPages: Math.ceil(total / perPage),
      total,
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return { posts: [], totalPages: 1, total: 0 }
  }
}

/**
 * Fetch latest posts for sidebar.
 */
export async function getLatestPosts(limit: number = 5): Promise<SanityPost[]> {
  try {
    const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "mainImage": mainImage{
        "_ref": asset._ref,
        alt
      }
    }`

    const posts: SanityPost[] = await client.fetch(query, { limit })

    return posts.map((post) => ({
      ...post,
      mainImage: post.mainImage?._ref
        ? {
            ...post.mainImage,
            asset: {
              _ref: post.mainImage._ref,
              url: urlFor(post.mainImage).width(400).url(),
            },
          }
        : undefined,
    }))
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return []
  }
}

/**
 * Fetch all categories.
 */
export async function getCategories(): Promise<SanityCategory[]> {
  try {
    return await client.fetch(CATEGORIES_QUERY)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Fetch a single post by slug.
 */
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  try {
    const post: SanityPost | null = await client.fetch(POST_BY_SLUG_QUERY, { slug })

    if (!post) return null

    // Transform to include image URLs
    return {
      ...post,
      mainImage: post.mainImage?._ref
        ? {
            ...post.mainImage,
            asset: {
              _ref: post.mainImage._ref,
              url: urlFor(post.mainImage).width(1200).url(),
            },
          }
        : undefined,
      author: post.author?.image?._ref
        ? {
            ...post.author,
            image: {
              ...post.author.image,
              asset: {
                _ref: post.author.image._ref,
                url: urlFor(post.author.image).width(100).url(),
              },
            },
          }
        : post.author,
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

/**
 * Get post count for a category (for category display)
 */
export async function getCategoryPostCount(categorySlug: string): Promise<number> {
  try {
    return await client.fetch(POSTS_BY_CATEGORY_COUNT_QUERY, { categorySlug })
  } catch (error) {
    console.error('Error fetching category count:', error)
    return 0
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/sanity-blog.ts
git commit -m "feat(blog): add Sanity data fetching functions"
```

---

## Chunk 3: Update Blog Listing Page

### Task 4: Update Blog Listing Page

**Files:**
- Modify: `src/app/(app)/blog/page.tsx:1-98`
- Read: `src/components/blog/BlogPostCard.tsx` (to understand current props)

- [ ] **Step 1: Update imports to use Sanity**

```typescript
// Replace
import { getBlogPosts, getLatestPosts, getCategories } from "@/lib/wp";
// With
import { getBlogPosts, getLatestPosts, getCategories } from "@/lib/sanity-blog";
```

- [ ] **Step 2: Update the page component**

The page fetches data and passes to components. We need to verify the data transformation matches what components expect. Since components currently use `WPPost`, we need to either:
- Update components to accept new format
- Or create adapter functions

Let's update the components to handle both formats. First, modify the page:

```typescript
// In src/app/(app)/blog/page.tsx - update the fetch logic
// The params handling stays the same
// Just update the imports
```

- [ ] **Step 3: Commit**

```bash
git add src/app/\(app\)/blog/page.tsx
git commit -m "feat(blog): update listing page to use Sanity"
```

---

## Chunk 4: Update Blog Components

### Task 5: Update BlogPostCard Component

**Files:**
- Modify: `src/components/blog/BlogPostCard.tsx`
- Read: `src/types/sanity-post.ts`

- [ ] **Step 1: Update to handle Sanity data format**

Replace the entire component to handle both WP and Sanity formats, or create a unified type. Let's make it handle Sanity directly:

```typescript
// src/components/blog/BlogPostCard.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { SanityPost } from "@/types/sanity-post";

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

interface BlogPostCardProps {
    post: SanityPost;
    index?: number;
    featured?: boolean;
}

export default function BlogPostCard({ post, index = 0, featured = false }: BlogPostCardProps) {
    const imageUrl = post.mainImage?.asset?.url || null;
    const title = post.title;
    const excerpt = post.excerpt || '';
    const date = formatDate(post.publishedAt);
    const slug = post.slug.current;

    if (featured) {
        return (
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group"
            >
                <Link href={`/blog/${slug}`} className="block">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                        {/* Image */}
                        <div className="relative h-64 lg:h-96 overflow-hidden">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={post.mainImage?.alt || title}
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

                        {/* Content */}
                        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-secondary text-sm font-semibold mb-4">
                                <FaCalendarAlt className="text-xs" />
                                <time dateTime={post.publishedAt}>{date}</time>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-extrabold text-primary leading-tight mb-4 group-hover:text-secondary transition-colors duration-300 line-clamp-3">
                                {title}
                            </h2>

                            <p className="text-gray-500 text-base leading-relaxed mb-6 line-clamp-3">
                                {excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-primary font-bold group-hover:text-accent transition-colors">
                                <span>Leer artículo</span>
                                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.article>
        );
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
            <Link href={`/blog/${slug}`} className="block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 md:h-52 overflow-hidden">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={post.mainImage?.alt || title}
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

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 md:p-6">
                        <div className="flex items-center gap-2 text-secondary text-xs font-semibold mb-3">
                            <FaCalendarAlt className="text-[10px]" />
                            <time dateTime={post.publishedAt}>{date}</time>
                        </div>

                        <h3 className="text-base md:text-lg font-extrabold text-primary leading-tight mb-3 line-clamp-2 group-hover:text-secondary transition-colors duration-300">
                            {title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                            {excerpt}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-primary text-sm font-bold group-hover:text-accent transition-colors">
                            <span>Leer más</span>
                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/BlogPostCard.tsx
git commit -m "feat(blog): update BlogPostCard for Sanity data"
```

### Task 6: Update BlogSidebar Component

**Files:**
- Modify: `src/components/blog/BlogSidebar.tsx`

- [ ] **Step 1: Update imports and props types**

Replace:
```typescript
import { WPPost, WPCategory } from "@/types/wp";
```

With:
```typescript
import { SanityPost, SanityCategory } from "@/types/sanity-post";
import { urlFor } from "@/lib/sanity-image";
```

- [ ] **Step 2: Update props interface and data access**

```typescript
interface BlogSidebarProps {
    recentPosts: SanityPost[];
    categories: SanityCategory[];
    currentCategory?: string;
}
```

- [ ] **Step 3: Update image extraction and data access**

Replace:
```typescript
function extractImageUrl(post: WPPost): string | null {
    const media = post._embedded?.["wp:featuredmedia"];
    if (media && media.length > 0) {
        return media[0].source_url || null;
    }
    return null;
}
```

With:
```typescript
function extractImageUrl(post: SanityPost): string | null {
    return post.mainImage?.asset?.url || null;
}
```

- [ ] **Step 4: Update render logic**

In the recent posts mapping:
- Replace `post.id` with `post._id`
- Replace `post.slug` with `post.slug.current`
- Replace `post.title.rendered` with `post.title`
- Replace `post.date` with `post.publishedAt`

In the categories mapping:
- Replace `cat.id` with `cat._id`
- Replace `cat.slug` with `cat.slug.current`
- Replace `cat.name` with `cat.title`
- Note: Sanity categories may not have `count`, handle gracefully

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/BlogSidebar.tsx
git commit -m "feat(blog): update BlogSidebar for Sanity data"
```

---

## Chunk 5: Update Single Post Page

### Task 7: Update Blog Post [slug] Page

**Files:**
- Modify: `src/app/(app)/blog/[slug]/page.tsx`

- [ ] **Step 1: Update imports**

Replace:
```typescript
import { getPostBySlug, getLatestPosts, getCategories } from "@/lib/wp";
```

With:
```typescript
import { getPostBySlug, getLatestPosts, getCategories } from "@/lib/sanity-blog";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity-image";
```

- [ ] **Step 2: Add Portable Text components**

```typescript
// Add before the component
const ptComponents = {
    types: {
        image: ({ value }: { value: { asset: any; alt?: string } }) => {
            const imageUrl = value?.asset ? urlFor(value).width(800).url() : null;
            if (!imageUrl) return null;
            return (
                <figure className="my-8">
                    <img
                        src={imageUrl}
                        alt={value.alt || ''}
                        className="rounded-lg w-full max-h-[500px] object-cover"
                    />
                    {value.alt && (
                        <figcaption className="text-center text-sm text-gray-500 mt-2">
                            {value.alt}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    block: {
        h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>
        ),
        normal: ({ children }: { children: React.ReactNode }) => (
            <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
        ),
        blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote className="border-l-4 border-accent bg-gray-50 rounded-r-xl py-2 px-6 my-4">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
        ),
        number: ({ children }: { children: React.ReactNode }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
        ),
    },
};
```

- [ ] **Step 3: Update data access in component**

Replace the WP-specific data access:
- `post.title.rendered` → `post.title`
- `post.content.rendered` → `<PortableText value={post.body} components={ptComponents} />`
- `post.excerpt.rendered` → `post.excerpt`
- `post.date` → `post.publishedAt`
- `post._embedded?.["wp:featuredmedia"]?.[0]?.source_url` → `post.mainImage?.asset?.url`
- Author: `post.author?.name` (from the new structure)

- [ ] **Step 4: Update metadata generation for SEO**

```typescript
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: 'Post no encontrado' };
    }

    return {
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        openGraph: {
            title: post.seo?.metaTitle || post.title,
            description: post.seo?.metaDescription || post.excerpt,
            images: post.mainImage?.asset?.url
                ? [{ url: post.mainImage.asset.url }]
                : [],
        },
    };
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/\(app\)/blog/\[slug\]/page.tsx
git commit -m "feat(blog): update single post page for Sanity with Portable Text"
```

---

## Chunk 6: Testing

### Task 8: Verify and Test

- [ ] **Step 1: Run dev server to verify compilation**

```bash
npm run dev
```

- [ ] **Step 2: Visit /blog and verify posts load**

- [ ] **Step 3: Click on a post and verify full content renders**

- [ ] **Step 4: Check sidebar categories**

- [ ] **Step 5: Create a new post in Sanity Studio (/studio)**

- [ ] **Step 6: Verify new post appears on frontend**

- [ ] **Step 7: Commit final changes**

```bash
git add -A
git commit -m "feat(blog): complete migration to Sanity CMS"
```

---

## Acceptance Criteria Verification

- [ ] Sanity Studio is accessible at `/studio`
- [ ] Posts can be created, edited, and deleted in Sanity
- [ ] Blog listing page shows posts from Sanity
- [ ] Single post page renders Portable Text content from Sanity
- [ ] Categories are displayed in sidebar
- [ ] Images are hosted via Sanity asset pipeline
- [ ] New posts appear on frontend after publish

---

## Timeline Summary

- **Chunk 1 (Data Layer)**: ~30 min
- **Chunk 2 (Fetching)**: ~1 hour
- **Chunk 3 (Listing Page)**: ~15 min
- **Chunk 4 (Components)**: ~1 hour
- **Chunk 5 (Single Post)**: ~1 hour
- **Chunk 6 (Testing)**: ~30 min

**Total**: ~4-5 hours
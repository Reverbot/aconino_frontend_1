procede# Blog Admin Panel - Design Specification

## Overview

Migrate the blog content management from WordPress to Sanity CMS. The frontend will fetch blog posts from Sanity instead of WordPress, using Sanity Studio as the admin panel.

## Current State

- **Frontend**: Next.js 15 with App Router
- **Blog source**: WordPress REST API (`wp-json/wp/v2`)
- **Sanity**: Already configured with schema for `post`, `category`, `author`
- **Migration**: Posts already migrated to Sanity

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Sanity Studio  │────▶│   Sanity CMS     │────▶│  Next.js App    │
│  (/studio)      │     │   (Data Store)   │     │   (Frontend)    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## Schema Design

### Post Schema (existing, to verify)

```typescript
// Required fields
- title: string (required)
- slug: slug (required, from title)
- mainImage: image with alt text
- body: blockContent (Portable Text)
- categories: array of references to category
- publishedAt: datetime

// Optional fields (add if needed)
- author: reference to author
- excerpt: text (short description)
- featured: boolean (highlight post)
- order: number (sort order)
- seo: object (metaTitle, metaDescription)
- updatedAt: datetime (auto-managed)
```

### Category Schema (verify existence)

```typescript
- name: string
- slug: slug
- description: text
```

### Author Schema (verify existence)

```typescript
- name: string
- image: image
- bio: text
```

## Frontend Changes

### Data Fetching

Replace WordPress API calls with Sanity GROQ queries.

**Current** (`src/lib/wp.ts`):
```typescript
getBlogPosts(page, perPage, categoryId)
getLatestPosts(limit)
getCategories()
getPostBySlug(slug)
```

**New** (`src/lib/sanity-blog.ts`):
```typescript
// Types matching Sanity schema
interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  updatedAt?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  mainImage?: { asset: { url: string }; alt?: string };
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>;
  author?: { name: string; image?: { asset: { url: string } } };
  featured?: boolean;
  seo?: { metaTitle?: string; metaDescription?: string };
}

interface BlogPostsResponse {
  posts: SanityPost[];
  totalPages: number;
  total: number;
}

getBlogPosts(page: number, perPage: number, categorySlug?: string): Promise<BlogPostsResponse>
getLatestPosts(limit: number): Promise<SanityPost[]>
getCategories(): Promise<SanityCategory[]>
getPostBySlug(slug: string): Promise<SanityPost | null>
```

### GROQ Queries

```groq
// Blog posts with pagination (supports order field override)
*[_type == "post" && defined(publishedAt)] | order(order desc, publishedAt desc) [$start...$limit] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featured,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  "categories": categories[]->{_id, title, slug}
}

// Single post by slug (includes SEO fields)
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  updatedAt,
  excerpt,
  featured,
  body,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  "categories": categories[]->{_id, title, slug},
  "author": author->{name, "image": image.asset->url},
  seo
}

// Categories list
*[_type == "category"] | order(count desc) {
  _id,
  title,
  slug,
  description
}
```

### Pages to Update

1. `src/app/(app)/blog/page.tsx` - Blog listing
2. `src/app/(app)/blog/[slug]/page.tsx` - Single post
3. Create `src/lib/sanity-blog.ts` - Data fetching functions
4. Update `src/components/blog/*` - Components using new data format

## Implementation Steps

1. Verify/create Sanity schemas for post, category, author
2. Create GROQ queries and data fetching functions in `src/lib/sanity-blog.ts`
3. Update blog listing page to use Sanity data
4. Update single post page to use Sanity data
5. Update blog components to handle Sanity data format
6. Test full flow: admin creates post in Sanity → appears on frontend

## Data Format Mapping

### WordPress Post (current)
```json
{
  "id": 123,
  "title": "{\"rendered\": \"<p>Title</p>\"}",
  "slug": "post-slug",
  "date": "2024-01-01T00:00:00Z",
  "content": {"rendered": "<p>Content</p>"},
  "featured_media": 456,
  "categories": [1, 2],
  "author": 1
}
```

### Sanity Post (new)
```json
{
  "_id": "abc123",
  "title": "Post Title",
  "slug": {"current": "post-slug"},
  "publishedAt": "2024-01-01T00:00:00Z",
  "body": [{...}],
  "mainImage": {"asset": {"url": "https://..."}},
  "categories": [{ "_id": "cat1", "title": "Category", "slug": {"current": "category"} }],
  "author": {"name": "Author Name", "image": {...}}
}
```

## Acceptance Criteria

1. ✅ Sanity Studio is accessible at `/studio`
2. ✅ Posts can be created, edited, and deleted in Sanity
3. ✅ Blog listing page shows posts from Sanity
4. ✅ Single post page renders content from Sanity
5. ✅ Categories are manageable in Sanity
6. ✅ Images are hosted via Sanity asset pipeline
7. ✅ New posts appear on frontend after publish

## Portable Text Rendering

The `body` field uses Sanity's Portable Text format. Use `@portabletext/react` to render:

```typescript
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity-image'

// Custom components for rich content
const ptComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(800).url()}
        alt={value.alt || ''}
        className="my-8 rounded-lg"
      />
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
}

<PortableText value={post.body} components={ptComponents} />
```

## Image URL Construction

Use Sanity's image URL builder for responsive images:

```typescript
// src/lib/sanity-image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Usage with transformations
urlFor(post.mainImage).width(800).height(600).fit('crop').url()
urlFor(post.mainImage).width(400).auto('format').url() // WebP/AVIF
```

## Environment Configuration

Required environment variables (already configured in `.env.local`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Revalidation Strategy

Use Next.js ISR (Incremental Static Regeneration):

```typescript
// In fetching functions, add revalidation
fetch(query, {
  next: { revalidate: 600 } // Revalidate every 10 minutes
})
```

For real-time updates, can use On-Demand ISR with Sanity webhooks.

## Error Handling

- **Loading states**: Use Next.js `loading.tsx` for Suspense boundaries
- **Error states**: Use Next.js `error.tsx` for error boundaries
- **Fallback UI**: Show cached content or friendly error message if Sanity unavailable

```typescript
// Example: Error boundary component
export default function ErrorBoundary({ error, reset }) {
  return (
    <div className="text-center py-20">
      <p>No se pudieron cargar los artículos.</p>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  )
}
```

## SEO Implementation

Extract SEO metadata from post:

```typescript
// In blog post [slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.mainImage ? [{ url: post.mainImage }] : [],
    },
  }
}
```

## Timeline Estimate

- **Setup schemas**: 30 min
- **Create data fetching**: 1-2 hours
- **Update frontend pages**: 2-3 hours
- **Testing**: 1 hour

**Total**: ~4-6 hours

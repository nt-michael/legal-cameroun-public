# WordPress Blog Integration Plan

## Overview

Integrate blog content from the staging WordPress site (staging.legalcameroun.com) into the Next.js application using the **secured** WordPress REST API with Application Passwords authentication. Posts will be fetched server-side with ISR (Incremental Static Regeneration) for optimal performance.

---

## Security Architecture

### Authentication Method: Application Passwords

WordPress Application Passwords (built-in since WP 5.6) provide secure API access:
- Credentials are **never exposed to the client** (server-side only)
- Uses HTTP Basic Auth with Base64 encoding
- Scoped to specific users with limited permissions

### Environment Variables (Server-Side Only)

```bash
# .env.local (NEVER commit this file)

# WordPress API - Server-side only (no NEXT_PUBLIC_ prefix)
WP_API_URL=https://staging.legalcameroun.com/wp-json/wp/v2
WP_USERNAME=api-reader
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx

# Revalidation
WP_REVALIDATE_SECONDS=3600
REVALIDATION_SECRET=your-random-secret-for-webhooks
```

**Important:**
- `WP_APP_PASSWORD` uses Application Password format (spaces between groups)
- Create a dedicated WordPress user with **read-only** permissions for API access
- Never use `NEXT_PUBLIC_` prefix for credentials

---

## WordPress Setup (Admin Tasks)

### 1. Create API User

1. Go to WordPress Admin → Users → Add New
2. Create user `api-reader` with **Subscriber** or **Custom** role (read-only)
3. Assign minimal capabilities: `read`, `read_posts`

### 2. Generate Application Password

1. Go to Users → Edit `api-reader` → Application Passwords
2. Enter name: `NextJS Blog Integration`
3. Click "Add New Application Password"
4. Copy the generated password (shown only once)
5. Store securely in `.env.local`

### 3. (Optional) Restrict REST API Further

Add to `functions.php` or a security plugin:
```php
// Only allow authenticated access to posts endpoint
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) return $result;

    // Allow public access to specific endpoints if needed
    $public_routes = ['/wp-json/$', '/wp-json/wp/v2/posts', '/wp-json/wp/v2/categories'];
    $current_route = $_SERVER['REQUEST_URI'];

    foreach ($public_routes as $route) {
        if (preg_match('#' . $route . '#', $current_route)) {
            return $result; // Allow
        }
    }

    if (!is_user_logged_in()) {
        return new WP_Error('rest_not_logged_in', 'Authentication required.', ['status' => 401]);
    }

    return $result;
});
```

---

## Phase 1: Secured API Client

### 1.1 Create `lib/wordpress.ts`

```typescript
// WordPress REST API Client with Application Password Authentication

const WP_API_URL = process.env.WP_API_URL;
const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

// Validate environment variables at startup
if (!WP_API_URL || !WP_USERNAME || !WP_APP_PASSWORD) {
  console.warn('WordPress API credentials not configured. Blog features disabled.');
}

// Generate Basic Auth header
function getAuthHeader(): string {
  const credentials = `${WP_USERNAME}:${WP_APP_PASSWORD}`;
  const base64 = Buffer.from(credentials).toString('base64');
  return `Basic ${base64}`;
}

// Authenticated fetch wrapper
async function wpFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: {
      revalidate: parseInt(process.env.WP_REVALIDATE_SECONDS || '3600'),
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Types
export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  author: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    author?: Array<{ name: string; avatar_urls: Record<string, string> }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface WPPostsResponse {
  posts: WPPost[];
  totalPages: number;
  total: number;
}

// API Functions

export async function getPosts(params?: {
  page?: number;
  perPage?: number;
  category?: number;
  search?: string;
  orderBy?: 'date' | 'modified' | 'title';
  order?: 'asc' | 'desc';
}): Promise<WPPostsResponse> {
  const searchParams = new URLSearchParams({
    _embed: 'true',
    per_page: (params?.perPage || 10).toString(),
    page: (params?.page || 1).toString(),
    orderby: params?.orderBy || 'date',
    order: params?.order || 'desc',
  });

  if (params?.category) searchParams.set('categories', params.category.toString());
  if (params?.search) searchParams.set('search', params.search);

  const response = await fetch(`${WP_API_URL}/posts?${searchParams}`, {
    headers: { 'Authorization': getAuthHeader() },
    next: { revalidate: parseInt(process.env.WP_REVALIDATE_SECONDS || '3600') },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }

  const posts: WPPost[] = await response.json();
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
  const total = parseInt(response.headers.get('X-WP-Total') || '0');

  return { posts, totalPages, total };
}

export async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const posts = await wpFetch<WPPost[]>(`/posts?slug=${slug}&_embed=true`);
    return posts[0] || null;
  } catch (error) {
    console.error(`Failed to fetch post: ${slug}`, error);
    return null;
  }
}

export async function getPostById(id: number): Promise<WPPost | null> {
  try {
    return await wpFetch<WPPost>(`/posts/${id}?_embed=true`);
  } catch (error) {
    console.error(`Failed to fetch post ID: ${id}`, error);
    return null;
  }
}

export async function getCategories(): Promise<WPCategory[]> {
  try {
    return await wpFetch<WPCategory[]>('/categories?per_page=50&hide_empty=true');
  } catch (error) {
    console.error('Failed to fetch categories', error);
    return [];
  }
}

export async function getFeaturedPosts(count: number = 3): Promise<WPPost[]> {
  const { posts } = await getPosts({ perPage: count });
  return posts;
}

export async function getRelatedPosts(
  currentPostId: number,
  categoryIds: number[],
  count: number = 3
): Promise<WPPost[]> {
  if (categoryIds.length === 0) return [];

  const { posts } = await getPosts({
    perPage: count + 1, // Fetch extra in case current post is included
    category: categoryIds[0],
  });

  return posts.filter(post => post.id !== currentPostId).slice(0, count);
}

// Health check function
export async function checkApiConnection(): Promise<boolean> {
  try {
    await wpFetch('/posts?per_page=1');
    return true;
  } catch {
    return false;
  }
}
```

### 1.2 Create `lib/wordpress-utils.ts`

```typescript
import { WPPost } from './wordpress';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  dateFormatted: string;
  modified: string;
  image: string;
  imageAlt: string;
  category: string;
  categorySlug: string;
  categories: Array<{ name: string; slug: string }>;
  author: string;
  authorAvatar?: string;
  readTime: string;
}

// HTML entity decoder
export function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
  };

  return text.replace(/&[#\w]+;/g, (match) => entities[match] || match);
}

// Strip HTML tags
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate read time (avg 200 words/minute)
export function calculateReadTime(content: string): string {
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min`;
}

// Format date for display
export function formatDate(dateString: string, locale: 'fr' | 'en' = 'fr'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Transform WordPress post to app format
export function transformPost(wpPost: WPPost, locale: 'fr' | 'en' = 'fr'): BlogPost {
  const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
  const terms = wpPost._embedded?.['wp:term']?.[0] || [];
  const author = wpPost._embedded?.author?.[0];

  return {
    id: wpPost.id.toString(),
    slug: wpPost.slug,
    title: decodeHtmlEntities(wpPost.title.rendered),
    excerpt: decodeHtmlEntities(stripHtml(wpPost.excerpt.rendered)),
    content: wpPost.content.rendered,
    date: wpPost.date,
    dateFormatted: formatDate(wpPost.date, locale),
    modified: wpPost.modified,
    image: featuredMedia?.source_url || '/images/default-post.jpg',
    imageAlt: featuredMedia?.alt_text || '',
    category: terms[0]?.name || 'Uncategorized',
    categorySlug: terms[0]?.slug || 'uncategorized',
    categories: terms.map(t => ({ name: t.name, slug: t.slug })),
    author: author?.name || 'Legal Cameroun',
    authorAvatar: author?.avatar_urls?.['96'],
    readTime: calculateReadTime(wpPost.content.rendered),
  };
}

// Transform multiple posts
export function transformPosts(wpPosts: WPPost[], locale: 'fr' | 'en' = 'fr'): BlogPost[] {
  return wpPosts.map(post => transformPost(post, locale));
}
```

---

## Phase 2: Update Next.js Config

### 2.1 Update `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging.legalcameroun.com',
      },
      {
        protocol: 'https',
        hostname: 'legalcameroun.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
  },
};

export default nextConfig;
```

---

## Phase 3: Post List Page

### 3.1 Update `app/actualite/page.tsx`

```typescript
import { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/wordpress';
import { transformPosts } from '@/lib/wordpress-utils';
import ActualiteHero from '@/components/actualite/ActualiteHero';
import ActualiteGrid from '@/components/actualite/ActualiteGrid';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Actualité Juridique & Fiscale au Cameroun - Legal Cameroun',
  description: 'Analyses, guides pratiques et actualités du droit des affaires au Cameroun.',
};

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function ActualitePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const categorySlug = params.category;

  const [postsData, categories] = await Promise.all([
    getPosts({ page, perPage: 9 }),
    getCategories(),
  ]);

  const posts = transformPosts(postsData.posts);

  return (
    <>
      <ActualiteHero />
      <ActualiteGrid
        posts={posts}
        categories={categories}
        currentPage={page}
        totalPages={postsData.totalPages}
        currentCategory={categorySlug}
      />
    </>
  );
}
```

---

## Phase 4: Individual Post Page

### 4.1 Create `app/actualite/[slug]/page.tsx`

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getPosts, getRelatedPosts } from '@/lib/wordpress';
import { transformPost, transformPosts, stripHtml } from '@/lib/wordpress-utils';
import PostContent from '@/components/actualite/PostContent';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for most recent posts
export async function generateStaticParams() {
  const { posts } = await getPosts({ perPage: 20 });
  return posts.map((post) => ({ slug: post.slug }));
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wpPost = await getPost(slug);

  if (!wpPost) return {};

  const post = transformPost(wpPost);
  const description = stripHtml(wpPost.excerpt.rendered).slice(0, 160);

  return {
    title: `${post.title} | Legal Cameroun`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.image],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const wpPost = await getPost(slug);

  if (!wpPost) {
    notFound();
  }

  const post = transformPost(wpPost);

  // Fetch related posts
  const relatedWpPosts = await getRelatedPosts(wpPost.id, wpPost.categories, 3);
  const relatedPosts = transformPosts(relatedWpPosts);

  return <PostContent post={post} relatedPosts={relatedPosts} />;
}
```

### 4.2 Create `app/actualite/[slug]/not-found.tsx`

```typescript
import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Article non trouvé
        </h2>
        <p className="text-gray-600 mb-8">
          L'article que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <Link
          href="/actualite"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          Retour aux actualités
        </Link>
      </div>
    </div>
  );
}
```

---

## Phase 5: Revalidation Webhook

### 5.1 Create `app/api/revalidate/route.ts`

```typescript
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  // Validate secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path, slug, type } = body;

    if (path) {
      // Revalidate specific path
      revalidatePath(path);
    } else if (slug && type === 'post') {
      // Revalidate post page and list
      revalidatePath(`/actualite/${slug}`);
      revalidatePath('/actualite');
      revalidatePath('/'); // Homepage blog preview
    } else {
      // Revalidate all blog pages
      revalidatePath('/actualite', 'layout');
      revalidatePath('/');
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
```

### 5.2 WordPress Webhook Setup

Add to WordPress `functions.php`:
```php
// Trigger Next.js revalidation on post update
add_action('save_post', function($post_id, $post, $update) {
    if ($post->post_type !== 'post' || $post->post_status !== 'publish') {
        return;
    }

    $nextjs_url = 'https://your-nextjs-site.com/api/revalidate';
    $secret = 'your-revalidation-secret';

    wp_remote_post($nextjs_url . '?secret=' . $secret, [
        'body' => json_encode([
            'type' => 'post',
            'slug' => $post->post_name,
            'id' => $post_id,
        ]),
        'headers' => ['Content-Type' => 'application/json'],
        'timeout' => 5,
        'blocking' => false, // Don't wait for response
    ]);
}, 10, 3);
```

---

## File Structure

```
.env.local                          # Credentials (never commit)

lib/
├── wordpress.ts                    # Secured API client
└── wordpress-utils.ts              # Transformations

app/
├── actualite/
│   ├── page.tsx                    # Post list (ISR)
│   ├── loading.tsx                 # Loading state
│   └── [slug]/
│       ├── page.tsx                # Individual post (ISR)
│       └── not-found.tsx           # 404 page
├── api/
│   └── revalidate/route.ts         # Webhook endpoint

components/
├── actualite/
│   ├── ActualiteGrid.tsx           # Updated for WP data
│   ├── ActualiteHero.tsx           # Keep as-is
│   ├── BlogPostCard.tsx            # Updated for WP data
│   ├── PostContent.tsx             # NEW: Full post layout
│   ├── RelatedPosts.tsx            # NEW: Sidebar widget
│   └── Pagination.tsx              # NEW: Page navigation
└── home/
    └── BlogPreview.tsx             # Updated for WP data
```

---

## Security Checklist

- [ ] Create dedicated WordPress user with read-only permissions
- [ ] Generate Application Password for API access
- [ ] Store credentials in `.env.local` (not `.env`)
- [ ] Never use `NEXT_PUBLIC_` prefix for API credentials
- [ ] Add `.env.local` to `.gitignore`
- [ ] Configure WordPress to restrict API access (optional)
- [ ] Use HTTPS for all API calls
- [ ] Set up revalidation secret for webhooks
- [ ] Test API connection before deployment

---

## Implementation Order

1. **WordPress Admin Setup**
   - Create `api-reader` user
   - Generate Application Password
   - Test API access with curl/Postman

2. **Environment Setup**
   - Add credentials to `.env.local`
   - Update `next.config.ts` for images

3. **API Client**
   - Create `lib/wordpress.ts`
   - Create `lib/wordpress-utils.ts`
   - Test with `checkApiConnection()`

4. **Post Pages**
   - Create `app/actualite/[slug]/page.tsx`
   - Create `PostContent` component
   - Create not-found page

5. **List Page**
   - Update `ActualiteGrid` for WP data
   - Add pagination component

6. **Homepage**
   - Update `BlogPreview` component

7. **Webhooks**
   - Create revalidation endpoint
   - Configure WordPress webhook

8. **Testing & Deployment**
   - Verify all posts render
   - Check SEO metadata
   - Deploy and verify production

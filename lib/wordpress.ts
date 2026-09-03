// WordPress REST API Client with Application Password Authentication

const WP_API_URL = process.env.WC_SITE_URL ? `${process.env.WC_SITE_URL}/wp-json/wp/v2` : '';
const WP_USERNAME = process.env.WC_SITE_APP_USERNAME || '';
const WP_APP_PASSWORD = process.env.WC_SITE_APP_PASSWORD || '';

// Validate environment variables
const isConfigured = Boolean(WP_API_URL && WP_USERNAME && WP_APP_PASSWORD);

if (!isConfigured && process.env.NODE_ENV === 'development') {
  console.warn('WordPress API credentials not configured. Blog features may be limited.');
}

// Generate Basic Auth header
function getAuthHeader(): string {
  const credentials = `${WP_USERNAME}` + ":" + `${WP_APP_PASSWORD}`;
  const base64 = Buffer.from(credentials).toString('base64');
  return `Basic ${base64}`;
}

// Revalidation time in seconds (1 hour default)
const REVALIDATE_SECONDS = parseInt(process.env.WP_REVALIDATE_SECONDS || '3600');
// Shorter revalidation for post listings (5 minutes default)
const POSTS_REVALIDATE_SECONDS = parseInt(process.env.WP_POSTS_REVALIDATE_SECONDS || '300');
// A hung WordPress must fail fast rather than hold a render open until the
// platform's own timeout kills the request.
const REQUEST_TIMEOUT_MS = 10_000;

// Types
export interface WPComment {
  id: number;
  post: number;
  parent: number;
  author_name: string;
  author_email: string;
  author_avatar_urls?: Record<string, string>;
  date: string;
  content: { rendered: string };
  status: string;
}

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
  link: string;
  comment_status: 'open' | 'closed';
  meta?: {
    _post_title_en?: string;
    _post_excerpt_en?: string;
    _post_content_en?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        width?: number;
        height?: number;
        sizes?: {
          medium?: { source_url: string; width?: number; height?: number };
          large?: { source_url: string; width?: number; height?: number };
          full?: { source_url: string; width?: number; height?: number };
        };
      };
    }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string; name_en?: string }>>;
    author?: Array<{ name: string; avatar_urls: Record<string, string> }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
  name_en?: string;
}

export interface WPPostsResponse {
  posts: WPPost[];
  totalPages: number;
  total: number;
}

// Authenticated fetch wrapper
async function wpFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!isConfigured) {
    throw new Error('WordPress API not configured');
  }

  const url = `${WP_API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: options.signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Fetch with headers access (for pagination)
async function wpFetchWithHeaders(endpoint: string, revalidate: number = REVALIDATE_SECONDS): Promise<{ data: WPPost[]; totalPages: number; total: number }> {
  if (!isConfigured) {
    throw new Error('WordPress API not configured');
  }

  const url = `${WP_API_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': getAuthHeader(),
    },
    next: {
      revalidate,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
  const total = parseInt(response.headers.get('X-WP-Total') || '0');

  return { data, totalPages, total };
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

  const { data: posts, totalPages, total } = await wpFetchWithHeaders(`/posts?${searchParams}`, POSTS_REVALIDATE_SECONDS);

  return { posts, totalPages, total };
}

/**
 * A post by slug, or null when WordPress answers and has no such post.
 *
 * Deliberately does NOT catch: the caller renders notFound() for null, so
 * swallowing a transient failure here serves a 404 for an article that still
 * exists — and the CDN then caches that 404. "WordPress is unreachable" must
 * surface as an error (5xx, retried later) rather than "this article is gone".
 */
export async function getPost(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed=true`);
  return posts[0] || null;
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

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  try {
    const categories = await wpFetch<WPCategory[]>(`/categories?slug=${encodeURIComponent(slug)}`);
    return categories[0] || null;
  } catch (error) {
    console.error(`Failed to fetch category: ${slug}`, error);
    return null;
  }
}

export async function getFeaturedPosts(count: number = 3): Promise<WPPost[]> {
  try {
    const { posts } = await getPosts({ perPage: count });
    return posts;
  } catch (error) {
    console.error('Failed to fetch featured posts', error);
    return [];
  }
}

export async function getRelatedPosts(
  currentPostId: number,
  categoryIds: number[],
  count: number = 3
): Promise<WPPost[]> {
  if (categoryIds.length === 0) return [];

  try {
    const { posts } = await getPosts({
      perPage: count + 1,
      category: categoryIds[0],
    });

    return posts.filter(post => post.id !== currentPostId).slice(0, count);
  } catch (error) {
    console.error('Failed to fetch related posts', error);
    return [];
  }
}

// Fetch comments for a post
export async function getComments(postId: number): Promise<WPComment[]> {
  try {
    return await wpFetch<WPComment[]>(`/comments?post=${postId}&per_page=100&orderby=date&order=asc`);
  } catch (error) {
    console.error(`Failed to fetch comments for post ${postId}`, error);
    return [];
  }
}

// Submit a new comment
export async function postComment(data: {
  post: number;
  author_name: string;
  author_email: string;
  content: string;
  parent?: number;
}): Promise<WPComment> {
  if (!isConfigured) {
    throw new Error('WordPress API not configured');
  }

  const url = `${WP_API_URL}/comments`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to post comment: ${response.status} ${errorBody}`);
  }

  return response.json();
}

// Health check function
export async function checkApiConnection(): Promise<boolean> {
  try {
    await wpFetch<WPPost[]>('/posts?per_page=1');
    return true;
  } catch {
    return false;
  }
}

// Check if WordPress integration is available
export function isWordPressConfigured(): boolean {
  return isConfigured;
}

// ─── SEO Manager types & functions ──────────────────────────────────────────

export interface WPPageSEO {
  slug: string;
  name: string;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  og_title?: string;
  og_description?: string;
  og_type?: string;
  og_image?: string;
  og_image_width?: number;
  og_image_height?: number;
  og_image_alt?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  // English variant fields
  title_en?: string;
  description_en?: string;
  keywords_en?: string;
  og_title_en?: string;
  og_description_en?: string;
  og_image_alt_en?: string;
  twitter_title_en?: string;
  twitter_description_en?: string;
}

export async function getAllPagesSEO(): Promise<WPPageSEO[]> {
  const siteUrl = process.env.WC_SITE_URL;
  if (!siteUrl) return [];
  try {
    const res = await fetch(`${siteUrl}/wp-json/lc-seo/v1/pages`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch {
    return [];
  }
}

// ─── WordPress Pages (static pages, e.g. legal content) ─────────────────────

export interface WPPage {
  id: number;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        width?: number;
        height?: number;
        sizes?: {
          medium?: { source_url: string };
          large?: { source_url: string };
        };
      };
    }>;
  };
}

export async function getWPPage(slug: string): Promise<WPPage | null> {
  try {
    const pages = await wpFetch<WPPage[]>(`/pages?slug=${encodeURIComponent(slug)}&_embed=1`);
    return pages[0] || null;
  } catch (error) {
    console.error(`Failed to fetch WP page: ${slug}`, error);
    return null;
  }
}

// ─── Sitemap ────────────────────────────────────────────────────────────────

export interface SitemapPost {
  slug: string;
  /** ISO 8601 UTC, from WordPress `modified_gmt` (which carries no timezone marker). */
  modified: string;
  /** True when the post has a real English translation, not just a French fallback. */
  hasEnglish: boolean;
}

/**
 * Whether a post is genuinely readable in English.
 *
 * Title AND content must both be translated: with only a title, the /en page serves
 * the French body under an English headline and must not be indexed as English.
 * Single source of truth for canonicals and for the sitemap.
 */
export function hasEnglishTranslation(meta: Record<string, unknown> | undefined): boolean {
  const field = (key: string) => {
    const raw = meta?.[key];
    return typeof raw === 'string' ? raw.trim() : '';
  };
  return Boolean(field('_post_title_en') && field('_post_content_en'));
}

/**
 * Every published post, for the sitemap.
 *
 * Deliberately unauthenticated: posts are public, and the sitemap must still build
 * when application-password credentials are absent (a fresh clone, a preview deploy).
 * Returns whatever it managed to collect if WordPress fails part-way.
 */
export async function getPostsForSitemap(): Promise<SitemapPost[]> {
  const siteUrl = process.env.WC_SITE_URL;
  if (!siteUrl) return [];

  const posts: SitemapPost[] = [];

  try {
    for (let page = 1; page <= 20; page++) {
      const res = await fetch(
        `${siteUrl}/wp-json/wp/v2/posts?per_page=100&page=${page}` +
          `&_fields=slug,modified_gmt,meta._post_title_en,meta._post_content_en`,
        {
          // Matches the sitemap route's own revalidate; the shorter listing TTL
          // would otherwise drag the whole route down with it.
          next: { revalidate: REVALIDATE_SECONDS },
          // A hung WordPress must not hang sitemap generation.
          signal: AbortSignal.timeout(10_000),
        },
      );
      if (!res.ok) break;

      const batch = await res.json();
      if (!Array.isArray(batch) || batch.length === 0) break;

      for (const post of batch) {
        if (!post?.slug || !post.modified_gmt) continue;
        posts.push({
          slug: post.slug,
          // modified_gmt is UTC but unmarked; without the Z it would be read as local time.
          modified: `${post.modified_gmt}Z`,
          hasEnglish: hasEnglishTranslation(post.meta),
        });
      }

      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
      if (page >= totalPages) break;
    }
  } catch (error) {
    console.error('Failed to fetch posts for sitemap', error);
  }

  return posts;
}

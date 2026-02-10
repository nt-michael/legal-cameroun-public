// WordPress REST API Client with Application Password Authentication

import { encode } from "punycode";

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
async function wpFetchWithHeaders(endpoint: string): Promise<{ data: WPPost[]; totalPages: number; total: number }> {
  if (!isConfigured) {
    throw new Error('WordPress API not configured');
  }

  const url = `${WP_API_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': getAuthHeader(),
    },
    next: {
      revalidate: REVALIDATE_SECONDS,
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

  const { data: posts, totalPages, total } = await wpFetchWithHeaders(`/posts?${searchParams}`);

  return { posts, totalPages, total };
}

export async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const posts = await wpFetch<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed=true`);
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

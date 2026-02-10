// WordPress Data Transformation Utilities

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
  link?: string;
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
    '&#8211;': '-',
    '&#8212;': '-',
    '&hellip;': '...',
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&mdash;': '-',
    '&ndash;': '-',
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

// Calculate read time (avg 200 words/minute for French)
export function calculateReadTime(content: string, locale: 'fr' | 'en' = 'fr'): string {
  const text = stripHtml(content);
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  if (locale === 'fr') {
    return `${minutes} min`;
  }
  return `${minutes} min read`;
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

// Format date short (for cards)
export function formatDateShort(dateString: string, locale: 'fr' | 'en' = 'fr'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Get relative time (e.g., "2 days ago")
export function getRelativeTime(dateString: string, locale: 'fr' | 'en' = 'fr'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: { fr: 'an', en: 'year' }, seconds: 31536000 },
    { label: { fr: 'mois', en: 'month' }, seconds: 2592000 },
    { label: { fr: 'jour', en: 'day' }, seconds: 86400 },
    { label: { fr: 'heure', en: 'hour' }, seconds: 3600 },
    { label: { fr: 'minute', en: 'minute' }, seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      const label = interval.label[locale];
      if (locale === 'fr') {
        return `Il y a ${count} ${label}${count > 1 && label !== 'mois' ? 's' : ''}`;
      }
      return `${count} ${label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return locale === 'fr' ? "À l'instant" : 'Just now';
}

// Transform WordPress post to app format
export function transformPost(wpPost: WPPost, locale: 'fr' | 'en' = 'fr'): BlogPost {
  const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
  const terms = wpPost._embedded?.['wp:term']?.[0] || [];
  const author = wpPost._embedded?.author?.[0];

  // Get best available image size
  const imageUrl = featuredMedia?.media_details?.sizes?.large?.source_url
    || featuredMedia?.source_url
    || '/images/default-post.jpg';

  return {
    id: wpPost.id.toString(),
    slug: wpPost.slug,
    title: decodeHtmlEntities(wpPost.title.rendered),
    excerpt: decodeHtmlEntities(stripHtml(wpPost.excerpt.rendered)),
    content: wpPost.content.rendered,
    date: wpPost.date,
    dateFormatted: formatDate(wpPost.date, locale),
    modified: wpPost.modified,
    image: imageUrl,
    imageAlt: featuredMedia?.alt_text || decodeHtmlEntities(wpPost.title.rendered),
    category: terms[0]?.name || (locale === 'fr' ? 'Non classé' : 'Uncategorized'),
    categorySlug: terms[0]?.slug || 'uncategorized',
    categories: terms.map(t => ({ name: t.name, slug: t.slug })),
    author: author?.name || 'Legal Cameroun',
    authorAvatar: author?.avatar_urls?.['96'],
    readTime: calculateReadTime(wpPost.content.rendered, locale),
    link: wpPost.link,
  };
}

// Transform multiple posts
export function transformPosts(wpPosts: WPPost[], locale: 'fr' | 'en' = 'fr'): BlogPost[] {
  return wpPosts.map(post => transformPost(post, locale));
}

// Sanitize HTML content for safe rendering
export function sanitizeContent(html: string): string {
  // Remove potentially dangerous elements but keep safe formatting
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');
}

// Extract table of contents from content
export function extractTableOfContents(html: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /<h([2-4])[^>]*(?:id="([^"]*)")?[^>]*>([^<]+)<\/h[2-4]>/gi;
  const toc: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2] || match[3].toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const text = decodeHtmlEntities(match[3]);
    toc.push({ id, text, level });
  }

  return toc;
}

// Replace PDF links with inline viewer + download button
export function processPdfLinks(html: string): string {
  const processedUrls = new Set<string>();

  return html.replace(
    /<a\s+([^>]*?)href=["']([^"']+\.pdf)["']([^>]*)>(.*?)<\/a>/gi,
    (_match, _before, url, _after, linkText) => {
      if (processedUrls.has(url)) {
        return ''; // Already rendered a viewer for this PDF
      }
      processedUrls.add(url);

      const fileName = linkText || url.split('/').pop() || 'Document PDF';
      return `
        <div class="pdf-viewer-container my-6 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <object data="${url}" type="application/pdf" width="100%" height="600" class="w-full">
            <p class="p-4 text-gray-600 dark:text-gray-400">
              Votre navigateur ne supporte pas l&apos;affichage PDF.
              <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary-600 underline">${fileName}</a>
            </p>
          </object>
          <div class="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <span class="text-sm text-gray-600 dark:text-gray-400">${fileName}</span>
            <a href="${url}" target="_blank" rel="noopener noreferrer" download class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Télécharger
            </a>
          </div>
        </div>`;
    }
  );
}

// Comment types
export interface Comment {
  id: number;
  author: string;
  authorAvatar?: string;
  date: string;
  dateFormatted: string;
  content: string;
  parentId: number;
  children: Comment[];
}

// Transform flat WP comments into nested tree
export function transformComments(
  wpComments: Array<{
    id: number;
    author_name: string;
    author_avatar_urls?: Record<string, string>;
    date: string;
    content: { rendered: string };
    parent: number;
  }>,
  locale: 'fr' | 'en' = 'fr'
): Comment[] {
  const commentMap = new Map<number, Comment>();
  const roots: Comment[] = [];

  // First pass: create all comment objects
  for (const wc of wpComments) {
    commentMap.set(wc.id, {
      id: wc.id,
      author: wc.author_name || (locale === 'fr' ? 'Anonyme' : 'Anonymous'),
      authorAvatar: wc.author_avatar_urls?.['48'],
      date: wc.date,
      dateFormatted: formatDate(wc.date, locale),
      content: wc.content.rendered,
      parentId: wc.parent,
      children: [],
    });
  }

  // Second pass: build tree
  for (const comment of commentMap.values()) {
    if (comment.parentId === 0) {
      roots.push(comment);
    } else {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.children.push(comment);
      } else {
        roots.push(comment);
      }
    }
  }

  return roots;
}

// Add IDs to headings for anchor links
export function addHeadingIds(html: string): string {
  let counter = 0;
  return html.replace(/<h([2-4])([^>]*)>([^<]+)<\/h[2-4]>/gi, (match, level, attrs, text) => {
    if (attrs.includes('id=')) return match;
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || `heading-${++counter}`;
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

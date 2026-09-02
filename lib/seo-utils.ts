import { cache } from 'react';
import { Metadata } from 'next';
import { getAllPagesSEO, WPPageSEO } from './wordpress';
import { getRequestLanguage } from './lang';
import { absoluteUrl } from './site-config';

// Cached per request — only one WP fetch per page render
const fetchPagesSEO = cache(getAllPagesSEO);

export type BilingualMetadata = { fr: Metadata; en: Metadata };

export interface PageMetadataOptions {
  /** Emit the canonical for this path instead of the page's own (e.g. page 1 of a
   *  paginated list canonicalising to the unpaginated URL). */
  canonicalPath?: string;
  /** Force the canonical into one language. Used by English pages that serve
   *  untranslated French content, which must point back at the French original. */
  canonicalLang?: 'fr' | 'en';
}

export async function createPageMetadata(
  path: string,
  defaults: BilingualMetadata,
  options: PageMetadataOptions = {},
): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const base = defaults[lang];

  const canonicalPath = options.canonicalPath ?? path;
  const canonicalLang = options.canonicalLang ?? lang;
  const canonical = absoluteUrl(canonicalPath, canonicalLang);

  base.alternates = {
    ...base.alternates,
    canonical,
    languages: {
      fr: absoluteUrl(path, 'fr'),
      en: absoluteUrl(path, 'en'),
      'x-default': absoluteUrl(path, 'fr'),
    },
  };

  // og:url must agree with the canonical, or an English share resolves to the
  // French page.
  if (base.openGraph) {
    base.openGraph = { ...base.openGraph, url: canonical } as Metadata['openGraph'];
  }

  const configs = await fetchPagesSEO();
  const wp = configs.find((c) => c.slug === path);
  if (!wp) return base;
  return mergeSEO(base, wp, lang);
}

function nonEmpty(value: string | undefined): string | undefined {
  return value && value.trim() !== '' ? value.trim() : undefined;
}

function mergeSEO(defaults: Metadata, wp: WPPageSEO, lang: 'fr' | 'en'): Metadata {
  function pick(base: string | undefined, en: string | undefined): string | undefined {
    return lang === 'en' ? nonEmpty(en) ?? nonEmpty(base) : nonEmpty(base);
  }

  const merged: Metadata = { ...defaults };

  if (pick(wp.title, wp.title_en)) merged.title = pick(wp.title, wp.title_en);
  if (pick(wp.description, wp.description_en)) merged.description = pick(wp.description, wp.description_en);
  if (pick(wp.keywords, wp.keywords_en)) merged.keywords = pick(wp.keywords, wp.keywords_en);
  if (nonEmpty(wp.robots)) merged.robots = wp.robots;
  // An explicit canonical in the WordPress SEO manager wins over the computed one.
  if (nonEmpty(wp.canonical)) {
    merged.alternates = { ...(merged.alternates ?? {}), canonical: wp.canonical };
  }

  // Open Graph
  const defaultOg = (merged.openGraph ?? {}) as Record<string, unknown>;
  const ogImage = nonEmpty(wp.og_image);
  const ogImages = ogImage
    ? [
      {
        url: ogImage,
        width: wp.og_image_width || undefined,
        height: wp.og_image_height || undefined,
        alt: pick(wp.og_image_alt, wp.og_image_alt_en),
      },
    ]
    : defaultOg.images;

  merged.openGraph = {
    ...defaultOg,
    ...(pick(wp.og_title, wp.og_title_en) ? { title: pick(wp.og_title, wp.og_title_en) } : {}),
    ...(pick(wp.og_description, wp.og_description_en) ? { description: pick(wp.og_description, wp.og_description_en) } : {}),
    ...(nonEmpty(wp.og_type) ? { type: wp.og_type as 'website' | 'article' } : {}),
    images: ogImages,
  } as Metadata['openGraph'];

  // Twitter
  const defaultTwitter = (merged.twitter ?? {}) as Record<string, unknown>;
  merged.twitter = {
    ...defaultTwitter,
    ...(nonEmpty(wp.twitter_card) ? { card: wp.twitter_card as 'summary_large_image' | 'summary' } : {}),
    ...(pick(wp.twitter_title, wp.twitter_title_en) ? { title: pick(wp.twitter_title, wp.twitter_title_en) } : {}),
    ...(pick(wp.twitter_description, wp.twitter_description_en) ? { description: pick(wp.twitter_description, wp.twitter_description_en) } : {}),
    ...(nonEmpty(wp.twitter_image) ? { images: [wp.twitter_image!] } : {}),
  } as Metadata['twitter'];

  return merged;
}

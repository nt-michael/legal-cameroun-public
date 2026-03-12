import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPost, getPosts, getRelatedPosts, getComments } from '@/lib/wordpress';
import { transformPost, transformPosts, transformComments, stripHtml } from '@/lib/wordpress-utils';
import { createPageMetadata } from '@/lib/seo-utils';
import PostContent from '@/components/actualite/PostContent';

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for most recent posts
export async function generateStaticParams() {
  try {
    const { posts } = await getPosts({ perPage: 20 });
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wpPost = await getPost(slug);

  if (!wpPost) {
    return {
      title: 'Article not found | Legal Cameroun',
    };
  }

  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value === 'en' ? 'en' : 'fr') as 'fr' | 'en';

  const post = transformPost(wpPost);
  const descriptionFr = stripHtml(wpPost.excerpt.rendered).slice(0, 160);

  const titleEnRaw = (wpPost.meta as Record<string, string> | undefined)?._post_title_en;
  const excerptEn = (wpPost.meta as Record<string, string> | undefined)?._post_excerpt_en;
  const descriptionEn = excerptEn?.trim() ? excerptEn.trim().slice(0, 160) : descriptionFr;
  const titleEnFull = titleEnRaw?.trim() ? `${titleEnRaw.trim()} | Legal Cameroun` : `${post.title} | Legal Cameroun`;

  const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
  const mediaDetails = featuredMedia?.media_details;
  const hasImage = post.image !== '/images/default-post.jpg';

  const imageWidth = mediaDetails?.width;
  const imageHeight = mediaDetails?.height;

  const commonFields = {
    alternates: { canonical: `/actualite/${slug}` },
    openGraph: {
      type: 'article' as const,
      url: `/actualite/${slug}`,
      siteName: 'Legal Cameroun',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      images: hasImage
        ? [{ url: post.image, alt: post.imageAlt, width: imageWidth, height: imageHeight }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image' as const,
      images: hasImage ? [post.image] : undefined,
    },
  };

  return createPageMetadata(`/actualite/${slug}`, {
    fr: {
      title: `${post.title} | Legal Cameroun`,
      description: descriptionFr,
      ...commonFields,
      openGraph: { ...commonFields.openGraph, title: post.title, description: descriptionFr },
      twitter: { ...commonFields.twitter, title: post.title, description: descriptionFr },
    },
    en: {
      title: titleEnFull,
      description: descriptionEn,
      ...commonFields,
      openGraph: { ...commonFields.openGraph, title: titleEnRaw?.trim() || post.title, description: descriptionEn },
      twitter: { ...commonFields.twitter, title: titleEnRaw?.trim() || post.title, description: descriptionEn },
    },
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const lang = (((await cookies()).get('lang')?.value) ?? 'fr') as 'fr' | 'en';
  const wpPost = await getPost(slug);

  if (!wpPost) {
    notFound();
  }

  const post = transformPost(wpPost, lang);

  // Fetch related posts and comments in parallel
  const [relatedWpPosts, wpComments] = await Promise.all([
    getRelatedPosts(wpPost.id, wpPost.categories, 3),
    getComments(wpPost.id),
  ]);

  const relatedPosts = transformPosts(relatedWpPosts, lang);
  const comments = transformComments(wpComments);

  const siteUrl = process.env.Frontend_SITE_URL || 'https://legalcameroun.com';
  const postUrl = `${siteUrl}/actualite/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: stripHtml(wpPost.excerpt.rendered).slice(0, 160),
    image: post.image !== '/images/default-post.jpg' ? post.image : undefined,
    datePublished: post.date,
    dateModified: post.modified,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Legal Cameroun',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostContent
        post={post}
        url={postUrl}
        relatedPosts={relatedPosts}
        comments={comments}
        commentStatus={wpPost.comment_status}
      />
    </>
  );
}

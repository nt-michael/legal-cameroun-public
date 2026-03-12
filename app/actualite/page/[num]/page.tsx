import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchListingData } from '@/lib/actualite-page-utils';
import ActualiteHero from '@/components/actualite/ActualiteHero';
import ActualiteGrid from '@/components/actualite/ActualiteGrid';
import { createPageMetadata } from '@/lib/seo-utils';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ num: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { num } = await params;
  const page = parseInt(num);

  const title = page > 1
    ? `Actualité Juridique & Fiscale au Cameroun - Page ${page} - Legal Cameroun`
    : 'Actualité Juridique & Fiscale au Cameroun - Legal Cameroun';
  const description = `Analyses, guides pratiques et actualités du droit des affaires au Cameroun. Restez informé des évolutions juridiques et fiscales — page ${page}.`;

  const titleEn = page > 1
    ? `Legal & Tax News in Cameroon - Page ${page} - Legal Cameroun`
    : 'Legal & Tax News in Cameroon - Legal Cameroun';
  const descriptionEn = `Analyses, practical guides and news on Cameroonian business law. Stay informed of the latest legal and tax developments — page ${page}.`;

  return createPageMetadata(`/actualite/page/${page}`, {
    fr: {
      title,
      description,
      alternates: {
        canonical: page > 1 ? `/actualite/page/${page}` : '/actualite',
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `/actualite/page/${page}`,
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    },
    en: {
      title: titleEn,
      description: descriptionEn,
      alternates: {
        canonical: page > 1 ? `/actualite/page/${page}` : '/actualite',
      },
      openGraph: {
        title: titleEn,
        description: descriptionEn,
        type: 'website',
        url: `/actualite/page/${page}`,
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: titleEn,
        description: descriptionEn,
      },
    },
  });
}

export default async function PaginatedActualitePage({ params, searchParams }: PageProps) {
  const { num } = await params;
  const { category: categorySlug } = await searchParams;
  const page = parseInt(num);

  // Redirect page 1 to /actualite
  if (page === 1 || isNaN(page) || page < 1) {
    const redirectUrl = categorySlug ? `/actualite?category=${categorySlug}` : '/actualite';
    redirect(redirectUrl);
  }

  const lang = (((await cookies()).get('lang')?.value) ?? 'fr') as 'fr' | 'en';
  const data = await fetchListingData(page, categorySlug, lang);

  // Redirect if page exceeds total
  if (page > data.totalPages && data.totalPages > 0) {
    redirect('/actualite');
  }

  return (
    <>
      <ActualiteHero />
      <ActualiteGrid
        posts={data.posts}
        categories={data.categories}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        currentCategory={data.currentCategory}
        useWordPress={data.useWordPress}
      />
    </>
  );
}

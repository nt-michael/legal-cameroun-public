import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { fetchListingData } from '@/lib/actualite-page-utils';
import ActualiteHero from '@/components/actualite/ActualiteHero';
import ActualiteGrid from '@/components/actualite/ActualiteGrid';

export const revalidate = 3600;

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
  const description = 'Analyses, guides pratiques et actualités du droit des affaires au Cameroun.';

  return {
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
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

  const data = await fetchListingData(page, categorySlug);

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

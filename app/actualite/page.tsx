import { Metadata } from 'next';
import { fetchListingData } from '@/lib/actualite-page-utils';
import ActualiteHero from '@/components/actualite/ActualiteHero';
import ActualiteGrid from '@/components/actualite/ActualiteGrid';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Actualité Juridique & Fiscale au Cameroun - Legal Cameroun',
  description: 'Analyses, guides pratiques et actualités du droit des affaires au Cameroun. Restez informé des évolutions juridiques et fiscales avec nos experts.',
  keywords: ['actualité juridique Cameroun', 'fiscalité Cameroun', 'droit des affaires', 'loi de finances', 'CNPS', 'DGI'],
  openGraph: {
    title: 'Actualité Juridique & Fiscale au Cameroun',
    description: 'Analyses, guides pratiques et actualités du droit des affaires au Cameroun. Restez informé des évolutions juridiques et fiscales avec nos experts.',
    type: 'website',
    url: 'https://legalcameroun.com/actualite',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Actualité Juridique & Fiscale au Cameroun',
    description: 'Analyses, guides pratiques et actualités du droit des affaires au Cameroun. Restez informé des évolutions juridiques et fiscales avec nos experts.',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/actualite',
      'en': 'https://legalcameroun.com/actualite',
      'x-default': 'https://legalcameroun.com/actualite',
    },
  },
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ActualitePage({ searchParams }: PageProps) {
  const { category: categorySlug } = await searchParams;
  const data = await fetchListingData(1, categorySlug);

  return (
    <>
      <ActualiteHero />
      <ActualiteGrid
        posts={data.posts}
        categories={data.categories}
        currentPage={1}
        totalPages={data.totalPages}
        currentCategory={data.currentCategory}
        useWordPress={data.useWordPress}
      />
    </>
  );
}

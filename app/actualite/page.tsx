import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { fetchListingData } from '@/lib/actualite-page-utils';
import ActualiteHero from '@/components/actualite/ActualiteHero';
import ActualiteGrid from '@/components/actualite/ActualiteGrid';
import { createPageMetadata } from '@/lib/seo-utils';

export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/actualite', {
    fr: {
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
    },
    en: {
      title: 'Legal & Tax News in Cameroon - Legal Cameroun',
      description: 'Analyses, practical guides and news on Cameroonian business law. Stay informed of the latest legal and tax developments with our experts.',
      keywords: ['legal news Cameroon', 'tax Cameroon', 'business law', 'finance law', 'CNPS', 'DGI'],
      openGraph: {
        title: 'Legal & Tax News in Cameroon',
        description: 'Analyses, practical guides and news on Cameroonian business law. Stay informed of the latest legal and tax developments with our experts.',
        type: 'website',
        url: 'https://legalcameroun.com/actualite',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Legal & Tax News in Cameroon',
        description: 'Analyses, practical guides and news on Cameroonian business law. Stay informed of the latest legal and tax developments with our experts.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/actualite',
          'en': 'https://legalcameroun.com/actualite',
          'x-default': 'https://legalcameroun.com/actualite',
        },
      },
    },
  });
}

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ActualitePage({ searchParams }: PageProps) {
  const { category: categorySlug } = await searchParams;
  const lang = (((await cookies()).get('lang')?.value) ?? 'fr') as 'fr' | 'en';
  const data = await fetchListingData(1, categorySlug, lang);

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

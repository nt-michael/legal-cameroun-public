import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getWPPage } from '@/lib/wordpress';
import { createPageMetadata } from '@/lib/seo-utils';
import LegalPageContent from '@/components/legal/LegalPageContent';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/politique-de-confidentialite', {
    title: 'Politique de Confidentialité | Legal Cameroun',
    description: 'Découvrez comment Legal Cameroun collecte, utilise et protège vos données personnelles conformément à la réglementation applicable.',
    openGraph: {
      title: 'Politique de Confidentialité | Legal Cameroun',
      description: 'Comment Legal Cameroun protège vos données personnelles.',
      type: 'website',
      url: 'https://legalcameroun.com/politique-de-confidentialite',
      siteName: 'Legal Cameroun',
    },
    twitter: {
      card: 'summary',
      title: 'Politique de Confidentialité | Legal Cameroun',
      description: 'Comment Legal Cameroun protège vos données personnelles.',
    },
    alternates: {
      canonical: 'https://legalcameroun.com/politique-de-confidentialite',
    },
    robots: 'noindex,follow',
  });
}

export default async function PolitiqueConfidentialitePage() {
  const lang = (await cookies()).get('lang')?.value === 'en' ? 'en' : 'fr';
  const slug = lang === 'en' ? 'privacy-policy' : 'politique-de-confidentialite';
  const page = await getWPPage(slug) ?? await getWPPage('politique-de-confidentialite');
  if (!page) notFound();
  return <LegalPageContent page={page} lang={lang} />;
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRequestLanguage } from '@/lib/lang';
import { getWPPage } from '@/lib/wordpress';
import { createPageMetadata } from '@/lib/seo-utils';
import LegalPageContent from '@/components/legal/LegalPageContent';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/politique-de-confidentialite', {
    fr: {
      title: 'Politique de Confidentialité | Legal Cameroun',
      description: 'Découvrez comment Legal Cameroun collecte, utilise et protège vos données personnelles conformément à la réglementation applicable.',
      openGraph: {
        title: 'Politique de Confidentialité | Legal Cameroun',
        description: 'Comment Legal Cameroun protège vos données personnelles.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Politique de Confidentialité | Legal Cameroun',
        description: 'Comment Legal Cameroun protège vos données personnelles.',
      },
      robots: 'noindex,follow',
    },
    en: {
      title: 'Privacy Policy | Legal Cameroun',
      description: 'Learn how Legal Cameroun collects, uses and protects your personal data in accordance with applicable regulations.',
      openGraph: {
        title: 'Privacy Policy | Legal Cameroun',
        description: 'How Legal Cameroun protects your personal data.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Privacy Policy | Legal Cameroun',
        description: 'How Legal Cameroun protects your personal data.',
      },
      robots: 'noindex,follow',
    },
  });
}

export default async function PolitiqueConfidentialitePage() {
  const lang = await getRequestLanguage();
  const slug = lang === 'en' ? 'privacy-policy' : 'politique-de-confidentialite';
  const page = await getWPPage(slug) ?? await getWPPage('politique-de-confidentialite');
  if (!page) notFound();
  return <LegalPageContent page={page} lang={lang} />;
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRequestLanguage } from '@/lib/lang';
import { getWPPage } from '@/lib/wordpress';
import { createPageMetadata } from '@/lib/seo-utils';
import LegalPageContent from '@/components/legal/LegalPageContent';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/mentions-legales', {
    fr: {
      title: 'Mentions Légales | Legal Cameroun',
      description: "Mentions légales du site Legal Cameroun — éditeur, hébergement, propriété intellectuelle, responsabilité et conditions d'utilisation.",
      openGraph: {
        title: 'Mentions Légales | Legal Cameroun',
        description: 'Mentions légales du site Legal Cameroun.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Mentions Légales | Legal Cameroun',
        description: 'Mentions légales du site Legal Cameroun.',
      },
      robots: 'noindex,follow',
    },
    en: {
      title: 'Legal Notice | Legal Cameroun',
      description: "Legal Cameroun's legal notice — publisher, hosting, intellectual property, liability and terms of use.",
      openGraph: {
        title: 'Legal Notice | Legal Cameroun',
        description: 'Legal notice for the Legal Cameroun website.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Legal Notice | Legal Cameroun',
        description: 'Legal notice for the Legal Cameroun website.',
      },
      robots: 'noindex,follow',
    },
  });
}

export default async function MentionsLegalesPage() {
  const lang = await getRequestLanguage();
  const slug = lang === 'en' ? 'legal-notice' : 'mentions-legales';
  const page = await getWPPage(slug) ?? await getWPPage('mentions-legales');
  if (!page) notFound();
  return <LegalPageContent page={page} lang={lang} />;
}

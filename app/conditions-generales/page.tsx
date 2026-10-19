import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRequestLanguage } from '@/lib/lang';
import { getWPPage } from '@/lib/wordpress';
import { createPageMetadata } from '@/lib/seo-utils';
import LegalPageContent from '@/components/legal/LegalPageContent';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/conditions-generales', {
    fr: {
      title: "Conditions Générales d'Utilisation | Legal Cameroun",
      description: "Consultez les conditions générales d'utilisation des services de Legal Cameroun, plateforme juridique, comptable et fiscale au Cameroun.",
      openGraph: {
        title: "Conditions Générales d'Utilisation | Legal Cameroun",
        description: "Conditions générales d'utilisation des services Legal Cameroun.",
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: "Conditions Générales d'Utilisation | Legal Cameroun",
        description: "Conditions générales d'utilisation des services Legal Cameroun.",
      },
      robots: 'noindex,follow',
    },
    en: {
      title: 'Terms of Use | Legal Cameroun',
      description: 'Read the terms of use of Legal Cameroun, a legal, accounting and tax platform in Cameroon.',
      openGraph: {
        title: 'Terms of Use | Legal Cameroun',
        description: 'Terms of use of Legal Cameroun services.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Terms of Use | Legal Cameroun',
        description: 'Terms of use of Legal Cameroun services.',
      },
      robots: 'noindex,follow',
    },
  });
}

export default async function ConditionsGeneralesPage() {
  const lang = await getRequestLanguage();
  const slug = lang === 'en' ? 'terms-and-conditions' : 'conditions-generales';
  const page = await getWPPage(slug) ?? await getWPPage('conditions-generales');
  if (!page) notFound();
  return <LegalPageContent page={page} lang={lang} />;
}

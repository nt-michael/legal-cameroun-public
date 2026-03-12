import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
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
        url: 'https://legalcameroun.com/conditions-generales',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Conditions Générales | Legal Cameroun',
        description: "Conditions générales d'utilisation des services Legal Cameroun.",
      },
      alternates: {
        canonical: 'https://legalcameroun.com/conditions-generales',
      },
      robots: 'noindex,follow',
    },
    en: {
      title: 'Terms and Conditions | Legal Cameroun',
      description: 'Read the terms and conditions of Legal Cameroun services, a legal, accounting and tax platform in Cameroon.',
      openGraph: {
        title: 'Terms and Conditions | Legal Cameroun',
        description: 'Terms and conditions of Legal Cameroun services.',
        type: 'website',
        url: 'https://legalcameroun.com/conditions-generales',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Terms and Conditions | Legal Cameroun',
        description: 'Terms and conditions of Legal Cameroun services.',
      },
      alternates: {
        canonical: 'https://legalcameroun.com/conditions-generales',
      },
      robots: 'noindex,follow',
    },
  });
}

export default async function ConditionsGeneralesPage() {
  const lang = (await cookies()).get('lang')?.value === 'en' ? 'en' : 'fr';
  const slug = lang === 'en' ? 'terms-and-conditions' : 'conditions-generales';
  const page = await getWPPage(slug) ?? await getWPPage('conditions-generales');
  if (!page) notFound();
  return <LegalPageContent page={page} lang={lang} />;
}

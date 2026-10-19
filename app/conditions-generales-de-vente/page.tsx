import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRequestLanguage } from '@/lib/lang';
import { getWPPage } from '@/lib/wordpress';
import { createPageMetadata } from '@/lib/seo-utils';
import LegalPageContent from '@/components/legal/LegalPageContent';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/conditions-generales-de-vente', {
    fr: {
      title: 'Conditions Générales de Vente | Legal Cameroun',
      description: 'Consultez les conditions générales de vente des prestations de Legal Cameroun : commande, prix, paiement, annulation, packs documentaires et consultations.',
      openGraph: {
        title: 'Conditions Générales de Vente | Legal Cameroun',
        description: 'Conditions générales de vente des prestations Legal Cameroun.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Conditions Générales de Vente | Legal Cameroun',
        description: 'Conditions générales de vente des prestations Legal Cameroun.',
      },
      robots: 'noindex,follow',
    },
    en: {
      title: 'Terms of Sale | Legal Cameroun',
      description: 'Read the terms of sale of Legal Cameroun services: orders, prices, payment, cancellation, document packs and consultations.',
      openGraph: {
        title: 'Terms of Sale | Legal Cameroun',
        description: 'Terms of sale of Legal Cameroun services.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary',
        title: 'Terms of Sale | Legal Cameroun',
        description: 'Terms of sale of Legal Cameroun services.',
      },
      robots: 'noindex,follow',
    },
  });
}

export default async function ConditionsGeneralesDeVentePage() {
  const lang = await getRequestLanguage();
  const slug = lang === 'en' ? 'terms-of-sale' : 'conditions-generales-de-vente';
  const page = await getWPPage(slug) ?? await getWPPage('conditions-generales-de-vente');
  if (!page) notFound();
  return <LegalPageContent page={page} lang={lang} />;
}

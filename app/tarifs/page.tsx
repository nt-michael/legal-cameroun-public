import { Metadata } from 'next';
import TarifsPageContent from './TarifsPageContent';
import { createPageMetadata } from '@/lib/seo-utils';
import { getProductPrice } from '@/lib/woocommerce';

const frTitle = 'Tarifs | Création et modification d\'entreprise au Cameroun | Legal Cameroun';
const frDescription = 'Tous nos prix en un coup d\'œil : création de SAS, SARL, SARLU, établissement et association, transfert de siège, transformation et dissolution. Devis gratuit, réponse sous 48h.';
const enTitle = 'Pricing | Company Formation and Amendments in Cameroon | Legal Cameroun';
const enDescription = 'All our prices at a glance: SAS, SARL, SARLU, establishment and association formation, office transfer, conversion and dissolution. Free quote, answer within 48h.';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/tarifs', {
    fr: {
      title: frTitle,
      description: frDescription,
      keywords: ['tarif création entreprise cameroun', 'prix SARL cameroun', 'prix SAS cameroun', 'coût transfert siège social', 'coût dissolution société'],
      openGraph: { title: frTitle, description: frDescription, type: 'website', siteName: 'Legal Cameroun' },
      twitter: { card: 'summary_large_image', title: frTitle, description: frDescription },
    },
    en: {
      title: enTitle,
      description: enDescription,
      keywords: ['company formation pricing cameroon', 'SARL price cameroon', 'SAS price cameroon', 'office transfer cost', 'company dissolution cost'],
      openGraph: { title: enTitle, description: enDescription, type: 'website', siteName: 'Legal Cameroun' },
      twitter: { card: 'summary_large_image', title: enTitle, description: enDescription },
    },
  });
}

// The price is a bonus on this page: never make the visitor wait more than a few seconds for it
const PRICE_TIMEOUT_MS = 3000;

export default async function TarifsPage() {
  // Same source as the booking page: null when WooCommerce is slow or unavailable, and the row then shows no amount
  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), PRICE_TIMEOUT_MS));
  const consultationPrice = await Promise.race([
    getProductPrice(Number(process.env.CONSULTATION_PRODUCT_ID)).catch(() => null),
    timeout,
  ]);
  return <TarifsPageContent consultationPrice={consultationPrice} />;
}

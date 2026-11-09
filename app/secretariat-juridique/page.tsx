import { Metadata } from 'next';
import SecretariatPageContent from './SecretariatPageContent';
import { createPageMetadata } from '@/lib/seo-utils';

const frTitle = 'Secrétariat juridique au Cameroun | Legal Cameroun';
const frDescription = 'Rédaction des statuts, assemblées générales, transfert de siège, contrats, baux commerciaux, augmentation ou diminution du capital : nos juristes suivent la vie juridique de votre entreprise. Réponse sous 48h.';
const enTitle = 'Legal Secretariat in Cameroon | Legal Cameroun';
const enDescription = 'Articles of association, general meetings, office transfer, contracts, commercial leases, share capital changes: our lawyers follow up on your company’s legal life. Answer within 48h.';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/secretariat-juridique', {
    fr: {
      title: frTitle,
      description: frDescription,
      keywords: ['secrétariat juridique cameroun', 'rédaction statuts cameroun', 'assemblée générale société', 'bail commercial cameroun', 'augmentation de capital cameroun'],
      openGraph: { title: frTitle, description: frDescription, type: 'website', siteName: 'Legal Cameroun' },
      twitter: { card: 'summary_large_image', title: frTitle, description: frDescription },
    },
    en: {
      title: enTitle,
      description: enDescription,
      keywords: ['legal secretariat cameroon', 'articles of association cameroon', 'general meeting company', 'commercial lease cameroon', 'capital increase cameroon'],
      openGraph: { title: enTitle, description: enDescription, type: 'website', siteName: 'Legal Cameroun' },
      twitter: { card: 'summary_large_image', title: enTitle, description: enDescription },
    },
  });
}

export default function SecretariatPage() {
  return <SecretariatPageContent />;
}

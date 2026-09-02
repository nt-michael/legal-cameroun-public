import { Metadata } from 'next';
import GestionPageContent from './GestionPageContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/modification-entreprise', {
    fr: {
      title: "Modification d'Entreprise au Cameroun | Transfert, Dissolution, Transformation",
      description: "Modifiez les statuts de votre entreprise au Cameroun : transfert de siège social, transformation SAS/SARL, dissolution. Accompagnement juridique expert de A à Z.",
      keywords: ['modification statuts cameroun', 'transfert siège social', 'transformation SAS SARL cameroun', 'dissolution entreprise', 'OHADA modification'],
      openGraph: {
        title: "Modification d'Entreprise au Cameroun | Transfert, Dissolution, Transformation",
        description: "Modifiez les statuts de votre entreprise au Cameroun : transfert de siège social, transformation SAS/SARL, dissolution. Accompagnement juridique expert de A à Z.",
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Modification d'Entreprise au Cameroun | Transfert, Dissolution, Transformation",
        description: "Modifiez les statuts de votre entreprise au Cameroun : transfert de siège social, transformation SAS/SARL, dissolution. Accompagnement juridique expert de A à Z.",
      },
    },
    en: {
      title: 'Company Amendment in Cameroon | Legal Cameroun',
      description: "Amend your company's articles, change its legal form or transfer its registered office in Cameroon.",
      keywords: ['company amendment cameroon', 'registered office transfer', 'SAS SARL conversion cameroon', 'company dissolution', 'OHADA amendment'],
      openGraph: {
        title: 'Company Amendment in Cameroon | Legal Cameroun',
        description: "Amend your company's articles, change its legal form or transfer its registered office in Cameroon.",
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Company Amendment in Cameroon | Legal Cameroun',
        description: "Amend your company's articles, change its legal form or transfer its registered office in Cameroon.",
      },
    },
  });
}

export default function GestionEntreprisePage() {
  return <GestionPageContent />;
}

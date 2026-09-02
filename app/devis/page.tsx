import { Metadata } from 'next';
import DevisPageContent from './DevisPageContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/devis', {
    fr: {
      title: "Devis Gratuit | Création d'Entreprise au Cameroun — Legal Cameroun",
      description: "Obtenez une estimation gratuite pour la création ou modification de votre entreprise au Cameroun. SAS, SARL, SARLU, Association. Réponse personnalisée sous 24h.",
      keywords: ['devis création entreprise cameroun', 'tarif création société', 'devis gratuit SARL SAS cameroun', 'coût immatriculation'],
      openGraph: {
        title: "Devis Gratuit | Création d'Entreprise au Cameroun — Legal Cameroun",
        description: "Obtenez une estimation gratuite pour la création ou modification de votre entreprise au Cameroun. SAS, SARL, SARLU, Association. Réponse personnalisée sous 24h.",
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Devis Gratuit | Création d'Entreprise au Cameroun — Legal Cameroun",
        description: "Obtenez une estimation gratuite pour la création ou modification de votre entreprise au Cameroun. SAS, SARL, SARLU, Association. Réponse personnalisée sous 24h.",
      },
    },
    en: {
      title: 'Get a Quote | Legal Cameroun',
      description: 'Get a personalised quote for legal, accounting or tax services in Cameroon.',
      keywords: ['company formation quote cameroon', 'legal services pricing', 'free quote SARL SAS cameroon', 'incorporation cost'],
      openGraph: {
        title: 'Get a Quote | Legal Cameroun',
        description: 'Get a personalised quote for legal, accounting or tax services in Cameroon.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Get a Quote | Legal Cameroun',
        description: 'Get a personalised quote for legal, accounting or tax services in Cameroon.',
      },
    },
  });
}

export default function DevisPage() {
  return <DevisPageContent />;
}

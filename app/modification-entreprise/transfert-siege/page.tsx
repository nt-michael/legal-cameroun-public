import { Metadata } from 'next';
import TransfertSiegeContent from './TransfertSiegeContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/modification-entreprise/transfert-siege', {
    title: "Transfert de Siège Social au Cameroun | Changement d'Adresse Société",
    description: "Transférez le siège social de votre entreprise au Cameroun en toute sérénité. Accompagnement complet, publication légale et mise à jour RCCM incluses.",
    keywords: ['transfert siège social cameroun', "changement adresse entreprise cameroun", 'déménagement siège société', 'RCCM Cameroun', 'modification statuts'],
    openGraph: {
      title: "Transfert de Siège Social au Cameroun | Changement d'Adresse Société",
      description: "Transférez le siège social de votre entreprise au Cameroun en toute sérénité. Accompagnement complet, publication légale et mise à jour RCCM incluses.",
      type: 'website',
      url: 'https://legalcameroun.com/modification-entreprise/transfert-siege',
      siteName: 'Legal Cameroun',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Transfert de Siège Social au Cameroun | Changement d'Adresse Société",
      description: "Transférez le siège social de votre entreprise au Cameroun en toute sérénité. Accompagnement complet, publication légale et mise à jour RCCM incluses.",
    },
    alternates: {
      languages: {
        'fr': 'https://legalcameroun.com/modification-entreprise/transfert-siege',
        'en': 'https://legalcameroun.com/modification-entreprise/transfert-siege',
        'x-default': 'https://legalcameroun.com/modification-entreprise/transfert-siege',
      },
    },
  });
}

export default function TransfertSiegePage() {
  return <TransfertSiegeContent />;
}

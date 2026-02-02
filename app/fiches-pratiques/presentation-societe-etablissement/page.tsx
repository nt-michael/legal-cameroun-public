import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FichePageTemplate } from '@/components/fiches-pratiques';
import { getFicheBySlug } from '@/lib/fiches-pratiques-data';

const fiche = getFicheBySlug('presentation-societe-etablissement');

export const metadata: Metadata = {
  title: 'Société ou Établissement : Comment Choisir ? | Legal Cameroun',
  description:
    'Définitions claires, avantages et inconvénients de la société vs l\'établissement au Cameroun. Guide pour faire le bon choix dès le départ.',
  keywords: [
    'société cameroun',
    'établissement cameroun',
    'succursale cameroun',
    'créer entreprise cameroun',
    'différence société établissement',
  ],
  openGraph: {
    title: 'Société ou Établissement : Ce qu\'il faut savoir pour choisir',
    description:
      'Définitions claires, avantages, inconvénients – pour lancer votre activité sans regret.',
    type: 'article',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/fiches-pratiques/presentation-societe-etablissement',
      'en': 'https://legalcameroun.com/fiches-pratiques/presentation-societe-etablissement',
      'x-default': 'https://legalcameroun.com/fiches-pratiques/presentation-societe-etablissement',
    },
  },
};

export default function PresentationSocieteEtablissementPage() {
  if (!fiche) {
    notFound();
  }

  return <FichePageTemplate fiche={fiche} />;
}

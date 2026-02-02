import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FichePageTemplate } from '@/components/fiches-pratiques';
import { getFicheBySlug } from '@/lib/fiches-pratiques-data';

const fiche = getFicheBySlug('tutoriel-consultation');

export const metadata: Metadata = {
  title: 'Comment Réserver une Consultation ? | Legal Cameroun',
  description:
    'Tutoriel simple pour prendre rendez-vous avec un expert RODEC Conseils. Suivez les étapes pour réserver votre consultation.',
  keywords: [
    'réserver consultation juridique',
    'rendez-vous avocat cameroun',
    'RODEC conseils RDV',
    'consultation entreprise cameroun',
  ],
  openGraph: {
    title: 'Comment Réserver une Consultation ?',
    description:
      'Tutoriel simple pour prendre rendez-vous avec un expert RODEC Conseils.',
    type: 'article',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/fiches-pratiques/tutoriel-consultation',
      'en': 'https://legalcameroun.com/fiches-pratiques/tutoriel-consultation',
      'x-default': 'https://legalcameroun.com/fiches-pratiques/tutoriel-consultation',
    },
  },
};

export default function TutorielConsultationPage() {
  if (!fiche) {
    notFound();
  }

  return <FichePageTemplate fiche={fiche} />;
}

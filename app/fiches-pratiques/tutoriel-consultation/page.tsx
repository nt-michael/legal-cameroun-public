import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FichePageTemplate } from '@/components/fiches-pratiques';
import { getFicheBySlug } from '@/lib/fiches-pratiques-data';

const fiche = getFicheBySlug('tutoriel-consultation');

export const metadata: Metadata = {
  title: 'Comment Réserver une Consultation Juridique | Legal Cameroun',
  description:
    'Tutoriel étape par étape pour réserver votre consultation en ligne avec un expert juridique. Simple, rapide et gratuit.',
  keywords: [
    'réserver consultation juridique cameroun',
    'rendez-vous avocat cameroun',
    'expert juridique en ligne',
    'consultation entreprise cameroun',
  ],
  openGraph: {
    title: 'Comment Réserver une Consultation Juridique',
    description:
      'Tutoriel étape par étape pour réserver votre consultation en ligne avec un expert juridique. Simple, rapide et gratuit.',
    type: 'article',
    url: 'https://legalcameroun.com/fiches-pratiques/tutoriel-consultation',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comment Réserver une Consultation Juridique | Legal Cameroun',
    description:
      'Tutoriel étape par étape pour réserver votre consultation en ligne avec un expert juridique. Simple, rapide et gratuit.',
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

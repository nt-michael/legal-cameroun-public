import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FichePageTemplate } from '@/components/fiches-pratiques';
import { getFicheBySlug } from '@/lib/fiches-pratiques-data';
import { createPageMetadata } from '@/lib/seo-utils';

const fiche = getFicheBySlug('tutoriel-consultation');

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/fiches-pratiques/tutoriel-consultation', {
    fr: {
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
    },
    en: {
      title: 'Consultation Tutorial | Legal Cameroun',
      description: 'How to book a legal or tax consultation with Legal Cameroun.',
      keywords: [
        'book legal consultation cameroon',
        'lawyer appointment cameroon',
        'online legal expert',
        'business consultation cameroon',
      ],
      openGraph: {
        title: 'How to Book a Legal Consultation',
        description: 'Step-by-step tutorial to book your online consultation with a legal expert. Simple, fast and free.',
        type: 'article',
        url: 'https://legalcameroun.com/fiches-pratiques/tutoriel-consultation',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Consultation Tutorial | Legal Cameroun',
        description: 'How to book a legal or tax consultation with Legal Cameroun.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/fiches-pratiques/tutoriel-consultation',
          'en': 'https://legalcameroun.com/fiches-pratiques/tutoriel-consultation',
          'x-default': 'https://legalcameroun.com/fiches-pratiques/tutoriel-consultation',
        },
      },
    },
  });
}

export default function TutorielConsultationPage() {
  if (!fiche) {
    notFound();
  }

  return <FichePageTemplate fiche={fiche} />;
}

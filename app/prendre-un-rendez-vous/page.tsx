import { Metadata } from 'next';
import RDVPageContent from './RDVPageContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/prendre-un-rendez-vous', {
    fr: {
      title: 'Réservez votre Rendez-vous avec un Expert Juridique | Legal Cameroun',
      description: "Prenez rendez-vous avec nos experts juridiques et fiscaux au Cameroun. Conseil en création d'entreprise, droit des affaires et fiscalité.",
      keywords: ['rendez-vous expert juridique cameroun', 'rendez-vous expert juridique douala', "conseil création entreprise", 'expert OHADA'],
      openGraph: {
        title: 'Réservez votre Rendez-vous avec un Expert Juridique | Legal Cameroun',
        description: "Prenez rendez-vous avec nos experts juridiques et fiscaux au Cameroun. Conseil en création d'entreprise, droit des affaires et fiscalité.",
        type: 'website',
        url: 'https://legalcameroun.com/prendre-un-rendez-vous',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Réservez votre Rendez-vous avec un Expert Juridique | Legal Cameroun',
        description: "Prenez rendez-vous avec nos experts juridiques et fiscaux au Cameroun. Conseil en création d'entreprise, droit des affaires et fiscalité.",
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/prendre-un-rendez-vous',
          'en': 'https://legalcameroun.com/prendre-un-rendez-vous',
          'x-default': 'https://legalcameroun.com/prendre-un-rendez-vous',
        },
      },
    },
    en: {
      title: 'Book an Appointment | Legal Cameroun',
      description: 'Book a legal or tax consultation with our experts at Legal Cameroun.',
      keywords: ['legal expert appointment cameroon', 'legal expert appointment douala', 'company formation advice', 'OHADA expert'],
      openGraph: {
        title: 'Book an Appointment | Legal Cameroun',
        description: 'Book a legal or tax consultation with our experts at Legal Cameroun.',
        type: 'website',
        url: 'https://legalcameroun.com/prendre-un-rendez-vous',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Book an Appointment | Legal Cameroun',
        description: 'Book a legal or tax consultation with our experts at Legal Cameroun.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/prendre-un-rendez-vous',
          'en': 'https://legalcameroun.com/prendre-un-rendez-vous',
          'x-default': 'https://legalcameroun.com/prendre-un-rendez-vous',
        },
      },
    },
  });
}

export default function RDVPage() {
  return <RDVPageContent />;
}

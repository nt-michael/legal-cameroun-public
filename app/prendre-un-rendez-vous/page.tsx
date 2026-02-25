import { Metadata } from 'next';
import RDVPageContent from './RDVPageContent';

export const metadata: Metadata = {
  title: 'Consultation Gratuite avec un Expert Juridique | Legal Cameroun',
  description: "Réservez votre consultation gratuite avec nos experts juridiques et fiscaux au Cameroun. Conseil en création d'entreprise, droit des affaires et fiscalité.",
  keywords: ['consultation gratuite cameroun', 'rendez-vous expert juridique douala', "conseil création entreprise", 'expert OHADA'],
  openGraph: {
    title: 'Consultation Gratuite avec un Expert Juridique | Legal Cameroun',
    description: "Réservez votre consultation gratuite avec nos experts juridiques et fiscaux au Cameroun. Conseil en création d'entreprise, droit des affaires et fiscalité.",
    type: 'website',
    url: 'https://legalcameroun.com/prendre-un-rendez-vous',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultation Gratuite avec un Expert Juridique | Legal Cameroun',
    description: "Réservez votre consultation gratuite avec nos experts juridiques et fiscaux au Cameroun. Conseil en création d'entreprise, droit des affaires et fiscalité.",
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/prendre-un-rendez-vous',
      'en': 'https://legalcameroun.com/prendre-un-rendez-vous',
      'x-default': 'https://legalcameroun.com/prendre-un-rendez-vous',
    },
  },
};

export default function RDVPage() {
  return <RDVPageContent />;
}

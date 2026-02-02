import { Metadata } from 'next';
import RDVPageContent from './RDVPageContent';

export const metadata: Metadata = {
  title: 'Prendre un Rendez-vous Gratuit | Legal Cameroun',
  description: 'Réservez une consultation gratuite avec nos experts juridiques au Cameroun. Création d\'entreprise, conseil juridique, expertise comptable.',
  keywords: ['rendez-vous juridique cameroun', 'consultation gratuite', 'expert juridique douala'],
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

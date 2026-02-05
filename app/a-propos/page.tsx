import { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'À Propos | Legal Cameroun par RODEC Conseils',
  description: 'Découvrez Legal Cameroun, votre partenaire juridique de confiance au Cameroun. 8 ans d\'expérience, +15 000 entrepreneurs accompagnés. Bureaux à Douala, Paris et Cotonou.',
  keywords: ['legal cameroun', 'RODEC conseils', 'accompagnement juridique douala', 'expertise comptable cameroun', 'legaltech cameroun'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/a-propos',
      'en': 'https://legalcameroun.com/a-propos',
      'x-default': 'https://legalcameroun.com/a-propos',
    },
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}

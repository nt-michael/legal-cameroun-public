import { Metadata } from 'next';
import DissolutionContent from './DissolutionContent';

export const metadata: Metadata = {
  title: 'Dissolution Entreprise Cameroun | Fermer Sa Société',
  description: 'Dissolvez votre entreprise au Cameroun proprement et rapidement. Dissolution + liquidation amiable guidée. Accompagnement juridique expert.',
  keywords: ['dissolution entreprise cameroun', 'fermer société', 'liquidation amiable cameroun'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/gestion-entreprise/dissolution',
      'en': 'https://legalcameroun.com/gestion-entreprise/dissolution',
      'x-default': 'https://legalcameroun.com/gestion-entreprise/dissolution',
    },
  },
};

export default function DissolutionPage() {
  return <DissolutionContent />;
}

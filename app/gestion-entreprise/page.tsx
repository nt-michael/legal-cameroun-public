import { Metadata } from 'next';
import GestionPageContent from './GestionPageContent';

export const metadata: Metadata = {
  title: 'Modification Statuts Entreprise Cameroun | Transfert Siege, Transformation SAS/SARL',
  description: 'Modifiez vos statuts d\'entreprise au Cameroun : transfert de siege social, transformation SAS en SARL, dissolution. Accompagnement juridique expert.',
  keywords: ['modification statuts cameroun', 'transfert siege social', 'transformation SAS SARL', 'dissolution entreprise cameroun'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/gestion-entreprise',
      'en': 'https://legalcameroun.com/gestion-entreprise',
      'x-default': 'https://legalcameroun.com/gestion-entreprise',
    },
  },
};

export default function GestionEntreprisePage() {
  return <GestionPageContent />;
}

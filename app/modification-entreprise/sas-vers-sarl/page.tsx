import { Metadata } from 'next';
import SasVersSarlContent from './SasVersSarlContent';

export const metadata: Metadata = {
  title: 'Transformation SAS en SARL Cameroun | Changer Forme Juridique',
  description: 'Transformez votre SAS en SARL au Cameroun. Passez à un cadre plus structuré avec protection sociale adaptée. Accompagnement juridique expert.',
  keywords: ['transformation SAS SARL cameroun', 'changer forme juridique', 'convertir SAS en SARL'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/modification-entreprise/sas-vers-sarl',
      'en': 'https://legalcameroun.com/modification-entreprise/sas-vers-sarl',
      'x-default': 'https://legalcameroun.com/modification-entreprise/sas-vers-sarl',
    },
  },
};

export default function SasVersSarlPage() {
  return <SasVersSarlContent />;
}

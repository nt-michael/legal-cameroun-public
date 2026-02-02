import { Metadata } from 'next';
import SarlVersSasContent from './SarlVersSasContent';

export const metadata: Metadata = {
  title: 'Transformation SARL en SAS Cameroun | Plus de Flexibilité',
  description: 'Transformez votre SARL en SAS au Cameroun. Gagnez en flexibilité et souplesse pour ouvrir à des investisseurs. Accompagnement juridique expert.',
  keywords: ['transformation SARL SAS cameroun', 'convertir SARL en SAS', 'changer forme juridique'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/gestion-entreprise/sarl-vers-sas',
      'en': 'https://legalcameroun.com/gestion-entreprise/sarl-vers-sas',
      'x-default': 'https://legalcameroun.com/gestion-entreprise/sarl-vers-sas',
    },
  },
};

export default function SarlVersSasPage() {
  return <SarlVersSasContent />;
}

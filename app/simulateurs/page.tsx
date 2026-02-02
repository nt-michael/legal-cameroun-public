import { Metadata } from 'next';
import SimulateursHero from '@/components/simulateurs/SimulateursHero';
import SimulateursGrid from '@/components/simulateurs/SimulateursGrid';

export const metadata: Metadata = {
  title: 'Simulateurs Fiscaux | TVA, IS, Salaire - Legal Cameroun',
  description: 'Calculez vos impôts au Cameroun : TVA, Impôt sur les Sociétés, charges salariales. Outils gratuits basés sur le CGI 2024 et les taux DGI/CNPS.',
  keywords: ['simulateur TVA Cameroun', 'calculateur IS', 'impôt salaire Cameroun', 'CNPS', 'IRPP', 'fiscal Cameroun'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/simulateurs',
      'en': 'https://legalcameroun.com/simulateurs',
      'x-default': 'https://legalcameroun.com/simulateurs',
    },
  },
};

export default function SimulateursPage() {
  return (
    <>
      <SimulateursHero />
      <SimulateursGrid />
    </>
  );
}

import { Metadata } from 'next';
import SimulateursHero from '@/components/simulateurs/SimulateursHero';
import SimulateursGrid from '@/components/simulateurs/SimulateursGrid';

export const metadata: Metadata = {
  title: 'Simulateurs Fiscaux Gratuits | TVA, IS, Salaire au Cameroun — Legal Cameroun',
  description: "Calculez vos impôts et charges au Cameroun gratuitement : TVA 19,25%, Impôt sur les Sociétés, charges salariales CNPS/IRPP. Outils basés sur le CGI 2024.",
  keywords: ['simulateur fiscal cameroun', 'calculateur TVA', 'impôt sociétés cameroun', 'CNPS 2024', 'IRPP cameroun', 'charges salariales'],
  openGraph: {
    title: 'Simulateurs Fiscaux Gratuits | TVA, IS, Salaire au Cameroun — Legal Cameroun',
    description: "Calculez vos impôts et charges au Cameroun gratuitement : TVA 19,25%, Impôt sur les Sociétés, charges salariales CNPS/IRPP. Outils basés sur le CGI 2024.",
    type: 'website',
    url: 'https://legalcameroun.com/simulateurs',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateurs Fiscaux Gratuits | TVA, IS, Salaire au Cameroun — Legal Cameroun',
    description: "Calculez vos impôts et charges au Cameroun gratuitement : TVA 19,25%, Impôt sur les Sociétés, charges salariales CNPS/IRPP. Outils basés sur le CGI 2024.",
  },
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

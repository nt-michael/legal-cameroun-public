import { Metadata } from 'next';
import SimulateurPageTemplate from '@/components/simulateurs/SimulateurPageTemplate';
import ISSimulator from '@/components/simulateurs/ISSimulator';

export const metadata: Metadata = {
  title: 'Calculateur IS Cameroun | Impôt sur les Sociétés 2024 — Legal Cameroun',
  description: 'Estimez votre Impôt sur les Sociétés au Cameroun. Taux de 28,5% (CA ≤ 3 Mds FCFA) ou 33% (CA > 3 Mds). Basé sur le CGI 2024. Calcul instantané.',
  keywords: ['impôt sociétés cameroun', 'IS cameroun 2024', 'taux IS PME', 'bénéfice imposable', 'calculateur IS', 'DGI Cameroun'],
  openGraph: {
    title: 'Calculateur IS Cameroun | Impôt sur les Sociétés 2024 — Legal Cameroun',
    description: 'Estimez votre Impôt sur les Sociétés au Cameroun. Taux de 28,5% (CA ≤ 3 Mds FCFA) ou 33% (CA > 3 Mds). Basé sur le CGI 2024. Calcul instantané.',
    type: 'website',
    url: 'https://legalcameroun.com/simulateurs/is',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur IS Cameroun | Impôt sur les Sociétés 2024 — Legal Cameroun',
    description: 'Estimez votre Impôt sur les Sociétés au Cameroun. Taux de 28,5% (CA ≤ 3 Mds FCFA) ou 33% (CA > 3 Mds). Basé sur le CGI 2024. Calcul instantané.',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/simulateurs/is',
      'en': 'https://legalcameroun.com/simulateurs/is',
      'x-default': 'https://legalcameroun.com/simulateurs/is',
    },
  },
};

export default function ISPage() {
  return (
    <SimulateurPageTemplate
      title={{ fr: "Simulateur Impôt sur les Sociétés", en: "Corporate Tax Simulator" }}
      shortTitle={{ fr: "IS", en: "CIT" }}
      description={{ fr: "Estimez votre IS selon votre chiffre d'affaires et bénéfice imposable. Taux de 28,5% ou 33% selon le seuil de 3 milliards FCFA.", en: "Estimate your corporate tax based on your revenue and taxable profit. Rate of 28.5% or 33% depending on the 3 billion FCFA threshold." }}
    >
      <ISSimulator />
    </SimulateurPageTemplate>
  );
}

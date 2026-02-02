import { Metadata } from 'next';
import SimulateurPageTemplate from '@/components/simulateurs/SimulateurPageTemplate';
import ISSimulator from '@/components/simulateurs/ISSimulator';

export const metadata: Metadata = {
  title: 'Simulateur Impôt sur les Sociétés (IS) Cameroun - Legal Cameroun',
  description: 'Calculez votre Impôt sur les Sociétés au Cameroun. Taux 28,5% (CA ≤ 3 milliards) ou 33% (CA > 3 milliards) selon CGI 2024.',
  keywords: ['impôt sociétés Cameroun', 'IS Cameroun', 'taux IS', 'bénéfice imposable', 'DGI'],
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

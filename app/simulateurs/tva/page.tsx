import { Metadata } from 'next';
import SimulateurPageTemplate from '@/components/simulateurs/SimulateurPageTemplate';
import TVASimulator from '@/components/simulateurs/TVASimulator';

export const metadata: Metadata = {
  title: 'Calculateur TVA Cameroun | Taux 19,25% — Legal Cameroun',
  description: 'Calculez votre TVA collectée, déductible et TVA nette au Cameroun. Taux standard de 19,25% selon le Code Général des Impôts 2024. Gratuit et instantané.',
  keywords: ['calculateur TVA cameroun', 'TVA 19.25%', 'taxe valeur ajoutée Cameroun', 'TVA nette', 'crédit TVA', 'DGI Cameroun'],
  openGraph: {
    title: 'Calculateur TVA Cameroun | Taux 19,25% — Legal Cameroun',
    description: 'Calculez votre TVA collectée, déductible et TVA nette au Cameroun. Taux standard de 19,25% selon le Code Général des Impôts 2024. Gratuit et instantané.',
    type: 'website',
    url: 'https://legalcameroun.com/simulateurs/tva',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur TVA Cameroun | Taux 19,25% — Legal Cameroun',
    description: 'Calculez votre TVA collectée, déductible et TVA nette au Cameroun. Taux standard de 19,25% selon le Code Général des Impôts 2024. Gratuit et instantané.',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/simulateurs/tva',
      'en': 'https://legalcameroun.com/simulateurs/tva',
      'x-default': 'https://legalcameroun.com/simulateurs/tva',
    },
  },
};

export default function TVAPage() {
  return (
    <SimulateurPageTemplate
      title={{ fr: "Simulateur TVA", en: "VAT Simulator" }}
      shortTitle={{ fr: "TVA", en: "VAT" }}
      description={{ fr: "Calculez votre TVA collectée sur les ventes, déductible sur les achats, et déterminez le solde net ou le crédit TVA.", en: "Calculate your VAT collected on sales, deductible on purchases, and determine the net balance or VAT credit." }}
    >
      <TVASimulator />
    </SimulateurPageTemplate>
  );
}

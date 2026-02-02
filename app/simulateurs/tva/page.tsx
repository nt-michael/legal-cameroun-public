import { Metadata } from 'next';
import SimulateurPageTemplate from '@/components/simulateurs/SimulateurPageTemplate';
import TVASimulator from '@/components/simulateurs/TVASimulator';

export const metadata: Metadata = {
  title: 'Simulateur TVA Cameroun | Calcul TVA 19,25% - Legal Cameroun',
  description: 'Calculez votre TVA au Cameroun : TVA collectée, TVA déductible, TVA nette et crédit TVA. Taux standard 19,25% selon CGI 2024.',
  keywords: ['TVA Cameroun', 'calculateur TVA', 'taxe valeur ajoutée', '19.25%', 'DGI Cameroun'],
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
